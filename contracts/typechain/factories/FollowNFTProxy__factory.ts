/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  Overrides,
  BytesLike,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  FollowNFTProxy,
  FollowNFTProxyInterface,
} from "../FollowNFTProxy";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60a0604090808252346101bc576104bf803803809161001e82856101c1565b8339810190602080828403126101bc5781516001600160401b03928382116101bc570183601f820112156101bc57805190610058826101e4565b91610065875193846101c1565b808352838301958482840101116101bc57858461008293016101ff565b336080528451633502ac4b60e01b81528281600481335afa9081156101b15760009161016d575b5090855193606085019085821090821117610157578652602784527f416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c83850152660819985a5b195960ca1b8487015251610132946000918291845af4903d1561014e573d610116816101e4565b90610123885192836101c1565b8152600081943d92013e610222565b50516101e990816102d68239608051818181601c015260d30152f35b60609250610222565b634e487b7160e01b600052604160045260246000fd5b8381813d83116101aa575b61018281836101c1565b810103126101a65751906001600160a01b03821682036101a35750386100a9565b80fd5b5080fd5b503d610178565b86513d6000823e3d90fd5b600080fd5b601f909101601f19168101906001600160401b0382119082101761015757604052565b6001600160401b03811161015757601f01601f191660200190565b60005b8381106102125750506000910152565b8181015183820152602001610202565b919290156102845750815115610236575090565b3b1561023f5790565b60405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606490fd5b8251909150156102975750805190602001fd5b6044604051809262461bcd60e51b8252602060048301526102c781518092816024860152602086860191016101ff565b601f01601f19168101030190fdfe608080604052366100be57633502ac4b60e01b81526020816004817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa9081156100b25760009161005b575b5061014e565b6020903d82116100aa575b601f8201601f191681016001600160401b038111828210176100965761009093506040520161016d565b38610055565b634e487b7160e01b84526041600452602484fd5b3d9150610066565b6040513d6000823e3d90fd5b604051633502ac4b60e01b81526020816004817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa9081156100b257600091610111575061014e565b60203d8111610147575b601f8101601f191682016001600160401b03811183821017610096576100909350604052810190610194565b503d61011b565b6000808092368280378136915af43d82803e15610169573d90f35b3d90fd5b602090607f19011261018f576080516001600160a01b038116810361018f5790565b600080fd5b9081602091031261018f57516001600160a01b038116810361018f579056fea26469706673582212203e23e64375ef78e93c06f9dcf87c9275b7af44a5f3e80852a953b0351a31f1e164736f6c63430008150033";

type FollowNFTProxyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FollowNFTProxyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FollowNFTProxy__factory extends ContractFactory {
  constructor(...args: FollowNFTProxyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<FollowNFTProxy> {
    return super.deploy(data, overrides || {}) as Promise<FollowNFTProxy>;
  }
  getDeployTransaction(
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(data, overrides || {});
  }
  attach(address: string): FollowNFTProxy {
    return super.attach(address) as FollowNFTProxy;
  }
  connect(signer: Signer): FollowNFTProxy__factory {
    return super.connect(signer) as FollowNFTProxy__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FollowNFTProxyInterface {
    return new utils.Interface(_abi) as FollowNFTProxyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FollowNFTProxy {
    return new Contract(address, _abi, signerOrProvider) as FollowNFTProxy;
  }
}
