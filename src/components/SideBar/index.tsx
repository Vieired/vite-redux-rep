import { useDispatch } from 'react-redux';
import { decrement, increment } from '../../store/stockSlice';
import { Container } from "./styles";

const SideBar: React.FC = () => {

    const dispatch = useDispatch();
    // const stock = useSelector((state: RootState) => state.stock);

    return (
        <Container>
            <h2>Lista</h2>
            <button
                type="button"
                onClick={() => dispatch(decrement())}>-</button>
            <button
                type="button"
                onClick={() => dispatch(increment())}>+</button>

            {/* <p>{stock.counter}</p>
            <button
                type="button"
                onClick={() => dispatch(increment())}>+</button>
            <button
                type="button"
                onClick={() => dispatch(decrement())}>-</button> */}
            {/* <aside>
                {modules?.map((module: Module) => (
                    <div key={module.id}>
                        <strong>{module.title}</strong>
                        <ul>
                            {module?.lessons?.map((lesson:Lesson) => (
                                <li key={lesson.id}>{lesson.title}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </aside> */}
        </Container>
    );
};

export default SideBar;