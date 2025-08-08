import { ButtonHTMLAttributes } from "react";
import { Container } from "./styles";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    btntheme?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'link';
    type?: "submit" | "reset" | "button";
    // bigSize?: boolean;
}

const Button: React.FC<Props> = ({ type = "button", btntheme = "primary", ...rest }) => (
    <Container {
        ...{
            ...rest,
            btntheme,
            type
        }
    } />
);

export default Button;