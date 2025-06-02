import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBen5Cl2ICkEXY1AEMaXwG6dCaRmbrcdqk',
  authDomain: 'fassalai-29630.firebaseapp.com',
  projectId: 'fassalai-29630',
  storageBucket: 'fassalai-29630.appspot.com',
  messagingSenderId: '576668389925',
  appId: '1:576668389925:android:41788b0c8034bba99d25cc',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
