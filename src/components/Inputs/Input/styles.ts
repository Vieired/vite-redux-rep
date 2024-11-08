import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    /* align-items: center; */
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
            color: red
        }        
    }

    input {
        /* width: 100%; */
        font-size: inherit;
        background: #fff;
        min-height: 32px;
        border: 1px solid #000;
        border-radius: 4px;
        padding: 6px 8px;

        &:disabled {
            background: var(--gray6);
        }

        &:focus {
            border-color: #545456;
        }

        &.has-error {
            border-color: red;
        }
    }

    textarea {
        width: 100%;
        font-size: inherit;
        background: #fff;
        min-height: 32px;
        border: 1px solid var(--gray3B);
        border-radius: 4px;
        padding: 6px 16px;

        &:disabled {
            background: var(--gray6);
        }

        &:focus {
            border-color: #545456;
        }

        &.has-error {
            border-color: red;
        }
    }

    small {
        margin-top: 2px;
        align-self: start;
        text-align: left;
        color: red;
        min-height: 15px;
        width: inherit;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.8rem;
    }
`;