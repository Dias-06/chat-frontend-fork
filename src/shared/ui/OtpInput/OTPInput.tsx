import React, {
  useRef,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import { useId } from "react";

interface OtpInputProps {
  length?: number;
  id?: string;
  disabled?: boolean;
  error?: boolean;
  errorText?: string | null;
  onComplete: (code: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({
  length = 5,
  id,
  disabled = false,
  error = false,
  errorText,
  onComplete,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const reactId = useId();
  const safeId = id ?? `otp-${reactId}`;

  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const prevErrorRef = useRef(false);

  /* ================= handlers ================= */

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;

      const digits = e.target.value.replace(/\D/g, "");
      setValue(digits.slice(0, length));
    },
    [disabled, length]
  );

  const focusInput = useCallback(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  /* ================= effects ================= */

  // вызов onComplete только когда код полностью введён
  const completedRef = useRef(false);

  useEffect(() => {
    if (value.length === length && !disabled && !completedRef.current) {
      completedRef.current = true;
      onComplete(value);
    }

    if (value.length < length) {
      completedRef.current = false;
    }
  }, [value, length, disabled, onComplete]);

  // очистка при ошибке
  useEffect(() => {
    if (!prevErrorRef.current && error) {
      setValue("");
      inputRef.current?.focus(); // ← тут можно
    }
    prevErrorRef.current = error;
  }, [error]);

  /* ================= UI ================= */

  const baseCellStyle = `
    flex flex-1 items-center justify-center
    max-w-[60px] w-full h-[60px]
    text-[18px] rounded-lg text-black
    bg-transparent transition-colors
  `;

  const getCellClasses = (isActive: boolean) => {
    if (disabled) return `${baseCellStyle} border border-gray-dark`;
    if (error) return `${baseCellStyle} border-2 border-error`;
    if (isActive && isFocused)
      return `${baseCellStyle} border-2 border-primary`;
    return `${baseCellStyle} border border-primary`;
  };

  const cells = useMemo(() => {
    const padded = value.padEnd(length, " ").split("");
    const activeIndex = disabled || value.length >= length ? -1 : value.length;

    return padded.map((char, i) => {
      const isActive = i === activeIndex;

      return (
        <div key={i} className={`relative ${getCellClasses(isActive)}`}>
          {char !== " " ? (
            char
          ) : isActive && isFocused && !disabled ? (
            <span
              className="absolute w-px bg-black h-1/2 animate-blink"
              style={{ left: "50%", transform: "translateX(-50%)" }}
            />
          ) : null}
        </div>
      );
    });
  }, [value, length, isFocused, error, disabled]);

  return (
    <div className="space-y-1">
      {error && errorText && (
        <label
          htmlFor={safeId}
          className="text-error text-[14px] leading-[1.2]"
        >
          {errorText}
        </label>
      )}
      <div className="relative cursor-pointer" onClick={focusInput}>
        <input
          ref={inputRef}
          id={safeId}
          type="text"
          value={value}
          onChange={handleChange}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={length}
          autoComplete="one-time-code"
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="absolute inset-0 w-full h-full opacity-0"
        />

        <div className="flex justify-between gap-[7px]">{cells}</div>
      </div>
    </div>
  );
};

export default OtpInput;
