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
import {fetch, removeCookieByName} from 'react-native-ssl-pinning';
import Button from 'react-native-button';
import HTML from 'react-native-render-html';
const GLOBAL = require('./Global');


class PackageScreen extends React.Component {
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


  componentDidMount() {
      // alert(JSON.stringify(GLOBAL.package))
  }

  addcart=()=> {
    if (GLOBAL.package.package_id != '') {
      const url = GLOBAL.BASE_URL +  'add_to_cart'

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
              "service_id":0,
              "package_id":GLOBAL.package.package_id,
              "quantity":1
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             
             this.hideLoading()

               if (responseData.status == true) {
                
                
                    // alert(JSON.stringify(responseData))
                  
                   
                  // this.getcartitems()
                   
                   
                   alert('Successfully Added')
               
            }
            else{
                alert(JSON.stringify(responseData.message))
            }

               

    
            

           
      })
      .catch((error) =>{
        console.error(error);
      })
    }

    else if(GLOBAL.package.service_id != '') {
      const url = GLOBAL.BASE_URL +  'add_to_cart'

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
              "service_id":0,
              "package_id":GLOBAL.package.service_id,
              "quantity":1
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             
             this.hideLoading()

               if (responseData.status == true) {
                
                
                    // alert(JSON.stringify(responseData))
                  
                   
                  // this.getcartitems()
                   
                   
                   alert('Successfully Added')
               
            }
            else{
                alert(JSON.stringify(responseData.message))
            }

               

    
            

           
      })
      .catch((error) =>{
        console.error(error);
      })

    }
  }


    render() {

      var res = GLOBAL.package.whats_included
       
      
       

      const renderedButtons =  res.map((b, index) => {
         return <View style={{flexDirection:'row',width:'88%',alignItems:'center',marginLeft:'6%'}}>
             <Image source={require('./blackcircle.png')}
                 style={{height:8,width:8,resizeMode:'contain'}}/>
            <Text style={{fontSize: 14, color: '#00000066',fontFamily:'Poppins-Medium',marginLeft:8}}>{b}</Text>
          </View>

         

       })

       var str = GLOBAL.package.recommended_for
       
      
       

      const renderedButtons2 =  str.map((b, index) => {
         return <View style={{flexDirection:'row',width:'88%',alignItems:'center',marginLeft:'6%'}}>
             <Image source={require('./blackcircle.png')}
                 style={{height:8,width:8,resizeMode:'contain'}}/>
            <Text style={{fontSize: 14, color: '#00000066',fontFamily:'Poppins-Medium',marginLeft:8}}>{b}</Text>
          </View>

         

       })

       var ben = GLOBAL.package.benefits
       
      
       

      const renderedButtons3 =  ben.map((b, index) => {
         return <View style={{flexDirection:'row',width:'88%',alignItems:'center',marginLeft:'6%'}}>
             <Image source={require('./blackcircle.png')}
                 style={{height:8,width:8,resizeMode:'contain'}}/>
            <Text style={{fontSize: 14, color: '#00000066',fontFamily:'Poppins-Medium',marginLeft:8}}>{b}</Text>
          </View>

         

       })



  return (

     <SafeAreaProvider>
                   
                   <StatusBar backgroundColor="black" barStyle="light-content" />

                      <View style = {{height:65,backgroundColor:'black',flexDirection:'row',width:'100%',alignItems:'center'}}>
                        <View>
                        <TouchableOpacity onPress= {()=>this.props.navigation.goBack()}>
                            <Image
                                source={require('./back2.png')}
                                style={{width: 25, height: 28,marginLeft:20,resizeMode:'contain'}}


                            />
                        </TouchableOpacity>
                        </View>


                        <Text style = {{color:'white',fontFamily:'Exo2-Bold',fontSize: 20,width:'80%',marginLeft:20}}>
                           {GLOBAL.package.title}
                        </Text>


                        

                    
                       


                        

                        

                    </View>

                    <ScrollView style={{flex:1,backgroundColor:'#f7f2f9'}}>


                    <ImageBackground
                     source={{ uri:GLOBAL.package.image }}
                     style={{height:210,width:'100%',resizeMode:'cover'}}>

                      <Text style={{fontSize:20,fontFamily:'Poppins-Medium',color:'white',marginLeft:18,marginTop:25}}>{GLOBAL.package.title}</Text>
                      

                      <View style={{flexDirection:'row',alignItems:'center',marginTop:15,justifyContent:'space-between',width:'90%',marginLeft:'5%'}}>
                        <Image style={{height:20,width:20}}
                        source={require('./clock.png')} />


                        <Text style={{fontSize:14,fontFamily:'Poppins-Medium',color:'white',width:'66%',marginTop:3}}>{GLOBAL.package.duration} minutes</Text>
                        <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'white'}}>₹ {GLOBAL.package.selling_price}</Text>

                        

                      </View>

                      <TouchableOpacity style={{height:50,width:'90%',borderRadius:25,justifyContent:'center',alignSelf:'center',marginTop:30,backgroundColor:'black'}}
                       onPress={()=>this.addcart()}>
                         <Text style={{alignSelf:'center', fontSize:18, fontFamily:'Poppins-Medium',color:'white'}}>Add to Cart</Text>
                      </TouchableOpacity>

                      
                     </ImageBackground>

                     {GLOBAL.package.whats_included != '' &&(
                     <View style={{width:'92%',backgroundColor:'white',elevation:2,alignSelf:'center',marginTop:12,marginBottom:6,borderRadius:6}}>
                       <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'black',marginLeft:15,marginTop:15}}>Whats Included?</Text>
                       
                       <View style={{width:'100%',marginTop:10,marginLeft:7,marginBottom:12}}>
                        
                       {renderedButtons}

                      </View>
                     </View>
                     )}
                     
                     {GLOBAL.package.whats_included == '' &&(
                       <View>
                       </View>
                     
                     )}
                     

                     {GLOBAL.package.recommended_for != '' &&(
                     <View style={{width:'92%',backgroundColor:'white',elevation:2,alignSelf:'center',marginTop:12,marginBottom:6,borderRadius:6}}>
                       <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'black',marginLeft:15,marginTop:15}}>Recommended For</Text>
                       <View style={{width:'100%',marginTop:10,marginLeft:7,marginBottom:12}}>
                        
                       {renderedButtons2}

                      </View>

                     </View>
                     )}

                     {GLOBAL.package.recommended_for == '' &&(
                       <View>
                       </View>
                     
                     )}

                     
                     {GLOBAL.package.benefits != '' &&(
                     <View style={{width:'92%',backgroundColor:'white',elevation:2,alignSelf:'center',marginTop:12,marginBottom:6,borderRadius:6}}>
                     <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'black',marginLeft:15,marginTop:15}}>Benifits</Text>
                       <View style={{width:'100%',marginTop:10,marginLeft:7,marginBottom:12}}>
                        
                       {renderedButtons3}

                      </View>

                      </View>

                      )}

                      {GLOBAL.package.benefits == '' &&(
                       <View>
                       </View>
                     
                     )}

                      
                      {GLOBAL.package.note != '' &&(
                      <View style={{width:'92%',backgroundColor:'white',elevation:2,alignSelf:'center',marginTop:12,marginBottom:6,borderRadius:6}}>
                     <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'black',marginLeft:15,marginTop:15}}>Please Note</Text>
                       <View style={{width:'88%',marginLeft:'6%'}}>
                        
                       <HTML html={GLOBAL.package.note}  imagesMaxWidth={Dimensions.get('window').width} />

                      </View>

                      </View>
                      )}

                      {GLOBAL.package.note == '' &&(
                       <View>
                       </View>
                     
                     )}


                    </ScrollView>
                   
                  

                   <View style = {{height:80,backgroundColor:'#f7f2f9',flexDirection:'row',width:'100%',alignItems:'center',elevation:2}}>
                        


                        

                    <TouchableOpacity style={{flexDirection:'row',height:54,width:'92%',backgroundColor:'black',borderRadius:27,marginLeft:'4%',alignItems:'center',justifyContent:'space-between'}}
                     onPress={()=>this.props.navigation.navigate('Summary')}>
                       
                       {GLOBAL.sum == ''&&(
                       <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'white',marginLeft:15}}>₹ 0.00</Text>
                       )}

                       {GLOBAL.sum != ''&&(
                       <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'white',marginLeft:15}}>₹ {GLOBAL.sum}</Text>
                       )}
                       <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'white',width:'65%',textAlign:'right'}}>Summary</Text>
                       
                       <View style={{width:35}}>
                       <Image style={{height:22,width:22}}
                        source={require('./right.png')} />
                       </View>

                    </TouchableOpacity>   


                        

                        

                    </View>
                   

                </SafeAreaProvider>
    );
  }
}


export default PackageScreen;