import { useState, useRef, useEffect } from "react";
import { ArrowIcon } from "./icons/ArrowIcon";
import { CheckIcon } from "./icons/CheckIcon";

interface SelectProps<T extends string | number> {
  options: T[];
  value: T | "";
  onChange: (value: T) => void;
  width?: number;
  placeholder: string;
}

export const Select = <T extends string | number>({
  options,
  value,
  onChange,
  width,
  placeholder,
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ width: width ? `${width}px` : "100%" }}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full border  pl-2.5 pr-1.5 py-4 text-[18px] leading-[130%] cursor-pointer flex items-center justify-between transition ${
          value ? "text-black" : "text-gray"
        } ${isOpen ? "rounded-t-[8px] border-primary border-b-0" : "rounded-[8px] border-gray"}`}
      >
        <span className="select-none">{value || placeholder}</span>

        <ArrowIcon isOpen={isOpen} />
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 border border-primary rounded-b-[8px] bg-white flex flex-col gap-1 z-50 max-h-60 overflow-auto select-none">
          {options.map((option, idx) => (
            <div
              key={idx}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="flex items-center justify-between px-2.5 py-0.5 text-[18px] cursor-pointer rounded-b-[8px]"
            >
              <span>{option}</span>
              {option === value && <CheckIcon />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
