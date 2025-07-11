/**
 * LEVAPAN
 * jorgereyes@8rios.com
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */
 
import React, {useContext, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import Splash from '../screens/Splash';
import RootLogin from './RootLogin';
import RootNavigation from './RootNavigation';
import {AppContext} from '../context/State';
import Modal from '../components/Modal';

const Router = () => {
  const { isLoading, isAuth } = useContext(AppContext);

  const linking = {
    prefixes: ['clanapp://', 'https://clanapp.com'],
    config: {
      screens: {
        Home: 'home',
        Invite: 'invite', // esto acepta miapp://invite?ref=...
      },
    },
  };

  return (
    <NavigationContainer linking={linking} >
      {isLoading ? (
          <Splash />
        ) : (
          <>
            {isAuth ? (
              <RootNavigation/>
            ) : (
              <RootLogin/>
            )}
          </>
      )}

      {/* <Modal/> */}
      
    </NavigationContainer>
  );
};

export default Router;