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


class Summary extends React.Component {
  constructor(props) {
     super(props);
       this.state ={
    
         Flatlistitems:[],
         
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
         this._unsubscribe = this.props.navigation.addListener('focus', () => {

        this.getcartitems()
        // alert(JSON.stringify(GLOBAL.sum_id))

      })
    }

    getcartitems=()=> {
      const url = GLOBAL.BASE_URL +  'get_cart_items'

        

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

               if (responseData.status == true) {
                
                
                           // alert(JSON.stringify(responseData))
                         GLOBAL.shopping = responseData.shop_name
                         GLOBAL.dukan_id = responseData.shop_id

                     GLOBAL.sum = responseData.total_amount
                     GLOBAL.sum_id = responseData.booking_type
                  this.setState({Flatlistitems: responseData.cart  })
                   // alert(JSON.stringify(responseData.shop_id))
                   

            }
            else{
                alert('Invalid Credentials!')
            }

               

    
            

           
      })
      .catch((error) =>{
        console.error(error);
      })
    }

    confirmCheckout=()=>{

      
        if (GLOBAL.sum_id=='visit_at_home') {
          GLOBAL.shop_id = 0
        this.props.navigation.navigate('AddScreen');
       }
           
           
         else if (GLOBAL.sum_id=='visit_at_salon') {
           GLOBAL.shop_id = GLOBAL.dukan_id
          this.props.navigation.navigate('AppointScreen');
         }
      

      

      
    }


   renderItem=({item}) => {
         // alert(JSON.stringify(item))
    return(

<View>




<View style={{width:'94%',flexDirection:'row',borderRadius:6,marginLeft:'3%',alignItems:'center',backgroundColor:'white',elevation:3,marginTop:10,marginBottom:3,justifyContent:'space-between'}}>


 
   <View style={{flexDirection:'column',marginLeft:15,marginTop:15,width:'60%',marginBottom:15}}>
    <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'black'}}>{item.title}</Text>
    <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'black',marginTop:5}}>₹ {item.selling_price}</Text>
   </View>




   <View style={{flexDirection:'row',height:35,width:100,borderRadius:4,backgroundColor:'black',alignItems:'center',justifyContent:'space-between',marginRight:15}}>
     <TouchableOpacity style={{height:32,width:34,backgroundColor:'white',justifyContent:'center',borderTopLeftRadius:4,borderBottomLeftRadius:4,marginLeft:1.5}}
      onPress={()=>this.subtractitem(item.cart_id, item.quantity)}>
     <Text style={{fontSize:25,fontFamily:'Poppins-Bold',color:'black',alignSelf:'center'}}>-</Text>
     </TouchableOpacity>

     <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'white'}}>{item.quantity}</Text>

     <TouchableOpacity style={{height:32,width:34,backgroundColor:'white',justifyContent:'center',borderTopRightRadius:4,borderBottomRightRadius:4,marginRight:1.5}}
      onPress={()=>this.additem(item.cart_id, item.quantity)}>
     <Text style={{fontSize:25,fontFamily:'Poppins-Bold',color:'black',alignSelf:'center'}}>+</Text>
     </TouchableOpacity>
   </View>

  
</View>

 

 

 </View>

)
}


