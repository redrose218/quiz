import { Platform, ToastAndroid } from 'react-native';
import Toast from 'react-native-simple-toast';

const Utils = {
  getUri(uriString) {
    let retUri;
    if (Platform.OS === 'android') {
      retUri = { uri: uriString, isStatic: true };
    } else {
      retUri = { uri: uriString.replace('file://', ''), isStatic: true };
    }
    return retUri.uri;
  },
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },
  clone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    let copy = obj.constructor();
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  },
  toast(message) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Toast.show(message);
    }
  },
  isKeywordMatch(text, keyword) {
    if (!text) return false;
    return text.toLowerCase().indexOf(keyword.toLowerCase()) >= 0;
  },
  numberWithCommas(x) {
    if (!x) return 0;
    return (x * 1).toFixed(x == parseInt(x) ? 0 : 2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
};

export default Utils;
