// import ReactModal from 'react-modal';
import '@testing-library/jest-dom/vitest';
import {
    fireEvent,
    // logDOM,
    render,
    screen,
    waitFor,
    // within,
} from '@testing-library/react';
import {
    // beforeAll,
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
// import userEvent from "@testing-library/user-event";
// import Modal from "react-modal";

/*
// Para o react-modal saber qual é o elemento raiz durante os testes
beforeAll(() => {
  ReactModal.setAppElement(document.createElement("div"));
});
*/
/*beforeAll(() => {
  // Cria um elemento raiz só para os testes
  const root = document.createElement("div");
  root.setAttribute("id", "root");
  document.body.appendChild(root);
  ReactModal.setAppElement(root);
});*/

// beforeAll(() => {
//     // Necessário para o react-modal não reclamar
//     // ReactModal.setAppElement('#root');
//     ReactModal.setAppElement(document.body);
//     // ReactModal.setAppElement(document.createElement("div"));
//     // ReactModal.setAppElement('.ReactModalPortal');
//     // ReactModal.setAppElement('#body');
// });

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

    // beforeAll(() => {
    //     const portalRoot = document.createElement("div");
    //     portalRoot.setAttribute("id", "modal-root");
    //     // portalRoot.setAttribute("id", "dialog");
    //     document.body.appendChild(portalRoot);
    // });

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

    /*test('Deve abrir e fechar o modal de Adição/Edição de jogos', async () => {

        render(
            <Provider store={store}>
                <Games/>
            </Provider>
        );

        // Primeiro, o modal não deve estar visível
        // expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

        // expect(screen.queryByRole("dialog")).toBeNull();
        // await userEvent.click(screen.getByRole("button", { name: /adicionar jogo/i }));

        // Clica no botão que abre o modal
            const addButton = screen.getByRole("button", { name: /adicionar jogo/i });
            fireEvent.click(addButton);
        // fireEvent.click(screen.getByRole("button", { name: "Editar um jogo" }));
        // expect(screen.getByRole("dialog")).toBeInTheDocument();

        // screen.debug(); // imprime o DOM atual no console
        // screen.logTestingPlaygroundURL(); // abre um URL com seletores sugeridos
        // screen.debug(document.body);
        // logDOM(document.body);
        // await waitFor(() => {
        //     logDOM(document.body);
        // });

            // const modal = screen.getByText("Criar Jogo");
        // const modal = await screen.getByRole("dialog", { name: "Criar Jogo" });
        // const modal = await screen.getByRole("dialog", { name: "dialog" });
        // const modal = await screen.getByRole("dialog");
        // const modal = await screen.findByText(/criar jogo/i);
        // const modal = await screen.findByText((content) => content.includes("Criar Jogo"));
        // const modal = await screen.findByLabelText(/Criar Jogo/i);
            // const modal = await screen.findByRole("heading", {name: "Criar Jogo", level: 1, hidden: true });
            // const modal = await screen.findByRole("dialog", { name: /criar jogo/i });
            // expect(modal).toBeInTheDocument();

        // await waitFor(() => {
        //     // const modal = screen.findByRole("dialog", { name: /criar jogo/i });
        //     const modal = screen.getByRole("dialog", { name: /criar jogo/i });
        //     expect(modal).toBeInTheDocument();
        // });

        await waitFor(() => {
            const modal = screen.getByRole("dialog", { name: /criar jogo/i });
            expect(modal).toBeInTheDocument();
        });

        // const modal = screen.getByRole("dialog");
        // expect(
        //     within(modal).getByRole("heading", { name: /criar jogo/i })
        // ).toBeInTheDocument();

        // // Agora o modal deve aparecer
        // expect(
        //     screen.getByRole("dialog", { name: /criar jogo/i })
        //     // screen.getByTestId("tl-addOrEditModal")
        // ).toBeInTheDocument();

        // // E o título dentro do modal
        // expect(
        //     screen.getByRole("heading", { name: /criar jogo/i })
        //     // screen.getByTestId("tl-addOrEditModal")
        // ).toBeInTheDocument();

        // screen.debug(document.body);
    });*/

    /*test('Deve abrir e fechar o modal de Adição/Edição de jogos (tentativa 2)', async () => {

        const user = userEvent.setup();

        render(
            <Provider store={store}>
                <Games/>
            </Provider>
        );

        // modal começa fechado
        expect(screen.queryByText(/criar jogo/i)).not.toBeInTheDocument();

        // clica no botão
        await user.click(screen.getByRole("button", { name: /adicionar jogo/i }));

        // screen.debug();

        // O modal não deve estar aberto
        expect(screen.queryByText(/criar jogo/i)).not.toBeInTheDocument();

        // Clica no botão para abrir
        await user.click(screen.getByRole("button", { name: /adicionar jogo/i }));

        // Agora o modal deve aparecer
        expect(screen.getByText(/criar jogo/i)).toBeInTheDocument();

        // Fecha o modal
        await user.click(screen.getByRole("button", { name: /cancelar/i }));

        // Deve sumir
        expect(screen.queryByText(/criar jogo/i)).not.toBeInTheDocument();
    });*/
});