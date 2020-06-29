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

import { SafeAreaProvider } from 'react-native-safe-area-context';
import {fetch, removeCookieByName} from 'react-native-ssl-pinning';
const GLOBAL = require('./Global');

class ProfileScreen extends React.Component {
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

       navigateToScreen1 = (route) => {

        Alert.alert('Logout!','Are you sure you want to Logout?',
            [{text:"Cancel"},
                {text:"Yes", onPress:()=>this._YesLogout()
                },
            ],
            {cancelable:false}
        )

    }

    _YesLogout=()=>{

      AsyncStorage.removeItem('userID');

      GLOBAL.user_id = ''
         
       this.props.navigation.navigate('LoginScreen2') 

      

    }

  componentDidMount () {
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

               
                
                
                      
                     // alert(JSON.stringify(responseData.user.wallet))
                     
                     GLOBAL.profile = responseData.user
                     GLOBAL.wallet = responseData.user.wallet
                     this.setState({firstname: GLOBAL.profile.firstname})
                     this.setState({lastname: GLOBAL.profile.lastname})
                     this.setState({email: GLOBAL.profile.email_id})
                     this.setState({mobile: GLOBAL.profile.phone_no})

                       

                   })
      .catch((error) =>{
        console.error(error);
      })

  }


  render() {
    
    return(
           
           <SafeAreaProvider>
                      <StatusBar backgroundColor="black" barStyle="light-content" />
                      
                      <View style = {{height:70,backgroundColor:'black',flexDirection:'row',width:'100%',alignItems:'center'}}>
                        <View>
                        <TouchableOpacity onPress= {()=>this.props.navigation.goBack()}>
                            <Image
                                source={require('./back2.png')}
                                style={{width: 25, height: 28,marginLeft:18,resizeMode:'contain'}}


                            />
                        </TouchableOpacity>
                        </View>


                        <Text style={{fontSize:13,fontFamily:'Poppins-Medium',color:'white',width:'80%',marginLeft:15}}>{GLOBAL.house}</Text>


                        

                    
                       


                        

                        

                    </View>

                    <ScrollView style={{flex:1,backgroundColor:'white'}}>

                    <Text style={{fontSize:22,fontFamily:'Poppins-Bold',color:'black',marginTop:15,marginLeft:15}}>{this.state.firstname} {this.state.lastname}</Text>

                    <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'black',marginTop:8,marginLeft:15}}>{this.state.email}</Text>
                    <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'black',marginTop:5,marginLeft:15}}>{this.state.mobile}</Text>


                    <TouchableOpacity style={{flexDirection:'row',height:50,alignItems:'center',width:'94%',backgroundColor:'white',borderRadius:4,marginLeft:'3%',marginTop:25,elevation:4}}>

                     <Image source={require('./info.png')}
                      style={{width:22,height:22,resizeMode:'contain',marginLeft:15}}/>

                      <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'black',marginLeft:10}}>About</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection:'row',height:50,alignItems:'center',width:'94%',backgroundColor:'white',borderRadius:4,marginLeft:'3%',marginTop:15,elevation:4}}>

                     <Image source={require('./info.png')}
                      style={{width:22,height:22,resizeMode:'contain',marginLeft:15}}/>

                      <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'black',marginLeft:10}}>Share YAWD</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection:'row',height:50,alignItems:'center',width:'94%',backgroundColor:'white',borderRadius:4,marginLeft:'3%',marginTop:15,elevation:4}}>

                     <Image source={require('./info.png')}
                      style={{width:22,height:22,resizeMode:'contain',marginLeft:15}}/>

                      <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'black',marginLeft:10}}>Rate YAWD</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={{flexDirection:'row',height:50,alignItems:'center',width:'94%',backgroundColor:'white',borderRadius:4,marginLeft:'3%',marginTop:15,elevation:4}}
                     onPress={()=>this.props.navigation.navigate('Wallet')}>

                     <Image source={require('./info.png')}
                      style={{width:22,height:22,resizeMode:'contain',marginLeft:15}}/>

                      <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'black',marginLeft:10}}>My Wallet</Text>
                    </TouchableOpacity>



                    <TouchableOpacity style={{marginTop:24,alignSelf:'center'}}
                     onPress={()=>this.navigateToScreen1()}>
                    <Text style={{fontSize:18,fontFamily:'Poppins-SemiBold',color:'#800000'}}>Logout</Text>
                    </TouchableOpacity>

                    <Image source={require('./logo.png')}
                     style={{height:50,width:100,resizeMode:'cover',marginTop:15,alignSelf:'center'}}/>


                    </ScrollView>

                   </SafeAreaProvider> 

        );
      }
    }

    export default ProfileScreen;