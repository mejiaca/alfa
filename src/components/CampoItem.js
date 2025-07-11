/**
 * MOTORO
 * jorgereyes@8rios.com
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */

import React, {useEffect, useState } from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';

const CampoItem = ({  titulo = '', value = '', info = '', tipo = 'normal'}) => {
  const [align, setAlign] = useState('right');

  useEffect(() => {
    if(value.length > 60){
      // setAlign('left');
    }
  }, [value]);

  return (
    <>

      {tipo == 'normal' ? (
        <View style={styles.container}>
          <Text style={[ styles.titulo]}>{titulo}</Text>
          <View style={styles.textInput_container}>
            <Text style={[ styles.textInput, {textAlign:align}]}> {value} </Text>
            {info != '' && (<Text style={[ styles.info, {textAlign:align}]}> {info} </Text>)}        
          </View>
        </View>
      ):null}

      {tipo == 'reporte' ? (
        <View style={styles.container}>
          <Text style={styles.titulo_reporte}>{titulo}</Text>
          <View style={styles.textInput_container}>
            <Text style={[ styles.textInput, {textAlign:align}]}> {value} </Text>
            {info != '' && (<Text style={[ styles.info, {textAlign:align}]}> {info} </Text>)}        
          </View>
        </View>
      ):null}


    </>
  );
};

export default CampoItem;

const styles = StyleSheet.create({
  container: {
    borderRadius:10,
    paddingHorizontal: 10,
    paddingVertical:10,
    backgroundColor: Colors.white,
    marginBottom:2,
    flexDirection:'row'
  },

  titulo: {
    color:Colors.black,
    fontFamily: 'Bold',
    fontWeight:'bold',
    textTransform:'capitalize'
  },

  titulo_reporte: {
    flex: 1,
    color:Colors.naranja,
    fontFamily: 'Bold',
    fontWeight:'bold',
    textTransform:'uppercase'
  },

  textInput_container: {
    flex:1,
  },

  textInput: {
    width: '100%',
    fontFamily: 'Light',
    color: Colors.black,
  },

  info: {
    fontSize: 12,
    fontFamily: 'Light',
    textTransform:'capitalize',
    color: Colors.naranja
  },
});