import {
  SafeAreaView,
  Platform,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  Linking,
  FlatList,
  Dimensions,
  AsyncStorage,




  } from 'react-native';

import React, {Component} from 'react';
const GLOBAL = require('./Global');





class SplashScreen2 extends React.Component {

  //      static navigationOptions = ({ navigation }) => {
  //   const { state } = navigation
  //   // Setup the header and tabBarVisible status
  //   const header = state.params && (state.params.fullscreen ? undefined : null)
  //   const tabBarVisible = state.params ? state.params.fullscreen : true
  //   return {
  //     // For stack navigators, you can hide the header bar like so
  //     header,
  //     // For the tab navigators, you can hide the tab bar like so
  //     tabBarVisible,
  //   }
  // }

  



   getData = async () => {
    try {
      const tokenvalue = await AsyncStorage.getItem('token')
      const value = await AsyncStorage.getItem('userID')
      if(value !== null && tokenvalue !== null) {
        // value previously stored
           GLOBAL.user_id = value
           GLOBAL.token = tokenvalue
          this.props.navigation.navigate('Tab')
      }else{
          this.props.navigation.navigate('StyleScreen2')

      }
    } catch(e) {
      // error reading value
    }
  }

     componentDidMount () {
          
          // alert(JSON.stringify(GLOBAL.userID))
     this.timeoutCheck = setTimeout(() => {
          this.getData()
       // this.props.navigation.navigate('StyleScreen2')

  },1000);
  


   }
 
  


    





  render() {


    
    


    return (

         <View style={{flex:1}}>
        <StatusBar
             backgroundColor = "black"

           />
              <Image
                   style={{height:'100%',width:'100%'}}
                   source={require('./splashlogo2.png')}
                   />

        </View>
        


    );
  }
}

export default SplashScreen2;
