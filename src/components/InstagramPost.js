import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const InstagramPost = ({
  userAvatar = 'https://st2.depositphotos.com/1809585/7376/i/950/depositphotos_73762843-stock-photo-girl-smiling-with-perfect-smile.jpg',
  username = 'usuario123',
  postImage = 'https://hips.hearstapps.com/hmg-prod/images/ciudades-bonitas-italia-escapada-dos-tres-dias-venecia-6655ce119e0d7.jpeg',
  title = 'Mi increíble publicación',
  description = 'Esta es la descripción de mi post. ¡Espero que les guste! #reactnative #instagram',
  initialLikes = 0,
  initialComments = 0,
  timeAgo = '2h',
  onLike,
  onComment,
}) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes);

  const handleLike = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    setLikesCount(prev => newLikedState ? prev + 1 : prev - 1);
    
    if (onLike) {
      onLike(newLikedState, likesCount);
    }
  };

  const handleComment = () => {
    if (onComment) {
      onComment();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header del post */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: userAvatar }}
            style={styles.avatar}
          />
          <View style={styles.userDetails}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.timeAgo}>{timeAgo}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreButtonText}>⋯</Text>
        </TouchableOpacity>
      </View>

      {/* Imagen del post */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: postImage }}
          style={styles.postImage}
          resizeMode="cover"
        />
      </View>

      {/* Botones de acción */}
      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleLike}
            activeOpacity={0.7}
          >
            <Text style={[styles.actionIcon, liked && styles.likedIcon]}>
              {liked ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleComment}
            activeOpacity={0.7}
          >
            <Text style={styles.actionIcon}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.7}
          >
            <Text style={styles.actionIcon}>📤</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.7}
        >
          <Text style={styles.actionIcon}>🔖</Text>
        </TouchableOpacity>
      </View>

      {/* Información del post */}
      <View style={styles.postInfo}>
        {/* Likes */}
        {likesCount > 0 && (
          <TouchableOpacity style={styles.likesContainer}>
            <Text style={styles.likesText}>
              {likesCount} {likesCount === 1 ? 'me gusta' : 'me gusta'}
            </Text>
          </TouchableOpacity>
        )}

        {/* Título y descripción */}
        <View style={styles.captionContainer}>
          <Text style={styles.caption}>
            <Text style={styles.captionUsername}>{username} </Text>
            <Text style={styles.captionTitle}>{title}</Text>
            {description && (
              <Text style={styles.captionDescription}>
                {'\n'}{description}
              </Text>
            )}
          </Text>
        </View>

        {/* Comentarios */}
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
};

// Componente ejemplo para mostrar múltiples posts
const InstagramFeed = () => {
  const samplePosts = [
    {
      id: 1,
      userAvatar: 'https://via.placeholder.com/40x40/3498db/ffffff?text=JD',
      username: 'juan_dev',
      postImage: 'https://via.placeholder.com/400x300/2ecc71/ffffff?text=NATURE',
      title: 'Día increíble en la montaña',
      description: 'Nada como conectar con la naturaleza 🏔️ #nature #hiking #adventure',
      initialLikes: 24,
      initialComments: 5,
      timeAgo: '2h',
    },
    {
      id: 2,
      userAvatar: 'https://via.placeholder.com/40x40/e74c3c/ffffff?text=MG',
      username: 'maria_photo',
      postImage: 'https://via.placeholder.com/400x400/f39c12/ffffff?text=FOOD',
      title: 'Desayuno perfecto',
      description: 'Empezando el día con energía ☕️🥐 #breakfast #coffee #foodie',
      initialLikes: 18,
      initialComments: 8,
      timeAgo: '4h',
    },
    {
      id: 3,
      userAvatar: 'https://via.placeholder.com/40x40/9b59b6/ffffff?text=CP',
      username: 'code_pro',
      postImage: 'https://via.placeholder.com/400x300/34495e/ffffff?text=CODE',
      title: 'Nuevo proyecto terminado',
      description: 'React Native + Firebase = ❤️ #coding #reactnative #firebase #dev',
      initialLikes: 42,
      initialComments: 12,
      timeAgo: '6h',
    },
  ];

  const handleLike = (liked, count) => {
    console.log(`Post ${liked ? 'liked' : 'unliked'}, total: ${count}`);
  };

  const handleComment = () => {
    console.log('Abrir comentarios');
  };

  return (
    <View style={feedStyles.container}>
      {samplePosts.map((post) => (
        <InstagramPost
          key={post.id}
          userAvatar={post.userAvatar}
          username={post.username}
          postImage={post.postImage}
          title={post.title}
          description={post.description}
          initialLikes={post.initialLikes}
          initialComments={post.initialComments}
          timeAgo={post.timeAgo}
          onLike={handleLike}
          onComment={handleComment}
        />
      ))}
    </View>
  );
};

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
    padding: 5,
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

const feedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});

// Exportar tanto el componente individual como el feed completo
export { InstagramPost, InstagramFeed };
export default InstagramPost;