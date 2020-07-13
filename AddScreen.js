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
import Geolocation from '@react-native-community/geolocation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {fetch, removeCookieByName} from 'react-native-ssl-pinning';
import Button from 'react-native-button';
import HTML from 'react-native-render-html';
const GLOBAL = require('./Global');

class AddScreen extends React.Component {
  constructor(props){
    super(props);


      this.state = {

        value: 0,
        Flatlistitems:[],
        loading:'',
        first:'',
        newimage:0,
        lat:'',
        long:'',
        
        imgchange: 0

        
      }

  }

  showLoading() {
        this.setState({loading: true})
       }

        hideLoading() {
        this.setState({loading: false})
       }

  componentDidMount () {
    
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
     this.getRemoteData()
   })
  }

  navigate=()=>{
    // GLOBAL.address = ''
    
  }


  onButtonClick=(item, index)=>{


     // alert(JSON.stringify(item.is_selected))
    // Geolocation.getCurrentPosition(info => {
        
    //     this.setState({ lat : info.coords.latitude })
    //     this.setState({ long : info.coords.longitude })
    //     // alert(JSON.stringify(this.state.lat))
    //       // alert(JSON.stringify(this.state.text));
    //       const url = GLOBAL.BASE_URL +  'location_check'

    //       this.showLoading()
    //         fetch(url, {
    //         method: 'POST',
    //         timeoutInterval: 1000, 
    //         headers: {
    //             'X-API-KEY': 'FCCDB2FFD5830D7F20E67C056DA727002AD9A403DDA29B3FDFAC22ECA226CD4F',
    //             'Content-Type': 'application/json',
    //             'Authorization': GLOBAL.token
    //         },
    //         sslPinning: {
    //             certs: ['yawd']
    //         },
    //         body: JSON.stringify({
    //           "lat": this.state.lat,
    //           "long": this.state.long,
              
    //         })
    //     })

    //         .then((response) => response.json())
    //         .then((responseData) => {
    //         // alert(JSON.stringify(responseData))

    // this.hideLoading()
    // if (responseData.status == true ) { 

     //     var a = this.state.Flatlistitems[index]
     // // alert(JSON.stringify(a))
     // if (a.is_selected  == 0) {
     //   a.is_selected = 1
     //    // alert(JSON.stringify(item.is_selected))
     // }
     // else{
     //        a.is_selected = 0
            
     // }

     // this.state.Flatlistitems[index] = a
     // this.setState({Flatlistitems:this.state.Flatlistitems})
        

        // alert(JSON.stringify(item.address_id))
           this.setState({ imgchange : 1  })
            GLOBAL.add_id = item.address_id
            alert('address selected please click button bellow')

//          // this.setState({ Flatlistitems: responseData.address})

           
         
//          // this.props.navigation.replace('AddScreen')
      
//         // AsyncStorage.setItem('userID', responseData.user_id);
      
// }  else {
 
//   alert('Sevices could not be found for this location')
// }

           
//       })
//       .catch((error) =>{
//         console.error(error);
//       })

          
//       });
         
//           //
         
//          // 

//          // 

  }

  




  getRemoteData=()=> {
       const url = GLOBAL.BASE_URL +  'get_address'

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
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
            // alert(JSON.stringify(responseData))

    this.hideLoading()
    if (responseData.status == true ) { 


        

            // alert(JSON.stringify(responseData))

         this.setState({ Flatlistitems: responseData.address})

        
         
         // this.props.navigation.replace('AddScreen')
      
        // AsyncStorage.setItem('userID', responseData.user_id);
      
}  else {
 
  alert("Invalid Credentials")
}

           
      })
      .catch((error) =>{
        console.error(error);
      })
  }

  setaddress=()=>{
    alert('select one address')
  }

 //  handleChange =(item, index)=> {
 //         // alert(JSON.stringify(item.is_selected))

 // //      for (var i = 0 ; i < this.state.Flatlistitems.length ; i++){
 // //        this.state.Flatlistitems[i].is_selected = ""
 // //        this.setState({Flatlistitems:this.state.Flatlistitems})
 // // }  

 //     var a = this.state.Flatlistitems[index]
 //     // alert(JSON.stringify(a))
 //     if (a.is_selected  == "") {
 //       a.is_selected = "Y"
 //        // alert(JSON.stringify(item.is_selected))
 //     }
 //     else{
 //            a.is_selected = ""
            
 //     }

 //     this.state.Flatlistitems[index] = a
 //     this.setState({Flatlistitems:this.state.Flatlistitems})



 // }


  renderItem=({item, index}) => {
           // alert(JSON.stringify(item.is_selected))
    
    return(

<View>




<View style={{height:'auto',width:'94%',borderRadius:6,marginLeft:'3%',elevation:4,backgroundColor:'white',marginBottom:10,marginTop:10}}>

<TouchableOpacity style={{alignSelf:'flex-end',marginTop:10,marginRight:10}}
 onPress={()=>this.removeAddress(item.address_id)}>
<Image source={require('./del2.png')}
  style={{height:20,width:20
    , resizeMode:'contain'}}/>
  </TouchableOpacity>

 <View style={{flexDirection:'row',alignItems:'center',width:'100%',marginBottom:15,justifyContent:'space-between'}}>

  <View style={{flexDirection:'column',width:'76%',marginLeft:12}}>
 
 <Text style={{fontSize:15,fontFamily:'Poppins-SemiBold',color:'#00000066',width:'100%'}}>{item.address_nickname} : {item.name} - {item.appartment}</Text>


 <Text style={{fontSize:15,fontFamily:'Poppins-Medium',color:'black',marginTop:5}}>{item.location}</Text>
 

 </View>

   

   
   <TouchableOpacity style={{height:30,width:60,borderRadius:15,borderWidth:3,backgroundColor:'black',borderColor:'black',marginRight:12,justifyContent:'center'}}
     onPress={()=>this.onButtonClick(item, index)}>
     <Text style={{fontSize:12,fontFamily:'Poppins-Medium',color:'white',alignSelf:'center'}}>add {index+1}</Text>
    </TouchableOpacity>

    
     

   
  
  

  
</View>

 

 

 </View>

 </View>

)
}

