import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// import { getAuth } from 'firebase/auth';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase, ref, set, get, child, push, onValue, query, orderByChild, equalTo, remove, update, serverTimestamp } from "firebase/database";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBAKdpfBRUmTVf7jiKfKfrRoEIGebksXco",
  authDomain: "levapangallery.firebaseapp.com",
  databaseURL: "https://levapangallery-default-rtdb.firebaseio.com",
  projectId: "levapangallery",
  storageBucket: "levapangallery.firebasestorage.app",
  messagingSenderId: "1013724697800",
  appId: "1:1013724697800:web:3bc76e5e4331b5b53bc1fd",
  measurementId: "G-K10XYZQC60"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { 
  database, 
  auth, 
  storage,
  ref, 
  set, 
  get, 
  child, 
  push, 
  onValue, 
  query, 
  orderByChild, 
  equalTo, 
  remove, 
  update, 
  serverTimestamp,
};