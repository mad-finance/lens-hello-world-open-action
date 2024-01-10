import { Contract } from "ethers";
import { TargetedCampaignReferenceModule__factory } from "../typechain";
import { MODULE_ADDRESS } from "./constants";

export const getModule = async (lib: any, deployer: any) =>
  new lib.Contract(
    MODULE_ADDRESS,
    TargetedCampaignReferenceModule__factory.createInterface(),
    deployer
  );
