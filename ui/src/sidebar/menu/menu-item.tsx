import React from 'react';

export default class SidebarMenuItem extends React.Component<
    {
        name: string;
        chainId: number;
        address: string;
        chainName: string;
        handler: (address: string, chainId: number) => void;
    },
    {}
> {
    render(): React.ReactNode {
        return (
            <div style={{ fontSize: 12 }}>
                <div>
                    chain{this.props.chainId} -
                    {this.props.chainName.toUpperCase()}
                </div>
                <div>{this.props.address}</div>
                <div>{this.props.name}</div>
            </div>
        );
    }
}
