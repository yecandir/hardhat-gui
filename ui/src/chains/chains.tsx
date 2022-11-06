export class ChainInfo {
    public chainId: number;
    public path: string;
    public name: string;
    public contracts: ContractInfo[];

    constructor(
        chainId: number,
        path: string,
        name: string,
        contracts: ContractInfo[] = []
    ) {
        this.chainId = chainId;
        this.path = path;
        this.name = name;
        this.contracts = contracts;
    }
}

export class ContractInfo {
    public address: string;
    public path: string;
    public name: string;
    public abi: any[];

    constructor(address: string, path: string, name: string, abi: any[]) {
        this.address = address;
        this.name = name;
        this.path = path;
        this.abi = abi;
    }
}

export class FunctionInfo {
    public name: string;
    public inputs: any[];
    public outputs: any[];
    public stateMutability: string;
    constructor(
        name: string,
        inputs: any[],
        outputs: any[] = [],
        stateMutability: string
    ) {
        this.name = name;
        this.inputs = inputs.map((x) => ({
            name: x.name,
            type: x.type
        }));
        this.outputs = outputs.map((x) => ({
            name: x.name,
            type: x.type
        }));
        this.stateMutability = stateMutability;
    }
}
