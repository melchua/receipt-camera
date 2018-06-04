import React, { Component } from 'react';
import { Text, StatusBar, TextInput, View, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
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
      description:"",

      valid_total: null,
      valid_date: null,
      valid_modal: null,
      submit_modal: null,
    };
  }
  componentWillMount() {
    this.setState({
      total: this.props.navigation.state.params.visionResponse.total.toFixed(2).toString(),
      date: this.props.navigation.state.params.visionResponse.date,
      id: this.props.navigation.state.params.visionResponse.id,

    });
  }

<<<<<<< HEAD
_valid_total = (total) =>{
  let totalNumber = Number(total)
  if(totalNumber >= 0){
    this.setState({valid_total:1})
    this.setState({total:total})
  } else{
    this.setState({valid_total:null})
  }
}

_valid_date = (date) =>{
  date_regex = '/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/';
  if(date.match(date_regex)){
   this.setState({valid_date:1})
   this.setState({date:date})
  } else{
    this.setState({valid_date:null})
  }
}


=======
>>>>>>> 6c067b5c8f652c1747fe803842d4ffdc0f2751fd
submitForm = () => {
  if(this.state.valid_total === 1 || this.state.valid_date === 1 )
  {
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
    } else{
      Alert.alert(
        'Invalid entry',
        'Invalid Total or Date Format'
        [
          {text: 'OK'}
        ],
        { cancelable: false }
      )
    }
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

     <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <ScrollView contentContainerStyle={{flex: 1, justifyContent: 'space-around'}}>

       <StatusBar barStyle="light-content" />


       <FormLabel>Total</FormLabel>
       <FormInput
       value={(this.state.total)}
       placeholder={'Please enter your total'}
       onChangeText = {(inputTotal) => this._valid_total(inputTotal)} />

       <FormLabel>Date (MM/DD/YY)</FormLabel>
       <FormInput
       value={this.state.date}
       placeholder={'MM/DD/YYYY'}
<<<<<<< HEAD
       onChangeText = {(inputDate) => this._valid_date(inputDate)}/>
       
=======
       onChangeText = {(inputDate) => this.setState({date:inputDate})}/>

>>>>>>> 6c067b5c8f652c1747fe803842d4ffdc0f2751fd
       <Dropdown
       containerStyle = {{paddingLeft: 20, paddingRight: 20}}
       label='Category'
       data={data}
       onChangeText = {(inputCategory) => this.setState({category:inputCategory})}/>

       <FormLabel>Location</FormLabel>
       <FormInput
       placeholder={'Please enter your location'}
       onChangeText = {(inputLocation) => this.setState({location:inputLocation})}/>

       <FormLabel>Description</FormLabel>
       <FormInput
       multiline = {true}
       numberOfLines= {4}
       placeholder={'Please enter your Description'}
       onChangeText = {(inputDescription) => this.setState({description:inputDescription})}/>

      </ScrollView>

       <Button
       large
       icon={{name: 'squirrel', type: 'octicon', buttonStyle: {backgroundColor: 'black'}}}
       title='SUBMIT'
       buttonStyle={styles.submitButton}
       onPress={this.submitForm.bind(this)}
       />

     </KeyboardAvoidingView>

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
   paddingTop: 20 + Constants.statusBarHeight,
   padding: 20,
   backgroundColor: '#336699',
 },
 description: {
   fontSize: 14,
   color: 'white',
 },
 input: {
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
