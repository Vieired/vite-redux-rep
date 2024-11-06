import styled, { css } from "styled-components";

interface Props {
    btnTheme: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'link';
    // bigSize?: boolean;
}

export const Container = styled.button<Props>`
    padding: 8px 16px;
    line-height: 0;
    min-height: 32px;
    border-radius: 5px;
    font-family: 'Couplet', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: var(--font-button);
    /* width: 100%; */

    ${prop => {
        if (prop?.btnTheme === 'primary') {
            return css<Props>`
                /* margin: 8px 0; */
                background-color: var(--gray1);
                border: none;
                color: #FFF;            
                transition: opacity .3s;

                &:not(:disabled):hover {
                    opacity: .8;
                    background-color: var(--gray2)
                }

                &:disabled {
                    /* background-color: var(--gray5);
                    color: var(--gray4); */
                    background-color: var(--gray3B);
                    color: #FFF;                    
                }

                &:focus-visible {
                    outline: dashed #FFF 1px;
                    outline-offset: -4px;
                }
            `;
        }
        
        if (prop?.btnTheme === 'secondary') {
            return css<Props>`
                /* margin: 8px 0; */
                background-color: #FFF;
                border: 2px solid var(--gray0);
                color: var(--gray1);            
                transition: opacity .3s;
                font-weight: 600;

                &:not(:disabled):hover {
                    opacity: .8;
                    background-color: var(--gray2);
                    color: #FFF;
                    border-color: var(--gray2);
                }

                &:disabled {
                    /* background-color: #FFF;
                    color: var(--gray4);
                    border-color: var(--gray4); */
                    background-color: var(--gray3B);
                    color: #FFF;
                    border-color: var(--gray3B);
                }

                &:focus-visible, &:focus {
                    outline: dashed #000 1px;
                    outline-offset: -4px;

                    &:not(:disabled):hover {
                        outline-color: #FFF;
                    }
                }                
            `;
        }

        if (prop?.btnTheme === 'tertiary') {
            return css<Props>`
                background-color: var(--gray6);
                border: 1px solid var(--gray3B);
                color: var(--gray1);            
                transition: opacity .3s;

                &:not(:disabled):hover {
                    opacity: .8;
                    background-color: var(--gray2);
                    color: #FFF;
                    border-color: var(--gray2);
                }

                &:disabled {
                    background-color: var(--gray3B);
                    color: #FFF;
                }

                &:focus-visible {
                    outline: dashed var(--gray4) 1px;
                    outline-offset: -4px;

                    &:not(:disabled):hover {
                        outline-color: #FFF;
                    }
                }
            `;
        }

        if (prop?.btnTheme === 'quaternary') {
            return css<Props>`
                padding: 4px 16px;
                color: var(--gray0);
                background-color: transparent;
                border: 1px solid transparent;
                transition: opacity .3s;

                > svg {
                    font-size: 20px;
                }

                &:not(:disabled):hover {
                    opacity: .8;
                    background-color: var(--gray3B);
                    color: #FFF;
                    border-color: transparent;
                }

                &:disabled {
                    background-color: var(--gray3B);
                    color: #FFF;
                }

                /* &:focus {
                    background-color: var(--gray3B);
                    color: #FFF;
                    border-color: transparent;                    
                } */

                &:focus-visible {
                    outline: dashed var(--gray4) 1px;
                    outline-offset: -4px;

                    &:not(:disabled):hover {
                        outline-color: #FFF;
                    }
                }
            `;
        }
    }}

    ${props => {
        if (props?.btnTheme === 'link') {
            return css<Props>`
                padding: 10px;
                background-color: transparent;
                width: auto;
                color: #E0FF4F;

                &:hover {
                    text-decoration: underline;
                }

                &:disabled {
                    background-color: var(--gray5);
                    color: var(--gray4);
                }

                &:focus-visible {
                    outline: dashed #000 1px;
                    outline-offset: -4px;
                }
            `;
        }
    }}
`;