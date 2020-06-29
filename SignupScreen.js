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
import {fetch, removeCookieByName} from 'react-native-ssl-pinning';
const GLOBAL = require('./Global');



var radio_props = [
        {label: 'Male', value:0},
        {label: 'Female', value:1}
        ];

      

class SignupScreen extends React.Component {
   constructor(props){
    super(props);


      this.state = {

        
        value:0,
        name1:'',
        name2:'',
        Password:'',
        hidePassword: true,
        loading:'',
        date:'',
        email:'',
        mobile:'',


        
      }

  }

  


  managePasswordVisibility = () => {
       this.setState({ hidePassword: !this.state.hidePassword });
        }

        showLoading() {
        this.setState({loading: true})
       }

        hideLoading() {
        this.setState({loading: false})
       }



  getRemoteData=()=> {

    // NetInfo.fetch().then(state => {
    //  if (state.isConnected == false){
    //    alert('Please connect to internet')
    //    return
    //  }
    //     })

     var gender =''
      if (this.state.value==0) {
         gender= 'Male'
      }
      else if(this.state.value==1) {
         gender='female'
      }

       // alert(JSON.stringify(this.state.value))

       let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
     
     

      if (this.state.name1 == ''){
       alert('Please Enter First Name')
     }

      if (this.state.name2 == ''){
       alert('Please Enter Last Name')
     }
     if (this.state.email == ''){
       alert('Please Enter Email id')
     }
      else if (this.state.email != '' && reg.test(this.state.email) === false){
       alert('Please Enter Valid Email')
     }
     else if (this.state.mobile == ''){
       alert('Please Enter Mobile Number')
     }

     else if (this.state.date == ''){
       alert('Please Enter Birth Date')
     }

     else if (this.state.password == ''){
       alert('Please Enter password')
     }
     else if (this.state.password.length < 6){
       alert('Password must be 6 chracter long')
     }
//password
     else {
          
          const url = GLOBAL.BASE_URL +  'signup'

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
              "email_id": this.state.email,
              "phone_no" : this.state.mobile,
              "password" :this.state.password,
              "firstname": this.state.name1,
              "lastname": this.state.name2,
              "birthdate": this.state.date,
              "device_id": 'sadasd',
              "device_token":'asdasd',
              "device_type":Platform.OS,
              "model_name":"asdasd",
              "gender": gender,
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
            // alert(JSON.stringify(responseData))

    this.hideLoading()
    if (responseData.status == true ) { 


        GLOBAL.mobile = this.state.mobile

        // alert(JSON.stringify(responseData))

        

        GLOBAL.user_id = responseData.user_id
         
        this.props.navigation.replace('OtpScreen')
      
        AsyncStorage.setItem('userID', responseData.user_id);
      
}else {
  alert("Invalid Credentials")
}

           
      })
      .catch((error) =>{
        console.error(error);
      })
     
     }

  };


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

      <SafeAreaProvider>
                   <StatusBar backgroundColor="black" barStyle="light-content" />

            <View style = {{height:65,backgroundColor:'white',flexDirection:'row',width:'100%',alignItems:'center',elevation:3,shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0}}>
                        <View>
                        <TouchableOpacity style={{marginLeft:20}}     onPress= {()=>this.props.navigation.goBack()}>
                            <Image
                                source={require('./back.png')}
                                style={{width: 24, height: 20,resizeMode:'contain'}}


                            />
                            
                        </TouchableOpacity>
                        </View>


                        <Text style = {{color:'black',fontFamily:'Poppins-Medium',fontSize: 20,marginLeft:20}}>
                            Create Account
                        </Text>


                        

                    </View>

                <KeyboardAwareScrollView keyboardShouldPersistTaps='always' style={{backgroundColor:'white'}}>

                  <View style={{flex:1,backgroundColor:'white'}}>

                     <View style={{flexDirection:'column',marginTop:20}}>
     <RadioForm
       radio_props={radio_props}
       initial={this.state.value}
       formHorizontal={true}
       isSelected = {true}
       style={{marginLeft:'4%'}}
       radioStyle={{paddingRight: 40}}
        onPress={(value) => {this.setState({value:value}) }}>
      <RadioButtonInput
        borderWidth={1}
        buttonInnerColor={'#0592CC'}
        buttonOuterColor={'#0592CC'}
        buttonSize={25}

        
        buttonOuterSize={50}
        buttonWrapStyle={{marginLeft:5}}


      />
    <RadioButtonLabel
        
        labelStyle={{fontSize:16,fontFamily:'Poppins-Medium',color: '#00000066'}}

      />
     </RadioForm>

     </View>

      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'92%',marginLeft:'4%',marginTop:20}}>

         <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'48%',borderBottomWidth:1,borderColor:'#e3e3e3'}}>

            <Image source={require('./name.png')}
             style={{height:25,width:25,resizeMode:'contain'}}/>

             <TextInput
             style={{fontSize:16,fontFamily:'Poppins-Medium',color:'black',width:'80%'}}
             placeholder="First Name"

             placeholderTextColor="#00000066"
            
             maxLength={50}
             onChangeText={(text) => this.setState({name1: text})}
             value={this.state.name1}
             />
         </View>


         <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'48%',borderBottomWidth:1,borderColor:'#e3e3e3'}}>

            <Image source={require('./name.png')}
             style={{height:25,width:25,resizeMode:'contain'}}/>

             <TextInput
             style={{fontSize:16,fontFamily:'Poppins-Medium',color:'black',width:'80%'}}
             placeholder="Last Name"

             placeholderTextColor="#00000066"
            
             maxLength={50}
             onChangeText={(text) => this.setState({name2: text})}
             value={this.state.name2}
             />
         </View>
      </View>
           
         <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'92%',marginLeft:'4%',marginTop:30,borderBottomWidth:1,borderColor:'#e3e3e3'}}>

            <Image source={require('./phone.png')}
             style={{height:25,width:25,resizeMode:'contain'}}/>

             <TextInput
             style={{fontSize:16,fontFamily:'Poppins-Medium',color:'black',width:'90%'}}
             placeholder="Mobile Number"

             placeholderTextColor="#00000066"
             keyboardType="numeric"
             
             maxLength={10}
             onChangeText={(text) => this.setState({mobile: text})}
             value={this.state.mobile}
             />
         </View>


           <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'92%',marginLeft:'4%',marginTop:30,borderBottomWidth:1,borderColor:'#e3e3e3'}}>

            <Image source={require('./email.png')}
             style={{height:25,width:28,resizeMode:'contain'}}/>

             <TextInput
             style={{fontSize:16,fontFamily:'Poppins-Medium',color:'black',width:'90%'}}
             placeholder="Email"

             placeholderTextColor="#00000066"
            
             
             maxLength={50}
             onChangeText={(text) => this.setState({email: text})}
             value={this.state.email}
             />
         </View>

           <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'92%',marginLeft:'4%',marginTop:30,borderBottomWidth:1,borderColor:'#e3e3e3'}}>

            <Image source={require('./password.png')}
             style={{height:28,width:25,resizeMode:'contain',width:'7%'}}/>

             <TextInput
             style={{fontSize:16,fontFamily:'Poppins-Medium',color:'black',width:'80%',marginRight:-7}}
             placeholder="Password"

             placeholderTextColor="#00000066"
             
             secureTextEntry={this.state.hidePassword}
             maxLength={16}
             onChangeText={(text) => this.setState({password: text})}
             value={this.state.password}
             />

             <TouchableOpacity style={{height:24,width:24,marginRight:7}}
                onPress = { this.managePasswordVisibility }>
              <Image
                style={{height:24,width:24}}
                source={(this.state.hidePassword) ?   require('./hidelogo.png') : require('./showlogo.png') }
               />
             </TouchableOpacity>
         </View>


           <View style={{flexDirection:'row',alignItems:'center',marginTop:38,width:'92%',marginLeft:'4%',borderBottomWidth:1,borderColor:'#e3e3e3'}}>
            
             <Image source={require('./date.png')}
             style={{height:25,width:25,resizeMode:'contain',marginTop:-3}}/>

            <DatePicker
                          style={{width:200}}
                          date={this.state.date}
                          mode="date"
                          showIcon={false}
                          placeholder={'DOB/Anniversary'}
                          format="DD-MM-YYYY"
                          minDate="01-01-1950"
                          maxDate= {moment().format('DD-MM-YYYY')}
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          customStyles={{
                            dateInput: {
                               borderWidth:0,marginLeft:-30
                            },
                            dateText: { fontSize: 16, color: 'black',fontFamily:'Poppins-Medium',marginLeft:-40},
                            placeholderText: { fontSize: 16, color: '#00000066', fontFamily:'Poppins-Medium'}
                            
                          }}
                          onDateChange={(date) => {
                            this.setState({date: date})
                          }}
                        />
                     </View> 

                  <TouchableOpacity style={{marginTop:45,alignSelf:'center',width:'92%',height:48,borderRadius:24,backgroundColor:'black',justifyContent:'center'}}
                 onPress={()=>this.getRemoteData()}>

                 

                  <Text style={{fontSize:16,color:'white',fontFamily:'Poppins-SemiBold',alignSelf:'center'}}>Sign Up</Text>

                  

                 

            </TouchableOpacity>     

                

          <Text style={{fontSize:14,fontFamily:'Poppins-Medium',color:'#000000CC',marginTop:25,alignSelf:'center'}}>Already have an account?</Text>
         
            <TouchableOpacity style={{alignSelf:'center',marginBottom:50}}
             onPress={()=>this.props.navigation.navigate('LoginScreen2')}>
                 <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'black'}}>Sign In</Text>
            </TouchableOpacity>
                   
                  </View>
                </KeyboardAwareScrollView>   


      </SafeAreaProvider>    
         
      );
  }
}

export default SignupScreen;