// stay=(item)=> {
//   alert(JSON.stringify(item))
// }

 


_keyExtractor=(item, index)=>item.key;


 removeAddress=(address_id)=>{
     
       const url = GLOBAL.BASE_URL +  'remove_address'

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
                "address_id": address_id
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
            // alert(JSON.stringify(responseData))

    this.hideLoading()
    if (responseData.status == true ) { 


        

          // alert(JSON.stringify(responseData))

          this.getRemoteData()

          alert('Successfully removed')

        // GLOBAL.user_id = responseData.user_id
         
         // this.props.navigation.replace('AddScreen')
      
        // AsyncStorage.setItem('userID', responseData.user_id);
      
}  else {
 
  alert("Invalid Credentials")
}

           
      })
      .catch((error) =>{
        console.error(error);
      })
 }

  addAdd=()=> {
    GLOBAL.address = ''
    this.props.navigation.navigate('AddAddress')
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


                        <Text style = {{color:'white',fontFamily:'Exo2-Bold',fontSize: 20,marginLeft:20}}>
                          Select Address
              
          


                       </Text>


                    </View>


                    <ScrollView style={{flex:1,backgroundColor:'white'}}>

                    <FlatList 
                       data={this.state.Flatlistitems}
                       
                       showsVerticalScrollIndicator={false}
                       keyExtractor={this._keyExtractor}
                       renderItem={this.renderItem}
              />

                    <View style={{height:84,width:'92%',borderTopWidth:1,borderBottomWidth:1,borderColor:'#e3e3e3',marginLeft:'4%',backgroundColor:'white',justifyContent:'center'}}>
                     
                     <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={()=>this.addAdd()}>
                     <Text style={{fontSize:28,fontFamily:'Poppins-SemiBold',color:'#000000CC',marginLeft:15}}>+</Text>
                     <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'#000000CC',marginLeft:20,width:'70%'}}>Add a new address</Text>
                     </TouchableOpacity>

                     </View>
                     
                    </ScrollView>

                    {this.state.imgchange==0 && (

                    <View style = {{height:80,backgroundColor:'white',flexDirection:'row',width:'100%',alignItems:'center',elevation:2}}>
                        


                        

                    <TouchableOpacity style={{height:54,width:'92%',backgroundColor:'#00000066',borderRadius:27,marginLeft:'4%',justifyContent
                    :'center'}} onPress={()=>this.setaddress()}>
                       
                       
                       <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'white',alignSelf:'center'}}>Continue with this address</Text>
                       
                       

                    </TouchableOpacity>   


                        

                        

                    </View>

                    )}


                    {this.state.imgchange==1 && (

                       <View style = {{height:80,backgroundColor:'white',flexDirection:'row',width:'100%',alignItems:'center',elevation:2}}>
                        


                        

                    <TouchableOpacity style={{height:54,width:'92%',backgroundColor:'black',borderRadius:27,marginLeft:'4%',justifyContent
                    :'center'}} onPress={()=>this.props.navigation.navigate('AppointScreen')}>
                       
                       
                       <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'white',alignSelf:'center'}}>Continue with this address</Text>
                       
                       

                    </TouchableOpacity>   


                        

                        

                    </View>

                     )} 

                </SafeAreaProvider>   

      );
  }
}

export default AddScreen;