import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useState } from 'react';

export function InputFormBuilder(props: {
    inputs: any[];
    onInputChange: (value: any, index: number) => any;
}) {
    if (props.inputs.length === 0) {
        return <div></div>;
    } else {
        return (
            <Grid>
                {props.inputs.map((input, index) => {
                    if (input.type == 'tuple') {
                        return (
                            <Grid
                                container
                                spacing={0}
                                style={{ marginTop: 5 }}
                            >
                                <Grid item xs={12} key={index}>
                                    <TextField
                                        onChange={(e) => {
                                            props.onInputChange(
                                                e.target.value,
                                                index
                                            );
                                        }}
                                        id={input.name}
                                        label={input.name}
                                        variant="outlined"
                                        fullWidth
                                        placeholder={JSON.stringify(
                                            preparePlaceholder(input)
                                        )}
                                    />
                                </Grid>
                                {/* <Grid item xs={1} key={index}>
                                    <Button
                                        onClick={() => {
                                            console.log('clicked');
                                        }}
                                    >
                                        {'>'}
                                    </Button>
                                </Grid> */}
                            </Grid>
                        );
                    } else {
                        return (
                            <Grid container spacing={0}>
                                <Grid item xs={12} key={index}>
                                    <TextField
                                        id={input.name}
                                        label={input.name}
                                        variant="outlined"
                                        fullWidth
                                        placeholder={input.type}
                                        onChange={(e) => {
                                            props.onInputChange(
                                                e.target.value,
                                                index
                                            );
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        );
                    }
                })}
            </Grid>
        );
    }
}

const preparePlaceholder: any = (inputs: any) => {
    if (inputs && Array.isArray(inputs)) {
        return inputs.map((input: any) => {
            return preparePlaceholder(input);
        });
    } else if (inputs.type == 'tuple') {
        return inputs.components.map((input: any) => {
            return preparePlaceholder(input);
        });
    } else {
        return inputs.type;
    }
};
