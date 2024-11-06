import { useCallback, useEffect, useState } from "react";
import { MdCleaningServices } from "react-icons/md";
// import { selectGames } from "../../store/gamesSlice.js";
// import { collection, query, getDocs, doc, setDoc } from "firebase/firestore";
// import { db } from "../../firebase/config.js";
import { useDispatch, useSelector } from "react-redux";
import { Game } from "../../shared/models/Games.js";
import {
    fetchGames,
    selectGames,
    updateCleaningDate,
} from "../../store/gamesSlice.js";
import { UnknownAction } from "@reduxjs/toolkit";
import { Container } from "./styles.js";
import Modal from "./Modal/index.js";




const Games: React.FC = () => {

    const dispatch = useDispatch();
    const games = useSelector(selectGames).games;

    // const [ games, setGames ] = useState<Game[]|null>(null);

    const monthLimit: number = 6;
    const subtitle = `Frequência de limpezas: ${monthLimit} meses`;
    const today = new Date().toISOString().split("T")[0];

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [gameEditing, setGameEditing] = useState<Game|null>(null);

    const toggleModal = useCallback(() => {
        setModalOpen(prevState => !prevState);
        // setModalOpen(!modalOpen);
    }, []);

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

    const checkLimit = (startDate: string, endDate: string): boolean => {
        const diff = getDiffDays(startDate, endDate);
        return Math.floor(diff / 30) >= monthLimit;
    }

    const handleCleaningClick = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        e.preventDefault();
        console.log(id);
        dispatch(updateCleaningDate({id}) as unknown as UnknownAction);
        // dispatch(updateCleaningDate({id}) as unknown as UnknownAction).then(() => {
        //     dispatch(fetchGames() as unknown as UnknownAction);
        // });
    }

    const getImage = () => {
        // const seed = new Date().getMilliseconds();
        return `https://picsum.photos/100`;
        // return `https://picsum.photos/seed/{${seed}}/picsum/100`;
    }

    const handleEditClick = (game: Game) => {
        setGameEditing(game);
        toggleModal();
    }

    const gamesStatus = useSelector(selectGames).status;
    useEffect(() => {
        if(gamesStatus === 'idle') {
            dispatch(fetchGames() as unknown as UnknownAction);
        }
    }, [dispatch, gamesStatus]);

    return (
        <Container>    
            <h2>Coleção de Jogos - Últimas Limpezas</h2>
            <small>{subtitle}</small>
            <ul>
                {(games as Game[])?.map((game: Game) => (
                    <li
                        key={game.id}
                        className={checkLimit(game.cleaning_date, today) ? "pending-maintenance" : ""}
                    >
                        <span>
                            <img src={game?.photoUrl} onError={() => getImage()} alt={game?.name || "Imagem do jogo"} />
                        </span>
                        <span>
                            <h3>
                                <button type="button" onClick={() => handleEditClick(game)}>
                                    {game?.name || "N/A"}
                                </button>
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
                        <button
                            type="button"
                            onClick={(e) => handleCleaningClick(e, game.id)}
                            title="Atualizar Limpeza"
                        >
                            <MdCleaningServices />
                        </button>
                    </li>
                ))}
            </ul>

            <Modal gameEditing={gameEditing} modalOpen={modalOpen} toggleModal={toggleModal} />
        </Container>
    );
};

export default Games;