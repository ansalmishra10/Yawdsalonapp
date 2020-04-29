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
  Dimensions
  } from 'react-native';
import React, {Component} from 'react';


import LinearGradient from 'react-native-linear-gradient';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';

class SettingScreen extends React.Component {
  render() {
    return(
        
         <SafeAreaProvider>
                   <StatusBar backgroundColor="black" barStyle="light-content" />

                 <LinearGradient
                     start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                     colors={['#F80E94','#FF69B4' ]}
                     style={{height:65,flexDirection:'row',width:'100%',alignItems:'center',elevation:3}}>
                     <View>
                        <TouchableOpacity style={{marginLeft:20}}     onPress= {()=>this.props.navigation.goBack()}>
                            <Image
                                source={require('./back2.png')}
                                style={{width: 24, height: 20,resizeMode:'contain'}}


                            />
                            
                        </TouchableOpacity>
                        </View>


                        <Text style = {{color:'white',fontFamily:'Poppins-Medium',fontSize: 20,marginLeft:20}}>
                           Settings
                        </Text>
                  </LinearGradient> 

                  <View style={{flex:1,backgroundColor:'white'}}>

                    <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'#FF69B4',marginLeft:18,marginTop:15}}>Profile</Text>

                    <View style={{flexDirection:'row',alignItems:'center',marginLeft:25,marginTop:30}}>
                     <Image source={require('./location.png')}
                      style={{height:30,width:30,resizeMode:'contain'}}/> 

                     <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'black',marginLeft:20}}>Change Location</Text>
                    </View>

                    <View style={{flexDirection:'row',alignItems:'center',marginLeft:25,marginTop:30}}>
                     <Image source={require('./logout.png')}
                      style={{height:25,width:25,resizeMode:'contain',marginLeft:5}}/> 

                     <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'black',marginLeft:20}}>Login</Text>
                    </View>


                    <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'#FF69B4',marginLeft:18,marginTop:40}}>About Us</Text>


                    <Text style={{fontSize:17,fontFamily:'Poppins-Medium',color:'black',marginLeft:20,marginTop:30}}>Privacy Policy</Text>

                    <Text style={{fontSize:17,fontFamily:'Poppins-Medium',color:'black',marginLeft:20,marginTop:30}}>Terms & Conditions</Text>
                     
                  </View>
                    
                    

          </SafeAreaProvider>
    );
  }
}

export default SettingScreen;