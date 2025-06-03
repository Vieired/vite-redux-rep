import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: #fff2ea;

    @media (min-width: 992px) {
        padding-left: 0;
        padding-right: 0;
        justify-content: center;
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    height: 100vh;
    color: #D9753B;

    @media (max-width: 768px) {
        flex-direction: column;
    }

    > nav {
        display: flex;
    }

    @media (min-width: 992px) {
        padding-left: 0;
        padding-right: 0;
        width: 60rem;
        align-self: center;
    }

    > form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
`;

export const Buttons = styled.div`
    display: flex;
    justify-content: end;
`;