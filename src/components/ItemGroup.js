import React, { useContext, useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { AppContext } from '../context/State';
import { getImagePost } from '../context/Actions';

export default function ItemGroup({ispatch, item, user_id, onPress }) {
  const { dispatch, user, storagePath } = useContext(AppContext);
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [newpost, setNewPost] = useState(0);
  const [totalpost, setTotalPost] = useState(0);

  useEffect(() => {
    setImage(null);
    getImagePost(item.groupid, setimage);
  }, []);

  const setimage = async  (value, total) => {
    setImage(storagePath + value)
    setTotalPost(total);    
    const guardados = await AsyncStorage.getItem(`posts_vistos_${item.groupid}`);
    const vistos = guardados ? parseInt(guardados) : 0;
    if(total > vistos){
      setNewPost(total - vistos);
    }
  };

  useEffect(() => {
    console.log('1', newpost)
    
  }, [item]);

  const handleImagePress = async () => {
    await AsyncStorage.setItem(`posts_vistos_${item.groupid}`, totalpost.toString());
    setNewPost(0);

    dispatch({ type: 'SET_POSTS', payload: []});
    dispatch({ type: 'SET_GROUP_INFO', payload: item});

    navigation.navigate('Feed', {
      groupId: item.groupid,
      groupName: item.name,
    });
  };

  const handleInvite = (group) => {
    navigation.navigate('InviteUsers', {
      groupId: item.groupid,
      groupName: item.name,
    });
  };

  return (
    <View style={styles.imageContainer}>
      <TouchableOpacity 
        activeOpacity={0.8}
        onPress={handleImagePress}
      >
        <Image source={{ uri: image }} style={styles.image} />
      </TouchableOpacity>

      <View style={{flex:1}}>

        <TouchableOpacity style={styles.dateOverlay} onPress={handleImagePress}>
          <Image
            source={ item.foto != '' ?  { uri: storagePath+item.foto }  : require('../assets/images/avatar.png') }
            style={styles.avatargrupo} 
          />
          <View style={{flex:1}}>
            <Text style={styles.captionTitle}>{item.name}</Text>
            {newpost > 0 && (
            <View style={{flexDirection:'row', marginTop:0, alignItems:'center'}}>
              <View style={{width:10, height:10, borderRadius:5, marginRight:5, backgroundColor:'red'}}></View>
              <Text style={styles.nuevos}>{newpost} Nuevos</Text>
            </View>
            )}
          </View>
        </TouchableOpacity>

        <Text style={[styles.dateText, {flex:1, marginLeft:10, paddingRight:15}]}>{item.description}</Text>

        <View style={{flexDirection:'row', justifyContent:'flex-end', padding:5, backgroundColor:''}}>
          {user_id == item.user_id ? (
          <TouchableOpacity style={[styles.iconButton, {marginLeft:0}]} onPress={() => handleInvite(item)} >
            <AntDesign name="adduser" size={16} color="#fff" />
          </TouchableOpacity>
          ):null} 

          {user_id == item.user_id ? (
          <TouchableOpacity style={[styles.iconButton, {marginLeft:10}]} onPress={()=> onPress(item)} >
            <Icon name="settings-outline" size={16} color="#fff" />
          </TouchableOpacity>
          ):(
            <TouchableOpacity style={[styles.iconButton, {marginLeft:10}]} onPress={()=> onPress(item)}>
              <Icon name="people-outline" size={16} color="#fff" />
            </TouchableOpacity>
          )} 
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  imageContainer: {
    flexDirection:'row',
    margin: 6,
    elevation:8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5, 
    backgroundColor:'white',
    borderRadius: 8,
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
    backgroundColor:'#c8c8c8ff'
  },

  avatargrupo: {
    width: 33,
    height: 33,
    borderRadius:16,
    marginRight:5
  },

  captionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    // fontWeight: '600',
    color: '#000',
  },

  dateOverlay: {
    flexDirection:'row',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    paddingVertical: 4,
    paddingHorizontal:10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  dateText: {
    color: '#666',
    fontSize: 12,
  },
  
  nuevos: {
    color: '#0dc81dff',
    fontSize: 12,
  },

  deleteButton: {
    // position: 'absolute',
    // bottom: 6,
    // right: 6,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
    padding: 5,
  },
  editButton: {
    // position: 'absolute',
    // bottom: 6,
    // left: 6,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
    padding: 5,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPosts: {
    fontSize: 16,
    color: '#666',
  },
  editModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    fontSize: 14,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  iconButton: {
    width:30,
    height:30,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    justifyContent:'center',
    alignItems:'center'
  },
});