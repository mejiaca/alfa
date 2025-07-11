import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, database, ref, set, get, child, query, orderByChild, equalTo, update, remove } from "../managers/Firebase";
import { signInWithEmailAndPassword, signOut, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUser({ username: storedUsername });
        }
      } catch (error) {
        console.error('Error cargando usuario:', error);
      } finally {
        setIsAuthLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (username, ingresar) => {
    let email = 'admin@levapanapps.com';
    let password = '4dminLev#2406';

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const snapshot = await get(child(ref(database), "levapan/usuarios/" + username));

      console.log("snapshot", snapshot);

      if (snapshot.exists()) {
        console.log(snapshot.val())
        await AsyncStorage.setItem('username', username);
        setUser(snapshot.val());
        ingresar(true);
      }else {
        // dispatch({ type: 'SET_USER_AUTH', payload: false });
        // dispatch({ type: 'SET_USER', payload: [] });
        // console.log("No hay datos disponibles");
        // ingresar(false);
        // return false;
        ingresar(false);
      }      
      
    } catch (error) {
      console.error('Error:', error);
      ingresar(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // await AsyncStorage.removeItem('username');
      setUser(null);
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
