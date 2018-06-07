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
import moment from 'moment';
import { LOCALURL } from 'react-native-dotenv'
export default class ReceiptFormModal extends Component {
  constructor(props) {
    super(props),
      state = {
        total: '',
        date: '',
        category: '',
        location: '',
        user_id: "",
        description: "",
        image_url: ""
      };
  }
  componentWillMount() {
    this.setState({
      total: this.props.navigation.state.params.visionResponse.total.toFixed(2).toString(),
      date: this.props.navigation.state.params.visionResponse.date,
      user_id: this.props.navigation.state.params.visionResponse.user_id,
      valid_total: true,
      valid_date: true,
      catObj: "",
      image_url: this.props.navigation.state.params.visionResponse.image_url
    });
    this.setState
    fetch(LOCALURL+'/projects', {
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

  _valid_total = (total) => {
    let totalNumber = Number(total)
    if (totalNumber >= 0) {
      this.setState({
        valid_total: true
      })
      this.setState({
        total: total
      })
    } else {
      this.setState({
        valid_total: false
      })
    }
  }

  _valid_date = (date) => {
    var newDate = moment(date).format("MM-DD-YY")
    console.log(newDate)
    if(newDate !== "Invalid date"){
      this.setState({
        valid_date: true,
        date: date
      })
    }else{
      this.setState({
        valid_date: false
      })
    }

  }

  submitForm = () => {
    if (this.state.valid_total && this.state.valid_date) {
      fetch('http://10.30.31.122:8080/user/receipts/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: this.state.user_id,
            location: this.state.location,
            total: this.state.total,
            date: this.state.date,
            description: this.state.description,
            project_id: this.state.projectObj[this.state.projectName],
            category_id: this.state.catObj[this.state.categoryName],
            image_url: this.state.image_url
          })
        })
        .then((response) => {
          this.props.navigation.navigate('Camera')
        })
        .catch((error) => {
          console.error(error);
        })
    } else if (this.state.valid_total === false) {
      console.log("triggered invalid total if")
      Alert.alert(
        'Invalid Total',
        'Enter a valid total above zero', [{
          text: 'OK'
        }, ], {
          cancelable: false
        }
      )
    } else if (this.state.valid_date === false) {
      console.log("triggered invalid date if")
      Alert.alert(
        'Invalid Date',
        'Enter a valid date in MM/DD/YY format', [{
          text: 'OK'
        }, ], {
          cancelable: false
        }
      )
    }
  }
  render() {
      let catData = [{
        value: 'Food',
      }, {
        value: 'Transportation',
      }, {
        value: 'Entertainment',
      }];

   return (

      <ScrollView contentContainerStyle={{flex: 0, justifyContent: 'space-around', paddingVertical: 20}}>

       <StatusBar barStyle="dark-content" />

       <FormLabel>Total</FormLabel>
       <FormInput
       value={(this.state.total)}
       placeholder={'Please enter your total'}
       onChangeText = {(inputTotal) => this._valid_total(inputTotal)}/>

       <FormLabel>Date (MM/DD/YY)</FormLabel>
       <FormInput
       value={this.state.date}
       placeholder={'MM/DD/YYYY'}
       onChangeText = {(inputDate) => this._valid_date(inputDate)}/>

       <Dropdown
       containerStyle = {{paddingLeft: 20, paddingRight: 20}}
       label='Category'
       data={catData}
       onChangeText = {(inputCategory) => this.setState({categoryName:inputCategory})}/>

       <Dropdown
       containerStyle = {{paddingLeft: 20, paddingRight: 20}}
       label='Project'
       data={this.state.projects}
       onChangeText = {(inputProject) => this.setState({projectName:inputProject})}/>

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
       title='SUBMIT'
       buttonStyle={styles.submitButton}
       onPress={this.submitForm.bind(this)}
       />

      </ScrollView>
   );
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
   margin: 20,
 },
});
