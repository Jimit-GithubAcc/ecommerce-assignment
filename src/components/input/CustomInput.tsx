import React from "react";
import styles from "./CustomInput.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string | undefined;
  error?: string;
}

const CustomInput: React.FC<InputProps> = React.forwardRef<
  HTMLInputElement,
  InputProps
>(({ label, error, placeholder, ...props }, ref) => {
  return (
    <section className={styles.section}>
      <label htmlFor={props.name} className={styles.label}>
        {label} {props.required && <span className="">*</span>}
      </label>
      <input
        ref={ref}
        placeholder={placeholder}
        className={`${styles.input} ${error && `${styles.errorBorder}`}`}
        {...props}
      />
      {error && <p className={styles.error}>{error}</p>}
    </section>
  );
});

export default CustomInput;
