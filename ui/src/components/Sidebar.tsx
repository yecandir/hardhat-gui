import React from 'react';
import { ChainInfo, ContractInfo } from '../chains/chains';
import _chains from '../chains/chains.json';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default class Sidebar extends React.Component<
    { setChainId: any; setAddress: any },
    { chains: ChainInfo[] }
> {
    constructor(props: any) {
        const chain: ChainInfo[] = _chains as any;
        super(props);
        this.state = {
            chains: chain
        };
    }

    contractsComponent(
        chainId: number,
        name: string,
        address: string
    ): JSX.Element {
        return (
            <AccordionDetails>
                <Button
                    color="primary"
                    onClick={() => {
                        this.props.setChainId(chainId);
                        this.props.setAddress(address);
                    }}
                >
                    {name}
                    {' - '}
                    {address?.substring(0, 12)}
                    {'...'}
                    {address?.substring(32, 42)}
                </Button>
            </AccordionDetails>
        );
    }

    render(): React.ReactNode {
        let items: JSX.Element[] = [];

        this.state.chains.map((chain) => {
            let contracts: JSX.Element[] = [];
            chain.contracts.map((contract) => {
                contracts.push(
                    this.contractsComponent(
                        chain.chainId,
                        contract.name,
                        contract.address
                    )
                );
            });
            items.push(
                <Accordion>
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        {chain.name}
                    </AccordionSummary>
                    {contracts}
                </Accordion>
            );
        });

        return <div>{items}</div>;
    }
}
