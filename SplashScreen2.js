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




  } from 'react-native';

import React, {Component} from 'react';






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

  componentDidMount () {

     this.timeoutCheck = setTimeout(() => {
       
      this.props.navigation.navigate('LoginScreen2')

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
                   source={require('./splash.png')}
                   />

        </View>
        


    );
  }
}

export default SplashScreen2;
