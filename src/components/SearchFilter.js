import React, {useEffect,  useContext, useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import global, {width} from '../managers/Global';
import {AppContext} from '../context/State';

const SearchFilter = ({seccion, tipo, setSearchText}) => {
  const { dispatch, filtro_busqueda } = useContext(AppContext);
  const [text, setText] = useState('');

  const toSearch = (value) => {
    setText(value);
    setSearchText(value);
  };

  const clean = (value) => {
    setText('');
    setSearchText('');
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.search}>
          <Icon color={global.color.gray5} size={15} name="search" style={styles.icon} />
          <TextInput
            style={styles.textInput}
            autoCorrect={false}
            placeholder="Buscar"
            placeholderTextColor={global.color.gray5}
            value={text}
            returnKeyType={ 'search' }
            onChangeText={(e) => toSearch(e)}
            onSubmitEditing={(e) => toSearch(e.nativeEvent.text)}
          />
          {text !== '' ? (
            <TouchableOpacity style={[{ paddingVertical:8 }]} onPress={clean}>
              <Icon color={global.color.gray5} size={15} name="times-circle" style={styles.icon} />
            </TouchableOpacity>
          ):null}
          
        </View>

      </View>
    </>
  );
};

export default SearchFilter;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flexDirection: 'row',
  },
  search: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius:10,
    // backgroundColor:global.color.gray1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgb(190, 190, 190)',
  },
  
  filter: {
    // flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius:10,
    marginLeft:10,
    borderWidth: 1,
    borderStyle: 'solid',
    // borderColor: global.color.gray2,
  },

  icon: {
    marginHorizontal: 10,
  },
  textInput: {
    flex:1,
    // width:'100%',
    paddingVertical: Platform.OS == 'ios'? 10 : 5,
    color: '#000000',
    // fontFamily: global.font.light,
  },
  navigateSearch: {
    position: 'absolute',
    // width: width,
    height: 49,
    backgroundColor:'transparent'
  },
});
