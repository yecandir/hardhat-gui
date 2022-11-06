import React from 'react';
import { ContractInfo, FunctionInfo } from './chains';

export class FunctionView extends React.Component<
    {
        chainId: number;
        address: string;
        contract: ContractInfo;
        function: FunctionInfo;
    },
    {}
> {
    render(): React.ReactNode {
        const inputs = this.props.function.inputs.map((input) => {
            return <div>{input.name}</div>;
        });

        return (
            <div>
                {this.props.function.name}
                {' ('}
                {this.props.function.inputs.map((x) => x.type).join(',')}
                {')'}
            </div>
        );
    }
}
