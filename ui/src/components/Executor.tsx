import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import _chains from '../chains/chains.json';
import { ChainInfo } from '../chains/chains';
import Button from '@mui/material/Button';
import { InputFormBuilder } from './InputFormBuilder';
import Grid from '@mui/material/Grid';

export default function ContractExecutor(props: {
    chainId: number;
    address: string;
    function: string;
}) {
    const { library, chainId } = useWeb3React();
    const [properties, setProps] = useState(props);
    const [inputs, setInputs] = useState<any[]>([]);
    const [result, setResult] = useState<any>(null);
    const chains: ChainInfo[] = _chains as any;
    const chain: any = chains.find((chain) => chain.chainId === props.chainId);
    const _contract: any = chain?.contracts.find(
        (contract: any) => contract.address === props.address
    );

    if (
        properties.function !== props.function ||
        properties.address !== props.address ||
        properties.chainId !== props.chainId
    ) {
        // If the function name changes, update the inputs
        setProps(props);
        setResult(null);
        setInputs([]);
    }

    const funcAbi = _contract?.abi.find(
        (func: any) => func.name === props.function && func.type == 'function'
    );

    return (
        <Grid>
            <Grid item style={{ marginBottom: 5 }}>
                {props.chainId}
            </Grid>
            <Grid item style={{ marginBottom: 5 }}>
                {props.address}
            </Grid>
            <Grid item style={{ marginBottom: 10 }}>
                {props.function}
            </Grid>
            <InputFormBuilder
                inputs={funcAbi?.inputs || []}
                onInputChange={(value: string, index: number) => {
                    let _inputs = inputs;
                    _inputs[index] = value;
                    setInputs(_inputs);
                }}
            />
            <Button
                onClick={() => {
                    handleTransaction(
                        props.chainId == chainId,
                        props.address,
                        funcAbi,
                        props.function,
                        library?.getSigner(),
                        setResult,
                        inputs
                    );
                }}
            >
                {' '}
                Execute{' '}
            </Button>
            <div>Result: {result?.toString()}</div>
        </Grid>
    );
}

const handleTransaction = async (
    isNetworkCorrect: boolean = false,
    address: string,
    abi: any,
    func: string,
    signer: any,
    setResult: any,
    args: any[] = []
) => {
    try {
        if (!signer) {
            window.alert('Please connect to a wallet');
            return;
        }

        if (!isNetworkCorrect) {
            window.alert('Please connect to the correct network');
            return;
        }
        const contract = new ethers.Contract(address, [abi], signer);
        const receipt = await contract[func](...args);
        if (abi.stateMutability == 'view') {
            await setResult(receipt);
        } else {
            await receipt.wait();
            await setResult(true);
        }
    } catch (error) {
        await setResult(false);
        window.alert(error);
    }
};
