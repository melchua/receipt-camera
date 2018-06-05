import { Constants, Camera, FileSystem, Permissions, ImageManipulator } from 'expo';
import React from 'react';
import Modal from 'react-native-modal';
import {
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Animated,
  Dimensions,
  TouchableOpacity,
  Slider,
  Platform,
  Image,
  AsyncStorage
  } from 'react-native';


  import {
    Ionicons,
    MaterialIcons,
    Foundation,
    MaterialCommunityIcons,
    Octicons
    } from '@expo/vector-icons';

import { Dialog } from 'react-native-simple-dialogs';
import ReceiptFormModal from './ReceiptForm.js';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const PHOTOS_DIR = FileSystem.documentDirectory + 'photos';

class PhotoPreview extends React.Component {
  constructor(props) {
    super(props),
      this.state = {
        image: "hello",
        visibleModal: null,
      }
  }
  resizePicture = async () => {
    const manipResult = await ImageManipulator.manipulate(
      this.props.navigation.getParam('uri', 'defaultvalue'), [{
        resize: {
          width: 800
        }
      }], {
        format: 'png',
        base64: true
      }
    )
    this.setState({
      image: manipResult
    })
    console.log("right before upload picture");
    this.uploadPicture();
  }



  uploadPicture = () => {
    // const jwtToken = AsyncStorage.getItem('jwtToken');
    // console.log(jwtToken);

    AsyncStorage.getItem('jwtToken')
      .then((result) => {
        fetch('http://10.30.31.122:8080/images', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${result}`
            },
            body: JSON.stringify({
              id: "2",
              photo: this.state.image
            })
          })
          .then((response) => response.json())
          .then((response) => {
            this.setState({
              visibleModal: null
            });
            this.props.navigation.navigate('ReceiptFormModal', {
              visionResponse: response
            })
            console.log(response);
          })
          .catch((error) => {
            this.setState({
              visibleModal: 2,
            });
          });
      })
  };
  handlePress = async () => {
    console.log("Inside Handle");
    this.setState({
      visibleModal: 1
    });
    this.resizePicture()
      .catch(err => console.log("err", err));
  }
  static navigationOptions = {
    header: null,
  }

  // Modal Pop Setup
  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <Button
        title="SENDING"
        loading
        loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
        titleStyle={{ fontWeight: "700" }}
        buttonStyle={{
          backgroundColor: "rgba(106, 226, 198, 1)",
          width: 300,
          height: 60,
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 5,
        }}
        containerStyle={{ marginTop: 20 }}
      />
    </View>
  );

  //error modal Pop Up
  _renderErrorModalContent = () => (
    Alert.alert(
      'Invalid Picture',
      'Unable to read receipt. Please try again', [{
        text: 'OK',
        onPress: () => this.props.navigation.navigate('Camera')
      }, ], {
        cancelable: false
      }
    ));

  _checkDisplayState = (number) => {
    if (number === 1) {
      return this._renderModalContent()
    } else if (number === 2) {
      return this._renderErrorModalContent()
    }
  }

  _onBackgroundPress = (number) => {
    if (number === 1) {
      return this.setState({
        visibleModal: 1
      })
    } else if (number === 2) {
      return this.props.navigation.navigate('Camera')
    }
  }
  render() {

    const {navigation} = this.props;
    const uri = navigation.getParam('uri', 'defaultvalue');
    console.log("uri: ", uri);
    return (
      <View style={styles.container}>
        <Image
          style={styles.pictures}
          source={ {uri: uri} }
        />
      <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.bottomButtonRight}  onPress={() => this.props.navigation.navigate('Camera')}>
            <Octicons name="triangle-left" size={30} color="white"/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bottomButtonLeft}  onPress={this.handlePress.bind(this)} >
              <Octicons name="triangle-right" size={30} color="white"/>
          </TouchableOpacity>

        </View>

        <Modal isVisible={this.state.visibleModal !== null} onBackdropPress={() => this._onBackgroundPress(this.state.visibleModal)} >
          {this._checkDisplayState(this.state.visibleModal)}
        }
        </Modal>
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
  bottomButtonLeft: {
    flex: 1,
    height: 58,
    paddingRight: 30,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  bottomButtonRight: {
    flex: 1,
    height: 58,
    paddingLeft: 30,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  bottomBar: {
    paddingBottom: 5,
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    flex: 0.13,
    flexDirection: 'row',
  },
  mod_container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  button: {
    backgroundColor: "lightblue",
    padding: 12,
    margin: 16,
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  modalContent: {
    backgroundColor: 'transparent',
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  }
});


export default PhotoPreview;