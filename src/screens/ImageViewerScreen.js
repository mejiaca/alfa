import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  GestureHandlerRootView,
  PinchGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function ImageViewerScreen({ route, navigation }) {
  const { image, storagePath } = route.params;

  const scale = useSharedValue(1);

  const pinchHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      scale.value = event.scale;
    },
    onEnd: () => {
      scale.value = withTiming(1); // vuelve al tamaño original
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close" size={32} color="#fff" />
      </TouchableOpacity>
      
      <PinchGestureHandler onGestureEvent={pinchHandler}>
        <Animated.View style={animatedStyle}>
          <Image
            source={{ uri: storagePath+image }}
            style={styles.image}
            resizeMode="contain"
          />
        </Animated.View>
      </PinchGestureHandler>
    </GestureHandlerRootView>

    // <View style={styles.container}>
    //   <TouchableOpacity
    //     style={styles.closeButton}
    //     onPress={() => navigation.goBack()}
    //   >
    //     <Ionicons name="close" size={32} color="#fff" />
    //   </TouchableOpacity>
    //   <Image source={{ uri: image }} style={styles.fullImage} resizeMode="contain" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: width,
    height: height,
    borderRadius: 12,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
});
