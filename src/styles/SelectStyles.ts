import { StylesConfig } from "react-select";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const SelectStyles: StylesConfig<any, true> = {
    container: (provided: any) => ({
      ...provided,
      width: '100%',
      maxWidth: 'min-content',
      minWidth: '100%',
    }),
    control: (provided: any) => ({
      ...provided,
      width: '100%',
      // border: '1px solid #000',
      borderRadius: '4px',
      padding: '0',
      // fontSize: '0.9rem',
      // boxShadow: state.selectProps.invalid
      //   ? 'inset 0 1px 1px rgba(0, 0, 0, 0.075),0 0 8px rgba(102, 55, 55, 0.6)'
      //   : state.isFocused
      //   ? 'inset 0 1px 1px rgba(0, 0, 0, 0.075),0 0 8px rgba(102, 175, 233, 0.6)'
      //   : 'unset',
      boxShadow: 'none',
      minHeight: '32px',
      '&:hover': {
        ...provided['&:hover'],
        borderColor: 'var(--color-lightGrey)',
      },
      '&:focused': {
        ...provided['&:focused'],
        borderColor: 'var(--color-lightGrey)',
      },
    //   alignContent: 'flex-start',
    }),
    // indicatorSeparator: () => ({
    //   display: 'none',
    // }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      // marginRight: '10px',
      '> div:first-of-type': {
        ...provided['> div:first-of-type'],
        padding: '2px 8px',
        borderRadius: '0 3px 3px 0',
      },
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      backgroundColor: 'var(--gray0)',
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      '&:hover': {
        ...provided['&:hover'],
        color: '#FFF',
      },
      padding: '2px 8px',
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: '6px 8px',
      textAlign: 'left',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      overflow: 'visible',
    }),
    menu: (provided: any) => ({
      ...provided,
      width: "max-content",
      minWidth: "100%",
      textAlign: 'left',
    //   zIndex: 100,
    }),
    menuList: (provided: any) => ({
      ...provided,
      maxHeight: '200px'
    //   fontSize: '0.9rem',
    }),
};