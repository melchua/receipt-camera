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

import CameraScreen from './components/CameraScreen';

export default class App extends React.Component {
  render() {
    return <CameraScreen />
  }
}
