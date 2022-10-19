import { initializeApp } from "@firebase/app";
import {
  doc,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  getFirestore,
  setDoc,
  deleteDoc,
} from "@firebase/firestore";

const config = {
  apiKey: "AIzaSyB_-ai2PoUMOWE3a_6JHROreLY2PzXqusI",
  authDomain: "nicheapp-7874c.firebaseapp.com",
  projectId: "nicheapp-7874c",
  storageBucket: "nicheapp-7874c.appspot.com",
  messagingSenderId: "734224053501",
  appId: "1:734224053501:web:d0a65c7f4fbee7cacd3a94",
  measurementId: "G-B4ZLPTMTB8",
};
initializeApp(config);

export const db = getFirestore();

export const getFields = async (specType) => {
  const res = await fetch(
    `https://beagleschema.demcrepl.repl.co/specs/${specType}/schema`
  );
  const data = await res.json();
  return data.fields;
};

export const getCollections = async () => {
  const res = await fetch("https://beagleschema.demcrepl.repl.co/specs");
  const data = await res.json();
  return data.specs;
};

export const getSpecList = async (collectionType) => {
  const specList = [];
  const res = await getDocs(collection(db, collectionType));
  res.forEach((doc) => {
    specList.push([doc.id, doc.data()]);
  });
  return specList;
};

export const getSpec = async (path) => {
  const docRef = doc(db, path);
  const res = await getDoc(docRef);
  return res.data();
};

export const createSpec = async (path, values) => {
  const docRef = doc(db, path);
  await setDoc(docRef, values);
  const res = await getDoc(docRef);
  return res.data();
};

export const updateSpec = async (path, values) => {
  const docRef = doc(db, path);
  await updateDoc(docRef, values);
  const res = await getDoc(docRef);
  return res.data();
};

export const deleteSpec = async (path) => {
  const docRef = doc(db, path);
  await deleteDoc(docRef);
};
