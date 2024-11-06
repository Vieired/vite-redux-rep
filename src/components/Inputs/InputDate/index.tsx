import { Container } from "./styles";

interface Props {
  value: string;
  min?: string;
  max?: string;
  label?: string;
  id?: string;
  name: string;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  errorText?: string;
  fit?: boolean;
  onChange?(date: React.ChangeEvent<HTMLInputElement>): void;
  onBlur?(e: React.FocusEvent<unknown>): void;
  type?: string;
  autoFocus?: boolean;
}

const InputDate: React.FC<Props> = ({
  value,
  min,
  max,
  id,
  name,
  label,
  className = "",
  disabled = false,
  readOnly = false,
  errorText,
  fit = false,
  onChange,
  onBlur,
  type,
  autoFocus = false,
}) => {
  const handleValue = (): string | undefined => {
    return value && isValidDate(value)
      ? new Date(value).toISOString().split("T")[0]
      : "";
  };

  const handleMonthValue = (): string | undefined => {
    return value && isValidDate(value)
      ? new Date(value).toISOString().substring(0, 7)
      : "";
  };

  const isValidDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  return (
    <Container className={className}>
      {label && (
        <label htmlFor={id || name} className={errorText ? "invalid" : ""}>
          {label}
        </label>
      )}
      <>
        <input
          id={id || name}
          name={name}
          type={!type ? "date" : type}
          value={!type ? handleValue() : handleMonthValue()}
          min={min}
          max={max}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete="off"
          disabled={disabled}
          readOnly={readOnly}
          className={errorText ? "has-error" : ""}
          aria-label={label || `Date field`}
          aria-errormessage={errorText}
          aria-invalid={errorText && errorText !== "" ? true : false}
          formNoValidate
          autoFocus={autoFocus}
        />
      </>
      {!fit && (
        <small role="alert">
          {`${errorText != null ? errorText : ""}`}
        </small>
      )}
    </Container>
  );
};

export default InputDate;
