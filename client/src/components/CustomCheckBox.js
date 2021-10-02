import React from "react"
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const CustomCheckBox =({label,value,setValue}) =>{
    return(
        <FormControlLabel
            control={
              <Checkbox checked={value} value={value} onChange={(e)=> setValue(!value)} name={label} />
            }
            label={label}
          />
    )
}

export default CustomCheckBox;