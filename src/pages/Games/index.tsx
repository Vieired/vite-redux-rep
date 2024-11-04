import { useEffect } from "react";
// import { FaHandsWash } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import { selectGames } from "../../store/gamesSlice.js";
// import { collection, query, getDocs, doc, setDoc } from "firebase/firestore";
// import { db } from "../../firebase/config.js";
import { Container } from "./styles.js";
import { Game } from "../../shared/models/Games.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames, selectGames, updateCleaningDate } from "../../store/gamesSlice.js";
import { UnknownAction } from "@reduxjs/toolkit";



const Games: React.FC = () => {

    const dispatch = useDispatch();
    const games = useSelector(selectGames).games;

    // const [ games, setGames ] = useState<Game[]|null>(null);

    const monthLimit: number = 6;
    const subtitle = `Frequência para Limpeza: ${monthLimit} meses`;
    const today = new Date().toISOString();

    const getDiffDays = (startDate: string, endDate: string): number => {
        const partidaViagem = new Date(startDate);
        const partidaPrimEtapa = new Date(endDate);
        const timeDiff = Math.abs(partidaPrimEtapa.getTime() - partidaViagem.getTime());
        const diffDays = Math.round(timeDiff / (1000 * 3600 * 24));
        // const diffMinutes = Math.ceil(timeDiff / (1000 * 60));
        return diffDays;
    }

    const getTimeSinceLastCleaning = (startDate: string, endDate: string) => {
        const diff = getDiffDays(startDate, endDate);
        if(diff < 30) {
            return `${diff} dias`
        }

        return `${Math.floor(diff / 30)} meses e ${diff%30} dias`;
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
                    <li key={game.id}>
                        <span>
                            <p><strong>{game?.name || "N/A"}</strong></p>
                            <p className={checkLimit(game.cleaning_date, today) ? "limit" : ""}>
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
                            Limpar
                            {/* <FaHandsWash /> */}
                        </button>
                    </li>
                ))}
            </ul>
        </Container>
    );
};

export default Games;