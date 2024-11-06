import { ButtonHTMLAttributes } from "react";
import { Container } from "./styles";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    btnTheme: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'link';
    type?: "submit" | "reset" | "button";
    // bigSize?: boolean;
}

const Button: React.FC<Props> = ({ type = "button", ...rest }) => (
    <Container {
        ...{
            ...rest,
            type
        }
    } />
);

export default Button;