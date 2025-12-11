import React, { useState, useMemo } from "react";
import { useId } from "react";

type InputValidationVariant = "base" | "nickname" | "about";

interface InputConfig {
  label: string;
  minLength: number;
  maxLength: number;
  regex: RegExp;
  errorMessages: {
    invalidChars: string;
    tooLong: (max: number) => string;
    tooShort: (min: number) => string;
    empty: string;
  };
}

interface TextInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "children" | "type" | "placeholder"
  > {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validationVariant?: InputValidationVariant;
  startIcon?: React.ReactNode;
  error?: string;
  label?: string;
  height?: string;
}

const BASE_CONFIG: InputConfig = {
  // Для поля Имя в регистрации и полей с тесктом в настройках
  label: "Введите имя",
  minLength: 2,
  maxLength: 30,
  regex: /^[а-яА-ЯёЁa-zA-Z\s\-]*$/,
  errorMessages: {
    invalidChars: "Используйте только буквы, пробел или тире",
    tooLong: (max) => `Не более ${max} символов`,
    tooShort: (min) => `Минимум ${min} символа`,
    empty: "Заполните поле",
  },
};

const NICKNAME_CONFIG: InputConfig = {
  label: "Придумайте никнейм",
  minLength: 3,
  maxLength: 30,
  regex: /^[a-zA-Z0-9_]*$/,
  errorMessages: {
    invalidChars: "Только латинские буквы, цифры и _",
    tooLong: (max) => `Не более ${max} символов`,
    tooShort: (min) => `Минимум ${min} символа`,
    empty: "Укажите никнейм",
  },
};

const ABOUT_CONFIG: InputConfig = {
  ...BASE_CONFIG,
  label: "Напишите о себе",
  maxLength: 250,
  regex: /[\s\S]*/,
};

const CONFIG_MAP = {
  base: BASE_CONFIG,
  nickname: NICKNAME_CONFIG,
  about: ABOUT_CONFIG,
};

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  validationVariant = "base",
  label: customLabel,
  error: customError,
  id,
  startIcon,
  height = "60px",
  className = "",
  ...rest
}) => {
  const finalId = id || useId();
  const config = CONFIG_MAP[validationVariant];

  const [touched, setTouched] = useState(false);

  const { minLength, maxLength, regex, errorMessages } = config;

  const isEmpty = value.length === 0;
  const tooShort = value.length > 0 && value.length < minLength;
  const tooLong = value.length > maxLength;
  const invalidChars = value.length > 0 && !regex.test(value);

  const validationError = useMemo(() => {
    if (invalidChars) return errorMessages.invalidChars;
    if (tooLong) return errorMessages.tooLong(maxLength);
    if (tooShort) return errorMessages.tooShort(minLength);
    if (isEmpty && touched) return errorMessages.empty;
    return undefined;
  }, [value, touched]);

  const finalError = customError || validationError;
  const dynamicLabel = finalError || customLabel || config.label;

  const inputClasses = `
      w-full bg-white px-4 rounded-lg text-lg transition-colors duration-200 outline-none
      ${
        finalError
          ? "border-2 border-error"
          : "border border-gray focus:border-primary focus:border-2"
      }
      ${startIcon ? "pl-12" : ""}
      ${className || ""}
    `
    .replace(/\s+/g, " ")
    .trim();

  return (
    <div className="w-full">
      <label
        className={`block mb-1 text-sm ${
          finalError ? "text-error" : "text-gray"
        }`}
      >
        {dynamicLabel}
      </label>

      <div className="relative flex items-center">
        {startIcon && (
          <div className="absolute left-3 text-gray pointer-events-none">
            {startIcon}
          </div>
        )}

        <input
          value={value}
          onChange={onChange}
          onBlur={() => setTouched(true)}
          className={inputClasses}
          style={{ height }}
          id={finalId}
          {...rest}
        />
      </div>
    </div>
  );
};

export default TextInput;
