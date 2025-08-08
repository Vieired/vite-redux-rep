import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import {
    describe,
    expect,
    it,
    // test,
} from 'vitest' ;
import Test from '../../components/Test';
import { Provider } from 'react-redux';
import store from '../../store/store';
// import Games from '.';

describe("Games", () => {

    it('Deveria renderizar "Teste!" no componente Test', async () => {

        render(
            <Provider store={store}>
                <Test />
            </Provider>
        );

        expect(screen.getByText("Teste!")).toBeInTheDocument();
    })

    // test('Deveria renderizar "BG Limpo" na tela inicial da aplicação', () => {

    //     // const mockStore = configureStore([]); // Create a mock store
    //     // const store = configureStore({
    //     //     reducer: {
    //     //         games: gamesReducer,
    //     //     },
    //     // });        

    //     render(
    //         <Provider store={store}>
    //             <Games/>
    //         </Provider>
    //     );

    //     expect(screen.getByText("BG Limpo")).toBeInTheDocument();
    // })
});