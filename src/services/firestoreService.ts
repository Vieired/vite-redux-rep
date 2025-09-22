import { getDocs, Query } from "firebase/firestore";

export async function fetchDocs(q: Query) {
  return getDocs(q);
}