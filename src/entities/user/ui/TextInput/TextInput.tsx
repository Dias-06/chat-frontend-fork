import React, { useState, useMemo, useCallback } from "react";
import Input from "../../../../shared/ui/Input/Input"; // Ваш базовый компонент

type InputVariant = "name" | "nickname";

interface TextInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  variant: InputVariant;
  error?: string;
  [key: string]: any;
}

interface InputConfig {
  label: string;
  placeholder: string;
  minLength: number;
  maxLength: number;
  regex: RegExp;
  errorMessages: {
    invalidChars: string;
    tooLong: (max: number) => string;
    tooShort: (min: number) => string;
    empty: string;
    nicknameOccupied?: string;
  };
}

const NAME_CONFIG: InputConfig = {
  label: "Введите имя",
  placeholder: "Иван",
  minLength: 3,
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
  placeholder: "user_name_123",
  minLength: 3,
  maxLength: 15,
  regex: /^[a-zA-Z0-9_]*$/,
  errorMessages: {
    invalidChars: "Только латинские буквы, цифры и _",
    tooLong: (max) => `Не более ${max} символов`,
    tooShort: (min) => `Минимум ${min} символа`,
    empty: "Укажите никнейм",
    nicknameOccupied: "Этот никнейм уже занят другим пользователем",
  },
};

const CONFIG_MAP: Record<InputVariant, InputConfig> = {
  name: NAME_CONFIG,
  nickname: NICKNAME_CONFIG,
};

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  variant,
  error: customError,
  onFocus,
  onBlur,
  ...rest
}) => {
  const config = useMemo(() => CONFIG_MAP[variant], [variant]);

  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const { minLength, maxLength, regex, label, placeholder, errorMessages } =
    config;

  const isValueEmpty = value.length === 0;
  const isValueTooShort = value.length > 0 && value.length < minLength;
  const isValueTooLong = value.length > maxLength;

  const hasInvalidChars = useMemo(() => {
    return !regex.test(value);
  }, [value, regex]);

  const validationErrorText = useMemo(() => {
    if (hasInvalidChars) {
      return errorMessages.invalidChars;
    }
    if (isValueTooLong) {
      return errorMessages.tooLong(maxLength);
    }
    if (isValueTooShort) {
      return errorMessages.tooShort(minLength);
    }
    if (isValueEmpty && isTouched) {
      return errorMessages.empty;
    }
    return undefined;
  }, [
    isValueEmpty,
    isValueTooShort,
    isValueTooLong,
    hasInvalidChars,
    isTouched,
    errorMessages,
    maxLength,
    minLength,
  ]);

  const finalErrorText = validationErrorText || customError;

  const shouldShowErrorStyles = useMemo(() => {
    return !!finalErrorText;
  }, [finalErrorText]);

  const dynamicLabel = useMemo(() => {
    if (shouldShowErrorStyles) {
      return finalErrorText || label;
    }
    return label;
  }, [shouldShowErrorStyles, finalErrorText, label]);

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setIsTouched(true);
      if (onBlur) onBlur(e);
    },
    [onBlur]
  );

  return (
    <Input
      label={dynamicLabel}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      isError={shouldShowErrorStyles}
      error={finalErrorText}
      type="text"
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...rest}
    />
  );
};

export default TextInput;
