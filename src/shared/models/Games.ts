export interface Game { // TODO: refatorar para deixar todas as props nullable, menos id
    id: string;
    name?: string;
    cleaning_date: string;
    cleaning_method?: number;
    isActive: boolean;
    photoUrl?: string;
}

export interface InitialStateGames {
    games: Game[],
    status: string,
    monthLimit: number,
    today: string;
}