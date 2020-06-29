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
import MaterialTabs from 'react-native-material-tabs';

class ViewScreen extends React.Component {
  constructor(props) {
     super(props);
       this.state ={
    
         Flatlistitems: GLOBAL.booking.orders,
         
         
         loading:'',
         
       }
   }

  componentDidMount() {
    // alert(JSON.stringify(GLOBAL.booking))
  }

  renderItem=({item}) => {
        // console.log(item)
    return(

<View>




<View style={{height:'auto',width:'92%',borderRadius:5,marginLeft:'4%',backgroundColor:'white',elevation:3,marginBottom:10}}>


 <View style={{flexDirection:'row',alignItems:'center',width:'90%',marginLeft:'5%',marginTop:15}}>
 <Text style={{fontFamily:'Poppins-Medium',color:'black',fontSize:16}}>Value Packages:</Text>
 <Text style={{fontFamily:'Poppins-Medium',color:'#00000066',fontSize:16,marginLeft:6}}>{item.service_name}</Text>
  
 </View>

 <View style={{flexDirection:'row',alignItems:'center',width:'90%',marginLeft:'5%',marginTop:8}}>
 <Text style={{fontFamily:'Poppins-Medium',color:'black',fontSize:16}}>Details:</Text>
 <Text style={{fontFamily:'Poppins-Medium',color:'#00000066',fontSize:16,marginLeft:6}}>{item.service_name} ({item.duration} mins)</Text>
  
 </View> 

 <View style={{flexDirection:'row',alignItems:'center',width:'90%',marginLeft:'5%',marginTop:8}}>
 <Text style={{fontFamily:'Poppins-Medium',color:'black',fontSize:16}}>Amount:</Text>
 <Text style={{fontFamily:'Poppins-Medium',color:'#00000066',fontSize:16,marginLeft:6}}>₹ {item.total}</Text>
  
 </View>

  
<View style={{flexDirection:'row',alignItems:'center',width:'90%',marginLeft:'5%',marginTop:8,marginBottom:15}}>
 <Text style={{fontFamily:'Poppins-Medium',color:'black',fontSize:16}}>Quantity:</Text>
 <Text style={{fontFamily:'Poppins-Medium',color:'#00000066',fontSize:16,marginLeft:6}}>{item.quantity}</Text>
  
 </View>

  
</View>

 

 

 </View>

)
}


_keyExtractor=(item, index)=>item.key;

  render() {
    return(

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


                        <Text style = {{color:'white',fontFamily:'Poppins-SemiBold',fontSize: 18,marginLeft:20}}>
                           Your Requirements
                        </Text>


                        

                    
                       


                        

                        

                    </View>

                    <ScrollView style={{backgroundColor:'#e3e3e3'}}>
                    <Text style={{fontSize:18,fontFamily:'Poppins-SemiBold',color:'#00000066',marginLeft:15,marginTop:15}}>Package</Text>

                    <FlatList style={{marginTop:10}}
                       data={this.state.Flatlistitems}
                       
                       showsVerticalScrollIndicator={false}
                       keyExtractor={this._keyExtractor}
                       renderItem={this.renderItem}
                       
                        /> 

                    <Text style={{fontSize:18,fontFamily:'Poppins-SemiBold',color:'#00000066',marginLeft:15,marginTop:20}}>Schedular</Text>  
                    
                    <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'black',marginLeft:20,marginTop:8,width:'80%'}}>{GLOBAL.booking.user_address.location}</Text>

                    <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'black',marginLeft:20,marginTop:8,width:'80%'}}>{GLOBAL.booking.appointment_date} at {GLOBAL.booking.appointment_time}</Text>        
                    
                    <Text style={{fontSize:18,fontFamily:'Poppins-SemiBold',color:'#00000066',marginLeft:15,marginTop:25}}>Booking Amount</Text>

                    <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'black',marginLeft:20,marginTop:8,width:'80%'}}>₹ {GLOBAL.booking.total_amount}</Text>
                    </ScrollView>


                    </SafeAreaProvider>

      );
  }
}


export default ViewScreen;