import classNames from "classnames";
import { memo, useCallback, useEffect, useMemo, useRef } from "react";

export interface TextFieldProps {
  label?: string;
  value?: string | number;
  placeholder?: string;
  onChange?: (value: string, name?: string) => void;
  helperText?: string;
  error?: boolean;
  mask?: string;
  secureTextEntry?: boolean;
  name?: string;
  disabled?: boolean;
  rows?: number;
  className?: string;
  width?: string | number;
  wrapperWidth?: string | number;
  uppercaseLabel?: boolean;
  type?: "text" | "number";
  step?: string;
  rightIcon?: React.ReactNode;
  pattern?: string;
  height?: string | number;
  backgroundColor?: string;
  fontSize?: number;
  onBlur?: () => void;
  isMode?: boolean;
}

function unSetMask(value: string, mask: string): string {
  const numberCount = mask.split("#").length - 1;
  const result = value.replace(/\D/g, "");
  return result.slice(0, numberCount);
}

export const PHONE_MASK = "+# ### ### ## ##";

function TextField(props: TextFieldProps) {
  const {
    label,
    value,
    onChange,
    placeholder,
    helperText = "",
    error = false,
    mask,
    secureTextEntry = false,
    name,
    disabled = false,
    rows,
    className = "",
    width,
    wrapperWidth,
    uppercaseLabel = true,
    type,
    step,
    rightIcon,
    pattern,
    height,
    backgroundColor = "#f5f5f5",
    fontSize,
    onBlur,
  } = props;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const valueText = useMemo<string>(() => {
    return (value || "") as string;
  }, [value]);

  useEffect(() => {
    document.addEventListener("wheel", () => {
      if ((document.activeElement as HTMLInputElement)?.type === "number") {
        (document.activeElement as HTMLInputElement)?.blur();
      }
    });
  }, []);

  const onChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (disabled) {
        return;
      }

      const inputValue = e.target.value;
      onChange?.(mask ? unSetMask(inputValue, mask) : inputValue, name);
    },
    [disabled, onChange, mask, name]
  );

  // @ts-ignore
  const onKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (type === "number" && event.charCode === 46) {
      event.preventDefault();
    }
  };

  return (
    <div
      className={classNames(`b-text-field ${className}`, {
        "b-text-field--error": error,
        "b-text-field--disabled": disabled,
      })}
      style={{ width: wrapperWidth }}
    >
      {label && (
        <label
          className={classNames(`b-text-field__label`, {
            "b-text-field__label--uppercase-label": uppercaseLabel,
          })}
        >
          {label}
        </label>
      )}
      {rows ? (
        <div className="b-text-field__input-wrapper">
          <textarea
            className={classNames("b-text-field__input textarea", {
              "b-text-field__input--icon": Boolean(rightIcon),
            })}
            ref={textAreaRef}
            onChange={onChangeInput}
            value={valueText}
            disabled={disabled}
            placeholder={placeholder}
            rows={rows}
            onBlur={onBlur}
            style={{ width }}
          />
          {rightIcon && (
            <div className="b-text-field__right-icon__wrapper">
              <div className="b-text-field__right-icon">{rightIcon}</div>
            </div>
          )}
        </div>
      ) : (
        <div className="b-text-field__input-wrapper">
          <input
            type={secureTextEntry ? "password" : type || "text"}
            className={classNames("b-text-field__input", {
              "b-text-field__input--icon": Boolean(rightIcon),
            })}
            onChange={onChangeInput}
            value={valueText}
            disabled={disabled}
            placeholder={placeholder}
            style={{
              width,
              height,
              backgroundColor,
              borderColor: backgroundColor,
              fontSize,
            }}
            pattern={pattern}
            step={step}
            onKeyPress={onKeyPress}
          />
          {rightIcon && (
            <div className="b-text-field__right-icon__wrapper">
              <div className="b-text-field__right-icon">{rightIcon}</div>
            </div>
          )}
        </div>
      )}
      {!!helperText && <p className="b-text-field__helper-text">{helperText}</p>}
    </div>
  );
}

export default memo(TextField);
