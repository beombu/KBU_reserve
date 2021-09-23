import React from "react"

const CustomCheckBox =({label,value,setValue}) =>{
    return(
        <>
        <label>
            <input type="checkbox" onChange = {(e)=> setValue(!value)} value={value} />
            {label}
        </label>
        </>
    )
}

export default CustomCheckBox;