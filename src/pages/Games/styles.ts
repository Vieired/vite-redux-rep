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
        
        > li {
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

            > span {
                display: grid;
                justify-content: space-between;

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

                    > button {
                        padding: 0;
                        margin: 0;
                        text-align: left;
                        background: transparent;
                        color: inherit;
                        border: none;
                        border-radius: 1px;

                        &:focus {
                            outline: none;
                            outline-offset: none;
                        }

                        &:focus-visible {
                            outline: 6px auto #fff;
                            outline-offset: 4px;
                        }

                        &:hover, &:active, &:focus, &:target {
                            border: none;
                        }
                    }
                }

                > p:first-of-type, p:nth-child(3) {
                    justify-self: flex-start;
                }
    
                > p:nth-child(2) {
                    justify-self: flex-start;
                    align-content: end;
                    color: #ffffff63;
                    text-align: start;
                }
    
                > p:nth-child(3) {
                    align-content: end;
                    font-size: .8rem;
                    color: #ffffff63;
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
        }
    }
    

    @media (max-width: 768px) {
        
    }
`;

export const Toolbar = styled.div`
    display: flex;

    @media (max-width: 768px) {
        position: fixed;
        bottom: 16px;
        background: #0000006b;
        /* box-shadow: 0 0 13px 4px #000000d4; */
        padding: 8px;
        border-radius: 50%;

        > button {
            border-radius: 50%;
            height: 48px;
            width: 48px;
            background: #39ad00;
            background: #ABC106;
            padding: 0;
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