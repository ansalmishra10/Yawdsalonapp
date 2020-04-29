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






class LoginScreen2 extends React.Component {


      

  constructor() {
    super();
     this.state = {
      email: '',
      password:'',
      hidePassword: true,
      loading: '',

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

       if (this.state.email == ''){
       alert('Enter Registered Email Id')
     }

       if (this.state.password == ''){
       alert('Enter Your Password')
     }

      else {

        const url = GLOBAL.BASE_URL +  'signin'

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
              "username": this.state.email,
              "password": this.state.password,
              "device_id": 'sadasd',
              "device_token":'asdasd',
              "device_type":Platform.OS,
              "model_name":"asdasd",
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
            // alert(JSON.stringify(responseData))

    this.hideLoading()
    if (responseData.status == true ) { 


       

        alert(JSON.stringify(responseData))

        

        
         
        this.props.navigation.replace('Tab')
      
        
      
}else {
  alert("Invalid Credentials")
}

           
      })
      .catch((error) =>{
        console.error(error);
      })
      }
    };

    


      
    managePasswordVisibility = () => {
       this.setState({ hidePassword: !this.state.hidePassword });
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
    return (

           <KeyboardAwareScrollView keyboardShouldPersistTaps='always' style={{backgroundColor:'white'}}>
           <StatusBar
                backgroundColor = "black"

              />

           <View style={{flex:1,width : Dimensions.get('window').width,flexDirection:'column',backgroundColor:'white'}}>

           <ImageBackground source={require('./coverlogo.png')}
                     style={{height:300,width: Dimensions.get('window').width}}>





            <Text style={{fontSize:36,fontFamily:'Poppins-Medium',color:'#000000',marginTop:'17%',marginLeft:'5%',fontWeight:'bold'}}>Sign In</Text>

            <Text style={{fontSize:14,fontFamily:'Poppins-Medium',color:'#000000A6',marginTop:'12%',marginLeft:'5%'}}>Please Sign In to Your account</Text>
            <Text style={{fontSize:14,fontFamily:'Poppins-Medium',color:'#000000A6',marginLeft:'5%'}}>to continue with YAWD.</Text>

            </ImageBackground>


            <View style={{flexDirection:'row',marginLeft:'5%',marginTop:'10%',height:50,width:'90%',borderWidth:1,borderColor:'#00000066',justifyContent:'center'}}>
            <Image
               style={{height:30,width:30,marginTop:10,marginLeft:-23}}
               source={require('./phonelogo2.png')}
              />

              <TextInput
              style={{height: 50,width:'82%',fontSize:17,fontFamily:'Poppins-Regular'}}
              placeholder="Phone Number or Email ID"
              placeholderTextColor="#00000066"
              onChangeText={(text) => this.setState({email: text})}
              value={this.state.email}
              />
             </View>


             <View style={{flexDirection:'row',height:50,width:'90%',marginLeft:'5%',marginTop:'8%',justifyContent:'center',borderWidth:1,borderColor:'#00000066'}}>

             <Image
               style={{height:26,width:26,marginTop:10,marginLeft:-8}}
               source={require('./otplogo.png')}
              />

              <TextInput
              style={{height: 50,width:'74%',fontSize:17,marginLeft:2,fontFamily:'Poppins-Regular'}}
              placeholder="Password"
              placeholderTextColor="#00000066"
              onChangeText={(text) => this.setState({password: text})}
              secureTextEntry={this.state.hidePassword}
              value={this.state.password}
              />

              <TouchableOpacity style={{height:24,width:24,marginTop:12,marginLeft:16}}
                onPress = { this.managePasswordVisibility }>
              <Image
                style={{height:24,width:24}}
                source={(this.state.hidePassword) ?   require('./hidelogo.png') : require('./showlogo.png') }
               />
               </TouchableOpacity>

           </View>

           <TouchableOpacity style={{alignSelf:'flex-end',marginRight:'5%',marginTop:8}}>
            <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'black'}}>Forget Password?</Text>
            </TouchableOpacity>


           <TouchableOpacity style={{marginTop:25,width:'90%',alignSelf:'center'}}
            onPress={()=>this.getRemoteData()}>


      

      <LinearGradient
                     start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                     colors={['#F80E94','#FF69B4' ]}
                     style={{height:54,width:'100%',borderRadius:27,justifyContent:'center'}}>
                     <Text style={{fontSize:20,color:'#ffffff',fontFamily:'Poppins-Medium',alignSelf:'center',backgroundColor: 'transparent'}}>
                      Sign In
                     </Text>
      </LinearGradient>

       </TouchableOpacity>


     <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'#00000066',marginTop:22,alignSelf:'center'}}>or</Text>
      

      <View style={{flexDirection:'row',alignItemes:'center',height:54,justifyContent:'space-between',marginTop:22,width:'90%',marginLeft:'5%'}}>

         


      

      <LinearGradient
                     start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                     colors={['#29487D','#3C5898']}
                     style={{height:54,width:'48%',borderRadius:27,justifyContent:'center',alignSelf:'center'}}>
                     <Text style={{fontSize:20,color:'#ffffff',fontFamily:'Poppins-Medium',alignSelf:'center',backgroundColor: 'transparent'}}>
                      Facebook
                     </Text>
      </LinearGradient>

       


       


      

      <LinearGradient
                     start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                     colors={['#FF6347','#DB4437']}
                     style={{height:54,width:'48%',borderRadius:27,justifyContent:'center',alignSelf:'center'}}>
                     <Text style={{fontSize:20,color:'#ffffff',fontFamily:'Poppins-Medium',alignSelf:'center',backgroundColor: 'transparent'}}>
                      Google
                     </Text>
      </LinearGradient>

       
      </View>

            
            
        <Text style={{fontSize:14,fontFamily:'Poppins-Medium',color:'#000000CC',marginTop:30,alignSelf:'center'}}>Don't have an account?</Text>
         
         <TouchableOpacity style={{alignSelf:'center',marginBottom:50}}
          onPress={()=>this.props.navigation.navigate('SignupScreen')}>
           <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'black'}}>Sign Up</Text>
         </TouchableOpacity>

           </View>
           </KeyboardAwareScrollView>

    );
  }
}

export default LoginScreen2;