_keyExtractor=(item, index)=>item.key;

  subtractitem=(cart_id, quantity) => {

     const url = GLOBAL.BASE_URL +  'edit_quantity_to_cart'

        var min = quantity - 1

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
              
              "cart_id": cart_id,
              "user_id": GLOBAL.user_id,
              "quantity": min
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             
             this.hideLoading()

               if (responseData.status == true) {
                
                
                     // alert(JSON.stringify(responseData))
                  
                     this.getcartitems()
                   
                   alert('Successfully Removed')

            }
            else{
                alert('Invalid Credentials!')
            }

               

    
            

           
      })
      .catch((error) =>{
        console.error(error);
      })
  }


    additem=(cart_id, quantity)=> {

       

       var min = parseInt(quantity) + 1

       

       const url = GLOBAL.BASE_URL +  'edit_quantity_to_cart'

       

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
              
              "cart_id": cart_id,
              "user_id": GLOBAL.user_id,
              "quantity": min
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             
             this.hideLoading()

               if (responseData.status == true) {
                
                
                     // alert(JSON.stringify(responseData))
                  
                     this.getcartitems()
                   
                   alert('Successfully Added')

            }
            else{
                alert('Invalid Credentials!')
            }

               

    
            

           
      })
      .catch((error) =>{
        console.error(error);
      })

   }

   confirmCheckout2=()=> {
     alert('Atleast purchase one item for Checkout')
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

    return(

         <SafeAreaProvider>
                   
                   <StatusBar backgroundColor="black" barStyle="light-content" />

                      <View style = {{height:60,backgroundColor:'black',flexDirection:'row',width:'100%',alignItems:'center'}}>
                        <View>
                        <TouchableOpacity onPress= {()=>this.props.navigation.goBack()}>
                            <Image
                                source={require('./back2.png')}
                                style={{width: 25, height: 28,marginLeft:20,resizeMode:'contain'}}


                            />
                        </TouchableOpacity>
                        </View>
                        
                        <View style={{width:'80%'}}>
                        
                        
                        {GLOBAL.sum_id=='visit_at_home' &&(

                        <Text style = {{color:'white',fontFamily:'Exo2-Bold',fontSize: 20,marginLeft:20}}>
                           Visit At Home
              
          

                       </Text>
                       )}

                       {GLOBAL.sum_id=='visit_at_salon' &&(
                        
                        <View style={{width:'100%'}}>
                        <Text style = {{color:'white',fontFamily:'Poppins-SemiBold',fontSize: 20,marginLeft:20}}>
                           Visit At Salon
              
          
            
                       </Text>
                       <Text style = {{color:'white',fontFamily:'Poppins-Medium',fontSize:14,marginLeft:20,width:'100%'}}>
                           {GLOBAL.shopping}
              
          
            
                       </Text>

                       </View>
                       )}


                       
                       

                       
                      </View>

                        

                    
                       


                        

                        

                    </View>


                     
                     <View style={{height:Dimensions.get('window').height}}>
                     {this.state.Flatlistitems.length != 0 &&( 
                    
                    <View style={{height:'100%',backgroundColor:'#f7f2f9'}}>
                    
                    <View style={{width:'100%',height:105,backgroundColor:'white',elevation:3}}>
                     <View style={{flexDirection:'row',width:'90%',alignItems:'center',justifyContent:'space-between',marginLeft:'5%',marginTop:13}}>
                       <Text style={{fontSize:14,fontFamily:'Poppins-Medium',color:'#000000CC'}}>Subtotal</Text>
                       <Text style={{fontSize:14,fontFamily:'Poppins-Medium',color:'#000000CC'}}>₹ {GLOBAL.sum}</Text>
                     </View>

                     <View style={{height:1,width:'90%',marginLeft:'5%',backgroundColor:'#e3e3e3',marginTop:12}}>
                     </View>

                     <View style={{flexDirection:'row',width:'90%',alignItems:'center',justifyContent:'space-between',marginLeft:'5%',marginTop:13}}>
                       <Text style={{fontSize:18,fontFamily:'Poppins-SemiBold',color:'black'}}>Total</Text>
                       <Text style={{fontSize:18,fontFamily:'Poppins-SemiBold',color:'black'}}>₹ {GLOBAL.sum}</Text>
                     </View>
                    </View>

                    <ScrollView style={{backgroundColor:'#f7f2f9'}}>

                    <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'black',marginLeft:12,marginTop:12}}>Items in your cart</Text>
                       

                     
                    <FlatList style={{marginBottom:10,backgroundColor:'#f7f2f9'}}
                       data={this.state.Flatlistitems}
                       
                       showsVerticalScrollIndicator={false}
                       keyExtractor={this._keyExtractor}
                       renderItem={this.renderItem}
                      />
                     
                     
                   

                    </ScrollView>

                   
                  
                
                    <View style = {{height:80,backgroundColor:'#f7f2f9',flexDirection:'row',width:'100%',alignItems:'center',elevation:2,position:'absolute',bottom:12}}>
                        


                        

                    <TouchableOpacity style={{flexDirection:'row',height:54,width:'92%',backgroundColor:'black',borderRadius:27,marginLeft:'4%',alignItems:'center',justifyContent:'space-between'}}
                     onPress={()=>this.confirmCheckout()}>
                       
                       <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'white',marginLeft:15}}>₹ {GLOBAL.sum}</Text>
                       <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'white',width:'65%',textAlign:'right'}}>Continue</Text>
                       
                       <View style={{width:35}}>
                       <Image style={{height:22,width:22,}}
                        source={require('./right.png')} />
                       </View>

                    </TouchableOpacity>   


                        

                        

                    </View>

                   

                </View>

                )}

                {this.state.Flatlistitems.length == 0 && (

                 <View style={{height:'100%',backgroundColor:'#f7f2f9'}}> 
                     <View style={{height:250,marginTop:'26%'}}>

                     <Image source={require('./cart2.png')} 
                      style={{height:160,width:160, resizeMode:'contain',alignSelf:'center'}}/>

                      <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'#00000066',marginTop:20,alignSelf:'center'}}>Your cart is empty</Text>

                      <Text style={{fontSize:18,fontFamily:'Poppins-SemiBold',color:'black',marginTop:20,alignSelf:'center'}}>Woops!</Text>
                      
                      <TouchableOpacity style={{flexDirection:'row',height:46,width:'60%',backgroundColor:'black',borderRadius:23,justifyContent:'center',alignSelf:'center',marginTop:20}}
                       onPress={()=>this.props.navigation.navigate('HomeScreen')}>
                       
                       <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'white',alignSelf:'center'}}>Back to Main menu</Text>
                       

                      </TouchableOpacity>

                     </View>

                   </View>  
                   )}   

                 </View>

                </SafeAreaProvider> 
      );
  }
}

export default Summary;