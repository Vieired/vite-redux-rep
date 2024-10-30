import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../../store/stockSlice";
import { selectStock } from "../../store/stockSlice";
import { Buttons, Container } from "./styles";


const Video: React.FC = () => {

    const dispatch = useDispatch();
    const stock = useSelector(selectStock);

    return (
        <Container>
            <h2>{`Módulo ${stock.counter}`}</h2>
            <span>Aula X</span>
            <br />
            <br />
            <Buttons>
                <button
                    type="button"
                    onClick={() => dispatch(decrement())}>-</button>
                <button
                    type="button"
                    onClick={() => dispatch(increment())}>+</button>
            </Buttons>
        </Container>
    );
};

export default Video;