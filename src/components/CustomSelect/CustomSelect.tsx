import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

import ArrowBlackRight from "@/src/assets/icons/arrowBlackRight.svg";
import CloseIcon from "@/src/assets/icons/closeIcon.svg";

import DropDownListItem from "./DropDownListItem";

export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
  children?: readonly SelectOption<T>[];
}

export interface SelectProps<T = unknown> {
  label?: string;
  value: SelectOption<T> | null | string;
  placeholder?: string;
  onChange: (value: SelectOption<T> | null | string, name?: string) => void;
  helperText?: string;
  error?: boolean;
  options: SelectOption<T>[];
  name?: string;
  valueKey?: keyof T;
  disabled?: boolean;
  width?: string | number;
  isCancelable?: boolean;
  background?: string;
  isSearchMode?: boolean;
}

function CustomSelect<T = unknown>(props: SelectProps<T>) {
  const {
    label,
    value: propsValue,
    onChange,
    placeholder,
    helperText = "",
    options,
    name,
    valueKey = "",
    disabled = false,
    isCancelable,
    isSearchMode = false,
    width,
    background = "#f5f5f5",
  } = props;

  function extractChildren(categories) {
    return categories?.reduce((acc, category) => {
      if (category?.children && category?.children.length > 0) {
        return acc?.concat(category.children)?.concat(extractChildren(category?.children));
      }
      return acc;
    }, []);
  }
  const allchilds = extractChildren(options);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const filteredOptions = options?.filter((option) =>
    option.label?.toLowerCase().includes(inputValue?.toLowerCase())
  );

  const getOptionValue = useCallback(
    (option: SelectOption<T> | string) => {
      if (typeof option === "string") {
        return option;
      }
      if (valueKey) {
        return option.value[valueKey as keyof T] as string;
      }

      return option.label as string;
    },
    [valueKey]
  );

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const selectOption = (option: SelectOption<T> | string | null) => {
    toggleDropdown();
    if (disabled) {
      return;
    }
    if (!option) {
      onChange(null, name);
    } else {
      const foundOpt = options?.find((opt) => getOptionValue(opt) === option);
      const foundChildOpt = allchilds?.find((opt) => getOptionValue(opt) === option);
      onChange(foundOpt || foundChildOpt || null, name);
    }
  };

  const value = useMemo(() => {
    if (!propsValue) {
      return "";
    }

    if (typeof propsValue === "string") {
      return propsValue;
    }

    return getOptionValue(propsValue);
  }, [getOptionValue, propsValue]);

  const reset = () => {
    selectOption(null);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
      setInputValue("");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="b-custom-select" ref={dropdownRef} style={{ width }}>
      {!!label && <label className="b-custom-select__label">{label}</label>}
      <div
        className="b-text-field__input b-custom-select__input"
        onClick={toggleDropdown}
        style={{ background, opacity: disabled ? 0.5 : 1 }}
      >
        {isSearchMode ? (
          <input
            className={"b-custom-select__selected"}
            value={inputValue}
            style={{ background }}
            placeholder={value || placeholder || inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        ) : (
          <p
            className={"b-custom-select__selected"}
            style={{
              color: value ? "#000" : "#B0B0B0",
              height: "auto",
            }}
          >
            {value || placeholder}
          </p>
        )}
        {isCancelable && !disabled && !!value && (
          <div className={"b-custom-select__cancel"} onClick={reset}>
            <CloseIcon />
          </div>
        )}
        <ArrowBlackRight
          style={{
            transform: isOpen ? "rotate(270deg)" : "rotate(90deg)",
            transition: "0.2s",
          }}
        />
      </div>
      {isOpen && (
        <div className="b-custom-select__dropdown__list" style={{ background }}>
          {filteredOptions.map((option, optionIndex) => (
            <DropDownListItem
              key={optionIndex}
              selectOption={selectOption}
              getOptionValue={getOptionValue}
              option={option}
            />
          ))}
        </div>
      )}
      {!!helperText && <p className="b-select__helper-text">{helperText}</p>}
    </div>
  );
}

export default memo(CustomSelect);
