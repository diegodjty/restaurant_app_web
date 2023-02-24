import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDT8y2Z7-bjzGAauTa548g4QMVTZWhW9ko',
  authDomain: 'restaurant-ff0ce.firebaseapp.com',
  projectId: 'restaurant-ff0ce',
  storageBucket: 'restaurant-ff0ce.appspot.com',
  messagingSenderId: '242328293676',
  appId: '1:242328293676:web:4052a4d4b6c62893fb9c89',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
