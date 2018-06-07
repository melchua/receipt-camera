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
    console.log(this.state.location)
    let errorArr = []
    if (this.state.location === undefined) {
      errorArr.push("Please insert a valid location")
    }

    if (this.state.category === undefined) {
      errorArr.push("Please insert a valid category")
    }

    if (this.state.description === undefined) {
      errorArr.push("Please insert a valid description")
    }
    if ((this.state.total < 0) || (isNaN(this.state.total))) {
      errorArr.push("Please insert a valid total")
    }
    if (!moment(this.state.date, "MM-DD-YY").isValid()) {
      errorArr.push("Please instert a valid date")
    }
    console.log(errorArr)
    if (errorArr.length === 0) {
      this.props.isValid({
        total: this.state.total,
        date: this.state.date,
        location: this.state.location,
        description: this.state.description,
        project: this.state.project,
        category: this.state.category
      })

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
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
    <ScrollView contentContainerStyle={{flex: 1, justifyContent: 'space-around'}}>

     <StatusBar barStyle="light-content" />


     <FormLabel>Total</FormLabel>
     <FormInput
     value={(this.props.total)}
     placeholder={'Please enter your total'}
     onChangeText = {(inputTotal) => this.setState({total:inputTotal})} />

     <FormLabel>Date (MM/DD/YY)</FormLabel>
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
     title='SUBMIT'
     buttonStyle={styles.submitButton}
     onPress={this._onSubmit.bind(this)}
     />

   </KeyboardAvoidingView>)
  }
  
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
    backgroundColor: "#0ba5a8",
    borderColor: "transparent",

  },
});
export default FormValidator;