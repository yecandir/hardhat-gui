import React from 'react';
import { ChainInfo } from '../chains/chains';
import _chains from '../chains/chains.json';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

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
                    <Grid container>
                        <Grid item xs={12} style={{ fontSize: 12 }}>
                            {name}
                        </Grid>
                        <Grid item xs={12} style={{ fontSize: 10 }}>
                            {address}
                        </Grid>
                    </Grid>
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

        return (
            <div
                style={{
                    maxHeight: 600,
                    overflow: 'auto',
                    borderRight: '0.5em solid rgba(50,50,50,0.1)'
                }}
            >
                {items}
            </div>
        );
    }
}
