import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";

const FornecedorSelect = ({ fornecedores, value, onChange }) => {
    return (
        <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel>Fornecedor</InputLabel>
                <Select name="fornecedor_id" value={value} onChange={onChange}>
                    <MenuItem value="">Nenhum</MenuItem>
                    {fornecedores.map(f => (
                        <MenuItem key={f.id} value={f.id}>{f.nome}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    );
};

export default FornecedorSelect;
