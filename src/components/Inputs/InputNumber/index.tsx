import { Container } from "./styles";

interface Props {
    value?: number;
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
    maxLength?: number;
    errorText?: string;
    fit?: boolean;
    onChange?(e: React.ChangeEvent<unknown>): void;
    onBlur?(e: React.FocusEvent<unknown>): void;
}

const InputNumber: React.FC<Props> = ({
    value = 0,
    id,
    name,
    label,
    placeholder = '',
    className = '',
    autoComplete = false,
    autoFocus = false,
    readOnly = false,
    disabled = false,
    hidden = false,
    maxLength = undefined,
    errorText,
    fit = false,
    onChange,
    onBlur
}) => {

    return (
        <Container className={className}>
            { label && (
                <label
                    htmlFor={id || name}
                    className={errorText ? 'invalid' : ''}
                >
                    {label}
                </label>
            )}
            <input
                value={value}
                id={id || name}
                name={name}
                type="number"
                placeholder={placeholder}
                autoComplete={autoComplete ? 'on' : 'off'}
                autoFocus={autoFocus}
                readOnly={readOnly}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
                hidden={hidden}
                maxLength={maxLength}
                className={errorText ? 'has-error' : ''}
                aria-label={label || placeholder || `Campo do tipo número`}
                aria-errormessage={errorText}
                aria-invalid={errorText && errorText!=='' ? true : false}
            />
            {!fit && (
                <small role="alert">
                    {`${errorText != null ? errorText : ""}`}
                </small>
            )}
        </Container>
    );
}

export default InputNumber;