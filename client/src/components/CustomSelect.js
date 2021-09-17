import React from "react";


const CustomSelect = ({label, selectArray, value, setValue}) =>{
    return(
        <div>
            <label>{label}</label>
            <select onChange={(e) => setValue(e.target.value)} value={value}>
                    {selectArray.map((item)=>(
                        <option value={item} key={item}>
                            {item}
                        </option>
                    ))}
            </select>
        </div>
    )
}

export default CustomSelect;