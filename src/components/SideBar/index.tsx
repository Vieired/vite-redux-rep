// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../store';
// import { increment, decrement } from '../../store/Stock/Stock.actions';
import { Container } from "./styles";

const SideBar: React.FC = () => {

    // const dispatch = useDispatch();
    // const stock = useSelector((state: RootState) => state.stock);

    return (
        <Container>
            <h3>Lista</h3>
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