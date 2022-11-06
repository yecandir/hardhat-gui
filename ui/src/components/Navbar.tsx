import { Grid, Button } from '@mui/material';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core';

const Injected = new InjectedConnector({
    supportedChainIds: undefined
});

export default function Navbar() {
    const { deactivate, activate, active, account, chainId } = useWeb3React();

    const AccountInfo = () => {
        return (
            <div>
                <Grid>Account: {account}</Grid>
                <Grid>ChainId: {chainId}</Grid>
            </div>
        );
    };

    const ButtonView = () => {
        if (active) {
            return (
                <Button color="primary" onClick={() => deactivate()}>
                    Disconnect
                </Button>
            );
        } else {
            return (
                <Button color="primary" onClick={() => activate(Injected)}>
                    Connect
                </Button>
            );
        }
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={1}>
                <ButtonView />
            </Grid>
            <Grid item xs={8}>
                <div>Account: {account}</div>
            </Grid>
            <Grid item xs={1}>
                <div>ChainId: {chainId}</div>
            </Grid>
        </Grid>
    );
}

// export function Navbar<T>(props: T) {
//     if (active) {
//         return (
//             <Grid container spacing={1}>
//                 <Grid item xs={1}>
//                     <Button variant="contained" onClick={deactivate}>
//                         Disconnect
//                     </Button>
//                 </Grid>
//                 <Grid item xs={8}>
//                     <div>Account: {account}</div>
//                 </Grid>
//                 <Grid item xs={1}>
//                     <div>ChainId: {chainId}</div>
//                 </Grid>
//             </Grid>
//         );
//     } else {
//         return (
//             <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                     <Button
//                         variant="contained"
//                         onClick={() => {
//                             activate(Injected);
//                         }}
//                     >
//                         Connect
//                     </Button>
//                 </Grid>
//             </Grid>
//         );
//     }
// }
