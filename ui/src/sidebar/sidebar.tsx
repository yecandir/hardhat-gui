import React from 'react';
import { ChainInfo, ContractInfo } from '../chains/chains';
import _chains from '../chains/chains.json';
import ContractView from '../chains/contract';
import SidebarMenuItem from './menu/menu-item';

export default class ChainSidebar extends React.Component<
    {},
    {
        address: string;
        chainId: number;
        contract: ContractInfo;
    }
> {
    constructor(props: any) {
        super(props);
        this.state = {
            address: '',
            chainId: 0,
            contract: new ContractInfo('', '', '', [])
        };
    }

    setContract(address: string, chainId: number) {
        const chain: ChainInfo[] = _chains as any;
        let contract: ContractInfo = new ContractInfo('', '', '', []);
        chain.map((chain) => {
            if (chain.chainId === chainId) {
                chain.contracts.map((contract) => {
                    if (contract.address === address) {
                        contract = contract;
                        this.setState({ contract: contract });
                    }
                });
            }
        });
        return contract;
    }

    handleContractChange = (address: string, chainId: number) => {
        this.setState({ address: address, chainId: chainId });
        this.setContract(address, chainId);
    };

    render(): React.ReactNode {
        const chain: ChainInfo[] = _chains as any;
        let items: JSX.Element[] = [];
        chain.map((chain) => {
            chain.contracts.map((contract) => {
                items.push(
                    <SidebarMenuItem
                        address={contract.address}
                        chainId={chain.chainId}
                        name={contract.name}
                        chainName={chain.name}
                        handler={this.handleContractChange}
                    />
                );
            });
        });

        return <div></div>;
    }
}
