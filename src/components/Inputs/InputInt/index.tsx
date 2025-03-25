import { useRef } from "react";
import { Container } from "./styles";

interface Props {
  maskType?: "int1to99" | "int0to9999";
  value?: string | number;
  label?: string;
  id?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  autoComplete?: boolean;
  autoFocus?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  errorText?: string;
  fit?: boolean;
  bigSize?: boolean;
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
  onBlur?(e: React.FocusEvent<unknown>): void;
  onKeyDown?(e: React.KeyboardEvent<unknown>): void;
  canBeNegative?: boolean;
  noButtons?: boolean;
}

const InputInt: React.FC<Props> = ({
  maskType = null,
  value = "",
  id,
  name,
  label,
  placeholder = "",
  className = "",
  autoComplete = false,
  autoFocus = false,
  readOnly = false,
  disabled = false,
  hidden = false,
  errorText,
  fit = false,
  bigSize = false,
  onChange,
  onBlur,
  onKeyDown,
  canBeNegative = false,
  noButtons = false,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const applyFormatting = (value: string): number => {
    let rest = "";

    if (maskType === "int1to99") {
      if(Number(value) > 99) return 99;
      if(Number(value) < 1) return 1;
      rest = value.replace(/<<$&>>(^([1-9][0-9]*)$)|(^0$)/g, "");
      return Number(rest);
    }

    if (maskType === "int0to9999") {
      if(Number(value) < 0) return 0;
      rest = value
        .replace(/\D/g, '')
        .slice(0, 4)
        .replace(/^([0-9]{5,})$/, '9999');
      return parseInt(value) === 10000 ? 9999 : Number(rest);
    }

    rest = canBeNegative
      ? value.replace(/-^[^0-9]?/g, "")
      : value.replace(/[^0-9]/g, "");

    return Number(rest);
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if(!onChange) return false;

    onChange({
      ...evt,
      target: {
        ...evt.target,
        value: applyFormatting(evt.target.value),
        id,
        name,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>);     
  };

  const handleIncrementClick = () => {

    if (!ref.current) return;

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value"
    )?.set;

    if (nativeInputValueSetter) {
        const currentValue = String(applyFormatting(String(Number(ref.current.value) + 1)));
        nativeInputValueSetter.call(ref.current, currentValue);
    }

    const event = new Event("input", { bubbles: true });
    ref.current.dispatchEvent(event);
  }

  const handleDecrementClick = () => {

    if (!ref.current) return;

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value"
    )?.set;

    if (nativeInputValueSetter) {
        const currentValue = String(applyFormatting(String(Number(ref.current.value) - 1)));
        nativeInputValueSetter.call(ref.current, currentValue);
    }

    const event = new Event("input", { bubbles: true });
    ref.current.dispatchEvent(event);
  }

  return (
    <Container className={className} bigSize={bigSize}>
      {label && (
        <label htmlFor={id || name} className={errorText ? "invalid" : ""}>
          {label}
        </label>
      )}
      <div>
        {!noButtons && (
          <button
            type="button"
            onClick={handleDecrementClick}
            onKeyDown={onKeyDown}
            disabled={readOnly || disabled}
          >
            -
          </button>
        )}
        <input
          ref={ref}
          value={value}
          id={id || name}
          name={name}
          type="text"
          inputMode="numeric"
          placeholder={placeholder}
          className={errorText ? "has-error" : ""}
          autoComplete={autoComplete ? "on" : "off"}
          autoFocus={autoFocus}
          onFocus={() => ref?.current?.select()}
          readOnly={readOnly}
          onChange={onChange && handleChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          disabled={disabled}
          hidden={hidden}
          aria-label={label || placeholder || `Number type field`}
          aria-errormessage={errorText}
          aria-invalid={errorText && errorText !== "" ? true : false}
        />
        {!noButtons && (
          <button
            type="button"
            onClick={handleIncrementClick}
            onKeyDown={onKeyDown}
            disabled={readOnly || disabled}
          >
            +
          </button>
        )}
      </div>
      {!fit && (
        <small role="alert">{`${errorText != null ? errorText : ""}`}</small>
      )}
    </Container>
  );
};

export default InputInt;
