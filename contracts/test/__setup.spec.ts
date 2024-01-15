import { AbiCoder } from "@ethersproject/abi";
import { parseEther } from "@ethersproject/units";
import "@nomiclabs/hardhat-ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
import { BytesLike, utils } from "ethers";
import { ethers } from "hardhat";
import {
  LensHub,
  LensHub__factory,
  LensHubInitializable__factory,
  TransparentUpgradeableProxy__factory,
  FollowNFT__factory,
  FollowNFT,
  ModuleRegistry,
  ModuleRegistry__factory,
  TargetedCampaignReferenceModule,
  TargetedCampaignReferenceModule__factory,
  LegacyCollectNFT,
  TokenHandleRegistry__factory,
  Currency__factory,
  Currency,
  LegacyCollectNFT__factory,
  LensHandles__factory,
} from "../typechain";
import { LensHubLibraryAddresses } from "../typechain/factories/LensHub__factory";
import {
  computeContractAddress,
  ProtocolState,
  revertToSnapshot,
  takeSnapshot,
} from "./helpers/utils";
import { ZERO_ADDRESS } from "./helpers/constants";
import { BigNumber } from "@ethersproject/bignumber";

use(solidity);

export const CURRENCY_MINT_AMOUNT = parseEther("100");
export const BPS_MAX = 10000;
export const TREASURY_FEE_BPS = 50;
export const REFERRAL_FEE_BPS = 250;
export const MAX_PROFILE_IMAGE_URI_LENGTH = 6000;
export const LENS_HUB_NFT_NAME = "Lens Protocol Profiles";
export const LENS_HUB_NFT_SYMBOL = "LPP";
export const MOCK_PROFILE_HANDLE = "satoshi.lens";
export const FIRST_PROFILE_ID = 1;
export const FIRST_PUB_ID = 1;
export const FIRST_FOLLOW_NFT_ID = 1;
export const MOCK_URI =
  "https://ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX";
export const OTHER_MOCK_URI =
  "https://ipfs.io/ipfs/QmTFLSXdEQ6qsSzaXaCSNtiv6wA56qq87ytXJ182dXDQJS";
export const MOCK_PROFILE_URI =
  "https://ipfs.io/ipfs/Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu";
export const MOCK_FOLLOW_NFT_URI =
  "https://ipfs.io/ipfs/QmU8Lv1fk31xYdghzFrLm6CiFcwVg7hdgV6BBWesu6EqLj";
export const DEFAULT_AMOUNT = parseEther("2");
export const CAMPAIGN_FEE_BPS = 1000;
export const CAMPAIGN_CLIENT_FEE_BPS = 0;

export let chainId: number;
export let accounts: SignerWithAddress[];
export let deployer: SignerWithAddress;
export let governance: SignerWithAddress;
export let treasury: SignerWithAddress;
export let proxyAdmin: SignerWithAddress;

export let user: SignerWithAddress;
export let anotherUser: SignerWithAddress;
export let thirdUser: SignerWithAddress;
export let publisher: SignerWithAddress;
export let feeRecipient: SignerWithAddress;
export let collector: SignerWithAddress;

export let lensHubImpl: LensHub;
export let lensHub: LensHub;
export let currency: Currency;
export let currencyTwo: Currency;
export let abiCoder: AbiCoder;
export let mockModuleData: BytesLike;
export let followNFT: FollowNFT;
export let legacyCollectNFT: LegacyCollectNFT;
export let hubLibs: LensHubLibraryAddresses;
export let moduleRegistry: ModuleRegistry;

export let targetedCampaignReferenceModule: TargetedCampaignReferenceModule;

export function makeSuiteCleanRoom(name: string, tests: () => void) {
  describe(name, () => {
    beforeEach(async function () {
      await takeSnapshot();
    });
    tests();
    afterEach(async function () {
      await revertToSnapshot();
    });
  });
}

