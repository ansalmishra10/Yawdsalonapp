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
import Button from 'react-native-button';
import SwitchToggle from "react-native-switch-toggle";

import {fetch, removeCookieByName} from 'react-native-ssl-pinning';
const GLOBAL = require('./Global');



var radio_props = [
        {label: 'Pay with online', value:0},
        {label: 'Pay with cash', value:1}
        ];


    class PaymentScreen extends React.Component {

      constructor(props){
    super(props);


      this.state = {

        
        value:0,
        promo:'',
        
        
        loading:'',
        


        
      }

  }

  componentDidMount() {
     // alert(JSON.stringify(GLOBAL.sum_id))
      // alert(JSON.stringify(GLOBAL.sum))
  }

  showLoading() {
        this.setState({loading: true})
       }

        hideLoading() {
        this.setState({loading: false})
       }


    payCheck=()=> {
      // alert(JSON.stringify(GLOBAL.shop_id))
      if (GLOBAL.sum >= GLOBAL.min_pay) {
        this.setValue()
      }

      else{
        alert('Amount to be paid is less than minimum Payable Amount')
      }
    }   
    


  setValue=()=> {

    var mode =''
      if (this.state.value==0) {
         mode= 'online'

         GLOBAL.mode = mode
           this.props.navigation.replace('OnlineScreen')
      
       

      }
      else if(this.state.value==1) {
           mode= 'cash'
           GLOBAL.mode = mode
            // alert(JSON.stringify(GLOBAL.shop_id))
            this.payTrac();

         
      
      }

    

  }

  payTrac=()=> {

    if (GLOBAL.shop_id == 0) {

        const url = GLOBAL.BASE_URL +  'booking'

        

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
              
          
                "user_id":GLOBAL.user_id,
                "address_id":GLOBAL.add_id,
                "shop_id":GLOBAL.shop_id,
                "appointment_date":GLOBAL.date,
                "appointment_time":GLOBAL.time,
                "total_amount":GLOBAL.sum,
                "payment_mode":GLOBAL.mode,
                "discount":0,
                "coupan_id":0,
                "coupan_discount":0,
                "wallet_discount":0
            
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             
             this.hideLoading()

               
                
                
                        // alert(JSON.stringify( responseData))
                     
                   
                   
                this.props.navigation.navigate('ThankScreen')
            

               

    
            

           
      })
      .catch((error) =>{
        console.error(error);
      })

    }

    else {

       const url = GLOBAL.BASE_URL +  'booking'

        

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
              
          
                "user_id":GLOBAL.user_id,
                "address_id": 0,
                "shop_id":GLOBAL.shop_id,
                "appointment_date":GLOBAL.date,
                "appointment_time":GLOBAL.time,
                "total_amount":GLOBAL.sum,
                "payment_mode":GLOBAL.mode,
                "discount":0,
                "coupan_id":0,
                "coupan_discount":0,
                "wallet_discount":0
            
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             
             this.hideLoading()

               
                
                
                        // alert(JSON.stringify( responseData))
                     
                   
                   
                this.props.navigation.navigate('ThankScreen')
            

               

    
            

           
      })
      .catch((error) =>{
        console.error(error);
      })
    }
      

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


                    <KeyboardAwareScrollView style={{flex:1,backgroundColor:'#e3e3e3'}}>


                    
  


    <View style={{height:150,width:'94%',marginTop:15,borderRadius:4,marginLeft:'3%',backgroundColor:'white',flexDirection:'column',elevation:3}}>
        <Text style={{fontSize:17, color:'black',marginLeft:12,marginTop:10,fontFamily:'Poppins-Medium',fontWeight:'bold'}}>Payment Options</Text>
        <View
        style={{borderBottomColor: '#CCCCCC',borderBottomWidth: 1, marginTop:10}}>
        </View>
  <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
     <View style={{width:'70%',marginLeft:15}}>
     <RadioForm
       radio_props={radio_props}
       initial={this.state.value}
       
       isSelected = {true}
       style={{marginLeft:'4%'}}
       radioStyle={{paddingTop:10}}
        onPress={(value) => {this.setState({value:value}) }}>
      <RadioButtonInput
        borderWidth={1}
        buttonInnerColor={'#0592CC'}
        buttonOuterColor={'#0592CC'}
        buttonSize={20}

        
        buttonOuterSize={40}
        buttonWrapStyle={{marginLeft:5}}


      />
    <RadioButtonLabel
        
        labelStyle={{fontSize:16,fontFamily:'Poppins-SemiBold',color: '#00000066'}}

      />
     </RadioForm>
     </View>

     <View style={{flexDirection:'column',width:'18%'}}>
        <Image
         style={{height:40,width:40,resizeMode:'contain',marginTop:5}}
         source={require('./card2.png')}
       />

       <Image
        style={{height:40,width:40,resizeMode:'contain',marginTop:8}}
        source={require('./paytmlogo.png')}
      />
    </View>
  </View>


      </View>

  <View style={{height:130,backgroundColor:'white',width:'94%',marginLeft:'3%',marginTop:15,borderRadius:4,flexDirection:'column',elevation:3}}>

     <View style={{flexDirection:'row',marginTop:10,alignItems:'center',marginLeft:15}}>
     <Image
      style={{height:30,width:30,resizeMode:'contain'}}
      source={require('./disco.png')}
    />
     <Text style={{fontSize:14,fontFamily:'Poppins-Medium',color:'black',marginLeft:8}}>Apply Promo/Referral Code</Text>
     </View>


     <TextInput style={{fontSize:16,height:50,width:'92%',borderWidth:1,borderColor:'grey',marginTop:20,alignSelf:'center'}}
           placeholder="Enter Promo Code"
           placeholderTextColor="lightgrey"

           returnKeyType='go'
           onChangeText = {(text)=> this.setState({promo: text})}
           secureTextEntry={false}
           autoCorrect={false}
       />
  </View>

  <View style={{height:'auto',width:'94%',marginTop:15,marginBottom:6,elevation:3,borderRadius:4,marginLeft:'3%',backgroundColor:'white',flexDirection:'column'}}>

    <Text style={{fontSize:16, color:'black',marginLeft:12,marginTop:12,fontFamily:'Poppins-SemiBold'}}>Payment Summary</Text>
    <View
    style={{borderBottomColor: '#CCCCCC',borderBottomWidth: 1, marginTop:12,width:'94%',alignSelf:'center'}}>
    </View>
    <View style={{marginTop:12,flexDirection:'row',alignItems:'center',width:'92%',justifyContent:'space-between',alignSelf:'center'}}>
    <Text style={{fontSize:14,color:'black',fontFamily:'Poppins-Medium'}}>Service total</Text>
    <Text style={{fontSize:14,color:'black',fontFamily:'Poppins-Medium'}}>₹ {GLOBAL.sum}/-</Text>
    </View>
    <View
    style={{borderBottomColor: '#CCCCCC',borderBottomWidth: 1, marginTop:12,width:'94%',alignSelf:'center'}}>
    </View>
    <View style={{marginTop:12,flexDirection:'row',alignItems:'center',width:'92%',justifyContent:'space-between',alignSelf:'center'}}>
    <Text style={{fontSize:14,color:'black',fontFamily:'Poppins-Medium'}}>Discount</Text>
    <Text style={{fontSize:14,color:'black',fontFamily:'Poppins-Medium'}}>₹ 0/-</Text>
    </View>

    <View
    style={{borderBottomColor: '#CCCCCC',borderBottomWidth: 1, marginTop:12,width:'94%',alignSelf:'center'}}>
    </View>

    <View style={{marginTop:12,flexDirection:'row',alignItems:'center',width:'92%',justifyContent:'space-between',alignSelf:'center'}}>
    <Text style={{fontSize:14,color:'black',fontFamily:'Poppins-Medium'}}>GST</Text>
    <Text style={{fontSize:14,color:'black',fontFamily:'Poppins-Medium'}}>₹ 0/-</Text>
    </View>

    <View
    style={{borderBottomColor: '#CCCCCC',borderBottomWidth: 1, marginTop:12,width:'94%',alignSelf:'center'}}>
    </View>

    <View style={{marginTop:12,flexDirection:'row',alignItems:'center',width:'92%',justifyContent:'space-between',alignSelf:'center',marginBottom:12}}>
    <Text style={{fontSize:14,color:'black',fontFamily:'Poppins-SemiBold'}}>Amount Payable</Text>
    <Text style={{fontSize:14,color:'black',fontFamily:'Poppins-SemiBold'}}>₹ {GLOBAL.sum}/-</Text>
    </View>

  </View>


  


  
                    </KeyboardAwareScrollView>

                    <View style = {{height:70,backgroundColor:'white',flexDirection:'row',width:'100%',alignItems:'center',elevation:3,justifyContent:'space-between'}}>
                     
                     <Text style={{fontSize:18,fontFamily:'Poppins-SemiBold',color:'black',marginLeft:40}}>₹ {GLOBAL.sum}/-</Text>

                     <TouchableOpacity
                       style={{height:42,width:100,borderRadius:6,backgroundColor:'black',justifyContent:'center',marginRight:20}} onPress={()=>this.payCheck()}>
                       <Text style={{fontSize:14,fontFamily:'Poppins-Medium',color:'white',alignSelf:'center'}}>Pay Now</Text>
   
  
                     </TouchableOpacity>
                   </View>

                    </SafeAreaProvider>


          );
      }
    }

    export default PaymentScreen;