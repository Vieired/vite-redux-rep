import styled from "styled-components";

interface Props {
    bigSize?: boolean;
}
export const Container = styled.div<Props>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    transition: all 200ms;
    align-self: flex-end;
    flex-direction: column;
    /* margin-bottom: 4px; */
    align-self: flex-start;

    label {
        align-self: start;
        padding: 0 4px 4px 0;

        &.invalid {
            color: var(--color-red)
        }
    }

    > div {
        display: flex;
        max-width: min-content;
        min-width: 100%;        
        
        button {
            line-height: 0;
            min-height: 32px;
            width: 29px;
            max-width: 29px;
            min-width: 29px;
            border-radius: 5px;
            font-family: 'Couplet',sans-serif;
            font-style: normal;
            font-weight: 400;
            font-size: var(--font-button);
            background-color: var(--gray1);
            border: none;
            color: #FFF;
            -webkit-transition: opacity .3s;
            transition: opacity .3s;

            &:focus-visible {
                outline: dashed #FFF 1px;
                outline-offset: -4px;
            }

            &:first-of-type {
                border-start-end-radius: 0;
                border-end-end-radius: 0;
            }

            &:last-of-type {
                border-end-start-radius: 0;
                border-start-start-radius: 0;
            }

            &:disabled {
                background-color: var(--gray3B);
                color: #FFF;
                border-color: var(--gray3B);
            }
        }

        input {
            width: 100%;
            font-size: ${props => props.bigSize ? '16px' : 'inherit'};
            background: #fff;
            min-height: ${props => props.bigSize ? 40 : 32}px;
            min-width: 38px;
            border: 1px solid #949494;
            padding: 4px 8px;
            text-align: center;
            border-radius: 5px;
    
            &:disabled {
                background: var(--gray6);
            }

            &:focus-visible {
                outline-offset: -2px;
            }

            &.has-error {
                border-color: var(--color-red);
            }
        }

        > button+input {
            border-radius: 0;
        }
    }

    input[type=number]::-webkit-inner-spin-button { 
        -webkit-appearance: none;
    }
    input[type=number] { 
        -moz-appearance: textfield;
        appearance: textfield;
    }

    small {
        margin-top: 2px;
        align-self: start;
        text-align: left;
        color: red;
        min-height: 15px;
    }
`;