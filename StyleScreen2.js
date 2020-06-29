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




  } from 'react-native';


import React, {Component} from 'react';
import Swiper from 'react-native-swiper';
import Button from 'react-native-button';
import LinearGradient from 'react-native-linear-gradient';


 


 class StyleScreen2 extends React.Component {
  constructor(props) {
     super(props);
       this.state ={
    
         newIndex:0,
       }
   }


  

   render() {
     return (
         
         <View style={{flex:1,backgroundColor:'#F2F5F7'}}>

         
         <Swiper
             onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
             ref='swiper' showsButtons={false} loop={false}
             dot={<View style={{backgroundColor: '#0000004D', width: 8, height: 8, borderRadius: 4, marginLeft: 4, marginRight: 4, marginTop: 3, marginBottom: 3}} />}
             activeDot={<View style={{backgroundColor: 'black', width: 11, height:11, borderRadius: 5.5, marginLeft: 4, marginRight: 4, marginTop: 3, marginBottom: 3}} />}
             paginationStyle={{alignSelf:'center',position:'absolute',top:40}} >

             <View style={{flex:1,backgroundColor: 'white'}}>
              <Image style={{resizeMode:'stretch',height:Dimensions.get('window').height/2,width:Dimensions.get('window').width}} source={require('./salonlogo1.png')} />

              <Text style={{fontSize:24,color:'#000000',alignSelf:'center',fontFamily:'Poppins-SemiBold',marginTop:55}}>ENHANCE YOUR BEAUTY</Text>
              <Text style={{fontSize:15,color:'#00000066',alignSelf:'center',fontFamily:'Poppins-SemiBold',marginTop:12,width:'80%',textAlign:'center'}}>Choose our special offer and avail the service at your home</Text>
              

              <TouchableOpacity style={{height:50,width:'92%',backgroundColor:'black',borderRadius:25,position:'absolute',bottom:20,marginLeft:'4%',justifyContent:'center'}}
               onPress={() => this.refs.swiper.scrollBy(1)}>
               <Text style={{fontSize:18,color: '#ffffff',fontFamily:'Poppins-SemiBold',alignSelf:'center'}}>Next</Text>
               </TouchableOpacity>
              
              
             </View>

             <View style={{flex:1,backgroundColor: 'white'}}>
              <Image style={{resizeMode:'stretch',height:Dimensions.get('window').height/2,width:Dimensions.get('window').width}} source={require('./salonlogo3.png')} />
              
              <Text style={{fontSize:24,color:'#000000',alignSelf:'center',fontFamily:'Poppins-SemiBold',marginTop:55}}>GET PAMPERED</Text>
              <Text style={{fontSize:15,color:'#00000066',alignSelf:'center',fontFamily:'Poppins-SemiBold',marginTop:12,width:'80%',textAlign:'center'}}>Find and book the pampering,beauty and salon servics anytime at your doorstep</Text>
              

              <TouchableOpacity style={{height:50,width:'92%',backgroundColor:'black',borderRadius:25,position:'absolute',bottom:20,marginLeft:'4%',justifyContent:'center'}}
               onPress={() => this.refs.swiper.scrollBy(1)}>
               <Text style={{fontSize:18,color: '#ffffff',fontFamily:'Poppins-SemiBold',alignSelf:'center'}}>Next</Text>
               </TouchableOpacity>
              
              
             
             </View>

             <View style={{flex:1,backgroundColor: 'white'}}>
              <Image style={{resizeMode:'stretch',height:Dimensions.get('window').height/2,width:Dimensions.get('window').width}} source={require('./salonlogo2.png')} />
              <Text style={{fontSize:24,color:'#000000',alignSelf:'center',fontFamily:'Poppins-SemiBold',marginTop:55}}>STYLE THAT FIT YOUR LIFESTYLE</Text>
              <Text style={{fontSize:15,color:'#00000066',alignSelf:'center',fontFamily:'Poppins-SemiBold',marginTop:12,width:'80%',textAlign:'center'}}>Get your favourite hair colour and care at your nearest expert salon</Text>
              

              <TouchableOpacity style={{height:50,width:'92%',backgroundColor:'black',borderRadius:25,position:'absolute',bottom:20,marginLeft:'4%',justifyContent:'center'}}
               onPress={() => this.props.navigation.navigate('LoginScreen2')}>
               <Text style={{fontSize:18,color: '#ffffff',fontFamily:'Poppins-SemiBold',alignSelf:'center'}}>GET STARTED</Text>
               </TouchableOpacity>

              
             </View>





         </Swiper>


         </View>
       
     );
   }
 }

 export default StyleScreen2;
