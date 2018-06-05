import React, { Component } from 'react';
import { AppRegistry,StyleSheet,Text ,View} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Icon, Button } from 'react-native-elements'
import { Font } from 'expo';



export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { loaded: true };
  }
  // componentDidMount() {
  //   Expo.Font.loadAsync({
  //     openSansRegular: require('../assets/fonts/OpenSans-Regular.ttf'),
  //   });
  //   this.setState({ loaded: true });
  // }
  static navigationOptions = {
    header: null,
  };
  render() {
      return (

        <View style={styles.container}>
        {
          this.state.loaded ? (
            <View>
        <Text style={styles.companyName}>Scratch</Text>
        <View style={styles.loginContainer}>                  
        </View>
            <View style={styles.formContainer}>
            <Text style={styles.loginHeader}>Login</Text>
            <FormLabel>Name</FormLabel>
            <View>
            <FormInput/>
            </View>
            <FormLabel>Password</FormLabel>
            <FormInput/>
            
            <Button
            small
            title='SUBMIT'
            onPress={()=>{this.props.navigation.navigate('Camera')}}
            buttonStyle={styles.loginButton}
            />
            </View>
            </View> ): <View>Loading</View>}
      </View>
      );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#2c3e50',
      justifyContent:'center',
      paddingHorizontal: 30,
  },
  loginContainer:{
      alignItems: 'center',
      justifyContent: 'center',
  },
  formContainer:{
    backgroundColor:'rgba(40, 75, 99, 0.8);',
    borderRadius: 10,
  },
  loginButton:{
    backgroundColor:'orange',
    marginTop: 30,
    marginBottom: 30
  },
  loginHeader:{
    color:"white",
    alignSelf:'center',
    fontSize:30,
    marginTop:30,
  },
  companyName:{
    color:"white",
    alignSelf:'center',
    fontSize:50,
    top:-50,
  }
})