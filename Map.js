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

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Geolocation from '@react-native-community/geolocation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {fetch, removeCookieByName} from 'react-native-ssl-pinning';
import Button from 'react-native-button';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView from 'react-native-maps';
const GLOBAL = require('./Global');
 
class Map extends React.Component {
  constructor(props) {
     super(props);
       this.state ={
        lat:'',
        long:'',
         
         loading:'',
         
       }
   }

   showLoading() {
        this.setState({loading: true})
       }

        hideLoading() {
        this.setState({loading: false})
       }

  setValue=(data, details)=>{

     // alert(JSON.stringify(details.geometry.location.lat))
       GLOBAL.address = data.description
       GLOBAL.lat = details.geometry.location.lat
       GLOBAL.long = details.geometry.location.lng

       // this.hideLoading()
       
        this.props.navigation.replace('AddAddress')
  }

  setGps=()=> {
    Geolocation.getCurrentPosition(info => {
        
        this.setState({ lat : info.coords.latitude })
        this.setState({ long : info.coords.longitude })


      const url = GLOBAL.BASE_URL +  'lat_long_address'

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
              "latitude": this.state.lat,
              "longitude": this.state.long
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             


                   // alert(JSON.stringify(responseData.address))
                  // GLOBAL.house = responseData.address
                  GLOBAL.address = responseData.address
                  GLOBAL.lat = this.state.lat
                  GLOBAL.long = this.state.long
                  this.props.navigation.replace('AddAddress')
                 

    this.hideLoading()
            

           
      })
      .catch((error) =>{
        console.error(error);
      })

        });
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

    <SafeAreaProvider>
                   
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
                          Search your locality
              
          


                       </Text>


                    </View>


  <View style={{flex:1,backgroundColor:'white'}}>

  <TouchableOpacity style={{height:50,width:'92%',marginLeft:'4%',backgroundColor:'white',flexDirection:'row',


  alignItems:'center',borderRadius:4,marginBottom:15,marginTop:16,elevation:3}} onPress={()=>this.setGps()}>
   <Image source={require('./track.png')}
   style={{ height:30,width:30,resizeMode:'contain',marginLeft:20}}/>
      <Text style={{fontSize:14,fontFamily:'Poppins-Medium',color:'#0000004D',marginLeft:15}}>Use my current location (GPS)</Text>
   
  
  </TouchableOpacity>

  
    <GooglePlacesAutocomplete
      placeholder='Search'
      fetchDetails={true}
     onPress={(data, details = null) => {

      this.showLoading()
        // 'details' is provided when fetchDetails = true
         console.log(data, details);
       // alert(JSON.stringify(details));
        this.setValue(data, details)
      }}
      styles={{
    textInputContainer: {
      backgroundColor:'rgba(0,0,0,0.4)',
      height:56,
    

      width:'100%'
    },
    textInput: {
      marginLeft: 10,
      marginRight: 10,
      height: 40,
      width:'60%',
      color: 'black',
      fontSize: 16,
      fontFamily:'Poppins-Medium'
    },
   
    
    
  }}
      query={{
        key: 'AIzaSyD7BIoSvmyufubmdVEdlb2sTr4waQUexHQ',
        language: 'en',
      }}
    />

    
  
    
    
    </View>
    </SafeAreaProvider>
  );
 }
}
 
export default Map;