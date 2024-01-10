import { task } from 'hardhat/config';
import { getModule } from './../helpers/madfi';

const PROTOCOL_FEE_BPS = 1000; // 10%
const CLIENT_FEE_BPS = 200; // 2%

task('set-protocol-client-fees', 'sets the protocol and client fees on TargetedCampaignReferenceModule').setAction(async ({}, hre) => {
  const ethers = hre.ethers;
  const networkName = hre.network.name;
  const [deployer] = await ethers.getSigners();
  const referenceModule = await getModule(ethers, deployer);

  let tx;
  console.log(`referenceModule.setProtocolFeeBps(${PROTOCOL_FEE_BPS})`);
  tx = await referenceModule.setProtocolFeeBps(PROTOCOL_FEE_BPS);
  console.log(`tx: ${tx.hash}`);
  await tx.wait();

  console.log(`referenceModule.setClientFeeBps(${CLIENT_FEE_BPS})`);
  tx = await referenceModule.setClientFeeBps(CLIENT_FEE_BPS);
  console.log(`tx: ${tx.hash}`);
  await tx.wait();
});
