import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import Button from "../../components/Inputs/Button";
import { InitialStateGames } from "../../shared/models/Games";
import { selectGames, setLimitInMonths } from "../../store/gamesSlice";
import InputNumber from "../../components/Inputs/InputNumber";
import { Container, Content } from "./styles";


const Settings: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const gamesStore = useSelector(selectGames) as InitialStateGames;

    const handleSubmit = (data: { limitInMonths: number }) => {
        // TODO: futuramente, guardar este valor na base de dados
        dispatch(setLimitInMonths(data.limitInMonths));

        toast.success("Frequência de limpezas alterada com sucesso.", {
            toastId: "notification-message",
        });

        navigate('/');
    }

    const formik = useFormik({
        onSubmit: handleSubmit,
        initialValues: {
            limitInMonths: gamesStore.limitInMonths
        },
    });

    return (
        <Container>
            <Content>
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
                        label="Frequência de Limpeza (meses)"
                        placeholder="Exemplo: 6"
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
            </Content>
        </Container>
    );
};

export default Settings;