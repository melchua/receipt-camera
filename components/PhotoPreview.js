import { Constants, Camera, FileSystem, Permissions, ImageManipulator } from 'expo';
import React from 'react';
import {
 Alert,
 StyleSheet,
 Text,
 View,
 TouchableOpacity,
 Slider,
 Platform,
 Image
} from 'react-native';

import {
 Ionicons,
 MaterialIcons,
 Foundation,
 MaterialCommunityIcons,
 Octicons
} from '@expo/vector-icons';


const PHOTOS_DIR = FileSystem.documentDirectory + 'photos';

class PhotoPreview extends React.Component {
  constructor(props){
    super(props),
    this.state = {
      image: "hello"
    }
  }
  resizePicture = async() =>{
    const manipResult = await ImageManipulator.manipulate(
      this.props.navigation.getParam('uri', 'defaultvalue'),
      [{resize:{width:1024}}],{format: 'png', base64:true}
    )
    console.log(manipResult)
    this.setState({
      image: manipResult
    });
  }

 handlePress = async () => {
    this.resizePicture()
      .then(console.log("hellowelcome"))
      .catch(err => console.log("err", err))
     
    

   fetch('http://10.30.31.122:8080/images', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
           id: "2",
           photo: this.props.navigation.getParam('photo', 'defaultvalue')
       })
 })
   .catch((error) => {
     console.error(error);
   });
 }
 static navigationOptions = {
   header: null,
 }
 render() {

   const {navigation} = this.props;
   const uri = navigation.getParam('uri', 'defaultvalue');

   return (

     <View style={styles.container}>
       <Image
         style={styles.pictures}
         source={ {uri: uri} }
       />
        <View style={styles.bottomBar}>
           <TouchableOpacity style={styles.bottomButton} onPress={() => this.props.navigation.navigate('Camera')}>
             <Octicons name="reply" size={30} color="white"/>
           </TouchableOpacity>

           <TouchableOpacity style={styles.bottomButton}>
             <View>
               <Ionicons name="ios-send" size={30} color="white" onPress={this.handlePress.bind(this)} />
             </View>
           </TouchableOpacity>
         </View>
   </View>
   );
 }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#000'
 },
 faceText: {
   color: '#FFD700',
   fontWeight: 'bold',
   textAlign: 'center',
   margin: 10,
   backgroundColor: 'transparent',
 },
 pictures: {
   flex: 1,
   flexWrap: 'wrap',
   flexDirection: 'row',
   justifyContent: 'space-around',
   paddingVertical: 8,
 },
 bottomButton: {
   flex: 1,
   height: 58,
   justifyContent: 'center',
   alignItems: 'center',
 },
 bottomBar: {
   paddingBottom: 5,
   backgroundColor: 'transparent',
   alignSelf: 'flex-end',
   justifyContent: 'space-between',
   flex: 0.13,
   flexDirection: 'row',
 },
});

export default PhotoPreview;