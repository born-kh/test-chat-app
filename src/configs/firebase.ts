import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, collection, addDoc } from 'firebase/firestore';
import { IMessage } from '../types/Chat';

export const FIREBASE_CONFIG = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(FIREBASE_CONFIG);
export const firestore = getFirestore(app);

export async function createUser({ name }: { name: string }) {
  const docRef = doc(firestore, 'users', name);
  const docSnap = await getDoc(docRef);
  localStorage.setItem('chat.app:user', name);
  if (docSnap.exists()) {
    return name;
  } else {
    await setDoc(doc(firestore, 'users', name), {
      name,
    });
    return name;
  }
}
type MessageCreate = Omit<IMessage, 'id'>;

export async function sendMessage(message: Omit<MessageCreate, 'id'>) {
  console.log(message);
  await addDoc(collection(firestore, 'messages'), { ...message });
}
