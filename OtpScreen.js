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
import OTPInputView from '@twotalltotems/react-native-otp-input'
const GLOBAL = require('./Global');
import {fetch, removeCookieByName} from 'react-native-ssl-pinning';


class OtpScreen extends React.Component {
  constructor(props){
    super(props);


      this.state = {
        code: '',
        loading:'',
      }

    }


    
    showLoading() {
        this.setState({loading: true})
       }

        hideLoading() {
        this.setState({loading: false})
       }


    getRemoteData=()=> {

      // alert(JSON.stringify(GLOBAL.mobile))

       if (this.state.code == ''){
       alert('Enter OTP First')
     }

      else {

        const url = GLOBAL.BASE_URL +  'verify_otp'

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
              "otp": this.state.code,
              "user_id": GLOBAL.userID,
              "phone_no": GLOBAL.mobile,
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
            // alert(JSON.stringify(responseData))

    this.hideLoading()
    if (responseData.status == true ) { 


       

        alert(JSON.stringify(responseData))

        

        
         
        this.props.navigation.replace('InviteScreen')
      
        
      
}else {
  alert("Invalid Credentials")
}

           
      })
      .catch((error) =>{
        console.error(error);
      })
      }
    };


    handleButtonChanged=()=> {

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
              
              "user_id": GLOBAL.userID,
              "mobile": GLOBAL.mobile,
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
            // alert(JSON.stringify(responseData))

    this.hideLoading()
    if (responseData.status == true ) { 


       

        alert(JSON.stringify(responseData))

        

        
         
        
      
        
      
}else {
  alert("Invalid Credentials")
}

           
      })
      .catch((error) =>{
        console.error(error);
      })    

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

           <View style={{flex:1,width : Dimensions.get('window').width,flexDirection:'column',}}>
              <ImageBackground source={require('./coverlogo.png')}
                     style={{height:300,width: Dimensions.get('window').width}}>


                  <TouchableOpacity style={{marginLeft:20,marginTop:45}}     onPress= {()=>this.props.navigation.goBack()}>
                            <Image
                                source={require('./back.png')}
                                style={{width: 25, height: 22,resizeMode:'contain'}}


                            />
                            
                  
                  </TouchableOpacity> 


                  <Text style={{fontSize:36,fontFamily:'Poppins-SemiBold',color:'#000000',marginTop:'23%',marginLeft:20}}>OTP</Text>

                  <Text style={{fontSize:14,fontFamily:'Poppins-Medium',color:'#000000',marginLeft:20,width:'80%',marginTop:'16%'}}>We have sent you an OTP on your</Text>  
              </ImageBackground>  

              <Text style={{fontSize:14,fontFamily:'Poppins-Medium',color:'#000000',marginLeft:20,width:'80%'}}>registered mobile no.</Text>

              <OTPInputView
                style={{width: '82%', height: 200,alignSelf:'center'}}
                pinCount={4}
    
                autoFocusOnLoad
                codeInputFieldStyle={{width: 60,height: 45,borderWidth: 0,borderBottomWidth: 1,borderColor:'#e3e3e3',fontSize:20,color:'black'}}
                codeInputHighlightStyle={{borderColor: "#FF69B4"}}
                onCodeChanged = {(code) => { this.setState({code: code})}}
                onCodeFilled = {(code => {
                console.log(`Code is ${code}, you are good to go!`)
                })}
                />  


                <Text style={{fontSize:14,fontFamily:'Poppins-Medium',color:'black',marginTop:30,alignSelf:'center'}}>If you didn't recieved any code.</Text>
                

                <TouchableOpacity style={{alignSelf:'center'}}
                 onPress={()=>this.handleButtonChanged()}>
                <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'#FF69B4',marginTop:2}}>RESEND</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop:60,alignSelf:'center',width:'90%',marginBottom:30}}
                 onPress={()=>this.getRemoteData()}>


      

                   <LinearGradient
                     start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                     colors={['#F80E94','#FF69B4' ]}
                     style={{height:54,width:'100%',borderRadius:27,justifyContent:'center'}}>
                     <Text style={{fontSize:20,color:'#ffffff',fontFamily:'Poppins-Medium',alignSelf:'center',backgroundColor: 'transparent'}}>
                      Continue
                     </Text>
                  </LinearGradient>

                </TouchableOpacity>
           </View>  
        </KeyboardAwareScrollView>
      );
  }
}


export default OtpScreen;