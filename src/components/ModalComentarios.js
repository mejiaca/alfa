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
import CardItemComments from '../components/CardItemComments';
import {AppContext} from '../context/State';
import  TopBar from '../components/TopBar';
import CampoItem from '../components/CampoItem';
import { getPostComments, removeGroup, removeMember } from '../context/Actions';
import {formatFecha} from '../managers/Global';


const ModalComentarios = ({post_id, titulo, closeModal, visible, navigation}) => {
    const { dispatch, user, participantes, groupInfo, storagePath } = useContext(AppContext);
    const [coments, setComents] = useState([]);

    useEffect(() => {
        if(visible){
            getPostComments(dispatch, post_id, setComents);
        }
    }, [visible]);

    const close = (data) => {
        closeModal();
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
        // closeModal();
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

                <TopBar titulo={titulo} tipo={'modal'} close={close} />

                <View style={{paddingHorizontal:10,  paddingTop:20}}>
                    <Text style={[styles.username, {marginBottom: 10, marginTop:0}]}>Comentarios {coments.length}</Text>
                </View>

                <FlatList
                    data={coments}
                    contentContainerStyle={{paddingHorizontal:10, paddingTop:10, paddingBottom:50}}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, i }) => (
                        <CardItemComments  key={item.groupid} data={item} storagePath={storagePath} admin={groupInfo.user_id} user_id={user.user_id} onPress={confirmDeleteMember} />
                    )}
                />

            </View>
        </Modal>
    )
}
  
export default ModalComentarios;

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