beforeEach(async function () {
  chainId = Number((await ethers.provider.getNetwork()).chainId);
  abiCoder = utils.defaultAbiCoder;
  // @ts-ignore
  accounts = await ethers.getSigners();
  deployer = accounts[0];
  governance = accounts[1];
  proxyAdmin = accounts[2];
  treasury = accounts[3];
  user = accounts[4];
  anotherUser = accounts[5];
  thirdUser = accounts[6];
  publisher = accounts[7];
  feeRecipient = accounts[8];

  // Currency
  currency = await new Currency__factory(deployer).deploy();
  currencyTwo = await new Currency__factory(deployer).deploy();

  // Deployment
  const moduleRegistryImpl = await new ModuleRegistry__factory(
    deployer
  ).deploy();
  const moduleRegistryProxy = await new TransparentUpgradeableProxy__factory(
    deployer
  ).deploy(moduleRegistryImpl.address, deployer.address, []);

  moduleRegistry = ModuleRegistry__factory.connect(
    moduleRegistryProxy.address,
    deployer
  );

  // Precompute addresses
  const nonce = await deployer.getTransactionCount();

  const followNFTImplAddr = computeContractAddress(deployer.address, nonce + 1);
  const legacyCollectNFTImplAddr = computeContractAddress(
    deployer.address,
    nonce + 2
  );
  const hubProxyAddr = computeContractAddress(deployer.address, nonce + 3);
  const lensHandlesImplAddr = computeContractAddress(
    deployer.address,
    nonce + 4
  );
  const lensHandlesProxyAddr = computeContractAddress(
    deployer.address,
    nonce + 5
  );
  const tokenHandleRegistryImplAddr = computeContractAddress(
    deployer.address,
    nonce + 6
  );
  const tokenHandleRegistryProxyAddr = computeContractAddress(
    deployer.address,
    nonce + 7
  );

  hubLibs = {
    "contracts/libraries/GovernanceLib.sol:GovernanceLib": ZERO_ADDRESS,
    "contracts/libraries/MetaTxLib.sol:MetaTxLib": ZERO_ADDRESS,
    "contracts/libraries/ProfileLib.sol:ProfileLib": ZERO_ADDRESS,
    "contracts/libraries/LegacyCollectLib.sol:LegacyCollectLib": ZERO_ADDRESS,
    "contracts/libraries/FollowLib.sol:FollowLib": ZERO_ADDRESS,
    "contracts/libraries/PublicationLib.sol:PublicationLib": ZERO_ADDRESS,
    "contracts/libraries/MigrationLib.sol:MigrationLib": ZERO_ADDRESS,
    "contracts/libraries/ActionLib.sol:ActionLib": ZERO_ADDRESS,
  };

  // Deploy implementation contracts
  lensHubImpl = await new LensHubInitializable__factory(
    hubLibs,
    deployer
  ).deploy(
    followNFTImplAddr,
    legacyCollectNFTImplAddr,
    moduleRegistry.address,
    // Notice: Profile guardian cooldown off
    BigNumber.from(0),
    {
      lensHandlesAddress: lensHandlesProxyAddr,
      tokenHandleRegistryAddress: tokenHandleRegistryProxyAddr,
      legacyFeeFollowModule: ZERO_ADDRESS,
      legacyProfileFollowModule: ZERO_ADDRESS,
      newFeeFollowModule: ZERO_ADDRESS,
    }
  );

  followNFT = await new FollowNFT__factory(deployer).deploy(hubProxyAddr);
  legacyCollectNFT = await new LegacyCollectNFT__factory(deployer).deploy(
    hubProxyAddr
  );

  // Deploy and initialize proxy

  const proxyFactory = new TransparentUpgradeableProxy__factory(deployer);

  const lensHubProxy = await proxyFactory.deploy(
    lensHubImpl.address,
    proxyAdmin.address,
    []
  );

  // Deploy LensHandles implementation.
  const lensHandlesImpl = await new LensHandles__factory(deployer).deploy(
    governance.address,
    lensHubProxy.address,
    BigNumber.from(0)
  );
  expect(lensHandlesImpl.address.toLowerCase()).to.be.equal(
    lensHandlesImplAddr
  );

  // Deploy LensHandles proxy.
  const lensHandles = await new TransparentUpgradeableProxy__factory(
    deployer
  ).deploy(lensHandlesImplAddr, proxyAdmin.address, []);
  expect(lensHandles.address.toLowerCase()).to.be.equal(lensHandlesProxyAddr);

  // Deploy TokenHandleRegistry implementation.
  const tokenHandleRegistryImpl = await new TokenHandleRegistry__factory(
    deployer
  ).deploy(lensHubProxy.address, lensHandlesProxyAddr);
  expect(tokenHandleRegistryImpl.address.toLowerCase()).to.be.equal(
    tokenHandleRegistryImplAddr
  );

  // Deploy TokenHandleRegistry proxy.
  const tokenHandleRegistry = await new TransparentUpgradeableProxy__factory(
    deployer
  ).deploy(tokenHandleRegistryImplAddr, proxyAdmin.address, []);
  expect(tokenHandleRegistry.address.toLowerCase()).to.be.equal(
    tokenHandleRegistryProxyAddr
  );

  // Cast proxy to LensHub interface.
  lensHub = LensHub__factory.connect(lensHubProxy.address, deployer);

  // Currency whitelisting
  // await expect(
  //   moduleRegistry.connect(deployer).registerErc20Currency(currency.address)
  // ).to.not.be.reverted;
  // await expect(
  //   moduleRegistry
  //     .connect(deployer)
  //     .registerErc20Currency(currencyTwo.address)
  // ).to.not.be.reverted;

  // Reference modules
  targetedCampaignReferenceModule =
    await new TargetedCampaignReferenceModule__factory(deployer).deploy(
      lensHub.address,
      moduleRegistry.address,
      deployer.address,
      CAMPAIGN_FEE_BPS,
      CAMPAIGN_CLIENT_FEE_BPS
    );

  // await expect(
  //   moduleRegistry
  //     .connect(deployer)
  //     .registerModule(targetedCampaignReferenceModule.address, 2)
  // ).to.not.be.reverted;

  // // Unpausing protocol
  // await expect(
  //   lensHub.connect(deployer).setState(ProtocolState.Unpaused)
  // ).to.not.be.reverted;
});
