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


class ChangePassword extends React.Component {
  constructor() {
    super();
     this.state = {
      
      conpass: '',
      newpass:'',
      loading: '',
      hidePassword: true,
      hidePassword2: true,

         }

    }

  showLoading() {
        this.setState({loading: true})
       }

        hideLoading() {
        this.setState({loading: false})
       }

       managePasswordVisibility = () => {
       this.setState({ hidePassword: !this.state.hidePassword });
        }

        managePasswordVisibility2 = () => {
       this.setState({ hidePassword2: !this.state.hidePassword2 });
        }


    getRemoteData=()=>{

      if (this.state.newpass == ''){
       alert('Please Enter New Password')
     }

     else if (this.state.newpass.length < 6){
       alert('New Password must be 6 chracter long')
     }

     else if(this.state.conpass == ''){
       alert('Please Confirm Your Password')
     }

     else if(this.state.conpass != this.state.newpass){
       alert('Password dont match')
     }

     else{

        const url = GLOBAL.BASE_URL +  'forgot'

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
  "new_password": this.state.newpass,
  "confirm_password":this.state.conpass,

              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
            // alert(JSON.stringify(responseData))

    this.hideLoading()
    if (responseData.status == true ) { 

        
        
        alert('Password Changed')
        this.props.navigation.replace('LoginScreen2')
      
        
      
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


                  <Text style={{fontSize:28,fontFamily:'Poppins-SemiBold',color:'#000000',marginTop:'15%',marginLeft:20}}>Change</Text>
                  <Text style={{fontSize:28,fontFamily:'Poppins-SemiBold',color:'#000000',marginLeft:20,marginTop:-8}}>Password</Text>
                  

                  <Text style={{fontSize:12,fontFamily:'Poppins-Medium',color:'#000000A6',marginLeft:20,marginTop:38,width:'55%'}}>Please enter your new password to continue with YAWD</Text>
                
                    
              </ImageBackground>

                
                

                <View style={{flexDirection:'row',height:50,width:'90%',borderRadius:4,marginLeft:'5%',marginTop:'8%',justifyContent:'center',borderWidth:1,borderColor:'#00000066'}}>

             <Image
               style={{height:26,width:26,marginTop:10,marginLeft:-8}}
               source={require('./otplogo.png')}
              />

              <TextInput
              style={{height: 50,width:'74%',fontSize:17,marginLeft:2,fontFamily:'Poppins-Regular'}}
              placeholder="New Password"
              placeholderTextColor="#00000066"
              onChangeText={(text) => this.setState({newpass: text})}
              secureTextEntry={this.state.hidePassword}
              value={this.state.newpass}
              />

              <TouchableOpacity style={{height:24,width:24,marginTop:12,marginLeft:16}}
                onPress = { this.managePasswordVisibility }>
              <Image
                style={{height:24,width:24}}
                source={(this.state.hidePassword) ?   require('./hidelogo.png') : require('./showlogo.png') }
               />
               </TouchableOpacity>

           </View>


           <View style={{flexDirection:'row',height:50,width:'90%',borderRadius:4,marginLeft:'5%',marginTop:'8%',justifyContent:'center',borderWidth:1,borderColor:'#00000066'}}>

             <Image
               style={{height:26,width:26,marginTop:10,marginLeft:-8}}
               source={require('./otplogo.png')}
              />

              <TextInput
              style={{height: 50,width:'74%',fontSize:17,marginLeft:2,fontFamily:'Poppins-Regular'}}
              placeholder="Confirm Password"
              placeholderTextColor="#00000066"
              onChangeText={(text) => this.setState({conpass: text})}
              secureTextEntry={this.state.hidePassword2}
              value={this.state.conpass}
              />

              <TouchableOpacity style={{height:24,width:24,marginTop:12,marginLeft:16}}
                onPress = { this.managePasswordVisibility2 }>
              <Image
                style={{height:24,width:24}}
                source={(this.state.hidePassword2) ?   require('./hidelogo.png') : require('./showlogo.png') }
               />
               </TouchableOpacity>

           </View>


             <TouchableOpacity style={{marginTop:45,alignSelf:'center',width:'92%',height:48,borderRadius:24,backgroundColor:'black',justifyContent:'center'}}
                 onPress={()=>this.getRemoteData()}>

                 

                  <Text style={{fontSize:16,color:'white',fontFamily:'Poppins-SemiBold',alignSelf:'center'}}>Continue</Text>

                  

                 

            </TouchableOpacity>

           </View>

           </KeyboardAwareScrollView> 
         
      );
  }
}


export default ChangePassword;