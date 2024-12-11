import { useMemo } from "react";
import { MdCleaningServices } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectGames } from "../../../store/gamesSlice";
import { Game } from "../../../shared/models/Games";
import { Container } from "./styles";

interface Props {
    game: Game;
    activeEdition: boolean;
    setGameEditing: (game: Game) => void;
    toggleModalCleaning: () => void;
    toggleModal: () => void;
}

const Card: React.FC<Props> = ({
    game,
    activeEdition,
    setGameEditing,
    toggleModalCleaning,
    toggleModal,
}) => {
    
    const { monthLimit, today } = useSelector(selectGames);

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
        const anoInicial = a.getFullYear();
        const mesInicial = a.getMonth();
        const diaInicial = a.getDate();
        const anoFinal = b.getFullYear();
        const mesFinal = b.getMonth();
        const diaFinal = b.getDate();
    
        // Calcula a diferença total em meses
        let diferencaMeses = (anoFinal - anoInicial) * 12 + (mesFinal - mesInicial);

        // Ajusta para meses completos
        if (diaFinal < diaInicial) {
            diferencaMeses--;
        }

        return diferencaMeses;
    }

    const getTimeSinceLastCleaning = (startDate: string, endDate: string) => {
        const diffDays = getDiffDays(startDate, endDate);
        const diffMonths = getDiffMonths(startDate, endDate);

        // const days = Math.floor(diffDays % 30.6); // adicionei o decimal 0,6 e o arredondamento para baixo, para amenizar o erro de cálculo produzido pelo fato de existir variância de dias entre os meses
        const days = diffDays > 365 ? diffDays % 365 : Math.floor(diffDays % 30.6);
        const months = diffMonths % 12;
        const years = Math.floor(diffDays / 365);
        // const years = Math.floor(diffMonths / 12);

        if(diffDays < 30) { // dias
            return days > 0 ? `${Math.floor(diffDays)} dia${days > 1 ? "s" : ""}` : "";
        }

        if(diffMonths < 12) { // meses
            const descriptionOfMonths = months > 0 ? `${months} mes${months > 1 ? "es" : ""}` : "";
            const descriptionOfDays = days > 0 ? `${days} dia${days > 1 ? "s" : ""}` : "";
            return descriptionOfMonths !== "" && descriptionOfDays !== ""
                ? `${descriptionOfMonths} e ${descriptionOfDays}`
                : descriptionOfMonths === "" && descriptionOfDays !== ""
                    ? `${descriptionOfDays}`
                    : `${descriptionOfMonths}`;
        }

        // mais de um ano
        // const restDays = diffDays > 365 ? diffDays % 365 : days;
        const descriptionOfYears = years > 0 ? `${years} ano${years > 1 ? "s" :""}` : "";
        const descriptionOfMonths = months > 0 ? `${months} mes${months > 1 ? "es" : ""}` : "";
        const descriptionOfDays = days > 0 ? ` e ${days} dia${days > 1 ? "s" : ""}` : "";
        return `${descriptionOfYears} ${descriptionOfMonths} ${descriptionOfDays}`
    }

    const checkLimit = (startDate: string): boolean => {
        const diff = getDiffMonths(startDate, today);
        return diff >= monthLimit;
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

    return (
        <Container className={checkLimit(game.cleaning_date) ? "pending-maintenance" : ""}>
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
        </Container>
    )
}

export default Card;