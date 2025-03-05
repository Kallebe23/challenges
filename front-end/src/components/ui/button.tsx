import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: ReactNode;
}

export default function Button({ startIcon, children, ...props }: ButtonProps) {
  return (
    <button className="ui-button" {...props}>
      {startIcon}
      {children}
    </button>
  );
}
