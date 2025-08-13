import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import {
    describe,
    expect,
    test,
    vi,
} from 'vitest' ;
import { Provider } from 'react-redux';
import store from '../../store/store';
import Games from '.';


const navigateMock = vi.fn();

describe("Testa a página Games", () => {

    vi.mock('react-router-dom', () => ({
        useNavigate() {
            return navigateMock;
        }
    }));

    test('Deveria renderizar o título "BG Limpo"', () => {

        render(
            <Provider store={store}>
                <Games/>
            </Provider>
        );

        expect(screen.getByText("BG Limpo")).toBeInTheDocument();
    })

    test('Deveria ir para a tela de Configurações ao pressionar o botão Configurações', async () => {

        render(
            <Provider store={store}>
                <Games/>
            </Provider>
        );

        const button = await screen.findByTestId('config');
        fireEvent.click(button);

        expect(navigateMock).toHaveBeenCalledTimes(1);
    });
});