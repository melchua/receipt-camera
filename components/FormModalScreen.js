import {
  Constants,
  Camera,
  FileSystem,
  Permissions
} from 'expo';
import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Slider,
  Platform,
  Image
} from 'react-native';

import {
  Ionicons,
  MaterialIcons,
  Foundation,
  MaterialCommunityIcons,
  Octicons
} from '@expo/vector-icons';

class FormModalScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text onPress={()=> this.props.navigation.goBack()}>Back</Text>
      </View>
    );
  }
}

export default FormModalScreen;