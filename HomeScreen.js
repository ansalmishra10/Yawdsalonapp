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
  BackHandler

  } from 'react-native';
import React, {Component} from 'react';
import Button from 'react-native-button';
import { NavigationContainer
 } from '@react-navigation/native';
 import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Geolocation from '@react-native-community/geolocation';
import 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import HTML from 'react-native-render-html';
const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {fetch, removeCookieByName} from 'react-native-ssl-pinning';


const GLOBAL = require('./Global');





class HomeScreen extends React.Component {
  constructor(props) {
     super(props);
       this.state ={
    
         lat:'',
         long:'',
         Flatlistitems1:[],
         Flatlistitems2:[],
         Flatlistitems3:[],
         loading:'',
         gender:'',
         modalVisible:false,
         modalVisible3:false,
       }
   }

   showLoading() {
        this.setState({loading: true})
       }

        hideLoading() {
        this.setState({loading: false})
       }

       


   setValue =(type) =>{

     // alert(JSON.stringify(type))
     
       GLOBAL.gender = type


     const url = GLOBAL.BASE_URL +  'get_categories_vah'

          this.showLoading()
            fetch(url, {
            method: 'POST',
            timeoutInterval: 1000, 
            headers: {
                'X-API-KEY': 'FCCDB2FFD5830D7F20E67C056DA727002AD9A403DDA29B3FDFAC22ECA226CD4F',
                'Content-Type': 'application/json'
            },
            sslPinning: {
                certs: ['yawd']
            },
            body: JSON.stringify({
              "use_for": type
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             
             this.hideLoading()

               if (responseData.status == true) {
                
                this.setModalVisible2()
                 // alert(JSON.stringify(responseData))
                GLOBAL.allservice = responseData.data
                GLOBAL.cat1 = responseData.data[1].category_id
             // this.setState({Flatlistitems1: responseData.top_banners })
                this.props.navigation.navigate('Allservice')
            }
            else{
                alert('Invalid Credentials!')
            }

               

    
            

           
      })
      .catch((error) =>{
        console.error(error);
      })
     
   }

   componentDidMount () {
      // alert(JSON.stringify(GLOBAL.token))
       Geolocation.getCurrentPosition(info => {
        
        this.setState({ lat : info.coords.latitude })
        this.setState({ long : info.coords.longitude })
        // alert(JSON.stringify(this.state.lat))
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
                  GLOBAL.house = responseData.address
               

    this.hideLoading()
            

           
      })
      .catch((error) =>{
        console.error(error);
      })

        });


      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

      this.getData();
   }

 
   componentWillUnmount(){
   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
   }


   

   handleBackButton=()=>{

     Alert.alert(
      'Exit From App' ,
      'Do you want to exit from App?',
      [
        { text: 'Yes', onPress: () => BackHandler.exitApp()  },
        { text: 'No', onPress: () => console.log('No Pressed')  }
      ],

      { cancelable: false },

      );

     return true;
   }
   


   getData=()=> {
  
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
       // alert(JSON.stringify(GLOBAL.user_id))
         const url = GLOBAL.BASE_URL +  'gethomepage'

          this.showLoading()
            fetch(url, {
            method: 'POST',
            timeoutInterval: 1000, 
            headers: {
                'X-API-KEY': 'FCCDB2FFD5830D7F20E67C056DA727002AD9A403DDA29B3FDFAC22ECA226CD4F',
                'Content-Type': 'application/json'
            },
            sslPinning: {
                certs: ['yawd']
            },
            body: JSON.stringify({
              "user_id": GLOBAL.user_id
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             


                  // alert(JSON.stringify(responseData.packages))
                GLOBAL.min_pay = responseData.rules.min_payout
             this.setState({Flatlistitems1: responseData.top_banners })
               // alert(JSON.stringify(this.state.Flatlistitems1))
              
             this.setState({Flatlistitems2: responseData.packages })

             this.setState({Flatlistitems3: responseData.bottom_banners })
             // alert(JSON.stringify(responseData.bottom_banners))

              // alert(JSON.stringify(this.state.Flatlistitems3))

    this.hideLoading()
            

           
      })
      .catch((error) =>{
        console.error(error);
      })

    })
   }

