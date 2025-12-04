import React, { InputHTMLAttributes, useState } from "react";
import Input from "../../../../shared/ui/Input/Input";

interface EmailInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const EmailInput: React.FC<EmailInputProps> = ({
  label = "Укажите Ваш e-mail",
  ...props
}) => {
  const [value, setValue] = useState(props.value || "");
  const [isValid, setIsValid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);

  const errorMessage = !isValid && isTouched ? "Некорректный e-mail" : label;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (isTouched) {
      setIsValid(validateEmail(newValue));
    }
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsTouched(true);
    setIsValid(validateEmail(value as string));
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  return (
    <div>
      <Input
        label={errorMessage ? errorMessage : label}
        type="email"
        placeholder="Email"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        isError={!isValid}
        {...props}
      />
    </div>
  );
};

export default EmailInput;
