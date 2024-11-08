import styled from "styled-components";
import icon from '../../../assets/img/calendar.svg';

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    label {
        align-self: start;
        padding: 0 4px 4px 0;

        &.invalid {
            color: red
        }        
    }

    > input {
        /* width: 100%; */
        display: flow;
        font-family: 'Couplet', sans-serif;
        font-size: inherit;
        background: #fff;
        min-height: 32px;
        border: 1px solid #000;
        border-radius: 4px;
        padding: 5px 0 5px 8px;

        &:disabled {
            background: var(--gray6);
        }

        &:focus {
            border-color: #545456;
        }

        &.has-error {
            border-color: red;
        }

        &::-webkit-calendar-picker-indicator {
            background: var(--gray0);
            width: 25px;
            height: 38px;
            margin-top: -16px;
            margin-bottom: -16px;
            background: url(${icon}) center no-repeat, var(--gray0);
            border-radius: 0 2px 2px 0;
            cursor: pointer;
        }
    }

    small {
        margin-top: 2px;
        align-self: start;
        text-align: left;
        color: red;
        min-height: 15px;
        width: inherit;
        font-size: 0.8rem;
    }
`;