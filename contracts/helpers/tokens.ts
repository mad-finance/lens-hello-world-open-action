import { BigNumber, Contract, Signer } from "ethers";

const erc20Abi = [
  "function balanceOf(address account) external view returns (uint256)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function mint(address to, uint256 amount) external",
  "function transfer(address to, uint256 amount) external",
];

const superTokenAbi = [
  "function upgrade(uint256 amount) external",
  "function downgrade(uint256 amount) external"
];

const ALLOWANCE_INFINITE = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

export const mint = async (address: string, amount: BigNumber, signer: any, token: string) => {
  const contract = new Contract(
    token,
    erc20Abi,
    signer.provider
  );
  return contract.connect(signer).mint(address, amount);
};

export const transfer = async (address: string, amount: BigNumber, signer: any, token: string) => {
  const contract = new Contract(
    token,
    erc20Abi,
    signer.provider
  );
  return contract.connect(signer).transfer(address, amount);
};

export const getBalance = async (address: string, provider: any, token: string) => {
  const contract = new Contract(
    token,
    erc20Abi,
    provider
  );
  return await contract.balanceOf(address);
};

export const getAllowance = async (owner: string, provider: any, token: string, operator: string) => {
  const contract = new Contract(
    token,
    erc20Abi,
    provider
  );
  return await contract.allowance(owner, operator);
};

export const approve = (signer: Signer, token: string, operator: string, amount: BigNumber) => {
  const usdcContract = new Contract(
    token,
    erc20Abi,
    signer.provider
  );
  return usdcContract
    .connect(signer)
    .approve(
      operator,
      amount
    );
};

export const upgradeToken = (signer: Signer, token: string, amount: BigNumber) => {
  const xusdcContract = new Contract(
    token,
    superTokenAbi,
    signer.provider
  );
  return xusdcContract.connect(signer).upgrade(amount);
};