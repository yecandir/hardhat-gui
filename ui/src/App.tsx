import React from 'react';
import './App.css';
import { Grid, Container } from '@mui/material';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { ContractFunctions } from './components/Contract';
import { useState } from 'react';
import ContractExecutor from './components/Executor';

function App() {
    const [address, setAddress] = useState(
        '0x0000000000000000000000000000000000000000'
    );
    const [chainId, setChainId] = useState(0);
    const [functionName, setFunctionName] = useState('');

    return (
        <div className="App">
            <body style={{ marginTop: 50 }}>
                <Container fixed>
                    <Grid container>
                        <Grid container justifyContent={'center'}>
                            <Grid item xs={12}>
                                <Navbar />
                            </Grid>
                        </Grid>
                        <Grid container style={{ marginTop: 30 }}>
                            <Grid item xs={4}>
                                <Sidebar
                                    setAddress={setAddress}
                                    setChainId={setChainId}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <ContractFunctions
                                    chainId={chainId}
                                    address={address}
                                    setFunctionName={setFunctionName}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <ContractExecutor
                                    chainId={chainId}
                                    address={address}
                                    function={functionName}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </body>
        </div>
    );
}

export default App;
