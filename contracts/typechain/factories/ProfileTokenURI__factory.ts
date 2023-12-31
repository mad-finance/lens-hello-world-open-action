/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ProfileTokenURI,
  ProfileTokenURIInterface,
} from "../ProfileTokenURI";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "blockSeed",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "mintTimestamp",
        type: "uint256",
      },
    ],
    name: "getTokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60a0806040523461004b5760001943014381116100355740608052610a26908161005182396080518181816068015261063c0152f35b634e487b7160e01b600052601160045260246000fd5b600080fdfe608080604052600436101561001357600080fd5b60003560e01c908163430e9e1a14610626575063ad22a3f21461003557600080fd5b3461061557604036600319011261061557600435610052816108b3565b60405163806c6aeb60e01b8152600481018390527f00000000000000000000000000000000000000000000000000000000000000006024820152919060008360448173__$87fea527f71e704e93a97640bdbae8fcd3$__5af492831561061a576000906000946105b4575b506100c79061074d565b906101a660816040518094717b226e616d65223a2250726f66696c65202360701b6020830152845161010081603285016020890161065f565b82017f222c226465736372697074696f6e223a224c656e732050726f746f636f6c202d6032820152692050726f66696c65202360b01b605282015285519061014f82605c830160208a0161065f565b017f222c22696d616765223a22646174613a696d6167652f7376672b786d6c3b6261605c820152641cd94d8d0b60da1b607c820152610197825180936020878501910161065f565b01036061810185520183610682565b6001836000908560801c806105a8575b508060401c8061059b575b508060201c8061058e575b508060101c80610581575b5060081c61057a575b01926001600160ff1b038416840361054e5760028460011b0193848160011b1161054e57610226610210866106bb565b9561021e6040519788610682565b8087526106bb565b601f190136602087013784511561056457603060208601538451600110156105645760786021860153600181811b01809160011b1161054e575b6001811161050557506104c15761043f60eb610444936104b39660409661028786516108b3565b6102926024356108b3565b91895197856102ab8a975180926020808b01910161065f565b86017f222c2261747472696275746573223a5b7b22646973706c61795f74797065223a60208201527f226e756d626572222c2274726169745f74797065223a224944222c2276616c758c8201526332911d1160e11b606082015261031982518093602060648501910161065f565b01907f227d2c7b2274726169745f74797065223a22484558204944222c2276616c7565606483015262111d1160e91b9182608482015261036382518093602060878501910161065f565b01907f227d2c7b2274726169745f74797065223a22444947495453222c2276616c7565608783015260a78201526103a482518093602060aa8501910161065f565b017f227d2c7b22646973706c61795f74797065223a2264617465222c22747261697460aa8201527b2fba3cb832911d1126a4a72a22a21020aa1116113b30b63ab2911d1160211b60ca82015261040482518093602060e68501910161065f565b0162089f4b60ea1b60e682015261042582518093602060e98501910161065f565b01615d7d60f01b60e98201520360cb810184520182610682565b61074d565b815190610498603d8360208101937f646174613a6170706c69636174696f6e2f6a736f6e3b6261736536342c0000008552610488815180926020868601910161065f565b810103601d810185520183610682565b8251938492602084525180928160208601528585019061065f565b601f01601f19168101030190f35b606460405162461bcd60e51b815260206004820152602060248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152fd5b906010600f82161015610564578451821015610564576f181899199a1a9b1b9c1cb0b131b232b360811b600f82161a8583016020015360041c90801561054e5760001901610260565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b81016101e0565b60029150910190386101d7565b60049150910190386101cc565b60089150910190386101c1565b915050601090386101b6565b9350503d806000853e6105c78185610682565b8301926040818503126106155780516001600160401b03919082811161061557856105f39183016106d6565b946020820151928311610615576100c79261060e92016106d6565b93906100bd565b600080fd5b6040513d6000823e3d90fd5b34610615576000366003190112610615576020907f00000000000000000000000000000000000000000000000000000000000000008152f35b60005b8381106106725750506000910152565b8181015183820152602001610662565b601f909101601f19168101906001600160401b038211908210176106a557604052565b634e487b7160e01b600052604160045260246000fd5b6001600160401b0381116106a557601f01601f191660200190565b81601f820112156106155780516106ec816106bb565b926106fa6040519485610682565b8184526020828401011161061557610718916020808501910161065f565b90565b90610725826106bb565b6107326040519182610682565b8281528092610743601f19916106bb565b0190602036910137565b80511561088f57604051606081016001600160401b038111828210176106a557604052604081527f4142434445464748494a4b4c4d4e4f505152535455565758595a61626364656660208201527f6768696a6b6c6d6e6f707172737475767778797a303132333435363738392b2f6040820152815160029283820180921161054e576003918290046001600160fe1b038116810361054e576107f2908594951b61071b565b936020850193829183518401925b83811061083e575050505051068060011461082b57600214610820575090565b603d90600019015390565b50603d9081600019820153600119015390565b85600491979293949701918251600190603f9082828260121c16880101518453828282600c1c16880101518385015382828260061c1688010151888501531685010151878201530195929190610800565b50604051602081016001600160401b038111828210176106a5576040526000815290565b6000908072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b808210156109e2575b506904ee2d6d415b85acef8160201b808310156109d3575b50662386f26fc10000808310156109c4575b506305f5e100808310156109b5575b50612710808310156109a6575b506064821015610996575b600a8092101561098c575b60019081602161094482870161071b565b95860101905b610956575b5050505090565b600019019083906f181899199a1a9b1b9c1cb0b131b232b360811b8282061a8353049182156109875791908261094a565b61094f565b9160010191610933565b9190606460029104910191610928565b6004919392049101913861091d565b60089193920491019138610910565b60109193920491019138610901565b602091939204910191386108ef565b6040935081049150386108d756fea2646970667358221220d03a1dc7cf490765ac6a2c2254d4a1fa23ae61299565be32d7fbcb66d7195b1b64736f6c63430008150033";

