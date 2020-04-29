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
import LinearGradient from 'react-native-linear-gradient';



 class StyleScreen2 extends React.Component {
   render() {
     return (
         <ScrollView>
         <View style={{width : Dimensions.get('window').width, height: Dimensions.get('window').height,backgroundColor:'#F2F5F7'}}>

         <View style={{height:'100%',width:'100%'}}>
         <Swiper
             onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
             dot={<View style={{backgroundColor: '#0000004D', width: 8, height: 8, borderRadius: 4, marginLeft: 4, marginRight: 4, marginTop: 3, marginBottom: 3}} />}
             activeDot={<View style={{backgroundColor: '#FF69B4', width: 40, height:10, borderRadius: 5, marginLeft: 4, marginRight: 4, marginTop: 3, marginBottom: 3}} />}
             paginationStyle={{alignSelf:'center',position:'absolute',top:100}} >

             <View style={{backgroundColor: 'transparent',justifyContent:'center',flexDirection:'column',}}>
              <Image style={{resizeMode:'cover',height:Dimensions.get('window').height/2,width:'100%',borderBottomRightRadius:200,borderBottomLeftRadius:200}} source={require('./salonlogo1.png')} />

              <Text style={{fontSize:23,color:'#000000',alignSelf:'center',fontFamily:'Poppins-SemiBold',marginTop:'20%'}}>Find and Book Services</Text>
              <Text style={{fontSize:16,color:'#00000066',alignSelf:'center',fontFamily:'Poppins-Regular',marginTop:20}}>Find and Book Barber, Beauty, Salon &</Text>
              <Text style={{fontSize:16,color:'#00000066',alignSelf:'center',fontFamily:'Poppins-Regular'}}>Spa Services anywhere, anytime.</Text>

              <View style={{marginTop:'15%'}}>
              <LinearGradient
                     start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                     colors={[ '#F80E94','#FF69B4']}
                     style={{height:54,width:330,borderRadius:27,justifyContent:'center',alignSelf:'center'}}>
                     <Text style={{fontSize:20,color: '#ffffff',fontFamily:'Poppins-Bold',alignSelf:'center',backgroundColor: 'transparent'}}>
                      Next
                     </Text>
              </LinearGradient>
              </View>
             </View>

             <View style={{backgroundColor: 'transparent'}}>
              <Image style={{resizeMode:'cover',height:Dimensions.get('window').height/2,width:'100%',borderBottomRightRadius:200,borderBottomLeftRadius:200}} source={require('./salonlogo2.png')} />
              <Text style={{fontSize:23,color:'#000000',alignSelf:'center',fontFamily:'Poppins-SemiBold',marginTop:'20%'}}>Find and Book Services</Text>
              <Text style={{fontSize:16,color:'#000000',alignSelf:'center',fontFamily:'Poppins-Regular',marginTop:20}}>Find and Book Barber, Beauty, Salon &</Text>
              <Text style={{fontSize:16,color:'#00000066',alignSelf:'center',fontFamily:'Poppins-Regular'}}>Spa Services anywhere, anytime.</Text>

              <View style={{marginTop:'15%'}}>
              <LinearGradient
                     start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                     colors={[ '#F80E94','#FF69B4']}
                     style={{height:54,width:330,borderRadius:27,justifyContent:'center',alignSelf:'center'}}>
                     <Text style={{fontSize:20,color: '#ffffff',fontFamily:'Poppins-Bold',alignSelf:'center',backgroundColor: 'transparent'}}>
                      Next
                     </Text>
              </LinearGradient>
              </View>
             </View>

             <View style={{backgroundColor: 'transparent'}}>
              <Image style={{resizeMode:'cover',height:Dimensions.get('window').height/2,width:'100%',borderBottomRightRadius:200,borderBottomLeftRadius:200}} source={require('./salonlogo3.png')} />
              <Text style={{fontSize:23,color:'#000000',alignSelf:'center',fontFamily:'Poppins-SemiBold',marginTop:'20%'}}>Style that fits your Lifestyle</Text>
              <Text style={{fontSize:16,color:'#00000073',alignSelf:'center',fontFamily:'Poppins-Regular',marginTop:20}}>Choose our Makeup special offer price</Text>
              <Text style={{fontSize:16,color:'#00000073',alignSelf:'center',fontFamily:'Poppins-Regular'}}>Package that fits your Lifestyle.</Text>

              <TouchableOpacity style={{marginTop:'20%'}}
              onPress={()=>this.props.navigation.navigate('LoginScreen2')}>
              <LinearGradient
                     start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                     colors={[ '#F80E94','#FF69B4']}
                     style={{height:54,width:330,borderRadius:27,justifyContent:'center',alignSelf:'center'}}>
                     <Text style={{fontSize:20,color: '#ffffff',fontFamily:'Poppins-Bold',alignSelf:'center',backgroundColor: 'transparent'}}>
                      Get Started
                     </Text>
              </LinearGradient>
              </TouchableOpacity>

              
             </View>





         </Swiper>


         </View>
         </View>
         </ScrollView>
     );
   }
 }

 export default StyleScreen2;
