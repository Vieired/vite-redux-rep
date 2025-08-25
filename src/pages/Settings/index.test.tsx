import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { beforeEach, describe, expect, test, vi } from "vitest";
import Settings from ".";
import { configureStore } from '@reduxjs/toolkit';
import gamesReducer, { updateSettings } from "../../store/gamesSlice";
import { ISettings } from '../../shared/models/Games';


// O mock deve vir ANTES dos imports que usam o módulo
vi.mock("../../store/gamesSlice", async (importOriginal) => {
    const actual = await importOriginal<ISettings>();
    return {
        ...actual,
        // Apenas um spy que retorna uma action simples
        updateSettings: vi.fn(() => ({
            type: "configuracoes/updateSettings",
            payload: { ok: true },
        })),
    };
});

const navigateMock = vi.fn();

describe("Testa página de Configurações", () => {

  let store: ReturnType<typeof configureStore>;

    beforeEach(() => {
        store = configureStore({
            reducer: { games: gamesReducer },
            preloadedState: {
                games: {
                    games: [],
                    status: "idle",
                    limitInMonths: 0,
                    today: new Date().toISOString().split("T")[0],
                    showOnlyActiveGamesFilter: true,
                    cleaningFrequency: 0,
                },
            },
        });
        vi.clearAllMocks();
    });

    vi.mock('react-router-dom', () => ({
        useNavigate() {
            return navigateMock;
        }
    }));
    
    test('Deve renderizar o título "Configurações"', async () => {

        render(
            <Provider store={store}>
                <Settings />
            </Provider>
        );

        const title = await screen.findByRole('heading', {
            name: "Configurações"
        });
        expect(title).toBeInTheDocument();

        // expect(screen.getByText("Configurações")).toBeInTheDocument();
    })

    test('Deve ir para a página principal ao pressionar o botão "Voltar"', async () => {

        render(
            <Provider store={store}>
                <Settings/>
            </Provider>
        );

        const button = screen.getByRole("button", { name: /voltar/i });
        fireEvent.click(button);

        expect(navigateMock).toHaveBeenCalledTimes(1);
    });

    test('Deve submeter o form com o valor digitado ao pressionar o botão "Salvar"', async () => {

        render(
            <Provider store={store}>
                <Settings/>
            </Provider>
        );

        const input = screen.getByRole("spinbutton", { name: "Frequência de Limpeza (meses)" });
        fireEvent.change(input, {
            target: { value: 4 }
        });

        const submitButton = screen.getByRole("button", { name: /salvar/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            // // Debug para ver as chamadas reais
            // // @ts-expect-error para acessar mock em TS
            // console.log("updateSettings.calls:", updateSettings.mock.calls);

            // 1) garanta que foi chamado
            expect(updateSettings).toHaveBeenCalledTimes(1);

            // 2) O spy recebe APENAS o payload
            expect(updateSettings).toHaveBeenCalledWith({ cleaningFrequency: 4 });
        });
    });
});