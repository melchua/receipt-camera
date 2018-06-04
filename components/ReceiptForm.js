import React, { Component } from 'react';
import { Text, StatusBar, TextInput, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { List, ListItem, FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';



export default class ReceiptFormModal extends Component {

 state = {
   total: '',
   date: '',
   category: '',
   location: '',
 };

onSubmitButtonPress() {
  fetch('http://localhost:8080.com/', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    total: this.state.total,
    category: this.state.category,
  }),
});
}

 render() {

   const autoTotal = '5';
   const autoDate = '';
   const autoCategory = '';
   const autoLocation = '';


   return (
     <View style={styles.container}>
       <StatusBar barStyle="light-content" />


       <FormLabel>Total</FormLabel>
       <FormInput
       value={autoTotal}
       placeholder={'Please enter your total'}
       onChangeText = {(inputTotal) => this.setState({total:inputTotal})} />
       <FormLabel>Date</FormLabel>
       <FormInput
       value={autoDate}
       placeholder={'MM/DD/YYYY'}
       onChangeText = {(inputDate) => this.setState({date:inputDate})}/>
       <Dropdown
        label='Choose a Category'
        onChangeText={selectedCat => this.setState({category: selectedCat})}
        containerStyle={{padding:20}}
        data={[{
          value: 'Banana',
          }, {
          value: 'Mango',
          }, {
          value: 'Pear',
          }]}
        />

       <FormLabel>Location</FormLabel>
       <FormInput
       value={autoLocation}
       placeholder={'Please enter your location'}
       onChangeText = {(inputLocation) => this.setState({location:inputLocation})}/>
       <Button
         large
         icon={{name: 'squirrel', type: 'octicon', buttonStyle: {backgroundColor: 'black'}}}
         title='SUBMIT'
         buttonStyle={styles.submitButton}
         onPress={() => this.onSubmitButtonPress()}
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

        // <Dropdown
        //   label='Favorite Fruit'
        //   data={[{
        //       value: 'Banana',
        //     }, {
        //       value: 'Mango',
        //     }, {
        //       value: 'Pear',
        //     }]}/>
