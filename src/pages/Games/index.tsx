import { useCallback, useEffect, useState } from "react";
import { FaPlus, FaPen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import Switch from "react-switch";
import {
    fetchGames,
    selectGames,
    toggleShowOnlyActiveGamesFilter,
} from "../../store/gamesSlice.js";
import { Game, InitialStateGames } from "../../shared/models/Games.ts";
import Button from "../../components/Inputs/Button/index";
import ModalAddOrEdit from "./ModalAddOrEdit/index";
import ModalCleaning from "./ModalCleaning/index.tsx";
import Card from "./Card/index.tsx";
import { Container, Loading, Toolbar } from "./styles";

const Games: React.FC = () => {

    const dispatch = useDispatch();
    const gamesStatus = useSelector(selectGames).status;
    const { games, monthLimit, showOnlyActiveGamesFilter } = useSelector(selectGames) as InitialStateGames;

    const subtitle = `Frequência de limpezas: ${monthLimit} meses`;

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalCleaningOpen, setModalCleaningOpen] = useState<boolean>(false);
    const [gameEditing, setGameEditing] = useState<Game|null>(null);
    const [activeEdition, setActiveEdition] = useState<boolean>(false);

    const toggleModal = useCallback(() => {
        setModalOpen(prevState => !prevState);
        // setModalOpen(!modalOpen);
    }, []);

    const toggleModalCleaning = useCallback(() => {
        setModalCleaningOpen(prevState => !prevState);
    }, []);

    const toggleActiveEdition = () => {
        setActiveEdition(prevState => !prevState);
    };

    const handleAddClick = () => {
        toggleModal();
    }

    const handleEnableEditingClick = () => {
        toggleActiveEdition();
    }

    const clearGameEditing = () => {
        setGameEditing(null);
    }

    const refreshGames = useCallback(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dispatch(fetchGames(showOnlyActiveGamesFilter) as any);
    }, [dispatch, showOnlyActiveGamesFilter]);

    useEffect(() => refreshGames(), [refreshGames]);

    return (
        <Container>    
            <h2>BG Limpo</h2>
            <small>{subtitle}</small>
            <Toolbar>
                <Button
                    btnTheme="primary"
                    onClick={handleAddClick}
                    title="Adicionar jogo"
                    disabled={gamesStatus === "pending" || games?.length === 0}
                >
                    <FaPlus />
                </Button>
                <Button
                    btnTheme="primary"
                    className={activeEdition ? "active" : ""}
                    onClick={handleEnableEditingClick}
                    title="Editar um jogo"
                    disabled={gamesStatus === "pending" || games?.length === 0}
                >
                    <FaPen />
                </Button>
                <span>
                    <label htmlFor="onlyActives">
                        <span>Exibir Somente Ativos</span>
                        <Switch
                            id="onlyActives"
                            onChange={(e) => dispatch(toggleShowOnlyActiveGamesFilter(e))}
                            checked={showOnlyActiveGamesFilter}
                        />
                    </label>
                </span>
            </Toolbar>
            {gamesStatus !== "pending" ? (
                <ul>
                    {(games as Game[])?.map((game: Game) => (
                        <Card
                            key={game.id}
                            game={game}
                            activeEdition={activeEdition}
                            setGameEditing={setGameEditing}
                            toggleModalCleaning={toggleModalCleaning}
                            toggleModal={toggleModal}
                        />
                    ))}
                </ul>
            ) : (
                <Loading>
                    <Skeleton
                        count={6}
                        height={132}
                        baseColor="#00000017"
                        highlightColor="#00000047"
                    />
                </Loading>
            )}

            <ModalAddOrEdit
                gameEditing={gameEditing}
                modalOpen={modalOpen}
                toggleModal={toggleModal}
                clearGameEditing={clearGameEditing}
            />

            <ModalCleaning
                gameEditing={gameEditing}
                modalOpen={modalCleaningOpen}
                toggleModal={toggleModalCleaning}
                clearGameEditing={clearGameEditing}
            />
        </Container>
    );
};

export default Games;