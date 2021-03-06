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
      
      mobile: '',
      loading: '',

         }

    }

  showLoading() {
        this.setState({loading: true})
       }

        hideLoading() {
        this.setState({loading: false})
       }


    getRemoteData=()=>{

      if (this.state.mobile == ''){
       alert('Please Enter Mobile No.')
     }

     else{

        const url = GLOBAL.BASE_URL +  'otp'

          this.showLoading()
            fetch(url, {
            method: 'POST',
            timeoutInterval: 1000, 
            headers: {
                'X-API-KEY': ' FCCDB2FFD5830D7F20E67C056DA727002AD9A403DDA29B3FDFAC22ECA226CD4F',
                'Content-Type': 'application/json'
            },
            sslPinning: {
                certs: ['yawd']
            },
            body: JSON.stringify({
              "mobile": this.state.mobile,
              "user_id": ''
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
            // alert(JSON.stringify(responseData))

    this.hideLoading()
    if (responseData.status == true ) { 

        GLOBAL.mobile = this.state.mobile

        GLOBAL.user_id = responseData.user_id
        
        alert('OTP Sent')
        this.props.navigation.replace('OtpScreen2')
      
        
      
}else {
  alert("Invalid Credentials")
}

           
      })
      .catch((error) =>{
        console.error(error);
      })

     }

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


                  <TouchableOpacity style={{marginLeft:20,marginTop:25}}     onPress= {()=>this.props.navigation.goBack()}>
                            <Image
                                source={require('./back.png')}
                                style={{width: 25, height: 22,resizeMode:'contain'}}


                            />
                            
                  
                  </TouchableOpacity> 


                  <Text style={{fontSize:28,fontFamily:'Poppins-SemiBold',color:'#000000',marginTop:'15%',marginLeft:20}}>Forgot</Text>
                  <Text style={{fontSize:28,fontFamily:'Poppins-SemiBold',color:'#000000',marginLeft:20,marginTop:-8}}>Password</Text>
                  

                  <Text style={{fontSize:11,fontFamily:'Poppins-Medium',color:'#000000A6',marginLeft:20,marginTop:38}}>Please enter the mobile number</Text>
                <Text style={{fontSize:11,fontFamily:'Poppins-Medium',color:'#000000A6',marginLeft:20}}>associated with your account. We will</Text>
                <Text style={{fontSize:11,fontFamily:'Poppins-Medium',color:'#000000A6',marginLeft:20}}>mobile you a link to reset your password.</Text>
                    
              </ImageBackground>

                
                

                <View style={{flexDirection:'row',marginLeft:'5%',marginTop:35,borderRadius:4,height:50,width:'90%',borderWidth:1,borderColor:'#00000066',justifyContent:'center'}}>
            <Image
               style={{height:30,width:30,marginTop:10,marginLeft:-23}}
               source={require('./phonelogo2.png')}
              />

              <TextInput
              style={{height: 50,width:'82%',fontSize:17,fontFamily:'Poppins-Regular'}}
              placeholder="Phone Number"
              placeholderTextColor="#00000066"
              maxLength={10}
              keyboardType="numeric"
              onChangeText={(text) => this.setState({mobile: text})}
              value={this.state.mobile}
              />
             </View>


             <TouchableOpacity style={{marginTop:45,alignSelf:'center',width:'92%',height:48,borderRadius:24,backgroundColor:'black',justifyContent:'center'}}
                 onPress={()=>this.getRemoteData()}>

                 

                  <Text style={{fontSize:16,color:'white',fontFamily:'Poppins-SemiBold',alignSelf:'center'}}>Forgot Password</Text>

                  

                 

            </TouchableOpacity>

           </View>

           </KeyboardAwareScrollView> 
         
      );
  }
}


export default ForgetScreen;