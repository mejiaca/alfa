import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const login = async (username) => {
    try {
      await AsyncStorage.setItem('username', username);
      setUser({ username });
    } catch (error) {
      console.error('Error guardando usuario:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('username');
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
