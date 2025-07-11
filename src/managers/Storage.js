/**
 * LEVAPAN
 * jorgereyes@8rios.com
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */
 
import AsyncSorage from '@react-native-async-storage/async-storage';

const setApp = app => {
  return AsyncSorage.setItem('app', JSON.stringify(app));
};

const  getApp = () => {
  return AsyncSorage.getItem('app');
};

const setUserId = id => {
  return AsyncSorage.setItem('user_id', id);
};

const getUserId = () => {
  return AsyncSorage.getItem('user_id');
};

const setUserCredencials = (email, password) => {
  return AsyncSorage.setItem('credentials', JSON.stringify({email, password}));
};

const getUserCredencials = () => {
  return AsyncSorage.getItem('credentials');
};

const setShowIntro = () => {
  return AsyncSorage.setItem('showIntro', 'true');
};

const getShowIntro  = () => {
  return AsyncSorage.getItem('showIntro');
};

const setTema = tema => {
  return AsyncSorage.setItem('tema', tema);
};

const getTema = () => {
  return AsyncSorage.getItem('tema');
};

const clear = () => {
  return AsyncSorage.clear();
};

export default {setApp, getApp, setUserId, getUserId, setShowIntro, getShowIntro, setTema, getTema, clear, setUserCredencials, getUserCredencials};