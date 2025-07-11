/**
 * LEVAPAN
 * jorgereyes@8rios.com
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, {useEffect} from 'react'
import { Text, TouchableOpacity, StyleSheet, View, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

const Boton = ({ titulo, onPress }) => {
  // const navigation = useNavigation();


  return (
    <TouchableOpacity
      style={[ styles.loginButton, styles.loginButtonActive  ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[
        styles.loginButtonText, styles.loginButtonTextActive
      ]}>
        {titulo}
      </Text>
    </TouchableOpacity>
  )
}

export default Boton

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    height: 56,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputFocused: {
    borderColor: '#3498db',
    shadowOpacity: 0.1,
  },
  characterCount: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 4,
    textAlign: 'right',
  },
  loginButton: {
    height: 50,
    // width:'100%',
    paddingHorizontal:20,
    marginHorizontal:20,
    backgroundColor: '#bdc3c7',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonActive: {
    backgroundColor: '#3498db',
  },
  loginButtonDisabled: {
    backgroundColor: '#ecf0f1',
    shadowOpacity: 0,
    elevation: 0,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7f8c8d',
  },
  loginButtonTextActive: {
    color: 'white',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#95a5a6',
    textAlign: 'center',
    lineHeight: 18,
  },
});