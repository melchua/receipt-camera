import React, { Component } from 'react';
import { Text, StatusBar, TextInput, View, StyleSheet, Picker } from 'react-native';
import { Constants } from 'expo';
import { List, ListItem, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';



export default class ReceiptFormModal extends Component {
  constructor(props){
    super(props),
    state = {
      total: '',
      date: '',
      category: '',
      location: '',
      id:"",
      project_name:"Lighthouse",
      description:""
    };
  }
  componentWillMount() {
    this.setState({
      total: this.props.navigation.state.params.visionResponse.total.toFixed(2).toString(),
      date: this.props.navigation.state.params.visionResponse.date,
      id: this.props.navigation.state.params.visionResponse.id,

    });
  }

submitForm = () => {
  console.log("my current states",this.state)
  console.log("my current props", this.props)
  fetch('http://10.30.31.122:8080/receipts/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: this.state.id,
      location: this.state.location,
      total: this.state.total,
      date: this.state.date,
      description: this.state.description,
      project_id: 1,
      category_id: 1,
      image_url: "http://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg"
    })
  })
    .then((response) => {
      this.props.navigation.navigate('Camera')
    })
    .catch((error) => {
      console.error(error);
    })
  }
 render() {
  let data = [{
    value: 'Food',
  }, {
    value: 'Travel',
  }, {
    value: 'Entertainment',
  }];
   return (
     <View style={styles.container}>
       <StatusBar barStyle="light-content" />


       <FormLabel>Total</FormLabel>
       <FormInput
       value={(this.state.total)}
       placeholder={'Please enter your total'}
       onChangeText = {(inputTotal) => this.setState({total:inputTotal})} />

       <FormLabel>Date</FormLabel>
       <FormInput
       value={this.state.date}
       placeholder={'MM/DD/YYYY'}
       onChangeText = {(inputDate) => this.setState({date:inputDate})}/>

       <Dropdown
       containerStyle = {{padding:20}}
       label='Category'
       data={data}
       onChangeText = {(inputCategory) => this.setState({category:inputCategory})}/>

       <FormLabel>Location</FormLabel>
       <FormInput
       placeholder={'Please enter your location'}
       onChangeText = {(inputLocation) => this.setState({location:inputLocation})}/>

       <FormLabel>Description</FormLabel>
       <FormInput
       placeholder={'Please enter your Description'}
       onChangeText = {(inputDescription) => this.setState({description:inputDescription})}/>

       <Button
         large
         icon={{name: 'squirrel', type: 'octicon', buttonStyle: {backgroundColor: 'black'}}}
         title='SUBMIT'
         buttonStyle={styles.submitButton}
         onPress={this.submitForm.bind(this)}
          />
     </View>
   );
 }

 // _next = () => {
 //   this._totalInput && this._totalInput.focus();
 // };

 // _submit = () => {
 //   alert(`Welcome, ${this.state.name}! Confirmation email has been sent to ${this.state.email}`);
 // };
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#ecf0f1',
   justifyContent: 'space-around',
 },
 header: {
   flex: 1,
   paddingTop: 20 + Constants.statusBarHeight,
   padding: 20,
   backgroundColor: '#336699',
 },
 description: {
   flex: 1,
   fontSize: 14,
   color: 'white',
 },
 input: {
   flex: 1,
   margin: 20,
   marginBottom: 0,
   height: 34,
   paddingHorizontal: 10,
   borderRadius: 4,
   borderColor: '#ccc',
   borderWidth: 1,
   fontSize: 16,
 },
 submitButton: {
   backgroundColor: "#53B5F6",
   borderColor: "transparent",
 },
});
