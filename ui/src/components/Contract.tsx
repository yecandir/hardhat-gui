import React, { useState } from 'react';
import { ChainInfo, ContractInfo, FunctionInfo } from '../chains/chains';
import _chains from '../chains/chains.json';
import Button from '@mui/material/Button';

export class Contract extends React.Component<
    {},
    { chainId: number; address: string; isRead?: boolean }
> {
    constructor(props: any) {
        super(props);
        this.state = {
            chainId: 0,
            address: '',
            isRead: true
        };
    }

    setChainIdNAddress(chainId: number, address: string): void {
        this.setState({ chainId: chainId });
    }

    render(): React.ReactNode {
        const chain: ChainInfo[] = _chains as any;
        let contract = new ContractInfo('', '', '', []);
        chain.map((_chain) => {
            if (_chain.chainId === this.state.chainId) {
                _chain.contracts.map((_contract) => {
                    if (_contract.address === this.state.address) {
                        contract = _contract;
                    }
                });
            }
        });

        const functions = getFunctionsFromABI(contract.abi);
        let items: JSX.Element[] = [];

        functions.map((func: FunctionInfo) => {
            if (this.state.isRead && func.stateMutability === 'view') {
                items.push(
                    <div>
                        <Button color="secondary" onClick={() => {}}>
                            {func.name}
                        </Button>
                    </div>
                );
            } else if (!this.state.isRead && func.stateMutability !== 'view') {
                items.push(
                    <div>
                        <Button color="secondary" onClick={() => {}}>
                            {func.name}
                        </Button>
                    </div>
                );
            }
        });

        return (
            <div>
                <Button
                    onClick={() => {
                        this.setState({ isRead: true });
                    }}
                >
                    Read
                </Button>
                <Button
                    onClick={() => {
                        this.setState({ isRead: false });
                    }}
                >
                    Write
                </Button>
                {items}
            </div>
        );
    }
}

export function ContractFunctions(props: {
    chainId: number;
    address: string;
    setFunctionName: any;
}) {
    const [isRead, setIsRead] = useState(true);

    const chain: ChainInfo[] = _chains as any;
    let contract = new ContractInfo('', '', '', []);
    chain.map((_chain) => {
        if (_chain.chainId === props.chainId) {
            _chain.contracts.map((_contract) => {
                if (_contract.address === props.address) {
                    contract = _contract;
                }
            });
        }
    });

    const functions = getFunctionsFromABI(contract.abi);
    let items: JSX.Element[] = [];

    functions.map((func: FunctionInfo) => {
        const inputs = func.inputs.map((input) => {
            return {
                name: input.name,
                type: input.type
            };
        });
        if (isRead && func.stateMutability === 'view') {
            items.push(
                <div>
                    <Button
                        color="primary"
                        onClick={() => {
                            props.setFunctionName(func.name);
                        }}
                    >
                        {func.name}
                    </Button>
                </div>
            );
        } else if (!isRead && func.stateMutability !== 'view') {
            items.push(
                <div>
                    <Button
                        color="primary"
                        onClick={() => {
                            props.setFunctionName(func.name);
                        }}
                    >
                        {func.name}
                    </Button>
                </div>
            );
        }
    });

    return (
        <div>
            <Button
                color={isRead ? 'secondary' : 'primary'}
                onClick={() => {
                    setIsRead(true);
                }}
            >
                Read
            </Button>
            <Button
                color={!isRead ? 'secondary' : 'primary'}
                onClick={() => {
                    setIsRead(false);
                }}
            >
                Write
            </Button>
            {items}
        </div>
    );
}

function getFunctionsFromABI(abi: any[]): FunctionInfo[] {
    let functions: FunctionInfo[] = [];
    abi.map((_abi) => {
        if (_abi.type === 'function') {
            functions.push(
                new FunctionInfo(
                    _abi.name,
                    _abi.inputs,
                    _abi.outputs,
                    _abi.stateMutability
                )
            );
        }
    });
    return functions;
}
