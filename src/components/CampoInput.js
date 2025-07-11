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

const CampoInput = ({  setText,  titulo = '', value = '', tipo = 'default', capitalize = "sentences", boton = false, multiline=false, onPress, editable = false }) => {

  return (
    <>
      {boton ? (
        <TouchableOpacity style={styles.container} onPress={onPress}>
          <Text style={[ styles.titulo]}>
            {titulo}
          </Text>
          <View style={styles.textInput_container}>
            <Text style={[ styles.text]}>
              {value}
            </Text>
          </View>
        </TouchableOpacity>
      ):(
        <View style={styles.container}>
          <Text style={[ styles.titulo]}>
            {titulo}
          </Text>

          <View style={styles.textInput_container}>

            {editable ? (
              <TextInput
                style={styles.textInput}
                placeholder=""
                placeholderTextColor={global.color.gray5} 
                autoCapitalize={capitalize}
                autoCorrect={true}
                keyboardType={tipo}
                value={value}
                multiline = {multiline}
                blurOnSubmit = {true}
                onChangeText={(e) => setText(e)}
                returnKeyType={ 'done' }
              />
            ):(
              <TextInput
                style={styles.textInput}
                placeholder=""
                placeholderTextColor={global.color.gray5} 
                autoCapitalize={capitalize}
                autoCorrect={true}
                keyboardType={tipo}
                multiline = {multiline}
                blurOnSubmit = {true}
                onChangeText={(e) => setText(e)}
                returnKeyType={ 'done' }
              />
            )}

            
          </View>
        </View>
      )}
    </>
  );
};

export default CampoInput;

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    borderRadius:10,
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
    marginBottom:5
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