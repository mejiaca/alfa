/**
 * DAIRY
 * jorgereyes@8rios.com
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */

import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import global from '../managers/Global';

const Titulo = ({
  titulo = '',
  subtitulo = '',
  info = '',
  tituloSize = 30,
  subtituloSize = 20,
  iconName = '',
}) => {
  return (
    <View style={styles.container}>

      <View style={styles.content}>

        <Text style={[ styles.titulo, {fontSize:tituloSize} ]} numberOfLines={1} >
          {titulo}
        </Text>

        {subtitulo != '' ? (
          <Text style={[ styles.subtitulo,  {fontSize:subtituloSize} ]} numberOfLines={1}>
            {subtitulo}
          </Text>
        ) : null}

        {info != '' ? (
          <Text style={[ styles.info]}>
            {info}
          </Text>
        ) : null}

      </View>


        {iconName != '' ? (
          <View style={styles.iconLeft_container}>
            <Icon name={iconName} size={60} color={'red'} />
          </View>
        ) : null}

    
    </View>
  );
};

export default Titulo;

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    paddingTop:10,
    paddingBottom:10,
    paddingHorizontal: 10,
    // backgroundColor:'gray'
  },

  content: {
    flex: 1,
  },

  titulo: {
    // color:global.color.naranja,
    textTransform:'capitalize'
  },

  subtitulo: {
    // color:global.color.black,
    textTransform:'capitalize'
  },

  info: {
    // color:global.color.black,
    // textTransform:'capitalize'
  },

  iconLeft_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});