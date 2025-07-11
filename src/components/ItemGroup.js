import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { getImagePost } from '../context/Actions';

const screenWidth = Dimensions.get('window').width;
const numColumns = 2;
const itemSize = screenWidth / numColumns;

export default function ItemGroup({dispatch, item, storagePath, user_id }) {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);

  useEffect(() => {
    setImage(null);
    getImagePost(item.groupid, setimage);
  }, []);

  const setimage = (value) => {
    setImage(storagePath + value)
  };

  const handleImagePress = () => {
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
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={handleImagePress}
      >
        <ImageBackground
          source={image ? { uri: image } : require('../assets/images/placeholder.png')}
          style={styles.image}
          imageStyle={{ borderRadius: 10 }}
        >
          <View style={styles.overlay}>
            <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
            {user_id == item.user_id ? (
              <TouchableOpacity style={styles.inviteButton} onPress={() => handleInvite(item)} >
                <AntDesign name="adduser" size={20} color="#fff" />
              </TouchableOpacity>
            ):(
              <View style={{height:30}} />
            )}            
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 6,
  },

  item: {
    width: itemSize - 12,
    margin: 6,
    alignItems: 'center',
    elevation:8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5, 
  },

  content_saludo: {
      flexDirection:'row',
      justifyContent:'space-between',
      marginTop:30,
      marginBottom:40,
      alignItems:'center',
    },

    nombre: {
          textTransform:'capitalize',
          // color: tema == 'oscuro' ? Colors.white : Colors.black,
          fontSize: 25,
          fontFamily:'Book',
          opacity:.8
        },

  
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    borderRadius: 12,
    overflow: 'hidden',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 6,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  title: {
    maxWidth:140,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#007aff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  fabIcon: {
    fontSize: 30,
    color: '#fff',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 350,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inviteButton: {
    width:30,
    height:30,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});