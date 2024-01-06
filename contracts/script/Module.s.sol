// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {TargetedCampaignReferenceModule} from "../src/TargetedCampaignReferenceModule.sol";

contract ModuleScript is Script {
    function setUp() public {}

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        address lensHubProxyAddress = 0x4fbffF20302F3326B20052ab9C217C44F6480900;
        address moduleRegistryAddress = 0x4BeB63842BB800A1Da77a62F2c74dE3CA39AF7C0;

        address owner = 0xB00B28559ae01D962dc72B6AaeDA7395cf8A4ecA;

        new TargetedCampaignReferenceModule(
            lensHubProxyAddress,
            moduleRegistryAddress,
            owner,
            10,
            10
        );

        vm.stopBroadcast();
    }
}
