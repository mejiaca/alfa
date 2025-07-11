import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import { AppContext } from '../context/State';
import { logOut, updateUserPic } from '../context/Actions';

export default function SubirFoto({ setUriFoto }) {
  const { dispatch, user, storagePath } = useContext(AppContext);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if(user.foto != ''){
      setProfileImage(storagePath + user.foto);
    }
  }, []);

  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permiso requerido', 'Necesitamos acceso a tu galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const original = result.assets[0];
      const maxWidth = 800;
      const scaleFactor = maxWidth / original.width;
      const newHeight = original.height * scaleFactor;
      const manipulated = await ImageManipulator.manipulateAsync(
        original.uri,
        [
          {
            resize: {
              width: maxWidth,
              height: Math.round(newHeight),
            },
          },
        ],
        {
          compress: 0.7,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );

      const uri = manipulated.uri;
      let picname = 'usuarios/'+user.user_id+'.jpg';
      let data = {
        foto: picname + '?' + Date.now()
      }
      // updateUserPic(dispatch, user.user_id, uri, picname, data, endPost);
      setProfileImage(uri);
      setUriFoto(uri);
    }
  };

  const handleRemoveImage = async () => {
    // Alert.alert('Eliminar foto', '¿Deseas quitar tu foto de perfil?', [
    //   { text: 'Cancelar', style: 'cancel' },
    //   {
    //     text: 'Quitar',
    //     style: 'destructive',
    //     onPress: async () => {
    //       setProfileImage(null);
    //       // await AsyncStorage.removeItem('profileImage');
    //     },
    //   },
    // ]);
  };


  return (
    <View style={styles.container}>
      <TouchableOpacity  onPress={handlePickImage} onLongPress={handleRemoveImage}>
        <Image
          source={ profileImage ? { uri: profileImage }  : require('../assets/images/avatar.png') }
          style={styles.avatar}
        />
        <View style={[styles.inviteButton]} >
            <Ionicons name="camera-outline" size={20} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 16,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  stats: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  
  editarButton: {
    backgroundColor: 'rgb(0,0,0)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginRight:20
  },

  logoutText: {
    color: 'white',
    fontSize: 16,
  },
  note: {
    marginTop: 20,
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },

  inviteButton: {
    position:'absolute',
    bottom:18,
    right:0,
    width:40,
    height:40,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 20,
    justifyContent:'center',
    alignItems:'center'
  },
});
