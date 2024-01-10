import { task } from 'hardhat/config';
import { request, gql } from 'graphql-request';
import {
  LENS_HUB_SANDBOX_ADDRESS,
  LENS_SANBOX_FREE_COLLECT_MODULE,
  getLensHubDeployed,
} from '../helpers/lens';
import {
  SANDBOX_DEPLOYER_PROFILE_ID,
  SANDBOX_NO_SECOND_BEST_PROFILE_ID,
  SANDBOX_INTEREST_TREE_MAP,
  SANDBOX_INTEREST_ROOT,
  ZERO_ADDRESS,
} from '../helpers/constants';
import {
  getBalance,
  getAllowance,
  approve,
} from './../helpers/tokens';
import { getModule } from './../helpers/madfi';
import { utils } from "ethers";

// change this to a whitelisted client
const CLIENT_ADDRESS = ZERO_ADDRESS;

const fetchTargetedCampaigns = async () => {
  // @ts-ignore
  const { data } = await request(
    'https://api.thegraph.com/subgraphs/name/mad-finance/testnet-madfi-subgraph',
    gql`
      query getTargetedCampaigns {
        targetedCampaigns {
          profileId
          pubId
          currency
          rewardPerMirror
          totalBudget
          clientFeePerMirror
          merkleRoot
        }
      }
    `
  );

  return data?.targetedCampaigns;
};

task('mirror-post-with-campaign', 'user mirrors a post initialized by the deployer, with the ref module TargetedCampaignReferenceModule').setAction(async ({}, hre) => {
  const ethers = hre.ethers;
  const networkName = hre.network.name;
  const [deployer, user] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  const userAddress = await user.getAddress();
  const { lensHub } = await getLensHubDeployed(deployer, LENS_HUB_SANDBOX_ADDRESS);
  const referenceModule = await getModule(ethers, deployer);

  const activeCampaigns = await fetchTargetedCampaigns();
  // @ts-ignore
  const campaign = activeCampaigns.find(({ profileId }) => profileId == parseInt(SANDBOX_DEPLOYER_PROFILE_ID, 16))
  if (!campaign) throw new Error('no active campaign in the subgraph by SANDBOX_DEPLOYER_PROFILE_ID');

  const currency = campaign.currency;
  const profileId = SANDBOX_DEPLOYER_PROFILE_ID; // we can mirror our own
  const profileIdPointed = campaign.profileId;
  const pubIdPointed = campaign.pubId;

  if (campaign.merkleRoot !== SANDBOX_INTEREST_ROOT) throw new Error('this is not the hardcoded leaf, you know what you doin dawg?');

  const { proof, index } = SANDBOX_INTEREST_TREE_MAP[profileId];
  const referenceModuleData = utils.defaultAbiCoder.encode(
    ['bytes32[]', 'uint256', 'address'],
    [proof, index, CLIENT_ADDRESS]
  )

  const budgetBefore = await referenceModule.getBudgetRemainingForPublication(profileIdPointed, pubIdPointed);
  console.log(`budget: ${utils.formatEther(budgetBefore)}`);
  const balanceBefore = await getBalance(userAddress, user.provider, currency);

  const { maxFeePerGas, maxPriorityFeePerGas } = await user.provider.getFeeData();
  const tx = await lensHub.connect(user).mirror({
    profileId,
    profileIdPointed,
    pubIdPointed,
    referenceModule: ZERO_ADDRESS,
    referenceModuleInitData: [],
    referenceModuleData
  }, { maxFeePerGas, maxPriorityFeePerGas, gasLimit: 250_000 });
  console.log(`tx: ${tx.hash}`);
  await tx.wait();

  const budgetAfter = await referenceModule.getBudgetRemainingForPublication(profileIdPointed, pubIdPointed);
  const balanceAfter = await getBalance(userAddress, user.provider, currency);

  console.log(`
    mirror reward: ${utils.formatEther(balanceAfter.sub(balanceBefore))}
    remaining budget: ${utils.formatEther(budgetAfter)}
  `);
});
