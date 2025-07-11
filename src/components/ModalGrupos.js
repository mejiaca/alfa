/**
 * LEVAPAN
 * jorgereyes@8rios.com
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */

import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, Text, Modal, TouchableOpacity, Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import CardItemMembers from '../components/CardItemMembers';
import {AppContext} from '../context/State';
import  TopBar from '../components/TopBar';
import CampoItem from '../components/CampoItem';
import { getGroupMembers, removeGroup, removeMember } from '../context/Actions';
import {formatFecha} from '../managers/Global';


const ModalGrupos = ({closeContacts, visible, navigation}) => {
    const { dispatch, user, participantes, groupInfo, storagePath } = useContext(AppContext);

    useEffect(() => {
        if(visible){
            getGroupMembers(dispatch, groupInfo.groupid);
        }
    }, [visible]);

    const close = (data) => {
        closeContacts();
    };

    const confirmDelete = (postId) => {
        Alert.alert(
          'Eliminar grupo',
          '¿Estás seguro de eliminar este grupo?',
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Eliminar',
              style: 'destructive',
              onPress: () => deleteGroup(),
            },
          ]
        );
    };

    const deleteGroup = () => {
        dispatch({ type: 'SET_USER_GROUPS', payload: []});
        removeGroup(groupInfo.groupid, endGroup)
    };

    const endGroup = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'MainTabs' }],
        });
    }

    const edit = () => {
        // closeContacts();
    };

    const invitar = () => {
        navigation.navigate('InviteUsers', {
            groupId: groupInfo.groupid,
            groupName: groupInfo.name,
        });
        close();
    };

    const confirmDeleteMember = (key, nombre) => {
        Alert.alert(
          'Eliminar grupo',
          '¿Estás seguro de eliminar a: '+nombre+'?',
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Eliminar',
              style: 'destructive',
              onPress: () => deleteMember(key),
            },
          ]
        );
    };

    const deleteMember = (key) => {
        // dispatch({ type: 'SET_GROUP_MEMBERS', payload: []});
        removeMember(dispatch, key, groupInfo.groupid);
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.modalBackground}>

                <TopBar titulo={groupInfo.user_id == user.user_id ? 'Admin Grupo':'Participantes'} tipo={'modal'} close={close} />

                <View style={{paddingHorizontal:10,  paddingTop:20}}>
                    <CampoItem titulo="Grupo:"  value={groupInfo.name}/>
                    <CampoItem titulo="Administrador:"  value={groupInfo.nombre}/>
                    <CampoItem titulo="Fecha:"  value={formatFecha(groupInfo.timestamp)}/>

                    {groupInfo.user_id == user.user_id ? (
                    <View style={{flexDirection:'row', justifyContent:'flex-end', marginTop:10, backgroundColor:''}}>
                        <TouchableOpacity style={[styles.iconButton, {marginRight:10}]} onPress={() => invitar()} >
                            <AntDesign name="adduser" size={20} color="#fff" />
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.iconButton, {marginRight:10}]} onPress={() => edit()} >
                            <AntDesign name="edit" size={20} color="#fff" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconButton} onPress={() => confirmDelete()} >
                            <AntDesign name="delete" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    ):null}

                    <Text style={[styles.username, {marginBottom: 10, marginTop:30}]}>Participantes {participantes.length}</Text>
                </View>

                <FlatList
                    data={participantes}
                    contentContainerStyle={{paddingHorizontal:10, paddingTop:10, paddingBottom:50}}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, i }) => (
                        <CardItemMembers  key={item.groupid} data={item} storagePath={storagePath} admin={groupInfo.user_id} user_id={user.user_id} onPress={confirmDeleteMember} />
                    )}
                />

            </View>
        </Modal>
    )
}
  
export default ModalGrupos;

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

    username: {
        fontSize: 22,
        fontWeight: 'bold',
    },

    iconButton: {
        width:40,
        height:40,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 20,
        justifyContent:'center',
        alignItems:'center'
    },
});