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

       // componentDidMount() {
       //  alert(JSON.stringify(GLOBAL.mobile))
       // }


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
              "user_id": GLOBAL.user_id,
              "phone_no": GLOBAL.mobile,
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
            // alert(JSON.stringify(responseData))

    this.hideLoading()
    if (responseData.status == true ) { 


       

         // alert(JSON.stringify(responseData))

         AsyncStorage.setItem('token', responseData.token);
         GLOBAL.ref = responseData.refferral_code
        
         
         this.props.navigation.navigate('Drawer')
      
        
      
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
              
              "user_id": GLOBAL.user_id,
              "mobile": GLOBAL.mobile,
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
            // alert(JSON.stringify(responseData))

    this.hideLoading()
    if (responseData.status == true ) { 


       

           alert(JSON.stringify(responseData.message))


        

        
         
        
      
        
      
}else if (responseData.status == false ) {
  alert(JSON.stringify(responseData.message))
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


                  <TouchableOpacity style={{marginLeft:20,marginTop:25}}     onPress= {()=>this.props.navigation.goBack()}>
                            <Image
                                source={require('./back.png')}
                                style={{width: 25, height: 22,resizeMode:'contain'}}


                            />
                            
                  
                  </TouchableOpacity> 


                  <Text style={{fontSize:32,fontFamily:'Poppins-SemiBold',color:'#000000',marginTop:'21%',marginLeft:20}}>OTP</Text>

                  <Text style={{fontSize:11,fontFamily:'Poppins-Medium',color:'#000000A6',marginLeft:20,width:'55%',marginTop:'10%'}}>We have recieved your request for forget password. Please use following OTP to login</Text>  
              </ImageBackground>  

              

              <OTPInputView
                style={{width: '82%', height: 200,alignSelf:'center',marginTop:-20}}
                pinCount={4}
    
                autoFocusOnLoad
                codeInputFieldStyle={{width: 60,height: 45,borderWidth: 0,borderBottomWidth: 1,borderColor:'#e3e3e3',fontSize:20,color:'black'}}
                codeInputHighlightStyle={{borderColor: "#FF8C00"}}
                onCodeChanged = {(code) => { this.setState({code: code})}}
                onCodeFilled = {(code => {
                console.log(`Code is ${code}, you are good to go!`)
                })}
                />  


                <Text style={{fontSize:14,fontFamily:'Poppins-Medium',color:'black',alignSelf:'center'}}>If you didn't recieved any code.</Text>
                

                <TouchableOpacity style={{alignSelf:'center'}}
                 onPress={()=>this.handleButtonChanged()}>
                <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'#FF8C00',marginTop:2}}>RESEND</Text>
                </TouchableOpacity>

                

                <TouchableOpacity style={{marginTop:40,alignSelf:'center',width:'92%',height:48,borderRadius:24,backgroundColor:'black',justifyContent:'center'}}
                 onPress={()=>this.getRemoteData()}>

                 

                  <Text style={{fontSize:16,color:'white',fontFamily:'Poppins-SemiBold',alignSelf:'center'}}>Continue</Text>

                  

                 

            </TouchableOpacity>
           </View>  
        </KeyboardAwareScrollView>
      );
  }
}


export default OtpScreen;