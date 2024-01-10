import { LensHub__factory } from "../typechain";
import { Contract, Signer } from "ethers";

export const LENS_HUB_SANDBOX_ADDRESS =
  "0x4fbffF20302F3326B20052ab9C217C44F6480900";
export const LENS_SANBOX_FREE_COLLECT_MODULE =
  "	0x4FdAae7fC16Ef41eAE8d8f6578d575C9d64722f2";

export const getLensHubDeployed = async (deployer: any, address: string) =>
  new Contract(address, LensHub__factory.createInterface(), deployer);
