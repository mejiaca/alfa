/**
 * LEVAPAN
 * jorgereyes@8rios.com
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */

import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, Text, Modal, Button} from 'react-native';
import * as Contacts from 'expo-contacts';
import CardItemModal from '../components/CardItemModal';
import SearchFilter from '../components/SearchFilter';
import {AppContext} from '../context/State';
import  TopBar from '../components/TopBar';

const ModalContactos = ({closeContacts, visible, setContact}) => {
    const { dispatch, animales } = useContext(AppContext);
    const [modalVisible, setModalVisible] = useState(true);
    const [contacts, setContacts] = useState([]);
    const [contacts_list, setContactsList] = useState([]);

    useEffect(() => {
        if(visible){
            getContacts();
        }
    }, [visible]);

    const agregar = (name, cel) => {
        let pref = "";
        if (cel.startsWith('+')) { pref = '+';  }
        const clean = cel.replace(/\D/g, '');
        setContact(name, cel);
        closeContacts();
    };

    const close = (data) => {
        closeContacts();
    };

    const getContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync();

        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers],
            });

            if (data.length > 0) {
                let objs = [];
                data.forEach((item, i) => {
                    objs.push({id:i, nombre: item.name, numero:item.phoneNumbers?.[0]?.number});
                });
                setContacts(objs);
                setContactsList(objs);
            }
        } else {
            alert('Permiso a Contactos denegado');
        }
    };

    const buscarContacto = (texto) => {
        let list = [];
        contacts.filter(contacto => {
            let nombre = contacto.nombre?.toLowerCase();
            let numero  = contacto.numero?.replace(/\D/g, ''); 
            let busqueda = texto.toLowerCase().replace(/\s+/g, '');
            
            if(!nombre){  nombre = '0'; }
            if(!numero){  numero = '0'; }

            if(nombre.includes(busqueda) || numero.includes(busqueda)){
                list.push({id:contacto.id, nombre: contacto.nombre, numero: contacto.numero});
            }
        });
        setContactsList(list);
    }

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.modalBackground}>

                <TopBar titulo={'Mis Contactos'} tipo={'modal'} close={close} />

                <View style={{paddingHorizontal:10, backgroundColor:'white', paddingVertical:20}}>
                    <SearchFilter setSearchText={buscarContacto} />
                </View>

                <FlatList
                    data={contacts_list}
                    contentContainerStyle={{paddingHorizontal:10, paddingTop:10, paddingBottom:50}}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, i }) => (
                        <CardItemModal  key={i} data={item} onPress={agregar} />
                    )}
                />

            </View>
        </Modal>
    )
}
  
export default ModalContactos;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgb(228, 228, 228)',
    },
    contentContainer: {
        paddingHorizontal:20,
        paddingBottom:50
    },
    alert_txt: {
        // color: global.color.black,
        // fontFamily: global.font.light,
      },
});