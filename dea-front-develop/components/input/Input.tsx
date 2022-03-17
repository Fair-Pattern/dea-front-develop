import React, { useState } from "react";
import classNames from "classnames";
import inputStyles from "./input.module.css";

type InputPropType = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export interface InputProps extends InputPropType {
  label?: string | null;
  leftIcon?: string | null;
  rightIcon?: string | null;
  error?: boolean | string | null;
  leftIconWidth?: number;
  rightIconWidth?: number;
  textColor?: string;
  rightIconClick?:any;
}

export const InputPassword = ({
  label,
  className,
  leftIcon = null,
  leftIconWidth = 20,
  rightIconWidth = 20,
  error = null,
  type,
  textColor = "text-red-dark",
  ...defaultInputProps
}: InputProps) => {
  const classnames = classNames(
    "rounded-xl placeholder-red-lighter",
    className,
    {
      [inputStyles.accentColor]: type === "checkbox",
      ["h-10 w-full p-4 pr-8 mt-2"]: type !== "checkbox",
      ["bg-red-medium"]: error,
      ["pl-10"]: leftIcon,
      [inputStyles.radioInput]: type === "radio",
      [textColor]: true,
    }
  );
  const [shown, setShown] = useState(false);

  return (
    <div className="py-2">
      {label && <label>{label}</label>}
      <span className={`flex ${inputStyles.inputHolder} items-center`}>
        {leftIcon && (
          <img
            src={leftIcon}
            width={leftIconWidth}
            className={inputStyles.leftIcon}
          />
        )}
        <input
          {...defaultInputProps}
          className={classnames}
          type={shown ? "text" : "password"}
        />
        <img
          src={shown ? "/images/eye-visible.png" : "/images/eye-hidden.png"}
          width={rightIconWidth}
          className={`${inputStyles.rightIcon} cursor-pointer`}
          onClick={() => setShown(!shown)}
        />
      </span>
      {error && typeof error === "string" && (
        <span className="text-xs  text-red-dark">{error}</span>
      )}
    </div>
  );
};

export const TextArea = ({
  label,
  className,
  leftIcon = null,
  leftIconWidth = 20,
  rightIconWidth = 20,
  error = null,
  type,
  textColor = "text-red-dark",
  ...defaultInputProps
}: InputProps) => {
  const classnames = classNames(
    "rounded-xl placeholder-red-lighter",
    className,
    {
      [inputStyles.accentColor]: type === "checkbox",
      ["w-full p-4 pr-8 mt-2"]: type !== "checkbox",
      ["bg-red-medium"]: error,
      ["pl-10"]: leftIcon,
      [inputStyles.radioInput]: type === "radio",
      [textColor]: true,
    }
  );

  return (
    <div className="py-2">
      {label && <label>{label}</label>}
      <span className={`flex ${inputStyles.inputHolder} items-center`}>
        {leftIcon && (
          <img
            src={leftIcon}
            width={leftIconWidth}
            className={inputStyles.leftIcon}
          />
        )}
        {/**@ts-ignore*/}
        <textarea
          {...defaultInputProps}
          className={classnames}
          cols={4}
          rows={6}
        ></textarea>
        <img
          width={rightIconWidth}
          className={`${inputStyles.rightIcon} cursor-pointer`}
        />
      </span>
      {error && typeof error === "string" && (
        <span className="text-xs  text-red-dark">{error}</span>
      )}
    </div>
  );
};

export const Input = (inputProps: InputProps) => {
  const {
    label,
    className,
    leftIcon = null,
    rightIcon = null,
    leftIconWidth = 20,
    rightIconWidth = 20,
    rightIconClick = () => {},
    error = null,
    type,
    textColor = "text-red-dark",
    ...defaultInputProps
  } = inputProps;

  const classnames = classNames(
    "rounded-xl placeholder-red-lighter",
    className,
    {
      [inputStyles.accentColor]: type === "checkbox",
      ["p-4"]: type !== "file",
      ["p-1"]: type === "file",
      ["h-10 w-full pr-8 mt-2"]: type !== "checkbox",
      ["bg-red-medium"]: error,
      ["pl-10"]: leftIcon,
      [inputStyles.radioInput]: type === "radio",
      [textColor]: true,
    }
  );

  if (type === "password") {
    return <InputPassword {...inputProps} />;
  }

  if (type === "textarea") {
    return <TextArea {...inputProps} />;
  }

  return (
    <div className="py-2">
      {label && <label>{label}</label>}
      <span className={`flex ${inputStyles.inputHolder} items-center`}>
        {leftIcon && (
          <img
            src={leftIcon}
            width={leftIconWidth}
            className={inputStyles.leftIcon}
          />
        )}
        <input {...defaultInputProps} className={classnames} type={type} />
        {rightIcon && (
          <img
            src={rightIcon}
            width={rightIconWidth}
            className={`${inputStyles.rightIcon} cursor-pointer `}
            onClick={rightIconClick}
          />
        )}
      </span>
      {error && typeof error === "string" && (
        <span className="text-xs  text-red-dark">{error}</span>
      )}
    </div>
  );
};
