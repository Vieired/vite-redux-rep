import { useCallback, useEffect, useMemo, useState } from "react";
import { MdCleaningServices } from "react-icons/md";
import { FaPlus, FaPen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { UnknownAction } from "@reduxjs/toolkit";
import Skeleton from "react-loading-skeleton";
import {
    fetchGames,
    selectGames,
} from "../../store/gamesSlice.js";
import { Game } from "../../shared/models/Games.ts";
import ModalAddOrEdit from "./ModalAddOrEdit/index";
import ModalCleaning from "./ModalCleaning/index.tsx";
import Button from "../../components/Inputs/Button/index";
import { Container, Loading, Toolbar } from "./styles";

const Games: React.FC = () => {

    const dispatch = useDispatch();
    const games = useSelector(selectGames).games;

    const monthLimit: number = 6;
    const subtitle = `Frequência de limpezas: ${monthLimit} meses`;
    const today = new Date().toISOString().split("T")[0]; // TODO: mover para o store Redux

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

    const getDiffDays = (startDate: string, endDate: string): number => {
        const a = new Date(startDate);
        const b = new Date(endDate);
        const timeDiff = Math.abs(b.getTime() - a.getTime());
        const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
        // const diffDays = Math.round(timeDiff / (1000 * 3600 * 24));
        // const diffMinutes = Math.ceil(timeDiff / (1000 * 60));
        return diffDays;
    }

    const getDiffMonths = (startDate: string, endDate: string): number => {
        const a = new Date(startDate);
        const b = new Date(endDate);
        let diff =(a.getTime() - b.getTime()) / 1000;
        diff /= (60 * 60 * 24 * 7 * 4);
        return Math.abs(Math.round(diff));
    }

    const getTimeSinceLastCleaning = (startDate: string, endDate: string) => {
        const diffDays = getDiffDays(startDate, endDate);
        const diffMonths = getDiffMonths(startDate, endDate) -1;

        const days = diffDays % 31;
        const months = diffMonths % 12;
        const years = Math.floor(diffDays / 365);

        if(diffDays < 30) {
            const descriptionOfDays = days > 0 ? `${Math.floor(diffDays)} dia${days > 1 ? "s" : ""}` : "";
            return descriptionOfDays
        }

        if(diffDays < 365) {
            const descriptionOfDays = days > 0 ? `${days} dia${days > 1 ? "s" : ""}` : "";
            const descriptionOfMonths = months > 0 ? `${months} mes${months > 1 ? "es" : ""}` : "";
            return months > 0
                ? `${descriptionOfMonths} e ${descriptionOfDays}`
                : descriptionOfDays
        }

        const descriptionOfYears = years > 0 ? `${years} ano${years > 1 ? "s" :""}` : "";
        const descriptionOfMonths = months > 0 ? `${months} mes${months > 1 ? "es" : ""}` : "";
        const descriptionOfDays = days > 0 ? ` e ${days} dia${days > 1 ? "s" : ""}` : "";
        return `${descriptionOfYears} ${descriptionOfMonths} ${descriptionOfDays}`
    }

    const checkLimit = (startDate: string): boolean => {
        const diff = getDiffMonths(startDate, today);
        return diff > monthLimit;
    }

    const randomImage = useMemo(() => {
        // const seed = new Date().getMilliseconds();
        return `https://picsum.photos/100`;
        // return `https://picsum.photos/seed/{${seed}}/picsum/100`;
    }, []);

    const handleCleaningClick = (game: Game) => {
        setGameEditing(game);
        toggleModalCleaning();
    }

    const handleEditClick = (game: Game) => {
        setGameEditing(game);
        toggleModal();
    }

    const handleAddClick = () => {
        toggleModal();
    }

    const handleEnableEditingClick = () => {
        toggleActiveEdition();
    }

    const clearGameEditing = () => {
        setGameEditing(null);
    }

    const gamesStatus = useSelector(selectGames).status;
    useEffect(() => {
        if(gamesStatus === 'idle') {
            dispatch(fetchGames() as unknown as UnknownAction);
        }
    }, [dispatch, gamesStatus]);

    return (
        <Container>    
            <h2>BG Limpo</h2>
            <small>{subtitle}</small>
            <Toolbar>
                <Button
                    btnTheme="primary"
                    onClick={handleAddClick}
                    title="Adicionar jogo"
                    disabled={gamesStatus === "pending"}
                >
                    <FaPlus />
                </Button>
                <Button
                    btnTheme="primary"
                    className={activeEdition ? "active" : ""}
                    onClick={handleEnableEditingClick}
                    title="Editar um jogo"
                    disabled={gamesStatus === "pending"}
                >
                    <FaPen />
                </Button>
            </Toolbar>
            {gamesStatus !== "pending" ? (
                <ul>
                    {(games as Game[])?.map((game: Game) => (
                        <li
                            key={game.id}
                            className={checkLimit(game.cleaning_date) ? "pending-maintenance" : ""}
                        >
                            <span>
                                <img
                                    src={game?.photoUrl || randomImage}
                                    alt={game?.name || "Imagem do jogo"}
                                />
                            </span>
                            <span>
                                <h3>
                                    {game?.name || "N/A"}
                                </h3>
                                <p>
                                    { getTimeSinceLastCleaning(game.cleaning_date, today) }
                                </p>
                                <p>
                                    Última limpeza: {game?.cleaning_date
                                        ? new Date(game.cleaning_date).toLocaleDateString(
                                            'pt-BR',
                                            {timeZone:"UTC",dateStyle:'short'}
                                        )
                                        : "N/A"
                                    }
                                </p>
                            </span>
                            <span>
                                {checkLimit(game.cleaning_date) && (
                                    <button
                                        type="button"
                                        onClick={() => handleCleaningClick(game)}
                                        title="Atualizar Limpeza"
                                    >
                                        <MdCleaningServices />
                                    </button>
                                )}
                                {activeEdition && (
                                    <button
                                        type="button"
                                        onClick={() => handleEditClick(game)}
                                        title="Atualizar Limpeza"
                                    >
                                        <FaPen />
                                    </button>
                                )}
                            </span>
                        </li>
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