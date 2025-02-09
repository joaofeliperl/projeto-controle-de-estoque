import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { AddPhotoAlternate } from "@mui/icons-material";

const ImageUploader = ({ onUpload, imageCount }) => {
    return (
        <Grid item xs={12}>
            <Button variant="contained" component="label" startIcon={<AddPhotoAlternate />}>
                Enviar Imagens
                <input type="file" hidden multiple accept="image/*" onChange={onUpload} />
            </Button>
            {imageCount > 0 && (
                <Typography variant="caption" sx={{ ml: 2 }}>
                    {imageCount} imagem(ns) selecionada(s)
                </Typography>
            )}
        </Grid>
    );
};

export default ImageUploader;
