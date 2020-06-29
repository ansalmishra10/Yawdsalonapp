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
  ActivityIndicator,
  Animated,
  Modal,
  BackHandler,


  } from 'react-native';
import React, {Component} from 'react';
import Button from 'react-native-button';
import { NavigationContainer
 } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerActions,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import HTML from 'react-native-render-html';
const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {fetch, removeCookieByName} from 'react-native-ssl-pinning';
import Geocoder from 'react-native-geocoder';


const GLOBAL = require('./Global');




class Dummy extends React.Component {

  constructor(props){
    super(props);


      this.state = {

        
        
        loading:'',
    
        newimage:0,
        lat:'',
        long:'',
        
        
        
      }

  }

  
  componentDidMount() {
    Geolocation.getCurrentPosition(info => {
        
        

         Geocoder.fallbackToGoogle('AIzaSyD7BIoSvmyufubmdVEdlb2sTr4waQUexHQ');
         
        });
         
          
  }

  getLocationData=()=>{


        }


  render() {
    return(
      <SafeAreaProvider>
                      <StatusBar backgroundColor="black" barStyle="light-content" />


                      <View style = {{height:60,backgroundColor:'black',flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-between'}}>
                        <View>
                        <TouchableOpacity>
                            <Image
                                source={require('./drawer.png')}
                                style={{width: 30, height:30,marginLeft:20,resizeMode:'contain'}}


                            />
                        </TouchableOpacity>
                        </View>


                        <View>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Dummy')}>
                            <Image
                                source={require('./search.png')}
                                style={{width: 25, height: 25,resizeMode:'contain',marginRight:20}}


                            />
                        </TouchableOpacity>
                        </View>


                        

                        

                    </View>

                    <ScrollView style={{flex:1,backgroundColor:'#e3e3e3'}}>



                    </ScrollView>

                </SafeAreaProvider>

      );
  }
}

export default Dummy;