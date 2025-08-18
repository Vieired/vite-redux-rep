import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import {
    // describe,
    expect,
    // it,
    test
} from 'vitest' ;
import Button from './components/Inputs/Button';
// import Games from './pages/Games';

// describe('something truthy and falsy', () => {
//   it('true to be true', () => {
//     expect(true).toBe(true);
//   });

//   it('false to be false', () => {
//     expect(false).toBe(false);
//   });
// });

test('Deveria renderizar um botão com rótulo "Entrar"', () => {

    render(<Button>Entrar</Button>);

    const button = screen.getByRole('button');

    expect(button).toHaveTextContent("Entrar");

    // const { getByText } = render(<button>Entrar</button>);
    // expect(getByText("Entrar")).toBeInTheDocument();
});

// describe("Games", () => {
//     test('Deveria exibir na tela o título "BG Limpo"', () => {
//         const { /*getByText,*/ debug } = render(<Games />);
//         // expect(getByText("BG Limpo")).toBe...;
//         debug();
//     })
// });

// describe("Button", () => {
//     test('Deveria exibir o botão com label "Entrar"', () => {
//         // const { getByText } = render(<Button>Entrar</Button>);
//         // expect(getByText("Entrar")).toBeInTheDocument();
//         const { debug } = render(<Button>Entrar</Button>);
//         debug();
//     })
// });

// describe("App", () => {
//     test('Blá blá blá', () => {
//         const { debug } = render(<App />);
//         debug();
//     })
// });