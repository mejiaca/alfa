import React, { useState, useContext, useEffect } from 'react';
import {  View, Text,  TextInput, Image, StyleSheet, Alert, KeyboardAvoidingView, Platform, TouchableOpacity, Share } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import TopBar from '../components/TopBar';
import BotonGeneral  from '../components/BotonGeneral';
import ModalContactos from '../components/ModalContactos';
import { AppContext } from '../context/State';
import { checkUser, inviteUser } from '../context/Actions';


export default function InviteUsersScreen({ route, navigation }) {
  const { dispatch, user, userGroups } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const { groupId, groupName } = route.params || {};
  const [celular, setTitle] = useState('');
  const [nombre, setNombre] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if(celular.length < 1){
      setNombre('')
    }
  }, [celular]);

  const handleContacts = () => {
    setModalVisible(true);
  };

  const closeContacts = () => {
    setModalVisible(false);
  };

  const setContact = (name, cel) => {
    setNombre(name);
    setTitle(cel);
  }


  const agregar = () => {
    if(celular == '' || celular.length < 10){
      Alert.alert('Invitar Usuario', 'Ingresa el número del invitado');
      return;
    }

    const phone = celular.replace(/\D/g, '');
    checkUser(phone, groupId, sendInvite);
    setLoading(true);
  };

  const sendInvite = (send) => {
    if(send){
      Alert.alert(
        'Usuario no registrado', 'Enviar invitación para registro en la app',
        [
          { text: 'Cancelar', onPress: () => setLoading(false) },
          { text: 'Enviar', onPress: () => invitar() },
        ]
      );
    }else{
      Alert.alert('Usuario agregado con éxito', '');
      setLoading(false);
      setNombre('');
      setTitle('');
      navigation.goBack();
    }
  };

  const invitar = async () => {
    const codigo = Math.floor(10000 + Math.random() * 90000);
    try {
      const result = await Share.share({
        message: "¡Hola! Únete a mi grupo privado: "+groupName+", en Alfa Levapan. Usa el código "+codigo+" para el registro. Descarga aquí: https://levapan.com/alfaapp",
      });
  
      if (result.action === Share.sharedAction) {
        inviteUser(groupId, codigo, invitacionEnviada);
      }
      setLoading(false);      
    } catch (error) {
      console.error(error.message);
    }
  };

  const invitacionEnviada = async (send) => {
    if(send){
      Alert.alert('Usuario invitado con éxito', '');
      setNombre('');
      setTitle('');
      navigation.goBack();
    }else{
      Alert.alert('Error al invitar al usuario', '');
    }
  }

  return (
    <View style={styles.container}>
      <TopBar titulo={'Invitar Usuario'} tipo={'invitar'} navigation={navigation} groupId={groupId}/>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          
          <Text style={styles.titulo}>Grupo: {groupName}</Text>

          <Text style={styles.emptyText}>
            Ingresa o selecciona al usuario:
          </Text>

          <Text style={styles.nombre}>  {nombre} </Text>

          <View style={{flexDirection:'row', marginTop:5}}>
            <TextInput
              placeholder="Número celular"
              value={celular}
              onChangeText={setTitle}
              style={styles.input}
              keyboardType="numeric" 
              editable={!loading}
            />
            <TouchableOpacity style={styles.inviteButton} onPress={handleContacts}>
              <AntDesign name="adduser" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={{  marginTop:20}}>
            <BotonGeneral 
              title_1={'Agregar al Grupo'} 
              title_2={'Agregando...'} 
              loading={loading} 
              active={celular.length > 6 ? true: false}
              onPress={agregar}
            />
          </View>

          <ModalContactos visible={modalVisible} closeContacts={closeContacts} setContact={setContact}/>

        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
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

  content: {
    flex: 1,
    paddingHorizontal:20,
    paddingTop:50
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
