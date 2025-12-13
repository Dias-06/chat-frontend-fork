import React, { InputHTMLAttributes, useState } from "react";
import { useId } from "react";

interface EmailInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  height?: string; // e.g. "60px"
  defaultValue?: string;
}

const validateEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const EmailInput: React.FC<EmailInputProps> = ({
  label = "Укажите Ваш e-mail",
  id,
  value,
  defaultValue = "",
  height = "60px",
  onChange,
  onBlur,
  ...props
}) => {
  const generatedId = id ?? useId();
  const [internalValue, setInternalValue] = useState<string>(defaultValue);
  const [isValid, setIsValid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);

  const currentValue = value !== undefined ? value : internalValue;

  const errorMessage =
    !isValid && isTouched ? "Некорректный e-mail" : undefined;

  const inputBorder = errorMessage
    ? "border-2 border-error"
    : "border border-gray focus:border-primary focus:border-2";

  const inputClasses = `
    w-full bg-white px-4 rounded-lg text-lg transition-colors duration-200 outline-none
    ${inputBorder}
  `;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;

    if (value === undefined) {
      setInternalValue(newVal);
    }

    if (isTouched) setIsValid(validateEmail(newVal));

    onChange?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsTouched(true);
    setIsValid(validateEmail(e.target.value));
    onBlur?.(e);
  };

  return (
    <div className="w-full">
      <label
        htmlFor={generatedId}
        className={`block mb-1 text-sm ${
          errorMessage ? "text-error" : "text-gray"
        }`}
      >
        {errorMessage || label}
      </label>

      <div className="relative flex items-center">
        <input
          id={generatedId}
          value={currentValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Email"
          className={inputClasses}
          style={{ height }}
          type="email"
          {...props}
        />
      </div>
    </div>
  );
};

export default EmailInput;
