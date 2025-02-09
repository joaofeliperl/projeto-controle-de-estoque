import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarAlert = ({ open, onClose, message, severity = "success", duration = 3000 }) => {
    return (
        <Snackbar open={open} autoHideDuration={duration} onClose={onClose}>
            <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarAlert;