  renderItem=({item}) => {
       // console.log(item.image)
    return(

<View>

<TouchableOpacity style={{margin:10,borderRadius:8,elevation:3}}
onPress={()=>this.getbannerDetails(item.package_id, item.service_id)}>


 
 

<Image style={{ width: Dimensions.get('window').width - 20, borderRadius:8,height: 200 ,resizeMode:'stretch'}} source={{ uri: item.image }} />


  


  
</TouchableOpacity>



 </View>

)
}

getbannerDetails=(package_id, service_id)=> {

   // alert(JSON.stringify(package_id))

  if (package_id !=0 && service_id==0 ) {
       // alert(JSON.stringify(package_id))



       const url = GLOBAL.BASE_URL +  'package_details'

          this.showLoading()
            fetch(url, {
            method: 'POST',
            timeoutInterval: 1000, 
            headers: {
                'X-API-KEY': 'FCCDB2FFD5830D7F20E67C056DA727002AD9A403DDA29B3FDFAC22ECA226CD4F',
                'Content-Type': 'application/json'
            },
            sslPinning: {
                certs: ['yawd']
            },
            body: JSON.stringify({
              "package_id": package_id,
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             
             this.hideLoading()

               if (responseData.status == true) {
                
                
                  // alert(JSON.stringify(responseData))
                  
                  GLOBAL.package = responseData.package
                  
                  this.props.navigation.navigate('PackageScreen')
               
            }
            else{
                alert('Invalid Credentials!')
            }

               

    
            

           
      })
      .catch((error) =>{
        console.error(error);
      })
  }
  
  else if (package_id ==0 && service_id !=0 ) {
       // alert(JSON.stringify(service_id))

       const url = GLOBAL.BASE_URL +  'service_details'



          this.showLoading()
            fetch(url, {
            method: 'POST',
            timeoutInterval: 1000, 
            headers: {
                'X-API-KEY': 'FCCDB2FFD5830D7F20E67C056DA727002AD9A403DDA29B3FDFAC22ECA226CD4F',
                'Content-Type': 'application/json'
            },
            sslPinning: {
                certs: ['yawd']
            },
            body: JSON.stringify({
              "service_id": service_id,
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             
             this.hideLoading()

               if (responseData.status == true) {
                
                
                  // alert(JSON.stringify(responseData))
                  
                  GLOBAL.package = responseData.service
                  this.props.navigation.navigate('PackageScreen')
               
            }
            else{
                alert('Invalid Credentials!')
            }

               

    
            

           
      })
      .catch((error) =>{
        console.error(error);
      })
  }

  else {
      // alert('chutiye')
  }
}


setModalVisible=()=> {
  this.setState({modalVisible: true})
}

setModalVisible2=()=> {
  this.setState({modalVisible: false})
}

setModalVisible3=()=> {
  this.setState({modalVisible3: true})
}

setModalVisible4=()=> {
  this.setState({modalVisible3: false})
}


 _keyExtractor=(item, index)=>item.key;


 renderItem2=({item}) => {
       // console.log(item)
    return(

<View>

<TouchableOpacity style={{height:'auto',borderRadius:6,marginLeft:10,elevation:2,marginBottom:10}} onPress={()=>this.setValuePack(item.package_id)}>


<View style={{height:'auto',width:Dimensions.get('window').width - 80,backgroundColor:'white',borderRadius:6}}>
    <Image style={{ width: '100%', borderTopLeftRadius:6 ,borderTopRightRadius:6,height: 200 ,resizeMode:'cover'}} source={{ uri: item.image }} />

    <View style={{height:55,width:'100%',alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>

      <View style={{marginLeft:18}}>
       <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'black'}}>{item.title}</Text>
       <Text style={{fontSize:10,fontFamily:'Poppins-Medium',color:'#00000066',marginTop:-2}}>(Only for {item.use_for})</Text>
      </View>

      <View style={{height:30,width:70,justifyContent:'center',backgroundColor:'red',borderTopLeftRadius:15,borderBottomLeftRadius:15}}>
      <Text style={{fontSize:10,fontFamily:'Poppins-SemiBold',color:'white',alignSelf:'center'}}>Save {item.discount}%</Text>
      </View>


    </View>
    <View style={{height:1,width:'100%',backgroundColor:'#e3e3e3'}}>
    </View>
    
    
    <HTML html={item.description} containerStyle={{marginTop:5}} imagesInitialDimensions={{height:100}} imagesMaxWidth={Dimensions.get('window').width} />

    <Text style={{fontSize:14,fontFamily:'Poppins-Medium',color:'#00000066',marginLeft:20}}>{item.duration} minutes</Text>
     
     <View style={{flexDirection:'row',alignItems:'center',width:'90%',marginLeft:'6%',justifyContent:'space-between',marginBottom:10,marginTop:5}}>
      <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'#FF8C00',textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>₹ {item.mrp}</Text>
      <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'black',width:'50%'}}>₹ {item.selling_price}</Text>
      
      <Image source={require('./cart.png')}
       style={{height:22,width:22,resizeMode:'contain'}}/>
     </View>
    
</View>

 
 



</TouchableOpacity>



 </View>

)
}


_keyExtractor2=(item, index)=>item.key;

setValuePack=(package_id)=>{
  // alert(JSON.stringify(item))
  const url = GLOBAL.BASE_URL +  'package_details'

          this.showLoading()
            fetch(url, {
            method: 'POST',
            timeoutInterval: 1000, 
            headers: {
                'X-API-KEY': 'FCCDB2FFD5830D7F20E67C056DA727002AD9A403DDA29B3FDFAC22ECA226CD4F',
                'Content-Type': 'application/json'
            },
            sslPinning: {
                certs: ['yawd']
            },
            body: JSON.stringify({
              "package_id": package_id,
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             
             this.hideLoading()

               if (responseData.status == true) {
                
                
                  // alert(JSON.stringify(responseData))
                  
                  GLOBAL.package = responseData.package
                  
                  this.props.navigation.navigate('PackageScreen')
               
            }
            else{
                alert('Invalid Credentials!')
            }

               

    
            

           
      })
      .catch((error) =>{
        console.error(error);
      })
}




renderItem3=({item}) => {
       // console.log(item.image)
    return(

<View>

<TouchableOpacity style={{marginLeft:10,borderRadius:8,elevation:3,marginBottom:10}}
 onPress={()=>this.bottombannerDetails(item.package_id, item.service_id)}>


 
 

<Image style={{ width:Dimensions.get('window').width - 80, borderRadius:6,height: 160 ,resizeMode:'cover'}} source={{ uri: item.image }} />


  


  
</TouchableOpacity>



 </View>

)
}

bottombannerDetails=(package_id, service_id)=> {
  if (package_id !=0 && service_id==0 ) {
       // alert(JSON.stringify(package_id))

       const url = GLOBAL.BASE_URL +  'package_details'

          this.showLoading()
            fetch(url, {
            method: 'POST',
            timeoutInterval: 1000, 
            headers: {
                'X-API-KEY': 'FCCDB2FFD5830D7F20E67C056DA727002AD9A403DDA29B3FDFAC22ECA226CD4F',
                'Content-Type': 'application/json'
            },
            sslPinning: {
                certs: ['yawd']
            },
            body: JSON.stringify({
              "package_id": package_id,
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             
             this.hideLoading()

               if (responseData.status == true) {
                
                
                  // alert(JSON.stringify(responseData))
                  
                  GLOBAL.package = responseData.package
                  
                  this.props.navigation.navigate('PackageScreen')
               
            }
            else{
                alert('Invalid Credentials!')
            }

               

    
            

           
      })
      .catch((error) =>{
        console.error(error);
      })
  }
  
  else if (package_id ==0 && service_id !=0 ) {
       // alert(JSON.stringify(service_id))

       const url = GLOBAL.BASE_URL +  'service_details'



          this.showLoading()
            fetch(url, {
            method: 'POST',
            timeoutInterval: 1000, 
            headers: {
                'X-API-KEY': 'FCCDB2FFD5830D7F20E67C056DA727002AD9A403DDA29B3FDFAC22ECA226CD4F',
                'Content-Type': 'application/json'
            },
            sslPinning: {
                certs: ['yawd']
            },
            body: JSON.stringify({
              "service_id": service_id,
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             
             this.hideLoading()

               if (responseData.status == true) {
                
                
                  // alert(JSON.stringify(responseData))
                  
                  GLOBAL.package = responseData.service
                  this.props.navigation.navigate('PackageScreen')
               
            }
            else{
                alert('Invalid Credentials!')
            }

               

    
            

           
      })
      .catch((error) =>{
        console.error(error);
      })
  }

  else {
      // alert('chutiye')
  }
}


_keyExtractor3=(item, index)=>item.key;

setValueAgain=(type)=>{
  // alert(JSON.stringify(type))
   GLOBAL.type = type
   this.setModalVisible4()
   this.props.navigation.navigate('HaircutScreen')
   
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


                      <View style = {{height:60,backgroundColor:'black',flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-between'}}>
                        <View>
                        <TouchableOpacity onPress={()=>this.props.navigation.toggleDrawer()}>
                            <Image
                                source={require('./drawer.png')}
                                style={{width: 30, height:30,marginLeft:20,resizeMode:'contain'}}


                            />
                        </TouchableOpacity>
                        </View>
                       
                        <Text style={{fontSize:12,fontFamily:'Poppins-Medium',color:'white',width:'68%'}}>{GLOBAL.house}</Text>

                        <View>
                        <TouchableOpacity>
                            <Image
                                source={require('./search.png')}
                                style={{width: 25, height: 25,resizeMode:'contain',marginRight:20}}


                            />
                        </TouchableOpacity>
                        </View>


                        

                        

                    </View>

                    <ScrollView style={{flex:1,backgroundColor:'#e3e3e3'}}>

                    <FlatList 
                       data={this.state.Flatlistitems1}
                       horizontal={true}
                       showsHorizontalScrollIndicator={false}
                       keyExtractor={this._keyExtractor}
                       renderItem={this.renderItem}
              />


                   <Text style={{fontSize:15,fontFamily:'Poppins-Bold',color:'black',marginLeft:12}}>Select a service</Text>

                   <View style={{height:2,width:30,backgroundColor:'#00000066',marginLeft:12}}>
                   </View>


                   <View style={{flexDirection:'row',width:'92%',alignSelf:'center',alignItems:'center',justifyContent:'space-between',marginTop:12}}>
                      <TouchableOpacity style={{alignItems:'center',width:'48%',height:140,backgroundColor:'white',borderRadius:8,elevation:3}}
                       onPress={()=>this.setModalVisible()}>
                        
                        <Image source={require('./visithome.png')}
                        style={{width:70,height:70,marginTop:20}}/>

                        <Text style={{fontSize:15,fontFamily:'Poppins-Medium',color:'black',marginTop:10}}>Visit at Home</Text>
     
                      </TouchableOpacity>

                      <TouchableOpacity style={{alignItems:'center',width:'48%',height:140,backgroundColor:'white',borderRadius:8,elevation:3}}
                       onPress={()=>this.setModalVisible3()}>

                        <Image source={require('./visitsalon.png')}
                        style={{width:70,height:70,marginTop:20}}/>

                        <Text style={{fontSize:15,fontFamily:'Poppins-Medium',color:'black',marginTop:10}}>Visit at Salon</Text>
     
                      </TouchableOpacity>
                 </View>


                 <Text style={{fontSize:15,fontFamily:'Poppins-Bold',color:'black',marginLeft:12,marginTop:12}}>Packages</Text>

                   <View style={{height:2,width:30,backgroundColor:'#00000066',marginLeft:12}}>
                   </View>

                   <FlatList style={{marginTop:10}}
                       data={this.state.Flatlistitems2}
                       horizontal={true}
                       showsHorizontalScrollIndicator={false}
                       keyExtractor={this._keyExtractor2}
                       renderItem={this.renderItem2}
              />



              <FlatList style={{marginTop:5}}
                       data={this.state.Flatlistitems3}
                       horizontal={true}
                       showsHorizontalScrollIndicator={false}
                       keyExtractor={this._keyExtractor3}
                       renderItem={this.renderItem3}
              />

                 <Modal
                         animationType="slide"
                         transparent={true}
                         visible={this.state.modalVisible}
                         onRequestClose={() => {
              //             Alert.alert('Modal has been closed.');
                            this.setModalVisible2()
                         }}>
                         <TouchableOpacity
                          style={{
                                   flex: 1,
                                   borderRadius:10,
                                   flexDirection: 'column',
                                   justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                   alignItems: 'center'}}
                          activeOpacity={1}
                          onPressOut={() => this.setModalVisible2()}
                        >
                         <View style={{
                                  borderRadius:10,
                                   flexDirection: 'column',
                                   justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                   alignItems: 'center'}}>
                             <View style={{
                                     width:330,borderRadius:10,backgroundColor: 'white',
                                     height: 170}}>
                                     <View style={{width: '95%', margin: 10}}>

                                     <Text style={{fontSize:15,fontFamily:'Poppins-SemiBold',color:'black',width:'90%',alignSelf:'center',marginTop:12,textAlign:'center'}}>For whom are you booking for?</Text>

                                      <TouchableOpacity style={{flexDirection:'row',alignItems:'center',width:'83%',alignSelf:'center',marginTop:12}}
                                       onPress={()=>this.setValue('2')}>

                                      <Image source={require('./male.jpg')}
                                       style={{width:35,height:35,resizeMode:'contain'}}/>

                                       <Text style={{fontSize:15,fontFamily:'Poppins-Medium',color:'black',marginLeft:10}}>Male</Text>

                                      </TouchableOpacity>


                                      <TouchableOpacity style={{flexDirection:'row',alignItems:'center',width:'83%',alignSelf:'center',marginTop:14}}
                                      onPress={()=>this.setValue('3')}>

                                      <Image source={require('./female.png')}
                                       style={{width:28,height:28,resizeMode:'contain',marginLeft:3}}/>

                                       <Text style={{fontSize:15,fontFamily:'Poppins-Medium',color:'black',marginLeft:13,marginTop:2}}>Female</Text>

                                      </TouchableOpacity>
                                    

                                    </View>


                             </View>

                         </View>
                         </TouchableOpacity>
                       </Modal>


                       <Modal
                         animationType="slide"
                         transparent={true}
                         
                         visible={this.state.modalVisible3}
                         onRequestClose={() => {
              //             Alert.alert('Modal has been closed.');
                            this.setModalVisible4()
                         }}>
                         <TouchableOpacity
                          style={{flex: 1,
                                   borderRadius:10,
                                   flexDirection: 'column',
                                   justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                   alignItems: 'center'}}
                          activeOpacity={1}
                          onPressOut={() => this.setModalVisible4()}
                        >
                         <View style={{
                                  borderRadius:10,
                                   flexDirection: 'column',
                                   justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                   alignItems: 'center'}}>
                             <View style={{
                                     width:330,borderRadius:10,backgroundColor: 'white',
                                     height: 170}}>
                                     <View style={{width: '95%', margin: 10}}>

                                     <Text style={{fontSize:15,fontFamily:'Poppins-SemiBold',color:'black',width:'90%',alignSelf:'center',marginTop:12,textAlign:'center'}}>For whom are you booking for?</Text>

                                      <TouchableOpacity style={{flexDirection:'row',alignItems:'center',width:'83%',alignSelf:'center',marginTop:12}}
                                       onPress={()=> this.setValueAgain('2')}>

                                      <Image source={require('./male.jpg')}
                                       style={{width:35,height:35,resizeMode:'contain'}}/>

                                       <Text style={{fontSize:15,fontFamily:'Poppins-Medium',color:'black',marginLeft:10}}>Male</Text>

                                      </TouchableOpacity>


                                      <TouchableOpacity style={{flexDirection:'row',alignItems:'center',width:'83%',alignSelf:'center',marginTop:14}}
                                      onPress={()=> this.setValueAgain('3')}>

                                      <Image source={require('./female.png')}
                                       style={{width:28,height:28,resizeMode:'contain',marginLeft:3}}/>

                                       <Text style={{fontSize:15,fontFamily:'Poppins-Medium',color:'black',marginLeft:13,marginTop:2}}>Female</Text>

                                      </TouchableOpacity>
                                    

                                    </View>


                             </View>

                         </View>
                         </TouchableOpacity>
                       </Modal>


                    </ScrollView>

                   </SafeAreaProvider> 
      );
  }
} 

export default HomeScreen; 