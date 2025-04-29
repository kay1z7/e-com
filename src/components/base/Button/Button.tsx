import cx from "classnames";
import type { FC, ReactNode } from "react";
import React from "react";

import css from "./Button.module.scss";

interface Props {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  text?: string;
  className?: string;
  variant?: "blue" | "white" | "black" | "icon" | "lightBlue";
  disabled?: boolean;
  width?: string;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);
  children?: any;
}

const Button: FC<Props> = ({
  leftIcon,
  rightIcon,
  text,
  className,
  variant,
  disabled = false,
  width,
  onClick,
  children,
}) => {
  return (
    <button
      className={cx(
        css.button_defdult,
        variant && css[variant],
        disabled && css.disabled,
        className
      )}
      style={{
        width,
      }}
      disabled={disabled}
      onClick={onClick}
    >
      {leftIcon && <React.Fragment>{leftIcon}</React.Fragment>}
      {text && text}
      {rightIcon && <React.Fragment>{rightIcon}</React.Fragment>}

      {children}
    </button>
  );
};

export default Button;
