import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CustomSelect = ({label, selectArray, value, setValue}) =>{
    return(

        <FormControl margin="normal" fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value||''}
          label={label}
          onChange={(e)=>setValue(e.target.value)}
        >
            {selectArray.map((item)=>(
                <MenuItem value={item} key={item}>
                    {item}
                </MenuItem> 
            ))}
        </Select>
      </FormControl>
    )
}

export default CustomSelect;