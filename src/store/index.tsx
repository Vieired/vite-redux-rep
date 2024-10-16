import { createStore } from 'redux';
import { Video } from '../shared/models/Video';

const reducer = (): Video => {

    return {
        activeLesson: null,
        activeModule: null,
        modules: [
            {
                id: '1',
                title: "Desenvolvendo com Redux Redux",
                lessons: [
                    { id: '1', title: "Primeira aula" },
                    { id: '2', title: "Segunda aula" },
                ]
            },
            {
                id: '2',
                title: "Evitando O Drilling Em Aplicações Reativas",
                lessons: [
                    { id: '1', title: "Terceira aula" },
                    { id: '2', title: "Quarta aula" },
                ]
            },
        ]
    } as Video;
}

const store = createStore(reducer);

export default store;