import { task } from 'hardhat/config';
import {
  LENS_HUB_SANDBOX_ADDRESS,
  LENS_SANBOX_FREE_COLLECT_MODULE,
  getLensHubDeployed,
} from '../helpers/lens';
import {
  SANDBOX_DEPLOYER_PROFILE_ID,
  SANDBOX_NO_SECOND_BEST_PROFILE_ID,
  SANDBOX_INTEREST_TREE_MAP,
  ZERO_ADDRESS,
  MUMBAI_CURRENCY_WMATIC,
} from '../helpers/constants';
import {
  getBalance,
  getAllowance,
  approve,
} from '../helpers/tokens';
import { getModule } from '../helpers/madfi';
import { utils } from "ethers";

task('close-campaign', 'deployer closes the campaign and gets back').setAction(async ({}, hre) => {
  const ethers = hre.ethers;
  const networkName = hre.network.name;
  const [deployer, user] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  const { lensHub } = await getLensHubDeployed(deployer, LENS_HUB_SANDBOX_ADDRESS);
  const referenceModule = await getModule(ethers, deployer);

  const currency = MUMBAI_CURRENCY_WMATIC;
  const pubId = await lensHub.getPubCount(SANDBOX_DEPLOYER_PROFILE_ID);

  const budgetBefore = await referenceModule.getBudgetRemainingForPublication(SANDBOX_DEPLOYER_PROFILE_ID, pubId);
  const protocolFee = await referenceModule.getProtocolFee(budgetBefore);
  const balanceBefore = await getBalance(deployerAddress, deployer.provider, currency);

  const tx = await referenceModule
    .connect(deployer)
    .withdrawBudgetForPublication(SANDBOX_DEPLOYER_PROFILE_ID, pubId, { gasLimit: 200_000 });
  console.log(`tx: ${tx.hash}`);
  await tx.wait();

  const balanceAfter = await getBalance(deployerAddress, deployer.provider, currency);
  const totalRefund = balanceAfter.sub(balanceBefore);
  const clientFeesRefunded = totalRefund.sub(budgetBefore).sub(protocolFee);

  console.log(`
    total refund: ${utils.formatEther(totalRefund)}
    budget returned: ${utils.formatEther(budgetBefore)}
    protocol fee returned: ${utils.formatEther(protocolFee)}
    client fees returned: ${utils.formatEther(clientFeesRefunded)}
  `);
});
