import React, {
  Component
} from 'react';
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
import FormValidator from './Validate';


export default class ReceiptFormModal extends React.Component {
  constructor(props) {
    super(props),
    this.state = {
        user_id: "",
        image_url: "",
      };
      this._isValid = this._isValid.bind(this);
  }
  componentWillMount() {
    this.setState({
      total: this.props.navigation.state.params.visionResponse.total.toFixed(2).toString(),
      date: this.props.navigation.state.params.visionResponse.date,
      user_id: this.props.navigation.state.params.visionResponse.user_id,
      image_url: this.props.navigation.state.params.visionResponse.image_url,
      catObj: "",
    });

    fetch(LOCALURL + '/projects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((response) => response.json())
      .then((response) => {
        let projectsArray = []
        let stateProjectObj = {}
        response.forEach(function (project) {
          let projectObj = {}
          projectObj["value"] = project.project_name;
          projectsArray.push(projectObj)
          stateProjectObj[project.project_name] = project.id
        });
        let catObj = {
          "Food": 1,
          "Transportation": 2,
          "Entertainment": 3,
        }
        this.setState({
          projectObj: stateProjectObj,
          projects: projectsArray,
          catObj: catObj
        });
      })
      .catch((error) => {
        console.log("unable to recieve projects", error)
      });
  };

  _isValid = (data) =>{
      fetch(LOCALURL + '/user/receipts/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: this.state.user_id,
            location: data.location,
            total: data.total,
            date: data.date,
            description: data.description,
            project_id: data.project,
            category_id: data.category,
            image_url: this.state.image_url
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

   return (
    <FormValidator 
      total = {this.state.total}
      date = {this.state.date}
      projects = {this.state.projects}
      isValid = {this._isValid}
      projectObj = {this.state.projectObj}
      />

   );
 }
}

