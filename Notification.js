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
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const window = Dimensions.get('window');
const GLOBAL = require('./Global');


type Props = {};

class Notification extends React.Component {
  constructor(props){
    super(props)
    const { navigation } = this.props;
    this.state = {
      name: '',
      email: '',
       message: '',
       status :'' ,
       loading : '',
       userid : '',
       notificationslist:[],
    }
}


  renderRowItem = (item) => {

    return (
      <View style={{flexDirection: 'row',flex : 1, backgroundColor:'white',borderRadius:5,  width : window.width-20 ,marginLeft : 10,marginRight:10,marginTop:10,marginBottom:5,elevation:3}}>
    <Image style={{width:30, height:30, resizeMode:'contain', margin:12}} source={require('./blackbell.png')}/>
    <View style={{flexDirection:'column', margin:10, width: '82%'}}>
     <Text style={{fontSize:16, color:'#21262C', fontFamily: 'Poppins-SemiBold'}}>{item.item.title}</Text>
     <Text style={{fontSize:13, marginRight:10,fontFamily: 'Poppins-Medium',color:'#000000CC',marginTop:5}}>{item.item.message}</Text>
     <View style={{flexDirection:'row', width: '100%', alignItems:'flex-end', justifyContent: 'flex-end',marginBottom:5}}>
      <Image style={{width: 18, height: 18, resizeMode: 'contain'}} source={require('./clocklogo.png')}/>
      <Text style={{fontSize:13,fontFamily:'Poppins-Medium',marginTop: 10,marginLeft: 10,marginRight:10,  color:'#7E7E7E'}}>{item.item.created_at}</Text>
         </View>

</View>
</View>



    )
  }

 showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }




componentDidMount(){

  this.getReviews()
}

   getReviews= () =>{
      
      
      const url = GLOBAL.BASE_URL +  'user_notifications'


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


              if (responseData.status == true) {
                
                 this.setState({notificationslist : responseData.data})
                
                  // alert(JSON.stringify(this.state.notificationslist))
               
            }
            else{
                alert('Invalid Credentials!')
             
               }

                 
             

              

    this.hideLoading()
            

           
      })
      .catch((error) =>{
        console.error(error);
      })
      
      
      
    }

    initiatedrawer=()=> {

      const url = GLOBAL.BASE_URL +  'get_profile'

        

          
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
                     
                     GLOBAL.draw = responseData.user
                      this.props.navigation.toggleDrawer()
                     // this.setState({profile: responseData.user})
                     
                     

                       

                   })
      .catch((error) =>{
        console.error(error);
      })
}


  render() {
    return(
           
           <SafeAreaProvider>
                      <StatusBar backgroundColor="black" barStyle="light-content" />


                      <View style = {{height:60,backgroundColor:'black',flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-between'}}>
                        <View>
                        <TouchableOpacity onPress={()=>this.initiatedrawer()}>
                            <Image
                                source={require('./drawer.png')}
                                style={{width: 30, height:30,marginLeft:20,resizeMode:'contain'}}


                            />
                        </TouchableOpacity>
                        </View>
                       
                        <Text style={{fontSize:12,fontFamily:'Poppins-Medium',color:'white',width:'68%'}}>{GLOBAL.house}</Text>

                        <View>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('SearchScreen')}>
                            <Image
                                source={require('./search.png')}
                                style={{width: 25, height: 25,resizeMode:'contain',marginRight:20}}


                            />
                        </TouchableOpacity>
                        </View>


                        </View>

                    <ScrollView style={{flex:1,backgroundColor:'white'}}>
{this.state.notificationslist.length == 0 &&(
    <Text style={{fontSize:20, margin:10,alignSelf:'center', fontFamily: 'Poppins-SemiBold',marginTop:'80%'}}>No new notifications!</Text>
  )}

  {this.state.notificationslist.length != 0 &&(
      <FlatList style= {{backgroundColor:'white',flexGrow:0, marginBottom:20}}
          data={this.state.notificationslist}
          numColumns={1}
          keyExtractor = { this.keyExtractor}
          renderItem={this.renderRowItem}
        />

    )}



     </ScrollView>

                   </SafeAreaProvider> 

        );
      }
    }

    export default Notification;