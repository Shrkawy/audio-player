import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  label?: string;
  onClick?: MouseEventHandler;
}

const Button = ({ children, label, onClick }: ButtonProps) => {
  return (
    <button type="button" aria-label={label} title={label} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
