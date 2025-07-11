/**
 * LEVAPAN
 * jorgereyes@8rios.com
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */

import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import global from '../managers/Global';

const CardItemModal = ({data, onPress, tipo}) => {

  return (
    <View style={styles.item_container}>

      {/* <Text>{item.name} - {item.phoneNumbers?.[0]?.number}</Text> */}


        <TouchableOpacity 
          style={[styles.container, {backgroundColor: '#f5f7fa'}]} 
          onPress={()=> onPress(data.nombre, data.numero)}
          >

          <View style={styles.info_container}>
              <Text style={styles.info_title} numberOfLines={1}>{data.nombre}</Text>
              <Text style={[styles.info_categoria]} numberOfLines={1}>{data.numero}</Text>
          </View>
          <View style={styles.icon}>
            <Icon  color={'black'} size={20}  name="chevron-right" />
          </View>

        </TouchableOpacity>

    </View>
  );
};

export default CardItemModal;

const styles = StyleSheet.create({
  item_container: {
    flex: 1,
    width:'100%',
    
    // backgroundColor:'red'
    // flexDirection:'row',
  },

  container: {
    flex: 1,
    flexDirection:'row',
    borderRadius: 10,
    marginBottom:3,
    paddingLeft: 15,
    paddingRight:5,
    paddingVertical:5,
    // backgroundColor:'#f5f7fa'
  },

  info_container: {
    flex: 1,
  },

  info_title: {
    fontSize: 13,
    fontWeight:'bold'
    // color: global.color.black,
  },

  info_categoria: {
    fontSize: 12,
    textTransform:'capitalize',
    // color: global.color.naranja
  },

  icon_delete: {
    marginLeft:10,
    justifyContent:'center',
    alignItems:'flex-end'
  },

  icon: {
    justifyContent:'center'
  },

});