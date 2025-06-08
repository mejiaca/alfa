import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext'; // ✅ conexión con el contexto

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const { login } = useContext(AuthContext); // ✅ obtiene login del contexto

  useEffect(() => {
    const checkUser = async () => {
      const savedUser = await AsyncStorage.getItem('username');
      if (savedUser) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainTabs' }],
        });
      }
    };
    checkUser();
  }, []);

  const handleLogin = async () => {
    if (!username.trim()) {
      Alert.alert('Nombre requerido', 'Por favor ingresa tu nombre de usuario.');
      return;
    }

    await login(username.trim()); // ✅ actualiza estado global y AsyncStorage
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 24 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
});
