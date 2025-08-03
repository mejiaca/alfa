/**
 * LEVAPAN
 * jorgereyes@8rios.com
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { useContext } from 'react'
import { Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import SearchFilter from './SearchFilter';
import { AppContext } from '../context/State';

const TopBar = ({titulo, tipo='normal', navigation, groupId, close, onPress }) => {
  const { user, storagePath, groupInfo } = useContext(AppContext);

  const goBack = () => {
    navigation.goBack();
  };
  const goProfile = () => {
    navigation.navigate('Perfil', {});
  };

  const edit = () => {
    // navigation.goBack();
  };

  const buscarGroup = (texto) => {
    // let list = [];
    // contacts.filter(contacto => {
    //     let nombre = contacto.nombre?.toLowerCase();
    //     let numero  = contacto.numero?.replace(/\D/g, ''); 
    //     let busqueda = texto.toLowerCase().replace(/\s+/g, '');
        
    //     if(!nombre){  nombre = '0'; }
    //     if(!numero){  numero = '0'; }

    //     if(nombre.includes(busqueda) || numero.includes(busqueda)){
    //         list.push({id:contacto.id, nombre: contacto.nombre, numero: contacto.numero});
    //     }
    // });
    // setContactsList(list);
  }


  return (
    <View style={styles.NavContainer}>

      {tipo == 'normal' ? (
        <View style={styles.NavBar}>

          <View style={{flex:1, flexDirection:'row', paddingHorizontal:10, paddingBottom:10}}>
            <TouchableOpacity  onPress={goProfile} style={{ justifyContent:'center'}}>
              <Image 
                style={styles.avatar} 
                source={ user.foto != '' ?  { uri: storagePath+user.foto }  : require('../assets/images/avatar.png') }
              />
            </TouchableOpacity>

            <View style={{flex:1, marginLeft:10}}>
              <Text style={styles.usuario}>{user.usuario}</Text>
              {/* <Text style={styles.nombre} numberOfLines={1}>Hola, {user.nombre}</Text> */}
              <SearchFilter setSearchText={buscarGroup} />
            </View>
          </View>

        </View>
      ):null}

      {tipo == 'grupo' ? (
        <View style={styles.NavBar}>
          <TouchableOpacity onPress={goBack} style={styles.IconBehave}>
            <Icon name="chevron-back-sharp" size={30} color="#242424" />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Text style={styles.header}>{titulo}</Text>
          </View>

          <TouchableOpacity onPress={edit} style={styles.IconBehave}>
            <Icon name="settings-outline" size={30} color="#242424" />
          </TouchableOpacity>
        </View>
      ):null}


      {tipo == 'feed' ? (
        <View style={styles.NavBar}>
          <TouchableOpacity onPress={goBack} style={styles.IconBehave}>
            <Icon name="chevron-back-sharp" size={30} color="#242424" />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Text style={styles.header}>{ titulo}</Text>
          </View>

          <TouchableOpacity onPress={onPress} style={styles.IconBehave}>
            {groupInfo.user_id == user.user_id ? (
              <Icon name="settings-outline" size={30} color="#242424" />
            ):(
              <Icon name="people-outline" size={30} color="#242424" />
            )}
          </TouchableOpacity>
        </View>
      ):null}

      {tipo == 'favorito' ? (
        <View style={styles.NavBar}>
          <View style={styles.IconBehave}>
            <Icon name="chevron-back-sharp" size={30} color="#fff" />
          </View>

          <View style={styles.logoContainer}>
            <Text style={styles.header}>{titulo}</Text>
          </View>

          <View  style={styles.IconBehave}>
            <Icon name="settings-outline" size={30} color="#fff" />
          </View>
        </View>
      ):null}

      {tipo == 'invitar' ? (
        <View style={styles.NavBar}>
          <TouchableOpacity onPress={goBack} style={styles.IconBehave}>
            <Icon name="chevron-back-sharp" size={30} color="#242424" />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Text style={styles.header}>{titulo}</Text>
          </View>

          <View  style={styles.IconBehave}>
            <Icon name="settings-outline" size={30} color="#fff" />
          </View>
        </View>
      ):null}

      {tipo == 'modal' ? (
        <View style={styles.NavBar}>
          <TouchableOpacity onPress={close} style={styles.IconBehave}>
            <Icon name="chevron-back-sharp" size={30} color="#242424" />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Text style={styles.header}>{titulo}</Text>
          </View>

          <View  style={styles.IconBehave}>
            <Icon name="settings-outline" size={30} color="#fff" />
          </View>
        </View>
      ):null}

    </View>
  )
}

export default TopBar

const styles = StyleSheet.create({
  NavContainer: {
    width: '100%',
    backgroundColor: 'white',
    elevation:8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2, 
    paddingTop:60,
    marginBottom: 5
  },
  NavBar: {
    alignItems: 'center',
    alignContent:'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    // paddingTop: Platform.OS == 'ios'? 50 : 20
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#ccc',
  },

  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#242424'
  },

  image: {
    width: 120,
    height: 50,
    resizeMode: 'contain',
  },

  logoContainer: {
    paddingBottom:10,
  },

  IconBehave: {
    width : 50,
    alignItems: 'center',
    paddingBottom:10,
  },

  usuario: {
    fontSize: 16,
    color: 'rgb(122, 122, 122)',
    // color: '#999',
    // textAlign: 'center',
  },
  
  nombre: {
    fontSize: 20,
    color: 'rgb(54, 54, 54)',
    fontWeight:'bold'
    // textAlign: 'center',
  },

})