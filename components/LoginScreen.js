import React, {
  Component
} from 'react';
import {
  Alert,
  AppRegistry,
  AsyncStorage,
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
    fetch('http://10.30.31.122:8080/users/login', {
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
      console.log(response)
      AsyncStorage.setItem('jwtToken', response)
      console.log('item stored')
      this.props.navigation.navigate('Camera')
    })
    .catch((error) => {
      Alert.alert(
        'Invalid Login',
        'Unable input correct user information', [{
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
        <Text style={styles.companyName}>Paperless</Text>
        <View style={styles.loginContainer}>                  
        </View>
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
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(40, 75, 99, 0.8);',
    borderRadius: 10,
  },
  loginButton: {
    backgroundColor: 'orange',
    marginTop: 30,
    marginBottom: 30
  },
  loginHeader: {
    color: "white",
    alignSelf: 'center',
    fontSize: 30,
    marginTop: 30,

  },
  companyName: {
    color: "white",
    alignSelf: 'center',
    fontSize: 50,
    top: -50,
  }
})