import React, { TextareaHTMLAttributes } from "react";
import { useId } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  id?: string;
  error?: string;
  isError?: boolean;
  className?: string;
  heightVariant?: "login" | "default"; // login = 219px, default = 150px
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  id,
  isError = false,
  className = "",
  heightVariant = "login",
  ...rest
}) => {
  const generatedId = useId();
  const textareaId = id || generatedId;

  const height = heightVariant === "login" ? "280px" : "150px";

  const borderStyle = isError
    ? "border-2 border-error"
    : "border border-gray focus:border-primary focus:border-2";

  const textareaClasses = `
    w-full bg-white p-4 rounded-lg resize-y transition-colors duration-200 outline-none
    ${borderStyle} ${className}
  `;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className={`block mb-1 text-sm ${
            isError ? "text-error" : "text-gray"
          }`}
        >
          {error || label}
        </label>
      )}

      <textarea
        id={textareaId}
        className={textareaClasses}
        style={{ height }}
        {...rest}
      />
    </div>
  );
};

export default Textarea;
