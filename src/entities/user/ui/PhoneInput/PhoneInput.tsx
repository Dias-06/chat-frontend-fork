import React, { useState, useCallback, ReactNode } from "react";
import Input from "../../../../shared/ui/Input/Input";

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const formatPhoneNumber = (value: string): string => {
  if (!value) return "";

  const rawValue = value.replace(/[^\d]/g, "");

  const limit = 11;
  const digits = rawValue.substring(0, limit);

  let formattedValue = "+7";

  if (digits.length <= 1) {
    return digits.length === 1 && digits[0] === "7"
      ? "+7"
      : digits.length === 0
      ? ""
      : formattedValue;
  }

  formattedValue += ` (${digits.substring(1, 4)}`;

  if (digits.length >= 5) {
    formattedValue += `) ${digits.substring(4, 7)}`;
  }
  if (digits.length >= 8) {
    formattedValue += `-${digits.substring(7, 9)}`;
  }
  if (digits.length >= 10) {
    formattedValue += `-${digits.substring(9, 11)}`;
  }

  return formattedValue;
};

const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  error: customError,
  value,
  onChange,
  onBlur,
  ...rest
}) => {
  const [internalValue, setInternalValue] = useState(
    formatPhoneNumber((value as string) || "")
  );

  const displayValue =
    value !== undefined ? formatPhoneNumber(value as string) : internalValue;

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawInput = e.target.value;
      const formatted = formatPhoneNumber(rawInput);

      if (value === undefined) {
        setInternalValue(formatted);
      }

      if (onChange) {
        e.target.value = formatted;
        onChange(e);
      }
    },
    [value, onChange]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) onBlur(e);
    },
    [onBlur]
  );

  const shouldShowErrorStyles = !!customError;
  const finalErrorText = customError;

  return (
    <Input
      label={label}
      isError={shouldShowErrorStyles}
      error={finalErrorText}
      value={displayValue}
      onChange={handleInputChange}
      onBlur={handleBlur}
      type="tel"
      placeholder="+7 (900) 000-00-00"
      className="text-lg"
      {...rest}
    />
  );
};

export default PhoneInput;
