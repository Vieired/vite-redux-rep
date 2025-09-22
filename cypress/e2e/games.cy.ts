
// import * as firestore from "firebase/firestore";
// import { getDocs } from "firebase/firestore";
// import * as firestoreService from "../../src/services/firestore";
// import * as authService from "../../src/services/authService";
// import * as firestoreService from "../../src/services/firestoreService";
// import * as firebase from "../../src/services/firebaseService";

describe('Testa a página principal de jogos', () => {

  /*beforeEach(() => {
    // Mock auth
    cy.stub(firebase.firebaseAuth, "signIn").resolves({ uid: "fake-user" });
    cy.stub(firebase.firebaseAuth, "listenAuthState").callsFake((cb) => {
      cb({ uid: "fake-user" }); // simula login
      return () => {}; // unsubscribe fake
    });

    // Mock firestore
    cy.stub(firebase.firebaseDb, "fetchGames").resolves([
      {
        "id": "nQlQ63g8sD96FdSivLF8",
        "name": "Power Grid Brasil/Espanha & Portugal",
        "methods": [3],
        "isActive": true,
        "cleaning_method": 1,
        "photoUrl": "https://storage.googleapis.com/ludopedia-capas/2812_t.jpg",
        "cleaning_date": "2025-03-09T16:53:04.507Z"
      },
      {
        "id": "RVRPZO7sGk9BTU966Voa",
        "name": "Terraforming Mars",
        "methods": [3, 4],
        "isActive": true,
        "cleaning_method": 1,
        "photoUrl": "https://storage.googleapis.com/ludopedia-capas/8858_t.jpg",
        "cleaning_date": "2025-04-12T14:30:26.713Z"
      }
    ]);
    // cy.stub(firebase.firebaseDb, "fetchGames").resolves([
    //   {
    //     id: "1",
    //     name: "Terraforming Mars",
    //     isActive: true,
    //     cleaning_date: "2025-04-12T14:30:26.713Z",
    //   },
    //   {
    //     id: "2",
    //     name: "Power Grid Brasil/Espanha & Portugal",
    //     isActive: true,
    //     cleaning_date: "2025-03-09T16:53:04.507Z",
    //   },
    // ]);
  });*/

  // beforeEach(() => {
  //   cy.stub(firebase.firebaseAuth, "login").resolves({ uid: "fake-user" });
  //   cy.stub(firebase.firebaseAuth, "listenAuthState").callsFake((cb) => {
  //     cb({ uid: "fake-user" });
  //     return () => {};
  //   });
  //   cy.stub(firebase.firebaseDb, "fetchGames").resolves([
  //     { id: "1", name: "Terraforming Mars" },
  //     { id: "2", name: "Power Grid" }
  //   ]);
  // });

  // beforeEach(() => {
  //   // mock do login
  //   cy.stub(authService, "login").resolves({ uid: "fake-user" });
  //   cy.stub(authService, "listenAuthState").callsFake((cb) => {
  //     cb({ uid: "fake-user" }); // simula usuário logado
  //     return () => {}; // unsubscribe
  //   });

  //   // mock do fetchDocs
  //   cy.fixture("games.json").then((games) => {
  //     cy.stub(firestoreService, "fetchDocs").resolves({
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       forEach: (cb: (doc: any) => void) => {
  //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //         games.forEach((game: any) => {
  //           cb({ id: game.id, data: () => game });
  //         });
  //       }
  //     });
  //   });
  // });

  // beforeEach(() => {
  //   cy.fixture("games.json").then((games) => {
  //     cy.stub(firestoreService, "fetchDocs").resolves({
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       forEach: (cb: (doc: any) => void) => {
  //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //         games.forEach((game: any) => {
  //           cb({
  //             id: game.id,
  //             data: () => game
  //           });
  //         });
  //       }
  //     });
  //   });
  // });


  /*it("exibe os jogos mockados", () => {
    cy.visit("/");

    cy.contains("Terraforming Mars").should("be.visible");
    cy.contains("Power Grid Brasil/Espanha & Portugal").should("be.visible");
  });*/

  it('Deveria carregar a lista de jogos ao entrar na página principal', () => {

    cy.visit("/"); // rota onde o fetchGames roda
    cy.get('#email').type("logominus@gmail.com");
    cy.get('#password').type("logominus@gmail.com");
    cy.contains("Entrar").click();

    // cy.contains("Power Grid Brasil/Espanha & Portugal", { timeout: 10000 })
    //   .should("be.visible");

    // cy.contains("Terraforming Mars", { timeout: 10000 })
    //   .should("be.visible");

    // cy.visit("/");
    // cy.get('#email').type("logominus@gmail.com");
    // cy.get('#password').type("logominus@gmail.com");
    // cy.contains("Entrar").click();
    // // cy.wait("@getGames");
    cy.contains("Power Grid").should("exist");
  });

  // it('Deveria carregar a lista de jogos ao entrar na página principal', () => {

  //   cy.visit("/");
  //   cy.get('#email').type("logominus@gmail.com");
  //   cy.get('#password').type("logominus@gmail.com");
  //   cy.contains("Entrar").click();

  //   // cy.visit("/");

  //   cy.intercept(
  //     "GET",
  //     // "http://localhost:5173",
  //     // "https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?VER=8&database=projects%2Fvite-redux-fb%2Fdatabases%2F(default)&RID=60847&CVER=22&X-HTTP-Session-Id=gsessionid&zx=aukpwl3ijqmn&t=1", // POST
  //     // "https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?gsessionid=QkIRziPpKbZPZgNAMGltXaKvZpGajRfVrMWXCCB3QwU&VER=8&database=projects%2Fvite-redux-fb%2Fdatabases%2F(default)&RID=rpc&SID=QbrXhd8YZHBtYfp5ZKKkiQ&AID=0&CI=0&TYPE=xmlhttp&zx=ik7v495i5hs4&t=1",
  //     // "https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?gsessionid=QkIRziPpKbZPZgNAMGltXaKvZpGajRfVrMWXCCB3QwU&VER=8&database=projects%2Fvite-redux-fb%2Fdatabases%2F(default)&RID=rpc&SID=QbrXhd8YZHBtYfp5ZKKkiQ&AID=56&CI=0&TYPE=xmlhttp&zx=p3rbga8u7jo4&t=1",
  //     // "https://firestore.googleapis.com/v1/projects/*/databases/(default)/documents/jogos*",
  //     "https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?gsessionid=_PZdmiN_wa7ggSj2063SXjH7UADDyJZRmj3EsR4EOfQ&VER=8&database=projects%2Fvite-redux-fb%2Fdatabases%2F(default)&RID=rpc&SID=fURvjUHX-mOFgEeWIQ0yew&AID=0&CI=0&TYPE=xmlhttp&zx=abosm97tyret&t=1",
  //     // "https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel",
  //     { fixture: "jogos.json" }
  //   ).as("getJogos");

  //   // cy.visit("/");
  //   // cy.get('#email').type("logominus@gmail.com");
  //   // cy.get('#password').type("logominus@gmail.com");

  //   // cy.contains("Entrar").click();

  //   // cy.visit("/");

  //   cy.wait("@getJogos");
  //   cy.contains("Power Grid").should("exist");
  // });

  it('Deveria adicionar um novo jogo', () => {

    cy.visit("/");
    cy.get('#email').type("logominus@gmail.com");
    cy.get('#password').type("logominus@gmail.com");
    cy.contains("Entrar").click();

    cy.get("button[title='Adicionar jogo']").click();
    cy.get('#name').type(`Teste E2E ${new Date().toISOString()}`);
    cy.contains("Salvar").click();

    cy.contains(`Teste E2E ${new Date().toISOString()}`).should("exist");
  });
})