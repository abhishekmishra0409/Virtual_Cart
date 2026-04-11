import React from "react";

const CustomInput = (props) => {
  const { type, label, i_id, id, i_class, name, val, onChng, onBlr } = props;
  const inputId = i_id || id || name;
  return (
    <div className="form-floating mt-3">
      <input
        type={type}
        className={`form-control ${i_class}`}
        id={inputId}
        placeholder=" "
        name={name}
        value={val}
        onChange={onChng}
        onBlur={onBlr}
      />
      <label htmlFor={inputId}>{label}</label>
    </div>
  );
};

export default CustomInput;
