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
  Animated,
  Modal,
  BackHandler,


  } from 'react-native';
import React, {Component} from 'react';
import Button from 'react-native-button';
import { NavigationContainer
 } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerActions,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import HTML from 'react-native-render-html';
const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {fetch, removeCookieByName} from 'react-native-ssl-pinning';
import Geocoder from 'react-native-geocoder';


const GLOBAL = require('./Global');




class Wallet extends React.Component {

  constructor(props){
    super(props);


      this.state = {

        
        
        loading:'',
    
        newimage:0,
        lat:'',
        long:'',
        Flatlistitems:[],
        
        
      }

  }

  showLoading() {
        this.setState({loading: true})
       }

        hideLoading() {
        this.setState({loading: false})
       }

  
  componentDidMount() {
    
       const url = GLOBAL.BASE_URL +  'user_wallet_txns'

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
             


                 // alert(JSON.stringify(responseData))
                this.setState({Flatlistitems: responseData.txns})
                 
                 // alert(JSON.stringify(this.state.Flatlistitems))
               // this.setModalVisible2()
             

              

    this.hideLoading()
            

           
      })
      .catch((error) =>{
        console.error(error);
      })  
          
  }

  
  renderItem=({item}) => {
        // alert(JSON.stringify(item))

    return(

<View>

<View style={{height:'auto',width:'94%',borderRadius:6,marginTop:10,marginBottom:5,marginLeft:'3%',backgroundColor:'white',elevation:3}}>


 
  
  <View style={{flexDirection:'row',alignItems:'center',width:'92%',marginBottom:10,marginTop:10,justifyContent:'space-between',marginLeft:'4%'}}>

   <View style={{flexDirection:'column',width:'70%'}}>
     <Text style={{fontSize:20,fontFamily:'Poppins-SemiBold',color:'black'}}>{item.title}</Text>
     <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'#00000066',marginTop:5}}>{item.created_at}</Text>
   </View>
   
   { item.txn_type == 'credit' && (
   <Text style={{fontSize:20,fontFamily:'Poppins-SemiBold',color:'#00FF00'}}>+₹ {item.amount}</Text>
   )}

   { item.txn_type == 'debit' && (
   <Text style={{fontSize:20,fontFamily:'Poppins-SemiBold',color:'#fe0000'}}>-₹ {item.amount}</Text>
   )}
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

                     <ImageBackground style={{height:155,width:'100%',resizeMode:'cover'}} source={require('./wallet.jpg')} >

                     <View style={{flexDirection:'row',alignItems:'center',marginTop:8}}>
                      
                      <TouchableOpacity onPress= {()=>this.props.navigation.goBack()}>
                            <Image
                                source={require('./back2.png')}
                                style={{width: 25, height: 28,marginLeft:20,resizeMode:'contain'}}


                            />
                        </TouchableOpacity>

                        <Text style={{fontSize:18,fontFamily:'Poppins-SemiBold',color:'white',marginTop:2,marginLeft:105}}>My Wallet</Text>

                        </View>

                        <Text style={{fontSize:23,fontFamily:'Poppins-SemiBold',color:'white',marginTop:20,alignSelf:'center'}}>₹ {GLOBAL.wallet}</Text>
                        <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'white',marginTop:10,alignSelf:'center'}}>Total Balance</Text>
                     </ImageBackground>
                    
                    <ScrollView style={{flex:1,backgroundColor:'#e3e3e3'}}>


                    <Text style={{fontSize:18,fontFamily:'Poppins-SemiBold',color:'#00000066',marginTop:15,marginLeft:18}}>Wallet Statement</Text>

                       
                     <FlatList style={{marginTop:5,marginBottom:10}}
                       data={this.state.Flatlistitems}
                       
                       showsVerticalScrollIndicator={false}
                       keyExtractor={this._keyExtractor}
                       renderItem={this.renderItem}
                       />
                    


                    </ScrollView>

                </SafeAreaProvider>

      );
  }
}

export default Wallet;