import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Button from "../../components/Inputs/Button";
import { Container } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { InitialStateGames } from "../../shared/models/Games";
import { selectGames, setLimitInMonths } from "../../store/gamesSlice";
import InputNumber from "../../components/Inputs/InputNumber";


const Settings: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const gamesStore = useSelector(selectGames) as InitialStateGames;

    const handleSubmit = (data: { limitInMonths: number }) => {
        // TODO: futuramente, guardar este valor na base de dados
        dispatch(setLimitInMonths(data.limitInMonths));
    }

    const formik = useFormik({
        onSubmit: handleSubmit,
        initialValues: {
            limitInMonths: gamesStore.limitInMonths
        },
    });

    return (
        <Container>
            <nav>
                <Button
                    btnTheme="secondary"
                    onClick={() => navigate('/')}
                    title="Configurações"
                >
                    {'<- Voltar'}
                </Button>
            </nav>
            <h2>Configurações</h2>
            <form onSubmit={formik.handleSubmit}>
                <InputNumber
                    name="limitInMonths"
                    value={formik.values.limitInMonths}
                    onChange={formik.handleChange}
                />
                <Button
                    btnTheme="primary"
                    type="submit"
                >
                    Salvar
                </Button>
            </form>
        </Container>
    );
};

export default Settings;