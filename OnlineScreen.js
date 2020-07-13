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
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import NetInfo from "@react-native-community/netinfo";
import Button from 'react-native-button';

import {fetch, removeCookieByName} from 'react-native-ssl-pinning';
const GLOBAL = require('./Global');
import { WebView } from 'react-native-webview';

 var total_data = 'Akash'+'|'+parseFloat('100')+'|'+'akashjha.ip@gmail.com'+'|'+'9871312388';


 


class OnlineScreen extends React.Component {
  constructor(props) {
     super(props);
       this.state ={
    
         firstname:'',
         lastname:'',
         email:'',
         mobile:'',
         
         loading:'',
         
       }
   }

   showLoading() {
        this.setState({loading: true})
       }

        hideLoading() {
        this.setState({loading: false})
       }

   componentDidMount() {
    // alert(JSON.stringify(GLOBAL.shop_id))
     this.getProfile()
 }

 getProfile=()=>{
        
        const url = GLOBAL.BASE_URL +  'get_profile'

        

          this.showLoading()
            fetch(url, {
            method: 'POST',
            timeoutInterval: 1000, 
            headers: {
                'X-API-KEY': 'FCCDB2FFD5830D7F20E67C056DA727002AD9A403DDA29B3FDFAC22ECA226CD4F',
                'Content-Type': 'application/json',
                'Authorization': GLOBAL.token
            },
            sslPinning: {
                certs: ['yawd']
            },
            body: JSON.stringify({
              
          
              "user_id": GLOBAL.user_id,
            
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             
             this.hideLoading()

               
                
                
                      
                     
                    
                     GLOBAL.profile = responseData.user

                     this.setState({firstname: GLOBAL.profile.firstname})
                     this.setState({lastname: GLOBAL.profile.lastname})
                     this.setState({email: GLOBAL.profile.email_id})
                     this.setState({mobile: GLOBAL.profile.phone_no})

                      // alert(JSON.stringify(this.state.firstname))

                   })
      .catch((error) =>{
        console.error(error);
      })


    }

  render() {
    
    return(
          
          <SafeAreaProvider style={{backgroundColor:'#e3e3e3'}}>
                   
                   <StatusBar backgroundColor="black" barStyle="light-content" />

                      <View style = {{height:60,backgroundColor:'black',flexDirection:'row',width:'100%',alignItems:'center'}}>
                        <View>
                        <TouchableOpacity onPress= {()=>this.props.navigation.goBack()}>
                            <Image
                                source={require('./back2.png')}
                                style={{width: 18, height: 20,marginLeft:20,resizeMode:'contain'}}


                            />
                        </TouchableOpacity>
                        </View>


                        <Text style = {{color:'white',fontFamily:'Exo2-Bold',fontSize: 20,marginLeft:20}}>
                          Payment
              
          


                       </Text>


                    </View>


                    <View style={{flex:1,backgroundColor:'white'}}>

                    {GLOBAL.shop_id == 0 &&(
                    <WebView
                       source={{uri: 'https://www.yawd.in/admin_old/payment/ccav_request_2',
                       body:JSON.stringify({
                          
                          "total_amount":GLOBAL.sum,
                          "txn_amount":GLOBAL.sum,
                          "name": this.state.firstname,
                          "phone_no":this.state.mobile,
                          "email_id":this.state.email,
                          "user_id":GLOBAL.user_id,
                          "address_id":GLOBAL.add_id,
                          "shop_id":GLOBAL.shop_id,
                          "appointment_date":GLOBAL.date,
                          "appointment_time":GLOBAL.time,
                          "payment_mode":GLOBAL.mode,
                          "discount":0,
                          "coupan_id":0,
                          "coupan_discount":0,
                          "wallet_discount":0

                           }), method:'post'}}

                       style={{marginBottom:10,width:'100%',height:'100%'}}

                       sharedCookiesEnabled={true}
                   />

                   )}

                    {GLOBAL.shop_id != 0 &&(
                       
                       <WebView
                       source={{uri: 'https://www.yawd.in/admin_old/payment/ccav_request_2',
                       body:JSON.stringify({
                          
                          "total_amount":GLOBAL.sum,
                          "txn_amount":GLOBAL.sum,
                          "name": this.state.firstname,
                          "phone_no":this.state.mobile,
                          "email_id":this.state.email,
                          "user_id":GLOBAL.user_id,
                          "address_id":0,
                          "shop_id":GLOBAL.shop_id,
                          "appointment_date":GLOBAL.date,
                          "appointment_time":GLOBAL.time,
                          "payment_mode":GLOBAL.mode,
                          "discount":0,
                          "coupan_id":0,
                          "coupan_discount":0,
                          "wallet_discount":0

                           }), method:'post'}}

                       style={{marginBottom:10,width:'100%',height:'100%'}}

                       sharedCookiesEnabled={true}
                   />
                    )}
                    </View>


                    </SafeAreaProvider>

      );
  }
}

export default OnlineScreen;