import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../../store/Stock.store";
import { RootState } from "../../store";
import { Buttons, Container } from "./styles";


const Video: React.FC = () => {

    const dispatch = useDispatch();
    const stock = useSelector((state: RootState) => state.stock);

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