type ProfileTokenURIConstructorParams =
  | [linkLibraryAddresses: ProfileTokenURILibraryAddresses, signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ProfileTokenURIConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => {
  return (
    typeof xs[0] === "string" ||
    (Array.isArray as (arg: any) => arg is readonly any[])(xs[0]) ||
    "_isInterface" in xs[0]
  );
};

export class ProfileTokenURI__factory extends ContractFactory {
  constructor(...args: ProfileTokenURIConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      const [linkLibraryAddresses, signer] = args;
      super(
        _abi,
        ProfileTokenURI__factory.linkBytecode(linkLibraryAddresses),
        signer
      );
    }
  }

  static linkBytecode(
    linkLibraryAddresses: ProfileTokenURILibraryAddresses
  ): string {
    let linkedBytecode = _bytecode;

    linkedBytecode = linkedBytecode.replace(
      new RegExp("__\\$87fea527f71e704e93a97640bdbae8fcd3\\$__", "g"),
      linkLibraryAddresses[
        "contracts/libraries/svgs/Profile/ProfileSVG.sol:ProfileSVG"
      ]
        .replace(/^0x/, "")
        .toLowerCase()
    );

    return linkedBytecode;
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ProfileTokenURI> {
    return super.deploy(overrides || {}) as Promise<ProfileTokenURI>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ProfileTokenURI {
    return super.attach(address) as ProfileTokenURI;
  }
  connect(signer: Signer): ProfileTokenURI__factory {
    return super.connect(signer) as ProfileTokenURI__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ProfileTokenURIInterface {
    return new utils.Interface(_abi) as ProfileTokenURIInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ProfileTokenURI {
    return new Contract(address, _abi, signerOrProvider) as ProfileTokenURI;
  }
}

export interface ProfileTokenURILibraryAddresses {
  ["contracts/libraries/svgs/Profile/ProfileSVG.sol:ProfileSVG"]: string;
}
