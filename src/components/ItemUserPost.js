import React, { useContext, useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import ModalDialogo from './ModalDialogo';
import { AppContext } from '../context/State';
import { removePost, removeFav } from '../context/Actions';

export default function ItemUserPost({item,  navigation, tipo }) {
  const { dispatch, user, storagePath } = useContext(AppContext);
  const [modalDialogo, setModalDialogo] = useState(false);

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
          onPress: () => deletePost(postId),
        },
      ]
    );
  };

  const deletePost = () => {
    removePost(dispatch, item.id, user.user_id);
  };

   const confirmDeleteFav = (postId) => {
    Alert.alert(
      'Eliminar favorito',
      '¿Estás seguro de remover este favorito?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => deleteFav(postId),
        },
      ]
    );
  };

  const deleteFav = () => {
    removeFav(dispatch, item.key, user.user_id);
  };

  const commentDialog = () => {
      setModalDialogo(true);
  };   

  return (
    <View style={styles.imageContainer}>
      <TouchableOpacity 
        activeOpacity={0.95}
        onPress={() => navigation.navigate('ImageViewer', { image: item.image, storagePath:storagePath }) }
      >
        <Image source={{ uri: storagePath + item.image }} style={styles.image} />
      </TouchableOpacity>

      <View style={{flex:1}}>

        <View style={styles.dateOverlay}>
          <Text style={styles.dateText}>{formatDate(item.timestamp)}</Text>
          <Text style={styles.captionTitle}>{item.title}</Text>
          <Text style={styles.comment} numberOfLines={2}>{item.comment}</Text>
        </View>

        {tipo == 'post' ? (
          <View style={{flexDirection:'row', justifyContent:'flex-end', padding:5, backgroundColor:''}}>
            <TouchableOpacity
              style={[styles.iconButton, {marginRight:10}]}
              onPress={commentDialog}
            >
              <AntDesign name="edit" size={15} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => confirmDelete(item.id)}
            >
              <Ionicons name="trash" size={15} color="#fff" />
            </TouchableOpacity>
          </View>
        ):(
          <View style={{flexDirection:'row', justifyContent:'flex-end', padding:5, backgroundColor:''}}>
            <TouchableOpacity
                style={styles.iconButton}
                onPress={() => confirmDeleteFav(item.id)}
              >
                <AntDesign name="heart" size={15} color="#fff" />
              </TouchableOpacity>
            </View>
        )}


      </View>


      <ModalDialogo 
        tipo={'post'}
        title={'Editar publicación'}
        modalVisible={modalDialogo} 
        setModalVisible={setModalDialogo}
        post_id={item.id}
        item={item}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  imageContainer: {
    flexDirection:'row',
    margin: 6,
    elevation:8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5, 
    backgroundColor:'white',
    borderRadius: 8,
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },

  captionTitle: {
    fontWeight: '600',
    color: '#000',
  },

  dateOverlay: {
    flex:1,
    paddingVertical: 4,
    paddingHorizontal:10,
    // alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  dateText: {
    color: '#666',
    fontSize: 12,
  },
  deleteButton: {
    // position: 'absolute',
    // bottom: 6,
    // right: 6,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
    padding: 5,
  },
  editButton: {
    // position: 'absolute',
    // bottom: 6,
    // left: 6,
    backgroundColor: 'rgba(0,0,0,0.3)',
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

  iconButton: {
    width:30,
    height:30,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    justifyContent:'center',
    alignItems:'center'
  },
});