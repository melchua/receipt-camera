// import { Constants } from 'expo';
import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity, // Trans Buttons?
  Slider,
  Platform
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { LOCALURL } from 'react-native-dotenv';

import ReceiptForm from './components/ReceiptForm';
import CameraScreen from './components/CameraScreen';
import PhotoPreview from './components/PhotoPreview';
import GalleryScreen from './GalleryScreen';
import FormModalScreen from './components/FormModalScreen';
import ReceiptScreen from './components/ReceiptScreen';

import LoginScreen from './components/LoginScreen';


const MainStack = createStackNavigator({
  Receipt: ReceiptForm,
  Camera: CameraScreen,
  Preview: PhotoPreview,
  Gallery: GalleryScreen,
  Login: LoginScreen,
  ReceiptScreen: ReceiptScreen
}, {
  initialRouteName: 'Login',
});

const RootStack = createStackNavigator({
  Main: {
    screen: MainStack,
  },
  FormModal: {
    screen: FormModalScreen,
  },
  ReceiptFormModal: {
    screen: ReceiptForm,
  }
}, {
  mode: 'modal',
  headerMode: 'none',
});



export default class App extends React.Component {
  render() {
    return ( <
      RootStack / >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});