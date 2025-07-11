/**
 * LEVAPAN
 * jorgereyes@8rios.com
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */

 
import {Dimensions} from 'react-native';
// import {showMessage, hideMessage} from 'react-native-flash-message';
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';


export default {
  versionName: '1.0.1',
  databasePath: '/',
  timestamp: new Date().getTime(),
  events: new EventEmitter(),

  user_id: '',
  isAuth: false,
  show_notification: true,
  showedModal: false,
  remote_message: '',
  color: {
    // gray2:'',
    gray3:'',
    gray5:'#ccc',
  },
};

export const {width, height} = Dimensions.get('window');

// export const ToastMessage = (msg, desc) => {
//     showMessage({
//       message: msg,
//       description: desc,
//       type: 'default',
//       icon: {icon: 'warning', style: {tintColor: '#606060'}},
//       duration: 3000,
//       color: '#ffffff'
//     });
// };

export const numberFormat = (num) => {
  if (num == null || !num || num == '' ) {return '0';}

  num = Number(num.toFixed());
  num +='';
  var separador= ".";
  var sepDecimal= ',';
  var splitStr = num.split('.');
  var splitLeft = splitStr[0];
  var splitRight = splitStr.length > 1 ? sepDecimal + splitStr[1] : '';
  var regx = /(\d+)(\d{3})/;
  while (regx.test(splitLeft)) {
    splitLeft = splitLeft.replace(regx, '$1' + separador + '$2');
  }

  let result = splitLeft + splitRight;
  return result;
}




export const dateToString = (date_string) => {
  if (date_string == null || !date_string || date_string == '') {return '';}

  const dateinit = new Date('2000-01-01T00:00:00.000Z');
  if (dateinit.getTime() == date_string.getTime() || date_string == null || !date_string) {
    return '';
  } else {
    let  fecha = new Date(date_string);
    fecha = new Date(fecha.getUTCFullYear(), fecha.getUTCMonth(), fecha.getUTCDate());
    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDate();
    const fechaFormateada = `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}/${año}`;
    return fechaFormateada;
  }
};


export const formatFecha = (date_string) => {
  if (date_string == null || !date_string) {return '';}
  
  let  fecha = new Date(date_string);
  const dateinit = new Date('2000-01-01T00:00:00.000Z');
  if (dateinit.getTime() == fecha.getTime() || fecha == null || !fecha) {
    return '';
  } else {
    fecha = new Date(fecha.getUTCFullYear(), fecha.getUTCMonth(), fecha.getUTCDate());
    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDate();
    const fechaFormateada = `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}/${año}`;
    return fechaFormateada;
  }
};

