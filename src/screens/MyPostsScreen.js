import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  TextInput,
  Button,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PostsContext } from '../context/PostsContext';
import { AuthContext } from '../context/AuthContext';

const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth / 2 - 12;

export default function MyPostsScreen() {
  const { posts, removePost, updatePost } = useContext(PostsContext);
  const { user } = useContext(AuthContext);

  const myPosts = posts.filter((post) => post.username === user?.username);

  const [selectedPost, setSelectedPost] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedComment, setEditedComment] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('es-ES');
  };

  const confirmDelete = (postId) => {
    Alert.alert(
      'Eliminar publicación',
      '¿Estás seguro de que deseas eliminar esta publicación?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => removePost(postId),
        },
      ]
    );
  };

  const openEditModal = (post) => {
    setSelectedPost(post);
    setEditedTitle(post.title);
    setEditedComment(post.comment);
    setModalVisible(true);
  };

  const handleUpdate = () => {
    if (!editedTitle.trim() || !editedComment.trim()) {
      Alert.alert('Faltan datos', 'Completa todos los campos.');
      return;
    }

    updatePost({
      ...selectedPost,
      title: editedTitle,
      comment: editedComment,
    });

    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* Fecha */}
      <View style={styles.dateOverlay}>
        <Text style={styles.dateText}>{formatDate(item.timestamp)}</Text>
      </View>

      {/* Botón editar */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => openEditModal(item)}
      >
        <Ionicons name="pencil" size={20} color="#fff" />
      </TouchableOpacity>

      {/* Botón eliminar */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => confirmDelete(item.id)}
      >
        <Ionicons name="trash" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  if (myPosts.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.noPosts}>Aún no has subido publicaciones.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={myPosts}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.container}
        renderItem={renderItem}
      />

      {/* Modal de edición */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.editModal}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Editar publicación</Text>
            <TextInput
              style={styles.input}
              placeholder="Nuevo título"
              value={editedTitle}
              onChangeText={setEditedTitle}
            />
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Nuevo comentario"
              multiline
              value={editedComment}
              onChangeText={setEditedComment}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button title="Guardar" onPress={handleUpdate} />
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
  imageContainer: {
    position: 'relative',
    margin: 6,
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: 8,
  },
  dateOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 4,
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  dateText: {
    color: '#fff',
    fontSize: 12,
  },
  deleteButton: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    padding: 5,
  },
  editButton: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    padding: 5,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPosts: {
    fontSize: 16,
    color: '#666',
  },
  editModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    fontSize: 14,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
