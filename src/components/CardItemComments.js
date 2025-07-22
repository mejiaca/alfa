/**
 * LEVAPAN
 * jorgereyes@8rios.com
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */

import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const CardItemComments = ({data, image, storagePath, onPress, admin, user_id}) => {

  return (
    <View  style={[styles.container, {backgroundColor: '#f5f7fa'}]}   >
      <View  style={{flex:1, flexDirection:'row'}}   >
        <Image
          source={ data.foto != '' ? { uri: storagePath + data.foto }  : require('../assets/images/avatar.png') }
          style={styles.avatar}
        />

        <View style={styles.info_container}>
            <Text style={styles.info_title} numberOfLines={1}>{data.nombre}</Text>
            <Text style={styles.info_comment} >{data.comment}</Text>
        </View>
      </View>
      {/* {admin == user_id ? (
      <TouchableOpacity style={styles.inviteButton} onPress={() => onPress(data.key, data.nombre)} >
          <AntDesign name="delete" size={15} color="#fff" />
      </TouchableOpacity>
      ):null} */}
    </View>
  );
};

export default CardItemComments;

const styles = StyleSheet.create({
  item_container: {
    flex: 1,
    width:'100%',
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ccc',
  },

  container: {
    flex: 1,
    flexDirection:'row',
    borderRadius: 10,
    marginBottom:3,
    paddingLeft: 10,
    paddingRight:5,
    paddingVertical:5,
    alignItems:'center'
  },

  info_container: {
    flex:1,
    // backgroundColor:'gray'
  },

  info_title: {
    fontSize: 13,
    fontWeight:'bold',
    marginLeft:10,
    // color: global.color.black,
  },
  info_comment: {
    fontSize: 13,
    // fontWeight:'bold',
    marginLeft:10,
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

  inviteButton: {
      width:30,
      height:30,
      backgroundColor: 'rgba(0,0,0,0.6)',
      borderRadius: 20,
      justifyContent:'center',
      alignItems:'center',
      marginRight:5
    },

});