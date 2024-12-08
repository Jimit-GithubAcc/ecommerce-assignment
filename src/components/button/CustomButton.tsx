import React from "react";
import styles from "./CustomButton.module.css";

interface ButtonProps {
  type: "submit" | "reset" | "button" | undefined;
  title: string;
  className: string | undefined;
  disabled?: boolean | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const CustomButton: React.FC<ButtonProps> = ({
  type,
  title,
  className,
  disabled,
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${className}`}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default CustomButton;
