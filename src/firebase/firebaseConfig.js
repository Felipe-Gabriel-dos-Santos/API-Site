import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDLrwJ_yxzZyxs-n3EM6B1cEK3a47oKrKw',
  authDomain: 'site-sorri-teste.firebaseapp.com',
  projectId: 'site-sorri-teste',
  storageBucket: 'site-sorri-teste.appspot.com',
  messagingSenderId: '879960242197',
  appId: '1:879960242197:web:7dc2f0361988fee225761c',
};

const app = initializeApp(firebaseConfig);

export default app;