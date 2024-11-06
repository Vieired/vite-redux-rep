import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
    background: #fffae8;
    color: #D9753B;

    > ul {
        display: flex;
        flex-direction: column;
        padding: 0;
        gap: 1rem;
        
        > li {
            display: grid;
            grid-template-columns: 100px auto min-content;
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

                @media (min-width: 768px) {
                    grid-template-columns: 4fr 1fr 1fr;
                }
                
                > h3 {
                    padding: 0;
                    margin: 0;
                    text-align: left;

                    > button {
                        background: transparent;
                        color: inherit;
                    }
                }

                > p:first-of-type, p:nth-child(3) {
                    justify-self: flex-start;
                }
    
                > p:nth-child(2) {
                    justify-self: flex-start;
                    align-content: end;
                    color: #ffffff63;
                }
    
                > p:nth-child(3) {
                    align-content: end;
                    font-size: .8rem;
                    color: #ffffff63;
                }
            }

            > button {
                background-color: #ffffff4a;
                padding: 0.6em 0.3em;
                font-size: 2rem;
            }
        }
    }
    

    @media (max-width: 768px) {
        
    }
`;