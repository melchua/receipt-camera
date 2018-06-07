import React, {
  Component
} from 'react';
import {
  Alert,
  AppRegistry,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Icon,
  Button
} from 'react-native-elements'
import {
  Font
} from 'expo';

import {
  MaterialIcons
  } from '@expo/vector-icons';
import { LOCALURL } from 'react-native-dotenv'


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  static navigationOptions = {
    header: null,
  };

  login = () => {
    fetch(LOCALURL+'/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    .then((response) => response.json())
    .then((response) => {
      AsyncStorage.setItem('jwtToken', response.token)
      this.props.navigation.navigate('Camera')
    })
    .catch((error) => {
      Alert.alert(
        'Invalid Login',
        'Incorrect user information. Please try again.', [{
          text: 'OK',
          onPress: ""
        }, ], {
          cancelable: false
        }
      )
    })
  }
  render() {
      return (

        <View style={styles.container}>
        <Text style={styles.companyName}><MaterialIcons name='receipt' size={40} color="black"/> Paperless</Text>
        <View style={styles.loginContainer}>
        </View>
            <StatusBar barStyle="dark-content" />
            <View style={styles.formContainer}>
            <Text style={styles.loginHeader}>Login</Text>
            <FormLabel>Email</FormLabel>
            <View>
            <FormInput
            onChangeText = {(inputLocation) => this.setState({email:inputLocation})}/>
            />
            </View>
            <FormLabel>Password</FormLabel>
            <FormInput
            secureTextEntry={true}
            onChangeText = {(inputLocation) => this.setState({password:inputLocation})}
            />

            <Button
            small
            title='SUBMIT'
            onPress={this.login.bind(this)}
            buttonStyle={styles.loginButton}
            />
            </View>
      </View>
      );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 30,
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(201,201,201,0.5)',
    borderRadius: 10,
    justifyContent: 'center',
    display:'flex',
    top:150,
  },
  loginButton: {
    backgroundColor: 'rgb(9,135,138)',
    marginTop: 30,
    marginBottom: 30,
    shadowColor: 'silver',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 10,
    shadowOpacity: 1.0
  },
  loginHeader: {
    color: "black",
    alignSelf: 'center',
    fontSize: 30,
    marginTop: 30,
  },
  companyName: {
    color: "black",
    alignSelf: 'auto',
    fontSize: 50,
    alignSelf: 'center',
    top: 120,
    marginBottom:30

  }
})