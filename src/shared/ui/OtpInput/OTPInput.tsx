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
  correctCode: string;
  id?: string;
}

const MAX_ATTEMPTS = 5;

const OtpInput: React.FC<OtpInputProps> = ({ length = 5, correctCode, id }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const reactId = useId();
  const safeId = id ?? `otp-${reactId}`;

  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);
  const [isLocked, setIsLocked] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isLocked) return;

      const digits = e.target.value.replace(/\D/g, "");
      setValue(digits.slice(0, length));
    },
    [isLocked, length]
  );

  const focusInput = useCallback(() => {
    if (!isLocked) inputRef.current?.focus();
  }, [isLocked]);

  const checkCode = useCallback(() => {
    if (value.length !== length || isLocked) return;

    if (value === correctCode) {
      setError(false);
      return;
    }

    setError(true);

    setAttemptsLeft((prev) => {
      const next = prev - 1;
      if (next <= 0) {
        setIsLocked(true);
      }
      return next;
    });

    setValue("");
  }, [value, length, correctCode, isLocked]);

  useEffect(() => {
    if (value.length === length) checkCode();
  }, [value, checkCode, length]);

  const baseCellStyle = `
    flex flex-1 items-center justify-center
    w-[60px] h-[60px]
    text-[18px] rounded-lg text-black
    bg-transparent transition-colors
  `;

  const getCellClasses = (isActive: boolean) => {
    if (isLocked) return `${baseCellStyle} border border-gray-dark`;
    if (error) return `${baseCellStyle} border-2 border-error`;
    if (isActive && isFocused)
      return `${baseCellStyle} border-2 border-primary`;
    return `${baseCellStyle} border border-primary`;
  };

  const cells = useMemo(() => {
    const padded = value.padEnd(length, " ").split("");
    const activeIndex = isLocked ? -1 : value.length;

    return padded.map((char, i) => {
      const isActive = i === activeIndex;

      return (
        <div key={i} className={`relative ${getCellClasses(isActive)}`}>
          {char !== " " ? (
            char
          ) : isActive && isFocused && !isLocked ? (
            <span
              className="absolute w-px bg-black h-1/2 animate-blink"
              style={{ left: "50%", transform: "translateX(-50%)" }}
            />
          ) : null}
        </div>
      );
    });
  }, [value, length, isFocused, error, isLocked]);

  return (
    <div className="space-y-1">
      {error && !isLocked && (
        <label htmlFor={id} className="text-error text-[14px] leading-[1.2]">
          {`Код введён неверно. Осталось ${attemptsLeft} попытки`}
        </label>
      )}

      {isLocked && (
        <label htmlFor={id} className="text-error text-[14px] leading-[1.2]">
          Слишком много неверных попыток.
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
          disabled={isLocked}
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
