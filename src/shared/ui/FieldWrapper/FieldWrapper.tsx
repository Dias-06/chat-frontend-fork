import React, { ReactNode } from "react";

interface FieldWrapperProps {
  label?: string;
  error?: string;
  isError: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  children: ReactNode;
  iconSpacingClasses: string;
  containerClassName?: string;
}

export const FieldWrapper: React.FC<FieldWrapperProps> = ({
  label,
  error,
  isError,
  startIcon,
  endIcon,
  children,
  iconSpacingClasses,
  containerClassName = "mb-4",
}) => {
  const isLabelError = isError || !!error;

  const wrapperStyles = "relative flex items-center";

  const labelStyles = `block mb-1 text-sm font-normal ${
    isLabelError ? "text-error" : "text-gray"
  }`;
  interface InputElementProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
  }

  const elementWithSpacing = React.isValidElement<InputElementProps>(children) // Сужаем тип children
    ? React.cloneElement(
        children, // TypeScript теперь знает, что children является ReactElement с InputElementProps
        {
          // Безопасный доступ к children.props.className
          className: `${children.props.className || ""} ${iconSpacingClasses}`,
        }
      )
    : children;

  return (
    <div className={containerClassName}>
      {label && <label className={labelStyles}>{label}</label>}

      <div className={wrapperStyles}>
        {startIcon && (
          <div className="absolute pointer-events-none text-gray left-3 z-10">
            {startIcon}
          </div>
        )}

        {elementWithSpacing}

        {endIcon && (
          <div className="absolute pointer-events-none text-gray right-3 z-10">
            {endIcon}
          </div>
        )}
      </div>
    </div>
  );
};
export default FieldWrapper;
