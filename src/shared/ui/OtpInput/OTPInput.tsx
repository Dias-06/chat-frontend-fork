import React, { useRef, useCallback, useMemo, useState } from "react";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (otp: string) => void;
  isError?: boolean;
  containerClassName?: string;
}

const OtpInput: React.FC<OtpInputProps> = ({
  length = 5,
  value,
  onChange,
  isError = false,
  containerClassName = "",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.replace(/\D/g, "");
      const trimmedValue = newValue.slice(0, length);
      onChange(trimmedValue);
    },
    [length, onChange]
  );

  const handleContainerClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const baseCellStyle = useMemo(
    () => `
      flex flex-1 items-center justify-center 
      w-[60px] h-[60px] max-w-[60px] 
      text-[18px] font-bold text-black
      rounded-lg border-2 transition-colors duration-200
      bg-white
    `,
    []
  );

  const getCellClasses = useCallback(
    (index: number, isActive: boolean) => {
      let classes = baseCellStyle;

      if (isError) {
        classes += " border-error text-black";
      } else if (isActive) {
        classes += " border-primary border-2";
      } else {
        classes += " border-primary";
      }

      return classes;
    },
    [baseCellStyle, isError]
  );

  const cells = useMemo(() => {
    const otpArray = value.padEnd(length, " ").split("");

    const activeIndex = value.length < length ? value.length : -1;

    return otpArray.map((digit, index) => {
      const isActive = index === activeIndex;
      const cellClasses = getCellClasses(index, isActive);

      return (
        <div key={index} className={`relative ${cellClasses}`}>
          {digit !== " " ? (
            digit
          ) : isActive && isFocused ? (
            <span
              className="absolute w-px bg-black h-1/2 animate-blink"
              style={{
                left: "50%",
                transform: "translateX(-50%)",
              }}
            />
          ) : null}
        </div>
      );
    });
  }, [length, value, getCellClasses, isFocused]);

  return (
    <div
      className={`relative ${containerClassName}`}
      onClick={handleContainerClick}
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        maxLength={length}
        // inputMode="numeric" и pattern для вызова цифровой клавиатуры на мобильных
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="one-time-code"
        className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-default"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      <div className="flex flex-wrap justify-between gap-2 md:gap-4">
        {cells}
      </div>
    </div>
  );
};

export default OtpInput;
