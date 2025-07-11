import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, KeyboardAvoidingView, Platform, Image, Keyboard} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PhoneInput, { isValidPhoneNumber,} from 'react-native-international-phone-number';
import SubirFoto  from '../components/SubirFoto';
import BotonGeneral  from '../components/BotonGeneral';
import { AppContext } from '../context/State';
import { logIn, createUser, getUser } from '../context/Actions';

const LoginScreen = ({ navigation }) => {
  const { dispatch } = useContext(AppContext);
  const [celular, setCelular] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputactive, setInputActive] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [nombre, setNombre] = useState('');
  const [usuario, setUsuario] = useState('');
  const [codigo, setCodigo] = useState('');
  const [urifoto, setUriFoto] = useState('');
  const [logintipo, setLoginTipo] = useState('login');
  const [registrarse, setRegistrarse] = useState(false);

  useEffect(() => {
      if(nombre.length > 4 && usuario.length > 4 && codigo.length > 4){ 
        setInputActive(true);
      }else{
        setInputActive(false); 
      }
    }, [nombre, usuario, codigo]);

  const handleUsernameChange = (number) => {
    if(isValidPhoneNumber(number, selectedCountry)){ 
      setInputActive(true);
    }else{
      setInputActive(false); 
    }

    const cleanText = number.replace(/[^a-zA-Z0-9_]/g, '');
    setCelular(cleanText);
  };

  const handleLogin = async () => {
    if (celular.trim().length < 1) {
      Alert.alert('Error', 'Por favor ingresa tu número de celular');
      return;
    }

    let code = selectedCountry.callingCode.replace(/\D/g, '');
    let user_id = code+celular;

    setLoading(true);
    logIn(dispatch, user_id, ingresar);
    Keyboard.dismiss();
  };

  const registrar = async () => {
    Keyboard.dismiss();
    if (/\s/.test(usuario)) { Alert.alert('Cuenta', 'Nombre de usuario sin espacios'); return; }
    if (urifoto == '') {  Alert.alert('Cuenta', 'Selecciona foto de perfil'); return; }
    if (nombre == '') {  Alert.alert('Cuenta', 'Ingresa nombre completo'); return; }
    if (usuario == '') {  Alert.alert('Cuenta', 'Ingresa nombre de usuario'); return; }
    if (codigo == '') {  Alert.alert('Cuenta', 'Ingresa código de invitado'); return; }

    let code = selectedCountry.callingCode.replace(/\D/g, '');
    let user_id = code+celular;
    let nombrefoto = 'usuarios/'+user_id+'.jpg';

    let data = {
      user_id: user_id,
      codigo_id: codigo,
      nombre: nombre,
      usuario: usuario,
      celular: celular,
      foto: nombrefoto+'?'+new Date().getTime(),
      paiscode: code,
      pais: selectedCountry.name.es,
      createdAt: new Date().getTime(),
    }

    setLoading(true);
    createUser(dispatch, data, urifoto, nombrefoto, ingresar);
    Keyboard.dismiss();
  };

  const ingresar = (value, userid) => {
    if(!value && logintipo == 'login'){
      Alert.alert('Iniciar sesión', 'Crea una cuenta.');
      setLoginTipo('registro');
      setRegistrarse(true);
      setInputActive(false); 
    }

    if(!value && logintipo == 'registro'){
      Alert.alert('Cuenta', 'Código inválido.');
      setInputActive(true); 
    }

    if(value && logintipo == 'registro'){
      getUser(dispatch, userid, null);
    }

    setLoading(false);
  };

  

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>

          {!registrarse ? (
            <View style={{}}>
              <View style={styles.logoContainer}>
                <Image
                  source={{
                    uri: 'https://copu.media/wp-content/uploads/2024/05/2-1-1024x1024.png'
                  }}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.header}>
                <Text style={styles.title}>Bienvenido</Text>
                <Text style={styles.subtitle}>Ingresa tu número celular para continuar</Text>
              </View>

              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Número Celular</Text>

                  <PhoneInput
                    language="es"
                    defaultCountry="CO"
                    value={celular}
                    onChangePhoneNumber={handleUsernameChange}
                    selectedCountry={selectedCountry}
                    onChangeSelectedCountry={setSelectedCountry}
                    placeholder="Número celular..."
                    modalSearchInputPlaceholder="Busca tu país"
                    modalNotFoundCountryMessage="País no encontrado :("
                  />
                  <View style={{marginBottom:10}}></View>
                </View>

                <BotonGeneral 
                  title_1={'Continuar'} 
                  title_2={'Iniciando sesión...'} 
                  loading={loading} 
                  active={inputactive}
                  onPress={handleLogin}
                />
              </View>
            </View>
          ):(
            <View style={{}}>

              <SubirFoto setUriFoto={setUriFoto}/>
              <View style={styles.header}>
                <Text style={styles.title}>Crear Cuenta</Text>
                <Text style={styles.subtitle}>Ingresa tus datos para registrarte</Text>
              </View>
              
              <View style={styles.form}>
                <View style={styles.inputContainer}>
    
                  <TextInput
                    style={[ styles.input,  ]}
                    placeholder="Nombre Completo"
                    value={nombre}
                    onChangeText={setNombre}
                    autoCapitalize="words"
                    autoCorrect={true}
                    placeholderTextColor="#999"
                  />

                  <TextInput
                    style={[ styles.input,  ]}
                    placeholder="Usuario"
                    value={usuario}
                    onChangeText={setUsuario}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor="#999"
                  />

                  <TextInput
                    style={[ styles.input,  ]}
                    placeholder="Código Invitado"
                    value={codigo}
                    onChangeText={setCodigo}
                    autoCorrect={false}
                    keyboardType={'numeric'}
                    placeholderTextColor="#999"
                  />

                </View>

                <BotonGeneral 
                  title_1={'Continuar'} 
                  title_2={'Registrando...'} 
                  loading={loading} 
                  active={inputactive}
                  onPress={registrar}
                />
              </View>
            </View>
          )}




          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Al continuar, aceptas nuestros términos y condiciones
            </Text>
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
    elevation:8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5, 
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
    marginBottom: 20,
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
    marginBottom:10
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