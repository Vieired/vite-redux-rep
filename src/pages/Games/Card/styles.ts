import styled from "styled-components";

export const Container = styled.li`
    display: grid;
    grid-template-columns: min-content auto min-content;
    box-shadow: 3px 3px 4px 1px #0000009c;
    border-radius: 16px;
    padding: 1rem;
    background: #023F56;
    color: #F5F5F5;
    gap: 1rem;

    &.pending-maintenance {
        background: #C30414;
    }

    > span {
        display: grid;
        justify-content: space-between;
        gap: 1rem;

        @media (min-width: 768px) {
            grid-template-columns: 5fr 3fr 1fr;
        }

        @media (min-width: 1200px) {
            grid-template-columns: 4fr 2fr 1fr;
        }
        
        > h3 {
            padding: 0;
            margin: 0;
            text-align: left;
        }

        > p:first-of-type, p:nth-child(3) {
            justify-self: flex-start;
        }

        > p:nth-child(2) {
            justify-self: flex-start;
            align-content: end;
            color: #ffffff75;
            text-align: start;
        }

        > p:nth-child(3) {
            align-content: end;
            font-size: .8rem;
            color: #ffffff75;
        }

        &:first-of-type {
            align-self: center;
            width: 100px;
            background: radial-gradient(transparent, #00000038);

            > img {
                width: 100px;
                max-width: inherit;
                max-height: 100px;
                object-fit: contain;
                object-position: center;
            }
        }
    }

    > span:last-of-type {
        grid-template-columns: 1fr;
        
        @media (min-width: 768px) {
            display: flex;
        }
        
        > button {
            background-color: #ffffff4a;
            padding: 0.6em 0.3em;
            font-size: 2rem;

            &:focus {
                outline: none;
                outline-offset: none;
            }
            &:focus-visible {
                outline: 4px auto #fff;
            }
        }
    }
`;