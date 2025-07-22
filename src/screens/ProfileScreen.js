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
import { Ionicons } from '@expo/vector-icons';
import CampoItem from '../components/CampoItem';
import CampoInput from '../components/CampoInput';

import { AppContext } from '../context/State';
import { logOut, updateUserPic, getUser } from '../context/Actions';

export default function ProfileScreen({ navigation }) {
  const { dispatch, user, storagePath } = useContext(AppContext);
  const [profileImage, setProfileImage] = useState(null);
  const [usuario, setUsuario] = useState("");
  const [nombre, setNombre] = useState("");

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
      updateUserPic(dispatch, user.user_id, uri, picname, data, endPost);
      setProfileImage(uri);
    }
  };

  const endPost = (value, userid) => {
    getUser(dispatch, userid, null);
  }

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro que deseas salir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sí',
        style: 'destructive',
        onPress: async () => {
          logOut(dispatch, salir);
          // await logout();
          // navigation.reset({
          //   index: 0,
          //   routes: [{ name: 'Login' }],
          // });
        },
      },
    ]);
  };

  const editProfile = () => {

  };

  const salir = (value) => {
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Login' }],
    // });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePickImage}>
        <Image
          source={ profileImage ? { uri: profileImage }  : require('../assets/images/avatar.png') }
          style={styles.avatar}
        />
        <View style={[styles.inviteButton]} >
            <Ionicons name="camera-outline" size={20} color="#fff" />
        </View>
      </TouchableOpacity>

      <Text style={styles.username}>{user.nombre}</Text>

      <CampoItem titulo="Usuario:"  value={user.usuario}/>
      <CampoItem titulo="Nombre:"  value={user.nombre}/>
      <CampoItem titulo="Número Celular:"  value={user.user_id}/>

      <CampoInput titulo="Usuario:"  setText={setUsuario}  value={usuario} editable={true}/>
      <CampoInput titulo="Nombre:"  setText={setNombre}  value={nombre} editable={true}/>
      
      <View style={{marginBottom:50}}></View>

      <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={styles.editarButton} onPress={editProfile}>
          <Text style={styles.logoutText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.note}>versión: 1.0.1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    // backgroundColor: '#fff',
  },
  avatar: {
    width: 160,
    height: 160,
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
