import { Constants, Camera, FileSystem, Permissions } from 'expo';
import React from 'react';
import {  Alert, AsyncStorage, StyleSheet, Text, View, TouchableOpacity, Slider, Platform, Image } from 'react-native';
import { Ionicons, MaterialIcons, Foundation, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class Login extends React.Component {
    _renderLoginContent = () => (
      <View style={styles.container}>
        <Text>Login</Text>
        <Button
          onPress={this.login}
          title="Login"
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

    login = () => {
      fetch('http://10.30.32.255:8080/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: "email@email.com",
          password: "12345"
        })
      })
      .then((response) => response.json())
      .then((response) => {
        AsyncStorage.setItem('jwtToken', response);
        // AsyncStorage.getItem('jwtToken').then((value) => {
        //   console.log(value);
        // })
        // console.log(response);
      })
      .catch((error) => {
        console.error("Error is: ", error);
      })
    }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Login Screen</Text>
        {this._renderLoginContent()}
        <Text onPress={()=> this.props.navigation.goBack()}>Back</Text>
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

export default Login;

