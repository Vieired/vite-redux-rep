import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { selectGames } from "../../store/gamesSlice.js";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config.js";
import { Container } from "./styles.js";
import { Game } from "../../shared/models/Games.js";



const Games: React.FC = () => {

    // const games = useSelector(selectGames);
    const [ games, setGames ] = useState<Game[]|null>(null);

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
            setGames(gameList);
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
                    </li>
                ))}
            </ul>
        </Container>
    );
};

export default Games;