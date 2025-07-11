/**
 * LEVAPAN
 * jorgereyes@8rios.com
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, {useEffect} from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const BotonGeneral = ({title_1, title_2, loading, active, onPress}) => {

  return (
    <TouchableOpacity
      style={[
        styles.loginButton,
        loading && styles.loginButtonDisabled,
        active && styles.loginButtonActive
      ]}
      onPress={onPress}
      disabled={loading || !active}
      activeOpacity={0.8}
    >
      <Text style={[
        styles.loginButtonText,
        active && styles.loginButtonTextActive
      ]}>
        {loading ? title_2 : title_1}
      </Text>
    </TouchableOpacity>
  )
}

export default BotonGeneral

const styles = StyleSheet.create({
  loginButton: {
    height: 56,
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
  }
});