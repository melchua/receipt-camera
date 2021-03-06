import React from 'react';
import {AsyncStorage, Text, StatusBar, View, ScrollView} from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import {LOCALURL} from 'react-native-dotenv';
// import Moment from 'react-moment';
import moment from 'moment';
import { FontAwesome } from '@expo/vector-icons';

const list = [
  {
    name: '$200.00',
    subtitle: 'Canadian Tire'
  },
  {
    name: '$4.20',
    subtitle: 'Nemesis Coffee'
  },
];

export default class ReceiptScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      receipts: []
    }
  }

  static navigationOptions = {
  title: "Receipt List",
  }

  componentWillMount() {

    // let query = Async.getItem('isAdmin') ? "users" : "user"
    let route = LOCALURL + '/user/receipts';

    AsyncStorage.getItem('jwtToken')
      .then(result => {
        fetch(route, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${result}`
            }
          })
          .then(res => res.json())
          .then(results => {
            let receipts = results.receipts;
            console.log("RECEIPTS: ", receipts);
            this.setState({
              receipts: receipts,
            });
          })
          .catch((error) =>{
            console.log(error)
          })
      });
  }
  render() {
    const date = new Date();
    const formattedDate = moment(date).format("LLL");
    const statusObj = {
      1:"ellipsis-h",
      2:"check-circle",
      3:"exclamation-triangle",
    }
    const statusColor ={
      1:"#FFCC00",
      2:"green",
      3:"red"
    }
    return (
      <ScrollView>
        <StatusBar barStyle="dark-content" />
        <List containerStyle={{marginBottom: 20}}>
        {
          this.state.receipts.map((l, i) => (
          <ListItem
            key={i}
            title= {`$${parseFloat(l.total/100).toFixed(2)}`}
            subtitle={`${l.location}`}
            leftIcon = {<Icon type="font-awesome" name ={statusObj[l.status_id]} color={statusColor[l.status_id]} iconStyle={{paddingRight:10}}/>} 
            rightTitle={moment(l.date).format("MM/DD/YYYY")}
          />
          ))
        }
        </List>
      </ScrollView>
    )
  }
}


          // rightTitle={<Moment format="DD/MM/YYYY" element={Text} >{l.date}</Moment>}