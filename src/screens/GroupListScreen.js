import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

import { PostsContext } from '../context/PostsContext';
import { GroupsContext } from '../context/GroupsContext';
import { AuthContext } from '../context/AuthContext';

const screenWidth = Dimensions.get('window').width;
const numColumns = 2;
const itemSize = screenWidth / numColumns;

export default function GroupListScreen({ navigation }) {
  const { posts } = useContext(PostsContext);
  const { groups, addGroup, deleteGroup, inviteUserToGroup, getUserGroups } = useContext(GroupsContext);
  const { user } = useContext(AuthContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [userGroups, setUserGroups] = useState([]);

  // ⚠️ Consola para ver usuario y grupos
  useEffect(() => {
    if (user?.username) {
      const visibleGroups = getUserGroups(user.username);
      console.log('👤 Usuario:', user.username);
      console.log('📁 Todos los grupos:', groups);
      console.log('👀 Grupos visibles para usuario:', visibleGroups);
      setUserGroups(visibleGroups);
    } else {
      console.log('⚠️ Usuario no cargado aún');
    }
  }, [groups, user]);

  const getLatestImageForGroup = (groupId) => {
    const groupPosts = posts
      .filter((post) => post.groupId === groupId)
      .sort((a, b) => b.timestamp - a.timestamp);
    return groupPosts.length > 0 ? groupPosts[0].image : null;
  };

  const handleCreateGroup = () => {
    if (!groupName.trim()) return;

    const newGroup = {
      id: `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
      name: groupName.trim(),
    };

    addGroup(newGroup);
    if (user?.username) {
      inviteUserToGroup(user.username, newGroup.id);
    }
    setGroupName('');
    setModalVisible(false);
  };

  const handleInvite = (group) => {
    const link = `clanapp://invite?groupId=${group.id}&groupName=${encodeURIComponent(group.name)}&username=nuevo_usuario`;
    const message = `¡Te invito a unirte al grupo "${group.name}" en nuestra app! Pulsa este link desde tu dispositivo con la app instalada:\n\n${link}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

  const renderItem = ({ item }) => {
    const image = getLatestImageForGroup(item.id);

    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() =>
            navigation.navigate('Feed', {
              groupId: item.id,
              groupName: item.name,
            })
          }
        >
          <ImageBackground
            source={image ? { uri: image } : require('../../assets/placeholder.png')}
            style={styles.image}
            imageStyle={{ borderRadius: 12 }}
          >
            <View style={styles.overlay}>
              <Text style={styles.title}>{item.name}</Text>
              <TouchableOpacity
                style={styles.inviteButton}
                onPress={() => handleInvite(item)}
              >
                <Ionicons name="logo-whatsapp" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  };

  if (!user?.username) {
    return (
      <View style={styles.center}>
        <Text>Cargando usuario...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={userGroups}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={numColumns}
        contentContainerStyle={styles.container}
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
    padding: 6,
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
