import React from "react";
import "./CustomInput.module.css";

interface InputProps {
  label: string;
  value: string;
  type: string;
  name: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  value,
  error,
  placeholder,
  required,
  onChange,
  onBlur,
}) => {
  return (
    <section className="">
      <label htmlFor={name} className="">
        {label} {required && <span className="">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        className={`${error && ""}`}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className="">{error}</p>}
    </section>
  );
};

export default CustomInput;
