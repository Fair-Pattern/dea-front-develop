import classNames from "classnames";
import React from "react";
import { Loader } from "../Loader";
import buttonStyles from "./button.module.css";

export enum ButtonVariants {
  RED = "red",
  WHITE = "white",
  GRAY = "gray",
  LIGHTGRAY = "text-red-50",
  BLUEDARK = "bg-blue-dark",
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: ButtonVariants;
  customClasses?: string;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: string | null;
  width?: string;
}

export const Button = ({
  children,
  variant,
  customClasses,
  width = "w-full",
  onClick = () => {},
  loading = false,
  icon = null,
  ...restProps
}: ButtonProps) => {
  const classes = classNames(
    "h-10 rounded-xl flex items-center justify-center absolute",
    customClasses,
    {
      ["bg-red-dark text-white"]: variant === ButtonVariants.RED,
      ["bg-white text-red-dark"]: variant === ButtonVariants.WHITE,
      ["bg-gray-ash text-white"]: variant === ButtonVariants.GRAY,
      ["bg-gray-200 text-black"]: variant === ButtonVariants.LIGHTGRAY,
      ["bg-blue-dark text-white"]: variant === ButtonVariants.BLUEDARK,
      [buttonStyles.buttonHolder]: true,
      [width]: true,
    }
  );

  const style = {
    "--bg-after-image": icon ? `url(${icon}); ` : "",
  } as React.CSSProperties;

  return (
    <button
      className={`${classes} my-2`}
      onClick={onClick}
      style={style}
      {...restProps}
    >
      {children}
      {loading && (
        <span className="absolute right-4">
          <Loader />
        </span>
      )}
    </button>
  );
};
