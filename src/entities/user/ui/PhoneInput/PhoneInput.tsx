import React, {
  useState,
  useCallback,
  useId,
  InputHTMLAttributes,
} from "react";

interface PhoneInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  id?: string;
  height?: string; // e.g. "60px"
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

  if (digits.length >= 5) formattedValue += `) ${digits.substring(4, 7)}`;
  if (digits.length >= 8) formattedValue += `-${digits.substring(7, 9)}`;
  if (digits.length >= 10) formattedValue += `-${digits.substring(9, 11)}`;

  return formattedValue;
};

const PhoneInput: React.FC<PhoneInputProps> = ({
  label = "Введите номер телефона",
  error: customError,
  value,
  defaultValue = "",
  id,
  height = "60px",
  onChange,
  onBlur,
  ...props
}) => {
  const generatedId = useId();
  const finalId = id || generatedId;

  const [internalValue, setInternalValue] = useState(
    formatPhoneNumber(String(defaultValue))
  );

  const displayValue =
    value !== undefined ? formatPhoneNumber(String(value)) : internalValue;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const formatted = formatPhoneNumber(raw);

      if (value === undefined) {
        setInternalValue(formatted);
      }

      if (onChange) {
        e.target.value = formatted; // pass formatted value
        onChange(e);
      }
    },
    [value, onChange]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);
    },
    [onBlur]
  );

  const inputBorder = customError
    ? "border-2 border-error"
    : "border border-gray focus:border-primary focus:border-2";

  return (
    <div className="w-full">
      <label
        htmlFor={finalId}
        className={`block mb-1 text-sm ${
          customError ? "text-error" : "text-gray"
        }`}
      >
        {customError || label}
      </label>

      <div className="relative flex items-center">
        <input
          id={finalId}
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="+7 (900) 000-00-00"
          className={`w-full bg-white px-4 rounded-lg text-lg transition-colors duration-200 outline-none ${inputBorder}`}
          style={{ height }}
          type="tel"
          {...props}
        />
      </div>
    </div>
  );
};

export default PhoneInput;
