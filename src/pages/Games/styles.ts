import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;

    > ul {
        display: flex;
        flex-direction: column;
        padding: 0;
        gap: 1rem;
        
        > li {
            display: flex;
            justify-content: space-between;
            box-shadow: 0 0 8px 0px #82828282;
            padding: 1rem;
        }
    }
    

    @media (max-width: 768px) {
        
    }
`;