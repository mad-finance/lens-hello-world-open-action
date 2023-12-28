// import { HardhatUserConfig } from "hardhat/config";
// import "@nomicfoundation/hardhat-foundry";
// import "@nomicfoundation/hardhat-ethers";
// import "@nomicfoundation/hardhat-verify";
// import "hardhat-deploy";
// import 'hardhat-preprocessor';
// import * as tdly from "@tenderly/hardhat-tenderly";
// import dotenv from "dotenv";
// import glob from "glob";
// import path from "path";
// import "@openzeppelin/hardhat-upgrades";

// dotenv.config({ path: ".env" });
// tdly.setup({ automaticVerifications: false });

// glob.sync("./tasks/**/*.ts").forEach((file) => require(path.resolve(file)));

// const {
//   TENDERLY_PROJECT,
//   TENDERLY_USERNAME,
//   MUMBAI_RPC_URL,
//   POLYGON_RPC_URL,
//   OP_GOERLI_RPC_URL,
//   GOERLI_RPC_URL,
//   MAINNET_RPC_URL,
//   OPTIMISM_RPC_URL,
//   PRIVATE_KEY,
//   DEPLOYER_PRIVATE_KEY,
// } = process.env;

// const settings = {
//   viaIR: true,
//   optimizer: {
//     enabled: true,
//     runs: 2000,
//   },
//   evmVersion: 'london'
// };

// const config: HardhatUserConfig = {
//   solidity: {
//     compilers: [
//       {
//         version: '0.8.21',
//         settings
//       }
//     ],
//     overrides: {
//       "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol": {
//         version: "0.8.10",
//         settings: {
//           optimizer: {
//             enabled: true,
//             runs: 2000,
//           },
//         },
//       }
//     }
//   },
//   paths: {
//     sources: "./src",
//     cache: './cache_hardhat',
//   },
//   networks: {
//     mumbai: {
//       url: MUMBAI_RPC_URL!,
//       accounts: [DEPLOYER_PRIVATE_KEY!, PRIVATE_KEY!],
//     },
//     polygon: {
//       url: POLYGON_RPC_URL!,
//       accounts: [DEPLOYER_PRIVATE_KEY!, PRIVATE_KEY!],
//     }
//   },
//   // tenderly: {
//   //   username: TENDERLY_USERNAME!,
//   //   project: TENDERLY_PROJECT!,
//   //   privateVerification: true,
//   // },
//   etherscan: {
//     apiKey: {
//       polygon: process.env.POLYGONSCAN_API_KEY!,
//     }
//   },
// };

// export default config;
