import { task } from "hardhat/config";
import {
  LENS_HUB_SANDBOX_ADDRESS,
  LENS_SANBOX_FREE_COLLECT_MODULE,
  getLensHubDeployed,
} from "../helpers/lens";
import {
  SANDBOX_DEPLOYER_PROFILE_ID,
  SANDBOX_INTEREST_ROOT,
  SANDBOX_INTEREST_TREE_MAP,
  MUMBAI_CURRENCY_WMATIC,
  MODULE_ADDRESS
} from "../helpers/constants";
import { getBalance, getAllowance, approve } from "./../helpers/tokens";
import { getModule } from "./../helpers/madfi";
import { utils } from "ethers";

task(
  "create-post-with-campaign",
  "publishes a post and sets the reference module"
).setAction(async ({}, hre) => {
  const ethers = hre.ethers;
  const networkName = hre.network.name;
  console.log(networkName)
  const [deployer, user] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  const lensHub = await getLensHubDeployed(
    deployer,
    LENS_HUB_SANDBOX_ADDRESS
  );
  const referenceModule = await getModule(ethers, deployer);

  const merkleRoot = SANDBOX_INTEREST_ROOT;
  const currency = MUMBAI_CURRENCY_WMATIC;
  const budget = utils.parseEther("0.1");
  const totalProfiles = 2;
  console.log(
    JSON.stringify(
      {
        merkleRoot,
        currency,
        budget: budget.toString(),
        totalProfiles,
      },
      null,
      2
    )
  );
  const data = utils.defaultAbiCoder.encode(
    ["bytes32", "address", "uint256", "uint256"],
    [merkleRoot, currency, budget, totalProfiles]
  );

  const protocolFee = await referenceModule.getProtocolFee(budget);
  const clientFee = await referenceModule.getClientFee(budget);
  const budgetPlusFees = budget.add(protocolFee).add(clientFee);

  const balance = await getBalance(
    deployerAddress,
    deployer.provider,
    currency
  );
  const allowance = await getAllowance(
    deployerAddress,
    deployer.provider,
    currency,
    MODULE_ADDRESS
  );

  if (balance.lt(budgetPlusFees)) {
    throw new Error("Insufficient balance for budgetPlusFees");
  }

  if (allowance.lt(budgetPlusFees)) {
    const _tx = await approve(
      deployer,
      currency,
      MODULE_ADDRESS,
      budgetPlusFees
    );
    console.log(`approving... ${_tx.hash}`);
    await _tx.wait();
  }

  console.log(
    `creating post with ref module TargetedCampaignReferenceModule (at: ${MODULE_ADDRESS})`
  );

  const inputStruct = {
    profileId: SANDBOX_DEPLOYER_PROFILE_ID,
    contentURI: "ipfs://QmWGAFtzyzB6A6gYMnb6838hysHuT2rcV8B98Gmj4T4pyY/3958.json",
    actionModules: [],
    actionModulesInitDatas: [utils.defaultAbiCoder.encode(["bool"], [true])],
    referenceModule: referenceModule.address,
    referenceModuleInitData: data,
  }

  const tx = await lensHub
    .connect(deployer as any)
    .post(inputStruct, { gasLimit: 500_000 });
  console.log(`tx: ${tx.hash}`);
  await tx.wait();

  const pubId = await lensHub.getPubCount(SANDBOX_DEPLOYER_PROFILE_ID);

  console.log(await lensHub.getPub(SANDBOX_DEPLOYER_PROFILE_ID, pubId));
});
