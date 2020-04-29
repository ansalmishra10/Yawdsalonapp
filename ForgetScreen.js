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

  } from 'react-native';
import React, {Component} from 'react';


import LinearGradient from 'react-native-linear-gradient';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {fetch, removeCookieByName} from 'react-native-ssl-pinning';
const GLOBAL = require('./Global');
import Shimmer from 'react-native-shimmer';


class ForgetScreen extends React.Component {
  constructor() {
    super();
     this.state = {
      
      email: '',
      loading: '',

         }

    }

  showLoading() {
        this.setState({loading: true})
       }

        hideLoading() {
        this.setState({loading: false})
       }


  render() {

    if(this.state.loading){
      return(
        <View style={{flex: 1}}>
        <ActivityIndicator style = {{position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'}}

       size="large" color="#e41582" />
        </View>
      )
    }

    return(
          
          <KeyboardAwareScrollView keyboardShouldPersistTaps='always' style={{backgroundColor:'white'}}>
           <StatusBar
                backgroundColor = "black"

              />

           <View style={{flex:1,width : Dimensions.get('window').width,flexDirection:'column'}}> 

           <ImageBackground source={require('./coverlogo.png')}
                     style={{height:300,width: Dimensions.get('window').width}}>


                  <TouchableOpacity style={{marginLeft:20,marginTop:45}}     onPress= {()=>this.props.navigation.goBack()}>
                            <Image
                                source={require('./back.png')}
                                style={{width: 25, height: 22,resizeMode:'contain'}}


                            />
                            
                  
                  </TouchableOpacity> 


                  <Text style={{fontSize:36,fontFamily:'Poppins-SemiBold',color:'#000000',marginTop:'20%',marginLeft:20}}>Forgot</Text>
                  <Text style={{fontSize:36,fontFamily:'Poppins-SemiBold',color:'#000000',marginLeft:20,marginTop:-8}}>Password</Text>

                    
              </ImageBackground>

                <Text style={{fontSize:14,fontFamily:'Poppins-Medium',color:'#000000',marginLeft:20}}>Please enter the mobile number</Text>
                <Text style={{fontSize:14,fontFamily:'Poppins-Medium',color:'#000000',marginLeft:20}}>associated with your account. We will</Text>
                <Text style={{fontSize:14,fontFamily:'Poppins-Medium',color:'#000000',marginLeft:20}}>mobile you a link to reset your password.</Text>
                

                <View style={{flexDirection:'row',marginLeft:'5%',marginTop:60,height:50,width:'90%',borderWidth:1,borderColor:'#00000066',justifyContent:'center'}}>
            <Image
               style={{height:30,width:30,marginTop:10,marginLeft:-23}}
               source={require('./phonelogo2.png')}
              />

              <TextInput
              style={{height: 50,width:'82%',fontSize:17,fontFamily:'Poppins-Regular'}}
              placeholder="Phone Number"
              placeholderTextColor="#00000066"
              keyboardType="numeric"
              onChangeText={(text) => this.setState({email: text})}
              value={this.state.email}
              />
             </View>


             <TouchableOpacity style={{marginTop:45,alignSelf:'center',width:'92%'}}
                 onPress={()=>this.getRemoteData()}>

                 <Shimmer  
                  animationOpacity={0.4}
                 
                  opacity={1}
                  tilt={30}
                  intensity={0}>


      

                   <LinearGradient
                     start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                     colors={['#F80E94', '#FF69B4']}
                     style={{height:60,width:'100%',borderRadius:30,alignItems:'center'}}>
                     <Text style={{fontSize:20,color:'#ffffff',fontFamily:'Poppins-Medium',marginLeft:10,backgroundColor: 'transparent'}}>
                      Forgot Password
                     </Text>
                  </LinearGradient>

                 </Shimmer>  

            </TouchableOpacity>

           </View>

           </KeyboardAwareScrollView> 
         
      );
  }
}


export default ForgetScreen;