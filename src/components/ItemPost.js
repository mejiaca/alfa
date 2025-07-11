import React,{useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from "@expo/vector-icons";
import BotonLike from '../components/BotonLike';

export default function ItemPost({dispatch, item, storagePath, setModalDialogo }) {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [initialComments, setinitialComments] = useState(0);


  const handleComment = () => {

  };

  const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
  };


  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: storagePath + item.foto  }}
              style={styles.avatar}
            />
            <View style={styles.userDetails}>
              <Text style={styles.username}>{item.usuario}</Text>
              <Text style={styles.timeAgo}>{formatDate(item.timestamp)}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          activeOpacity={0.95}
          onPress={() => navigation.navigate('ImageViewer', { image: item.image, storagePath:storagePath }) }
        >
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: storagePath + item.image }}
              style={styles.postImage}
              resizeMode="cover"
            />
          </View>
        </TouchableOpacity>

        <View style={styles.actions}>
          <View style={styles.leftActions}>

            <BotonLike id={item.id}/>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setModalDialogo(true)}
              activeOpacity={0.7}
            >
              <AntDesign name={"message1"} size={25} color="rgba(28, 28, 28, 0.8)" />
            </TouchableOpacity>
          </View>
        </View>
  
        <View style={styles.postInfo}>
          {likesCount > 0 && (
            <TouchableOpacity style={styles.likesContainer}>
              <Text style={styles.likesText}>
                {likesCount} {likesCount === 1 ? 'me gusta' : 'me gusta'}
              </Text>
            </TouchableOpacity>
          )}

          <View style={styles.captionContainer}>
            <Text style={styles.caption}>
              {/* <Text style={styles.captionUsername}>{'username'} </Text> */}
              <Text style={styles.captionTitle}>{item.title}</Text>
              {item.comment && (
                <Text style={styles.captionDescription}>
                  {'\n'}{item.comment}
                </Text>
              )}
            </Text>
          </View>
  
          {initialComments > 0 && (
            <TouchableOpacity 
              style={styles.commentsContainer}
              onPress={handleComment}
            >
              <Text style={styles.commentsText}>
                Ver los {initialComments} comentarios
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
  );

  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    // backgroundColor:'blue'
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  timeAgo: {
    fontSize: 12,
    color: '#8e8e8e',
    marginTop: 1,
  },
  moreButton: {
    // padding: 5,
  },
  moreButtonText: {
    fontSize: 18,
    color: '#8e8e8e',
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  leftActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 15,
    padding: 5,
  },
  actionIcon: {
    fontSize: 24,
  },
  likedIcon: {
    transform: [{ scale: 1.1 }],
  },
  postInfo: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  likesContainer: {
    marginBottom: 8,
  },
  likesText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  captionContainer: {
    marginBottom: 8,
  },
  caption: {
    fontSize: 14,
    lineHeight: 18,
  },
  captionUsername: {
    fontWeight: 'bold',
    color: '#000',
  },
  captionTitle: {
    fontWeight: '600',
    color: '#000',
  },
  captionDescription: {
    color: '#000',
    fontWeight: 'normal',
  },
  commentsContainer: {
    marginTop: 4,
  },
  commentsText: {
    fontSize: 14,
    color: '#8e8e8e',
  },
});