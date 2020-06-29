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
import moment from 'moment';

class AppointScreen extends React.Component {

  constructor(props){
    super(props);

     this.state = {

      loading:'',
      FlatListItems2:[],
      imgchange:0,
      FlatListItems: [

    {"key": "#1",

     "add": moment().format('ddd'),

     "add2": moment().format("DD"),

     "add3": moment().format("YYYY-MM-DD"),

     

    },

    {"key": "#2",

     "add": moment().add(1, 'days').format('ddd'),

     "add2": moment().add(1, 'days').format("DD"),

     "add3": moment().add(1, 'days').format("YYYY-MM-DD"),

    

    },

    {"key": "#3",

     "add": moment().add(2, 'days').format('ddd'),

     "add2": moment().add(2, 'days').format("DD"),

     "add3": moment().add(2, 'days').format("YYYY-MM-DD"),

     

    },

    {"key": "#4",

     "add": moment().add(3, 'days').format('ddd'),

     "add2": moment().add(3, 'days').format("DD"),

     "add3": moment().add(3, 'days').format("YYYY-MM-DD"),

     

    },

    {"key": "#5",

     "add": moment().add(4, 'days').format('ddd'),

     "add2": moment().add(4, 'days').format("DD"),

     "add3": moment().add(4, 'days').format("YYYY-MM-DD"),

    

    },

    {"key": "#6",

     "add": moment().add(5, 'days').format('ddd'),

     "add2": moment().add(5, 'days').format("DD"),

     "add3": moment().add(5, 'days').format("YYYY-MM-DD"),

     


    },

    {"key": "#7",

     "add": moment().add(6, 'days').format('ddd'),

     "add2": moment().add(6, 'days').format("DD"),

     "add3": moment().add(6, 'days').format("YYYY-MM-DD"),

     

    },

    {"key": "#8",

     "add": moment().add(7, 'days').format('ddd'),

     "add2": moment().add(7, 'days').format("DD"),

     "add3": moment().add(7, 'days').format("YYYY-MM-DD"),

     

    },

    {"key": "#9",

     "add": moment().add(8, 'days').format('ddd'),

     "add2": moment().add(8, 'days').format("DD"),

     "add3": moment().add(8, 'days').format("YYYY-MM-DD"),

     

    },

    {"key": "#10",

     "add": moment().add(9, 'days').format('ddd'),

     "add2": moment().add(9, 'days').format("DD"),

     "add3": moment().add(9, 'days').format("YYYY-MM-DD"),

     


    },

    {"key": "#11",

     "add": moment().add(10, 'days').format('ddd'),

     "add2": moment().add(10, 'days').format("DD"),

     "add3": moment().add(10, 'days').format("YYYY-MM-DD"),

     

    },

    {"key": "#12",

     "add": moment().add(11, 'days').format('ddd'),

     "add2": moment().add(11, 'days').format("DD"),

     "add3": moment().add(11, 'days').format("YYYY-MM-DD"),

     

    },

    {"key": "#13",

     "add": moment().add(12, 'days').format('ddd'),

     "add2": moment().add(12, 'days').format("DD"),

     "add3": moment().add(12, 'days').format("YYYY-MM-DD"),

     

    },

    




  ],

     }
  }

   showLoading() {
        this.setState({loading: true})
       }

        hideLoading() {
        this.setState({loading: false})
       }  



  componentDidMount() {
      

      // var currentDate = moment().format("YYYY-MM-DD");
      // var whole = moment().format('LLLL');
      // var day = moment().format('dddd');
      // var one = moment().add(1, 'days').format("DD");
      //  var nxt = moment().add(2, 'days').format('ddd');
         // var newday = moment().add(6, 'days').format("YYYY-MM-DD");
          // alert(JSON.stringify(GLOBAL.shop_id))
  }

  renderItem=({item, index}) => {
        // alert(JSON.stringify(item.add))
    return(

<View>




<TouchableOpacity style={{height:74,width:74,borderRadius:6,marginLeft:10,marginTop:15,backgroundColor:'white',elevation:3}}
 onPress={()=>this.setValue(item.add2, item.add3)}>


 
 <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'black',marginTop:8,alignSelf:'center'}}>{item.add}</Text>

 <Text style={{fontSize:20,fontFamily:'Poppins-SemiBold',color:'black',alignSelf:'center'}}>{item.add2}</Text>




  


  
</TouchableOpacity>

 

 

 </View>

)
}

