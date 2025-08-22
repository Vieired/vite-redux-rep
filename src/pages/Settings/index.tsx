import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft as LeftIcon, FaCheck } from 'react-icons/fa';
import { useFormik } from "formik";
import Button from "../../components/Inputs/Button";
import { InitialStateGames } from "../../shared/models/Games";
import { fetchGames, selectGames, updateSettings } from "../../store/gamesSlice";
import InputNumber from "../../components/Inputs/InputNumber";
import { Container, Content, Buttons } from "./styles";


const Settings: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { showOnlyActiveGamesFilter } = useSelector(selectGames);
    const gamesStore = useSelector(selectGames) as InitialStateGames;

    const handleSubmit = (data: { limitInMonths: number }) => {

        // dispatch(setLimitInMonths(data.limitInMonths));

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dispatch(updateSettings({cleaningFrequency: data.limitInMonths}) as any)
            .then(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                dispatch(fetchGames(showOnlyActiveGamesFilter) as any);
                // dispatch(fetchSettings() as any);
            })

        toast.success("Frequência de limpezas alterada com sucesso.", {
            toastId: "notification-message",
        });

        navigate('/');
    }

    const formik = useFormik({
        onSubmit: handleSubmit,
        initialValues: {
            limitInMonths: gamesStore?.limitInMonths || 0
        },
    });

    return (
        <Container>
            <Content>
                <nav>
                    <Button
                        btntheme="secondary"
                        onClick={() => navigate('/')}
                        title="Configurações"
                    >
                        <LeftIcon /> Voltar
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
                    <Buttons>
                        <Button
                            btntheme="primary"
                            type="submit"
                            disabled={!formik.dirty}
                        >
                            <FaCheck /> Salvar
                        </Button>
                    </Buttons>
                </form>
            </Content>
        </Container>
    );
};

export default Settings;