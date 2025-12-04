import React, { forwardRef, TextareaHTMLAttributes, ReactNode } from "react";
// Предполагаем, что FieldWrapper находится в том же shared/ui каталоге
import { FieldWrapper } from "../FieldWrapper/FieldWrapper";

// Интерфейс TextareaProps: только пропсы для <textarea>
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  // Пропсы, которые обрабатывает FieldWrapper:
  label?: string;
  error?: string;
  isError?: boolean;
  className?: string; // Для стилей, специфичных для пользователя

  // Здесь НЕТ startIcon / endIcon, так как они редко используются в textarea!
}

const baseStyles =
  // p-3 для padding внутри поля, resize-y для вертикального изменения размера
  "w-full placeholder-gray py-3 border rounded-lg transition-colors duration-200 outline-none p-3 resize-y relative z-0";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    const { label, error, isError = false, className = "", ...rest } = props;

    // --- Внутренняя логика стилей ---

    // Стили состояния
    const stateStyles = isError
      ? "border-error border-2"
      : "border-gray focus:border-primary focus:border-2";

    // Для Textarea иконки не используются, поэтому отступы внутри поля по умолчанию
    const iconSpacingClasses = "pl-3 pr-3";

    // --- Рендеринг ---

    return (
      <FieldWrapper
        label={label}
        error={error}
        isError={isError}
        // Иконки НЕ передаются в FieldWrapper
        iconSpacingClasses={iconSpacingClasses}
      >
        <textarea
          ref={ref}
          // Объединяем внутренние стили
          className={`${baseStyles} ${stateStyles} ${className}`}
          rows={5} // Дефолтное количество строк
          {...rest}
        />
      </FieldWrapper>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
