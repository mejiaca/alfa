import React, { useContext, useState, useEffect, useCallback  } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, Modal, TextInput, Button} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import  TopBar from '../components/TopBar';
import  InstagramPost from '../components/InstagramPost';
import  ItemGroup from '../components/ItemGroup';
import { AppContext } from '../context/State';
import { createGroup, getUserGroups } from '../context/Actions';


const screenWidth = Dimensions.get('window').width;
const numColumns = 2;
const itemSize = screenWidth / numColumns;

export default function GroupListScreen({navigation }) {
  const { dispatch, user, userGroups, posts, storagePath } = useContext(AppContext);
  // const [posts, setInitialRoute] = useState(null);
  const [groups, setGroups] = useState(null);
  // const [user, setUsers] = useState(null);
  // const { groups, addGroup, deleteGroup, inviteUserToGroup, } = useContext(GroupsContext);
  // const { user } = useContext(AuthContext);


  const [modalVisible, setModalVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  // const [userGroups, setUserGroups] = useState([]);


  useFocusEffect(
    useCallback(() => {
      get_groups();
    }, [])
  );

  const get_groups = () => {
    // getUserGroups(dispatch, user.user_id );
  };

  useEffect(() => {
    // console.log(groups)
    // if (user?.username) {
    //   const visibleGroups = getUserGroups(user.username);
    //   console.log('👤 Usuario:', user.username);
    //   console.log('📁 Todos los grupos:', groups);
    //   console.log('👀 Grupos visibles para usuario:', visibleGroups);
    //   setUserGroups(visibleGroups);
    // } else {
    //   console.log('⚠️ Usuario no cargado aún');
    // }
  }, [groups, user]);

  const handleCreateGroup = () => {
    if (!groupName.trim()) return;

    const newGroup = {
      userid: user.user_id,
      groupid: `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
      name: groupName.trim(),
      timestamp: Date.now()
    };

    createGroup(dispatch, user.user_id, newGroup, get_groups);
    setGroupName('');
    setModalVisible(false);
  };

  const renderItem = ({ item }) => {
    return (
      <ItemGroup dispatch={dispatch} item={item} storagePath={storagePath} userid={user.user_id}/>
    );
  };

  // if (!user?.username) {
  //   return (
  //     <View style={styles.center}>
  //       <Text>Cargando usuario...</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={{ flex: 1 }}>

     <TopBar titulo={groupName} tipo={'grupo'} navigation={navigation} groupId={groupId}/>

      <FlatList
        data={userGroups}
        keyExtractor={(item, i) => i}
        renderItem={renderItem}
        numColumns={numColumns}
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
              onChangeText={setGroupName}
              style={styles.input}
              maxLength={15}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button title="Crear" onPress={handleCreateGroup} />
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 6,
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

  item: {
    width: itemSize - 12,
    margin: 6,
    alignItems: 'center',
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
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 6,
    position: 'relative',
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
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    padding: 6,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
