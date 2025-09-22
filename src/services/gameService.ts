import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  where,
  doc,
  updateDoc,
  addDoc
} from "firebase/firestore";
import { firebaseConfig } from "../firebase/config";
import { fetchDocs } from "./firestoreService";
import { Game, ISettings } from "../shared/models/Games";
import { CleaningMethodEnum } from "../shared/enums/CleaningMethodEnum";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const firebaseDb = {
  fetchGames: async (showOnlyActiveGamesFilter?: boolean) => {
    // const gamesRef = collection(db, "jogos");
    // const q = query(gamesRef, orderBy("cleaning_date"), orderBy("__name__"));
    // const snapshot = await getDocs(q);

    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const games: any[] = [];
    // snapshot.forEach((doc) => {
    //   games.push({ id: doc.id, ...doc.data() });
    // });
    // return games;

    const gamesRef = collection(db, "jogos");
            const q = showOnlyActiveGamesFilter
                ? query(
                    gamesRef,
                    where("isActive", "==", true),
                    // where("isActive", "==", gamesSlice.getInitialState().isActiveFilter),
                    // orderBy("name", "asc"),
                    orderBy("cleaning_date"),
                    orderBy("__name__"),
                    // where("id", "==", auth.currentUser.uid)
                )
                : query(
                    gamesRef,
                    orderBy("cleaning_date"),
                    orderBy("__name__"),
                );
    const querySnapshot = await getDocs(q);
    const gameList: Game[] = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        gameList.push({
            // id: doc.id,
            ...doc.data() as Game
        });
    });
    
    return gameList
  },
  fetchSettings: async () => {
    // checkIfAuthenticationIsRequired();

    const settingsRef = collection(db, "configuracoes");
    const q = query(settingsRef);

    const querySnapshot = await fetchDocs(q);
    const { cleaningFrequency } = querySnapshot.docs[0].data();

    return cleaningFrequency
  },
  updateGame: async (payload: Game) => {
    // checkIfAuthenticationIsRequired();

    const gamesRef = doc(db, 'jogos', payload.id);
    // console.log("updateGame payload: ", payload);
    
    await updateDoc(gamesRef, {
      ...payload,
      cleaning_date: payload.cleaning_date,
      cleaning_method: payload.cleaning_method,
      methods: payload?.methods || null,
      isActive: payload.isActive,
      name: payload.name,
      photoUrl: payload.photoUrl,
    })
  },
  createGame: async (payload: Game) => {
        // checkIfAuthenticationIsRequired();

        const docRef = await addDoc(collection(db, 'jogos'), { // cria um registro na base e obtem o novo ID
            ...payload,
            // cleaning_date: payload.cleaning_date,
            cleaning_method: 1,
            methods: null,
            isActive: payload.isActive,
            // name: payload.name,
            // photoUrl: payload?.photoUrl,
        });
        // console.log("createGame docRef: ", docRef);
        // console.log("createGame payload: ", payload);
        
        const gamesRef = doc(db, 'jogos', docRef.id); // atualiza o novo registro com o ID obtido
        await updateDoc(gamesRef, {
            id: docRef.id,
            cleaning_date: payload.cleaning_date,
            cleaning_method: 1,
            methods: payload.methods,
            isActive: payload.isActive,
            name: payload.name,
            photoUrl: payload?.photoUrl || "",
        });
  },
  updateCleaningDate: async (payload: {
    id: string,
    methods: CleaningMethodEnum[] | null,
  }) => {
    // checkIfAuthenticationIsRequired();

    const gamesRef = doc(db, 'jogos', payload.id);
    console.log("updateCleaningDate payload: ", payload);
    
    await updateDoc(gamesRef, {
        cleaning_date: new Date().toISOString(),
        methods: payload.methods,
    });
  },
  updateSettings: async (payload: ISettings) => {
    // checkIfAuthenticationIsRequired();

    const settingsRef = doc(db, 'configuracoes', 'LihKQAjYOE7actonBESK');
    // console.log("updateSettings payload: ", payload);
    
    await updateDoc(settingsRef, {
      ...payload,
      cleaningFrequency: payload.cleaningFrequency
    })
  },
};