setValue=(add2, add3)=> {

   // alert(JSON.stringify(add3))
   GLOBAL.date = add3

   if (GLOBAL.shop_id==0) {
     const url = GLOBAL.BASE_URL +  'time_slots'

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
              
              "date": add3,
              "shop_id": ''
              
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
            // alert(JSON.stringify(responseData))

    this.hideLoading()
    if (responseData.status == true ) { 


        

          // alert(JSON.stringify(responseData))

        this.setState({ FlatListItems2:responseData.slots })

         // alert(JSON.stringify(this.state.FlatListItems2))

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
 
 else{
  const url = GLOBAL.BASE_URL +  'time_slots'

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
              
              "date": add3,
              "shop_id": GLOBAL.shop_id
              
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
            // alert(JSON.stringify(responseData))

    this.hideLoading()
    if (responseData.status == true ) { 


        

          // alert(JSON.stringify(responseData))

        this.setState({ FlatListItems2:responseData.slots })

         // alert(JSON.stringify(this.state.FlatListItems2))

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
   

}


_keyExtractor=(item, index)=>item.key;

setaddress=()=>{
    alert('select atleast one time slot')
  }


renderItem2=({item, index}) => {
      // alert(JSON.stringify(item))
    return(

<View>




<TouchableOpacity style={{height:74,width:74,borderRadius:6,marginLeft:10,marginTop:15,backgroundColor:'white',elevation:3,marginBottom:15}}
 onPress={()=>this.setValueAgain(item)}>


 
 <Text style={{fontSize:18,fontFamily:'Poppins-SemiBold',color:'black',marginTop:8,alignSelf:'center',width:'80%',textAlign:'center'}}>{item}</Text>

 




  


  
</TouchableOpacity>

 

 

 </View>

)
}

 _keyExtractor2=(item, index)=>item.key;

 setValueAgain=(item)=>{
    GLOBAL.time = item
   
    this.setState({imgchange: 1})
    alert('time slot booked pay now')
 }

  render() {
    return(
          
          <SafeAreaProvider style={{backgroundColor:'#e3e3e3'}}>
                   
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
                          AppointScreen
              
          


                       </Text>


                    </View>


                    <View style={{flex:1,backgroundColor:'#e3e3e3'}}>

                    <Text style={{fontSize:15,fontFamily:'Poppins-SemiBold',color:'#00000066',marginLeft:15,marginTop:20}}>When would you like your services?</Text>

                    <Text style={{fontSize:20,fontFamily:'Poppins-SemiBold',color:'black',alignSelf:'center',marginTop:12}}>{moment().format("MMM")}</Text>
                    
                    <View style={{height:100}}>
                    <FlatList  
                       data={this.state.FlatListItems}
                       horizontal={true}
                       showsHorizontalScrollIndicator={false}
                       keyExtractor={this._keyExtractor}
                       renderItem={this.renderItem}
                    />

                    </View>

                  <Text style={{fontSize:15,fontFamily:'Poppins-SemiBold',color:'#00000066',marginLeft:15,marginTop:20}}>At what time should the professional arrive?</Text>
                    
                    <View style={{height:'auto'}}>
                    <FlatList  
                       data={this.state.FlatListItems2}
                       horizontal={true}
                       showsHorizontalScrollIndicator={false}
                       keyExtractor={this._keyExtractor2}
                       renderItem={this.renderItem2}
                    />

                    </View>

                  </View>

                  {this.state.imgchange==0 && (

                    <View style = {{height:80,backgroundColor:'#e3e3e3',flexDirection:'row',width:'100%',alignItems:'center',elevation:2}}>
                        


                        

                    <TouchableOpacity style={{height:54,width:'92%',backgroundColor:'#00000066',borderRadius:27,marginLeft:'4%',justifyContent
                    :'center'}} onPress={()=>this.setaddress()}>
                       
                       
                       <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'white',alignSelf:'center'}}>Pay Now</Text>
                       
                       

                    </TouchableOpacity>   


                        

                        

                    </View>

                    )}


                    {this.state.imgchange==1 && (

                       <View style = {{height:80,backgroundColor:'#e3e3e3',flexDirection:'row',width:'100%',alignItems:'center',elevation:2}}>
                        


                        

                    <TouchableOpacity style={{height:54,width:'92%',backgroundColor:'black',borderRadius:27,marginLeft:'4%',justifyContent
                    :'center'}} onPress={()=>this.props.navigation.navigate('PaymentScreen')}>
                       
                       
                       <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'white',alignSelf:'center'}}>Pay Now</Text>
                       
                       

                    </TouchableOpacity>   


                        

                        

                    </View>

                     )}

                  </SafeAreaProvider>  
      );
  }
}


 export default AppointScreen;