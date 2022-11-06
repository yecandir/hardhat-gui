import React from 'react';
import { ContractInfo, FunctionInfo } from './chains';
import { FunctionView } from './function';

export default class ContractView extends React.Component<
    {
        address: string;
        chainId: number;
        contract: ContractInfo;
    },
    {
        isReadFunctions: boolean;
    }
> {
    constructor(props: any) {
        super(props);
        this.state = {
            isReadFunctions: true
        };
    }

    setReadFunctionsState(isRead: boolean = true) {
        this.setState({ isReadFunctions: isRead });
    }

    getFunctionsFromABI(): FunctionInfo[] {
        let functions: FunctionInfo[] = [];
        if (this.state.isReadFunctions) {
            this.props.contract.abi.map((abi) => {
                if (abi.type === 'function' && abi.stateMutability === 'view') {
                    functions.push(
                        new FunctionInfo(
                            abi.name,
                            abi.inputs,
                            abi.outputs,
                            abi.stateMutability
                        )
                    );
                }
            });
        } else {
            this.props.contract.abi.map((abi) => {
                if (abi.type === 'function' && abi.stateMutability !== 'view') {
                    functions.push(
                        new FunctionInfo(
                            abi.name,
                            abi.inputs,
                            abi.outputs,
                            abi.stateMutability
                        )
                    );
                }
            });
        }
        return functions;
    }

    getWriteFunctionsFromABI(): FunctionInfo[] {
        let writeFunctions: FunctionInfo[] = [];
        this.props.contract.abi.map((abi) => {
            if (abi.type === 'function' && abi.stateMutability !== 'view') {
                writeFunctions.push(
                    new FunctionInfo(
                        abi.name,
                        abi.inputs,
                        abi.outputs,
                        abi.stateMutability
                    )
                );
            }
        });
        return writeFunctions;
    }

    render(): React.ReactNode {
        let functions: FunctionInfo[] = this.getFunctionsFromABI();
        let functionElements = functions.map((f) => {
            return (
                <FunctionView
                    chainId={this.props.chainId}
                    address={this.props.address}
                    contract={this.props.contract}
                    function={f}
                />
            );
        });

        return <div> </div>;
    }
}
