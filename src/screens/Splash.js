/**
 * LEVAPAN
 * jorgereyes@8rios.com
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */

import React, {useContext, useEffect, useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../managers/Firebase";
import {AppContext} from '../context/State';
import { getUser } from '../context/Actions';

const Splash = () => {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        enter();
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    });
    return () => unsubscribe();
  }, []);

  const enter = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      if (user_id) {
        getUser(dispatch, user_id, ingresar);
      }else{
        dispatch({ type: 'SET_LOADING', payload: false });
      }
      console.log('user_id', user_id)
    } catch (error) {
      setInitialRoute('Login');
      console.error("Error al leer datos:", error);
      setLoading(dispatch, false);
    }
  };

  const ingresar = (value) => {
    console.log('ingresar', value)
  };

  return (
    <View style={styles.container}>
        <Image resizeMode="contain" style={styles.image} source={require('../assets/images/logo_levapan.png')} />
    </View>
  );
};
export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 120
  }
});