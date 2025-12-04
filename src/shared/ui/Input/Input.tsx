import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { FieldWrapper } from "../FieldWrapper/FieldWrapper";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  isError?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string;
}

const baseStyles =
  "w-full placeholder-gray py-3 border rounded-lg transition-colors duration-200 outline-none relative z-0";

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    label,
    error,
    isError = false,
    className = "",
    startIcon,
    endIcon,
    ...rest
  } = props;

  const stateStyles = isError
    ? "border-error border-2"
    : "border-gray focus:border-primary focus:border-2";

  const iconSpacingClasses = `${startIcon ? "pl-10" : "pl-3"} ${
    endIcon ? "pr-10" : "pr-3"
  }`;

  const inputElement = (
    <input
      ref={ref}
      type="text"
      className={`${baseStyles} ${stateStyles} ${className}`}
      {...rest}
    />
  );

  return (
    <FieldWrapper
      label={label}
      error={error}
      isError={isError}
      startIcon={startIcon}
      endIcon={endIcon}
      iconSpacingClasses={iconSpacingClasses}
    >
      {inputElement}
    </FieldWrapper>
  );
});

Input.displayName = "Input";
export default Input;
