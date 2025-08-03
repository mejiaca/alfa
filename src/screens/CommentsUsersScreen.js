import React, { useState, useContext, useEffect } from 'react';
import {  View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import CardItemComments from '../components/CardItemComments';
import { AppContext } from '../context/State';
import { getPostComments } from '../context/Actions';

export default function InviteUsersScreen({ route, navigation }) {
  const { dispatch, user, storagePath, groupInfo } = useContext(AppContext);
  const { groupId, groupName, postId } = route.params || {};
  const [coments, setComents] = useState([]);

  useEffect(() => {
    getPostComments(dispatch, postId, setComents);
  }, [postId]);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
        <View style={styles.content}>

          <View style={{backgroundColor:'', alignItems:'flex-end', marginTop:10}}>
            <TouchableOpacity style={styles.iconButton} onPress={goBack} >
                <AntDesign name="close" size={20} color="#747474ff" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.titulo}>Comentarios: {coments.length}</Text>

          <FlatList
            data={coments}
            contentContainerStyle={{paddingHorizontal:0, paddingTop:10, paddingBottom:50}}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, i }) => (
                <CardItemComments  key={item.groupid} data={item} storagePath={storagePath} admin={groupInfo.user_id} user_id={user.user_id} onPress={null} />
            )}
          />

        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:300,
    // backgroundColor: 'j',
  },

  content: {
    flex: 1,
    paddingHorizontal:20,
    // paddingTop:50,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    backgroundColor:'#ffffff'
  },

  iconButton: {
      width:40,
      height:40,
      // backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 20,
      justifyContent:'center',
      alignItems:'flex-end'
  },

  inviteButton: {
    width:40,
    height:40,
    // backgroundColor: 'rgba(0,0,0,0.6)',
    backgroundColor: '#3498db',
    borderRadius: 20,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:5,
  },

  

  imagePreview: {
    width: 200,
    height: 300,
    borderRadius: 10,
    marginBottom: 16,
  },
  input: {
    flex:1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  warningText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 40,
  },

  emptyText: {
    fontSize: 16,
    color: '#666',
    // textAlign: 'center',
    marginBottom:40
  },

  nombre: {
    fontSize: 16,
    fontWeight:'bold',
    marginBottom:5
  },

  titulo: {
    fontSize: 16,
    fontWeight:'bold',
    marginBottom:5
  },


});
