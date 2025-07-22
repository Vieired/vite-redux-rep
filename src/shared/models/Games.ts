import { CleaningMethodEnum } from "../enums/CleaningMethodEnum";

export interface Game { // TODO: refatorar para deixar todas as props nullable, menos id
    id: string;
    name?: string;
    cleaning_date: string;
    cleaning_method?: number;
    methods?: CleaningMethodEnum[];
    isActive: boolean;
    photoUrl?: string;
}

export interface InitialStateGames {
    games: Game[];
    status: string;
    limitInMonths: number | null;
    today: string;
    showOnlyActiveGamesFilter: boolean;
}

export interface GameCleaning {
    id: string;
    name?: string;
    cleaning_date: string;
    methods: CleaningMethodEnum[] | null;
}

export interface ISettings {
    cleaningFrequency?: number;
}