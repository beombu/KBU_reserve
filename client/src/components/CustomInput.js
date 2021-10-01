import React from "react";
import TextField from '@mui/material/TextField';

const CustomInput = ({ label, value, type, setValue }) => {
    return (
        <TextField

            value = {value||''}
            onChange ={(e)=>setValue(e.target.value)}
            label = {label}
            type={type}
            fullWidth
            margin="normal"
            >

            </TextField>
    )
}

export default CustomInput;