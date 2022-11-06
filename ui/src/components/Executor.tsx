import React, { useState } from 'react';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import _chains from '../chains/chains.json';
import { ChainInfo } from '../chains/chains';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function ContractExecutor(props: {
    chainId: number;
    address: string;
    function: string;
}) {
    const [result, setResult] = useState<any>(null);

    const { library } = useWeb3React();
    const chains: ChainInfo[] = _chains as any;
    const chain: any = chains.find((chain) => chain.chainId === props.chainId);
    const _contract: any = chain?.contracts.find(
        (contract: any) => contract.address === props.address
    );

    const funcAbi = _contract?.abi.find(
        (func: any) => func.name === props.function && func.type == 'function'
    );

    let inputArray: any[] = generateInputArray(funcAbi?.inputs || []);
    let inputElements: JSX.Element[] = generateInputElements(inputArray);

    return (
        <div>
            <div>{props.chainId}</div>
            <div>{props.address}</div>
            <div>{props.function}</div>
            {inputElements}
            <Button
                onClick={() => {
                    handleTransaction(
                        props.address,
                        funcAbi,
                        props.function,
                        library?.getSigner(),
                        setResult
                    );
                }}
            >
                {' '}
                Execute{' '}
            </Button>
            <div>Result: {result?.toString()}</div>
        </div>
    );
}

const handleTransaction = async (
    address: string,
    abi: any,
    func: string,
    signer: any,
    setResult: any
) => {
    try {
        if (!signer) {
            window.alert('Please connect to a wallet');
        }

        const contract = new ethers.Contract(address, [abi], signer);
        const receipt = await contract[func]();
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

const generateInputArray: any = (inputs: any) => {
    let inputArray: any[] = [];
    if (inputs && Array.isArray(inputs)) {
        return inputs.map((input: any) => {
            return generateInputArray(input);
        });
    } else if (inputs.type == 'tuple') {
        inputArray.push({
            name: inputs.name,
            type: generateInputArray(inputs.components)
        });
    } else {
        inputArray.push({ name: inputs.name, type: inputs.type });
    }
    return inputArray[0];
};

const generateInputElements: any = (inputArray: any) => {
    console.log(inputArray);
    let placeholder: string = preparePlaceholder(inputArray);
    return (
        <div>
            <TextField
                id="standard-basic"
                label={inputArray.name}
                variant="standard"
                placeholder={JSON.stringify(placeholder)}
                multiline
            />
        </div>
    );
};

const preparePlaceholder: any = (inputArray: any) => {
    if (inputArray && Array.isArray(inputArray)) {
        return inputArray.map((input: any) => {
            return preparePlaceholder(input);
        });
    } else if (Array.isArray(inputArray.type)) {
        console.log('bbb', inputArray);
        return inputArray.type.map((input: any) => {
            return preparePlaceholder(input);
        });
    } else {
        return inputArray.type;
    }
};
