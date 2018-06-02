import { Constants, Camera, FileSystem, Permissions } from 'expo';
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


const PHOTOS_DIR = FileSystem.documentDirectory + 'photos';

class PhotoPreview extends React.Component {

  render() {

    const {navigation} = this.props;
    const photo = navigation.getParam('photo', 'defaultvalue');
    const stringphoto = JSON.stringify(photo);
    console.log('photo: ', photo);

    return (

      <View style={styles.container}>
        <Image
          style={styles.pictures}
          source={ {uri: photo} }
        />
         <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.bottomButton} onPress={() => this.props.navigation.navigate('Camera')}>
              <Octicons name="reply" size={30} color="white"/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bottomButton}>
              <View>
                <Ionicons name="ios-send" size={30} color="white" onPress={() => this.props.navigation.navigate('Camera')} />
              </View>
            </TouchableOpacity>
          </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  pictures: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  bottomButton: {
    flex: 1,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBar: {
    paddingBottom: 5,
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    flex: 0.13,
    flexDirection: 'row',
  },
});

export default PhotoPreview;