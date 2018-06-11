import React from 'react';
import {AsyncStorage, Text} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import {LOCALURL} from 'react-native-dotenv';
import Moment from 'react-moment';

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
            console.log("RESULTS REceipts:", results.receipts);
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
    return (
      <List containerStyle={{marginBottom: 20}}>
      {
        this.state.receipts.map((l, i) => (
        <ListItem
          key={i}
          title= {`$${parseFloat(l.total/100).toFixed(2)} `}
          subtitle={l.location}
          rightTitle={<Moment format="DD/MM/YYYY" element={Text} >{l.date.toString()}</Moment>}
        />
        ))
      }
      </List>
    )
  }
}
