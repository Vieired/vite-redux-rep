/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Select, {
  ActionMeta,
  GroupBase,
  MultiValue,
  OptionsOrGroups,
  components
} from 'react-select';
import { FaCaretDown } from 'react-icons/fa';
// import {
//   SelectMultiStyles,
//   SelectMultiStylesWithoutGreen,
// } from '@assets/styles/ReactSelectStyles';
import { Dropdown } from '../../../shared/models/domain/Select';
import { SelectStyles } from "../../../styles/SelectStyles";
import { Container } from './styles';


interface InputSelectMultiProps {
  selecteds?: Dropdown[];
  options: Dropdown[];
  invalid?: boolean;
  success?: boolean;
  disabled?: boolean;
  searchable?: boolean;
  className?: string;
  label?: string;
  name?: string;
  id?: string;
  placeholder?: string;
  disableSuccesBorderColor?: boolean;
  errorText?: string;
  fit?: boolean;
  // onChange?: (selecteds: Dropdown[]) => void;
  onChange?: ((newValue: MultiValue<Dropdown>, actionMeta: ActionMeta<Dropdown>) => void) | undefined
  onBlur?: () => void;
  onFocus?: () => void;
  loadOptions?: (
    inputValue: string,
    callback: (options: OptionsOrGroups<Dropdown, GroupBase<Dropdown>>) => void
  ) => void;
}

const InputSelectMulti: React.FC<InputSelectMultiProps> = ({
  selecteds = null,
  options,
  disabled,
  searchable,
  label,
  name,
  id,
  placeholder,
  errorText,
  onChange,
  onBlur,
  onFocus,
  className,
  fit,
}) => {
  
  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <FaCaretDown />
      </components.DropdownIndicator>
    );
  };

  return (
    <Container>
      {label && (
        <label
          htmlFor={id || name}
          className={errorText ? 'invalid' : ''}
        >
          {label}
        </label>
      )}
      <Select
        inputId={id || name}
        name={name}
        aria-labelledby={id || name}
        isMulti
        isClearable={true}
        value={selecteds}
        options={options}
        getOptionValue={(option: Dropdown) => option?.id || ""}
        getOptionLabel={(option: Dropdown) => option.name || ""}
        styles={{
          ...SelectStyles,
          control: (styles) => ({
              ...styles,
              borderColor: errorText ? 'red !important' : '#000',
              minHeight: '46px',
              width: '100%',
          })
        }}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        isDisabled={disabled}
        isSearchable={searchable}
        menuPortalTarget={document.body}
        placeholder={placeholder ?? 'Select'}
        className={className}
        components={{ DropdownIndicator }}
      />
      {!fit && (
        <small role="alert">
          {`${errorText != null ? errorText : ""}`}
        </small>
      )}
    </Container>
  );
};

export default InputSelectMulti;
