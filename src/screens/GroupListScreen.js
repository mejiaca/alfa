import React, { useContext, useState, useEffect, useCallback  } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Button} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import TopBar from '../components/TopBar';
import ItemGroup from '../components/ItemGroup';
import ModalGrupos from '../components/ModalGrupos';
import { AppContext } from '../context/State';
import { createGroup, getUserGroups } from '../context/Actions';

export default function GroupListScreen({ navigation }) {
  const { dispatch, user, userGroups, posts, storagePath } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDesc, setGroupDesc] = useState('');
  const [modalGrupoInfo, setModalGrupoInfo] = useState(false);


  useFocusEffect(
    useCallback(() => {
      get_groups();
    }, [])
  );

  const get_groups = () => {
    getUserGroups(dispatch, user.user_id );
  };

  

  const handleCreateGroup = () => {
    if (!groupName.trim()) return;
    if (groupDesc == '') return;

    const newGroup = {
      user_id: user.user_id,
      foto: "grupos/logo_grupo.png",
      groupid: `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
      name: groupName.trim(),
      description: groupDesc,
      timestamp: Date.now()
    };

    dispatch({ type: 'SET_USER_GROUPS', payload: []});
    createGroup(dispatch, user.user_id, newGroup, get_groups);
    setGroupName('');
    setGroupDesc('');
    setModalVisible(false);
  };

  const groupDetails = (item) => {
    dispatch({ type: 'SET_GROUP_MEMBERS', payload: []});
    dispatch({ type: 'SET_GROUP_INFO', payload: item});
    setModalGrupoInfo(true);
  };

  const closeModal = () => {
    setModalGrupoInfo(false);
  };

  const renderItem = ({ item }) => {
    return (
      <ItemGroup 
        dispatch={dispatch} 
        item={item} 
        storagePath={storagePath} 
        user_id={user.user_id}
        onPress={groupDetails}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>

      <TopBar navigation={navigation}/>

      <FlatList
        data={userGroups}
        keyExtractor={(item, i) => i}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.fabIcon}>＋</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Nuevo grupo</Text>
            <TextInput
              placeholder="Nombre del grupo"
              value={groupName}
              autoCapitalize='words'
              onChangeText={setGroupName}
              style={styles.input}
              maxLength={20}
            />
            <Text style={styles.modalTitle}>Descripción</Text>
            <TextInput
              placeholder="Descripción del grupo"
              value={groupDesc}
              onChangeText={setGroupDesc}
              style={styles.input}
              multiline
              maxLength={60}
              blurOnSubmit
            />
            <View style={styles.modalButtons}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button title="Crear" onPress={handleCreateGroup} />
            </View>
          </View>
        </View>
      </Modal>


      <ModalGrupos visible={modalGrupoInfo} closeContacts={closeModal} navigation={navigation}/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom:120
  },

  title: {
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
    elevation:8,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6, 
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

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
