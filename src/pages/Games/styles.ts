import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
    background: #fffae8;

    > ul {
        display: flex;
        flex-direction: column;
        padding: 0;
        gap: 1rem;
        
        > li {
            display: grid;
            grid-template-columns: 1fr 1fr;
            justify-content: space-between;
            box-shadow: 0 0 8px 0px #82828282;
            border-radius: 16px;
            padding: 1rem;
            background: cornsilk;

            > p:first-of-type, p:nth-child(3) {
                justify-self: flex-start;
            }

            > p:nth-child(2) {
                justify-self: flex-end;

                &.limit {
                    color: red;
                }
            }

            > p:nth-child(3) {
                font-size: .8rem;
                color: #828282;
            }
        }
    }
    

    @media (max-width: 768px) {
        
    }
`;