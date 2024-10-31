import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { selectGames } from "../../store/gamesSlice.js";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config.js";
import { Container } from "./styles.js";
import { Game } from "../../shared/models/Games.js";



const Games: React.FC = () => {

    const monthLimit: number = 6;
    const subtitle = `Frequência para Limpeza: ${monthLimit} meses`;
    const today = new Date().toISOString();
    // const games = useSelector(selectGames);
    const [ games, setGames ] = useState<Game[]|null>(null);

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

    useEffect(() => {
        const fetchGames = async () => {
            const q = query(collection(db, "jogos"));

            const querySnapshot = await getDocs(q);
            const gameList: Game[] = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                gameList.push({
                    // id: doc.id,
                    ...doc.data() as Game
                });
            });

            const sortedGameList = gameList.sort(function (a,b) {
                return new Date(a.cleaning_date)<new Date(b.cleaning_date)?-1:new Date(a.cleaning_date)>new Date(b.cleaning_date)?1:0;
            })

            setGames(sortedGameList);
            // setGames(prevState => [
            //     ...prevState || [],
            //     ...doc.data() as Game[]
            // ]);
        }

        fetchGames();
    }, []);

    return (
        <Container>    
            <h2>Últimas Limpezas Nos Board Games</h2>
            <small>{subtitle}</small>
            <ul>
                {(games as Game[])?.map((game: Game) => (
                    <li key={game.id}>
                        <p>{game?.name || "N/A"}</p>
                        <p>
                            {game?.cleaning_date
                                ? new Date(game.cleaning_date).toLocaleDateString(
                                    'pt-BR',
                                    {timeZone:"UTC",dateStyle:'short'}
                                )
                                : "N/A"
                            }
                        </p>
                        <p className={checkLimit(game.cleaning_date, today) ? "limit" : ""}>
                            { getTimeSinceLastCleaning(game.cleaning_date, today) }
                        </p>
                    </li>
                ))}
            </ul>
        </Container>
    );
};

export default Games;