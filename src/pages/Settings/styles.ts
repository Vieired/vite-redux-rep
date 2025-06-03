import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    height: 100vh;

    @media (max-width: 768px) {
        flex-direction: column;
    }

    > nav {
        display: flex;
    }

    @media (min-width: 992px) {
        padding-left: 0;
        padding-right: 0;
        width: 900px;
        align-self: center;
    }
`;