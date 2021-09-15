import React from "react";

const CustomInput = ({ label, value, type, setValue }) => {
    return (
        <div>

            <label>{label}</label>
            <input style={{ width: "100%" }} value={value} type={type} onChange={(e) => setValue(e.target.value)} />

        </div>
    )
}

export default CustomInput;