/**
 * MOTORO
 * jorgereyes@8rios.com
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */

import React from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import global from '../managers/Global';
import Colors from '../constants/Colors';

const SelectFilter = ({  setText,  titulo = '', value = '', tipo = 'default', capitalize = "sentences", boton = false, multiline=false, onPress, editable = false }) => {

  return (
    <>
        <TouchableOpacity style={styles.container} onPress={onPress}>
          <View style={styles.content} onPress={onPress}>
            <Text style={[ styles.titulo]}>
              {titulo}
            </Text>
            <View style={styles.textInput_container}>
              <Text style={[ styles.text]}>
                {value}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
    </>
  );
};

export default SelectFilter;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginBottom:10
  },

  content: {
    flexDirection:'row',
    borderRadius:10,
    borderWidth:1,
    borderColor:'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  titulo: {
    color:Colors.black,
    fontFamily: 'Bold',
    textTransform:'capitalize'
  },

  textInput_container: {
    flex:1,
    paddingLeft:10,
    // backgroundColor:'gray'
  },

  textInput: {
    width: '100%',
    fontFamily: 'Light',
    color: global.color.black,
    paddingVertical: Platform.OS == 'ios'? 15 : 10
  },

  
  text: {
    width: '100%',
    textAlign:'right',
    fontFamily: 'Light',
    color: Colors.black,
    paddingVertical: Platform.OS == 'ios'? 15 : 15
  },


});