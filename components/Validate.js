import React, {Component}  from 'react';
import ValidationComponent from 'react-native-form-validator';
import moment from 'moment';
import {
  Text,
  StatusBar,
  TextInput,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  AsyncStorage
} from 'react-native';
import {
  Constants
} from 'expo';
import {
  List,
  ListItem,
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,

} from 'react-native-elements';
import {
  Dropdown
} from 'react-native-material-dropdown';
import {
  LOCALURL
} from 'react-native-dotenv'

class FormValidator extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      total: this.props.total,
      date: this.props.date,
      projectList: this.props.projects,
    };
  }
  
  _onSubmit() {
    console.log(this.props)
    console.log(this.state.location)
    let errorArr = []
    if ((this.state.total < 0) || (isNaN(this.state.total))) {
      errorArr.push(" total")
     }
    if (!moment(this.state.date, "MM-DD-YY").isValid()) {
      errorArr.push(" date")
    }
    if (this.state.category === undefined) {
      errorArr.push(" project")
    }
    if (this.state.category === undefined) {
      errorArr.push(" category")
    }
    if (this.state.location === undefined) {
      errorArr.push(" location")
    }
    if (this.state.description === undefined) {
      errorArr.push(" description")
    }

    if (errorArr.length === 0) {
      let catObj = {
        "Food": 1,
        "Transportation": 2,
        "Entertainment": 3,
      }
      this.props.isValid({
        total: this.state.total,
        date: this.state.date,
        location: this.state.location,
        description: this.state.description,
        project: this.props.projectObj[this.state.project],
        category: catObj[this.state.category]
      })
    } else{
      Alert.alert(
        'Invalid Entry',
        `Please insert a valid${errorArr}.`,
        [
          {text: 'OK'},
        ]
      )
    }
  }

  render(){
    let catData = [{
      value: 'Food',
    }, {
      value: 'Transportation',
    }, {
      value: 'Entertainment',
    }];

    return(     
    <KeyboardAvoidingView behavior="padding">
    <ScrollView contentContainerStyle={{flex: 0, justifyContent: 'space-around', paddingVertical: 20}}>

     <StatusBar barStyle="dark-content" />


     <FormLabel labelStyle={{fontSize: 16}}>Total</FormLabel>
     <FormInput
     value={(this.props.total)}
     placeholder={'Please enter your total'}
     onChangeText = {(inputTotal) => this.setState({total:inputTotal})} />

     <FormLabel labelStyle={{fontSize: 16}}>Date (MM/DD/YY)</FormLabel>
     <FormInput
     value={this.props.date}
     placeholder={'MM/DD/YYYY'}
     onChangeText = {(inputDate) => this.setState({date:inputDate})}/>

     <Dropdown
     containerStyle = {{paddingLeft: 20, paddingRight: 20}}
     label='Category'
     data={catData}
     onChangeText = {(inputCategory) => this.setState({category:inputCategory})}/>

     <Dropdown
     containerStyle = {{paddingLeft: 20, paddingRight: 20}}
     label='Project'
     data={this.props.projects}
     onChangeText = {(inputProject) => this.setState({project:inputProject})}/>

     <FormLabel labelStyle={{fontSize: 16}}>Location</FormLabel>
     <FormInput
     placeholder={'Please enter your location'}
     onChangeText = {(inputLocation) => this.setState({location:inputLocation})}/>

     <FormLabel>Description</FormLabel>
     <FormInput
     placeholder={'Please enter your Description'}
     onChangeText = {(inputDescription) => this.setState({description:inputDescription})}/>



     <Button
     large
     title='SUBMIT'
     buttonStyle={styles.submitButton}
     onPress={this._onSubmit.bind(this)}
     />
     </ScrollView>
   </KeyboardAvoidingView>)
  }
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-around',
  },
  header: {
    paddingTop: 20 + Constants.statusBarHeight,
    padding: 20,
    backgroundColor: 'white',
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
    backgroundColor: "#0ba5a8",
    borderColor: "transparent",
    margin: 20,
    shadowColor: 'silver',
    shadowOffset: {
       width: 0,
       height: 5
     },
     shadowRadius: 10,
     shadowOpacity: 1.0
  },
 });
 
export default FormValidator;