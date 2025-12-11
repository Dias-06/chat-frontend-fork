import React, { InputHTMLAttributes, useId } from "react";
import Search from "../../assets/icons/Search";

export type SearchTheme = "light" | "gray" | "dark";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  theme?: SearchTheme;
  className?: string;
  height?: string; // e.g., "44px", "48px"
}

const getThemeClasses = (theme: SearchTheme = "light"): string => {
  switch (theme) {
    case "gray":
      return "bg-gray-light text-black placeholder-gray rounded-[16px] border-none py-[10px] leading-[24px]";
    case "dark":
      return "bg-violate-light text-black placeholder-gray rounded-[16px] border-none py-[10px] leading-[24px]";
    default:
      return "bg-white text-black placeholder-gray rounded-[16px] border-none py-[10px] leading-[24px]";
  }
};

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Поиск",
  theme = "light",
  className = "",
  height = "44px",
  ...rest
}) => {
  const generatedId = useId();
  const inputId = generatedId;

  const themeClasses = getThemeClasses(theme);

  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <Search width={16} height={16} />
      </div>

      <input
        id={inputId}
        type="search"
        placeholder={placeholder}
        className={`w-full pl-10 pr-4 transition-colors duration-200 outline-none ${themeClasses} ${className}`}
        style={{ height }}
        {...rest}
      />
    </div>
  );
};

export default SearchInput;
