import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
    color: #D9753B;

    > ul {
        display: flex;
        flex-direction: column;
        padding: 0;
        gap: 1rem;
    }

    /* @media (max-width: 768px) {
        
    } */
`;

export const Toolbar = styled.div`
    display: flex;
    gap: 1rem;

    @media (max-width: 768px) {
        position: fixed;
        bottom: 16px;
        background: #0000006b;
        /* box-shadow: 0 0 13px 4px #000000d4; */
        padding: 8px;
        border-radius: 1rem;

        > button {
            border-radius: 50%;
            height: 48px;
            width: 48px;
            background: #ABC106;
            padding: 0;

            &.active {
                background-color: var(--Catan-2-hex-dark5);
                color: #FFF;
            }

            &:focus-visible {
                outline: 6px auto #fff;
                outline-offset: 4px;
            }
        }
    }
`;

export const Loading = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem 0;

    > span {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 1px;
    }
`;