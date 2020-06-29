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
       GLOBAL.address = data.description
       GLOBAL.lat = details.geometry.location.lat
       GLOBAL.long = details.geometry.location.lng

       this.hideLoading()
       
       this.props.navigation.replace('AddAddress')
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