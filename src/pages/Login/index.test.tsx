import '@testing-library/jest-dom/vitest';
import {
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import {
    describe,
    expect,
    // it,
    test,
    vi,
} from 'vitest' ;
import Login from '.';
import { Provider } from 'react-redux';
import store from '../../store/store';
import { signInWithEmailAndPassword } from 'firebase/auth';
// import usersReducer from '../../store/usersSlice'
// import { configureStore } from '@reduxjs/toolkit';

// vi.mock("firebase/auth", () => ({
//     signInWithEmailAndPassword: vi.fn()
// }));

// const submitMock = vi.fn();

// const mockSignInWithEmailAndPasswordFn = vi.fn(signInWithEmailAndPassword);
    // .mockImplementation(async () => {
    //     return {}
    // });

vi.mock("firebase/auth", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const actual = await vi.importActual<any>("firebase/auth"); // importa o módulo original
    return {
        ...actual,
        signInWithEmailAndPassword: vi.fn()
    };
});

describe("Testa a página Login", () => {

    // const renderWithStore = (ui: React.ReactNode) => {
    //     const store = configureStore({ reducer: { auth: usersReducer } });
    //     return render(<Provider store={store}>{ui}</Provider>);
    // };

    // vi.mock('firebase/auth', () => ({
    //     signInWithEmailAndPassword() {
    //         return submitMock;
    //     }
    // }))

    test('Deve renderizar o texto "Login" no componente Login', async () => {

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

    test("Deve chamar signInWithEmailAndPassword com email e senha", async () => {

        (signInWithEmailAndPassword as ReturnType<typeof vi.fn>).mockResolvedValue({
            user: { uid: "123", email: "teste@email.com" }
        });

        // renderWithStore(<Login />);
        render(
            <Provider store={store}>
                <Login />
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText(/e-mail/i), {
            target: { value: "teste@email.com" }
        });
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
            target: { value: "senha123" }
        });
        fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

        await waitFor(() => {
            expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
                expect.anything(), // o auth
                "teste@email.com",
                "senha123"
            );
        });
    });

    test("Deve falhar a chamada signInWithEmailAndPassword com email e senha", async () => {

        (signInWithEmailAndPassword as ReturnType<typeof vi.fn>).mockRejectedValue({
            user: { uid: "123", email: "teste@email.com" }
        });

        render(
            <Provider store={store}>
                <Login />
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText(/e-mail/i), {
            target: { value: "teste@email.com" }
        });
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
            target: { value: "senha123" }
        });
        fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

        await waitFor(() => {
            expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
                expect.anything(), // o auth
                "teste@email.com",
                "senha123"
            );
        });
    });
});
