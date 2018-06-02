// import { Constants } from 'expo';
import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Slider,
  Platform
} from 'react-native';
import { createStackNavigator } from 'react-navigation';

import CameraScreen from './components/CameraScreen';
import PhotoPreview from './components/PhotoPreview';
import GalleryScreen from './GalleryScreen';


const RootStack = createStackNavigator({
  Camera: CameraScreen,
  Preview: PhotoPreview,
  Gallery: GalleryScreen,
  },
  {
    initialRouteName: 'Camera',
  }
);


export default class App extends React.Component {
  render() {
    return (
      <RootStack />
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
