import React from "react";
import { TextField, Grid } from "@mui/material";

const TextFieldWrapper = ({ label, name, value, onChange, type = "text", required = false }) => {
    return (
        <Grid item xs={6}>
            <TextField
                fullWidth
                label={label}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
            />
        </Grid>
    );
};

export default TextFieldWrapper;
