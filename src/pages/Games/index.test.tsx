import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import {
    describe,
    expect,
    test,
    vi,
} from 'vitest' ;
import { Provider } from 'react-redux';
import store from '../../store/store';
import gamesReducer, {toggleShowOnlyActiveGamesFilter} from "../../store/gamesSlice";
import Games from '.';
import { configureStore } from '@reduxjs/toolkit';


vi.mock("../../store/gamesSlice", async (importOriginal) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actual = await importOriginal<any>();
  return {
    ...actual,
    toggleShowOnlyActiveGamesFilter: vi.fn((payload: boolean) => ({
      type: "games/toggleShowOnlyActiveGamesFilter",
      payload,
    })),
  };
});

const navigateMock = vi.fn();

describe("Testa a página Games", () => {

    vi.mock('react-router-dom', () => ({
        useNavigate() {
            return navigateMock;
        }
    }));

    test('Deve renderizar o título "BG Limpo"', () => {

        render(
            <Provider store={store}>
                <Games/>
            </Provider>
        );

        expect(screen.getByText("BG Limpo")).toBeInTheDocument();
    })

    test('Deve ir para a tela de Configurações ao pressionar o botão Configurações', async () => {

        render(
            <Provider store={store}>
                <Games/>
            </Provider>
        );

        const button = await screen.findByTestId('tl-configButton');
        fireEvent.click(button);

        expect(navigateMock).toHaveBeenCalledTimes(1);
    });

    test('Deve exibir os cards ativados/desativados de acordo com o estado do switch "Exibir Somente Ativos"', async () => {
        
        const store = configureStore({ reducer: { games: gamesReducer } });

        render(
            <Provider store={store}>
                <Games/>
            </Provider>
        );

        const inputSwitch = screen.getByRole("switch", {
            name: "Exibir Somente Ativos"
        });
        // fireEvent.change(inputSwitch, {
        //     target: { checked: false }
        // });
        fireEvent.click(inputSwitch);

        await waitFor(() => {
            expect(toggleShowOnlyActiveGamesFilter).toHaveBeenCalledWith(false);
        });
    });
});