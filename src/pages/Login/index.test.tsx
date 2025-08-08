import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import {
    describe,
    expect,
    it,
    // test,
} from 'vitest' ;
import Login from '.';
import { Provider } from 'react-redux';
import store from '../../store/store';

describe("Games", () => {

    it('Deveria renderizar "Login" no componente Login', async () => {

        render(
            <Provider store={store}>
                <Login />
            </Provider>
        );

        // const title = await screen.findByRole('heading', {
        //     name: "Teste!"
        // });
        // expect(title).toBeInTheDocument();

        expect(screen.getByText("Login")).toBeInTheDocument();
    })
});