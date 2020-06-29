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

class Appointment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
       selectedTab:0,
       loading:'',
       Flatlistitems:[],
       Flatlistitems2:[],

    }
  }


  showData=(index)=>{

  this.setState({selectedTab:index})
  

}

showLoading() {
        this.setState({loading: true})
       }

        hideLoading() {
        this.setState({loading: false})
       }

       deletedata=(booking_id)=> {

        const url = GLOBAL.BASE_URL +  'delete_project'

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
              "booking_id": booking_id
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             


                // alert(JSON.stringify(responseData))
                alert('Successfully Deleted')
                this.getData()
             

    this.hideLoading()
            

           
      })
      .catch((error) =>{
        console.error(error);
      })

       }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
     this.getData()
   })
    
  }



  getData=()=> {

       // alert(JSON.stringify(GLOBAL.user_id))

         const url = GLOBAL.BASE_URL +  'jobs'

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
              "user_id": GLOBAL.user_id
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             


                 // alert(JSON.stringify(responseData.ongoing))
                 this.setState({Flatlistitems2: responseData.ongoing})
                this.setState({Flatlistitems: responseData.past})
             

    this.hideLoading()
            

           
      })
      .catch((error) =>{
        console.error(error);
      })
   }

   renderItem=({item}) => {
       // alert(JSON.stringify())
       var res = item.orders
        
    return(

<View>




<TouchableOpacity style={{height:'auto',width:'94%',borderRadius:6,marginTop:10,marginBottom:5,marginLeft:'3%',backgroundColor:'white',elevation:3}}
 onPress={()=>this.setValue(item)}>


 
   <View style={{width:'92%',marginLeft:'4%',flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:15}}>
   <Text style={{fontSize:20,fontFamily:'Poppins-SemiBold',color:'black'}}>#{item.booking_id}</Text>

   <View style={{height:30,width:'auto',borderRadius:15,backgroundColor:'black',justifyContent:'center'}}>
     <Text style={{fontSize:11,fontFamily:'Poppins-SemiBold',color:'white',marginLeft:12,marginRight:12}}>{item.job_status}</Text>
        </View>
   </View>

   <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'#00000066',marginLeft:'4%',marginTop:10}}>{item.appointment_date} at {item.appointment_time}</Text>


   <View style={{height:1,width:'92%',marginLeft:'4%',backgroundColor:'#e3e3e3',marginTop:10}}>
   </View>
    
    <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'black',alignSelf:'center',marginTop:12}}>{item.booking_msg}</Text>
  
   <View style={{height:1,width:'92%',marginLeft:'4%',backgroundColor:'#e3e3e3',marginTop:12}}>
   </View>

   <TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginTop:15,marginBottom:15,alignSelf:'center',width:'42%'}}
    onPress={()=>this.deletedata(item.booking_id)}>

   <Image source={require('./delete.png')}
    style={{height:22,width:22,resizeMode:'contain',marginLeft:5}}/>

    <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'#00000066',marginTop:3,marginLeft:5}}>Delete Project</Text>
   </TouchableOpacity>



  
</TouchableOpacity>

 

 

 </View>

)
}

  setValue=(item)=>{
      GLOBAL.booking = item
      this.props.navigation.navigate('DetailScreen')
  }

_keyExtractor=(item, index)=>item.key;


renderItem2=({item}) => {
       // alert(JSON.stringify())
       var res = item.orders
        
    return(

<View>




<TouchableOpacity style={{height:'auto',width:'94%',borderRadius:6,marginTop:10,marginBottom:5,marginLeft:'3%',backgroundColor:'white',elevation:3}}
 onPress={()=>this.setValue(item)}>


 
   <View style={{width:'92%',marginLeft:'4%',flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:15}}>
   <Text style={{fontSize:20,fontFamily:'Poppins-SemiBold',color:'black'}}>#{item.booking_id}</Text>

   <View style={{height:30,width:'auto',borderRadius:15,backgroundColor:'black',justifyContent:'center'}}>
     <Text style={{fontSize:11,fontFamily:'Poppins-SemiBold',color:'white',marginLeft:12,marginRight:12}}>{item.job_status}</Text>
        </View>
   </View>

   <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'#00000066',marginLeft:'4%',marginTop:10}}>{item.appointment_date} at {item.appointment_time}</Text>


   <View style={{height:1,width:'92%',marginLeft:'4%',backgroundColor:'#e3e3e3',marginTop:10}}>
   </View>
    
    <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'black',alignSelf:'center',marginTop:12,width:'90%'}}>{item.booking_msg}</Text>
  
   <View style={{height:1,width:'92%',marginLeft:'4%',backgroundColor:'#e3e3e3',marginTop:12}}>
   </View>

   <TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginTop:15,marginBottom:15,alignSelf:'center',width:'42%'}}
    onPress={()=>this.deletedata(item.booking_id)}>

   <Image source={require('./delete.png')}
    style={{height:22,width:22,resizeMode:'contain',marginLeft:5}}/>

    <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'#00000066',marginTop:3,marginLeft:5}}>Delete Project</Text>
   </TouchableOpacity>



  
</TouchableOpacity>

 

 

 </View>

)
}

_keyExtractor2=(item, index)=>item.key;

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

                      <View style = {{height:70,backgroundColor:'black',flexDirection:'row',width:'100%',alignItems:'center'}}>
                        <View>
                        <TouchableOpacity onPress= {()=>this.props.navigation.goBack()}>
                            <Image
                                source={require('./back2.png')}
                                style={{width: 25, height: 28,marginLeft:18,resizeMode:'contain'}}


                            />
                        </TouchableOpacity>
                        </View>


                        <Text style={{fontSize:13,fontFamily:'Poppins-Medium',color:'white',width:'80%',marginLeft:15}}>{GLOBAL.house}</Text>


                        

                    
                       


                        

                        

                    </View>

                    <ScrollView style={{backgroundColor:'#e3e3e3'}}>
         
         <View style={{marginTop:1}}>
                    <MaterialTabs 
        items={['ONGOING', 'HISTORY']}
        selectedIndex={this.state.selectedTab}
        onChange={(index)=>this.showData(index)}
        barColor="black"
        indicatorColor="white"
        activeTextColor="white"
        inactiveTextColor="#e3e3e3"
      />
{this.state.selectedTab == 0 &&  (
  
<View style={{height:'100%',backgroundColor:'#e3e3e3'}}>

  <FlatList style={{marginTop:5,marginBottom:10}}
                       data={this.state.Flatlistitems2}
                       
                       showsVerticalScrollIndicator={false}
                       keyExtractor={this._keyExtractor2}
                       renderItem={this.renderItem2}
              />
</View>

)}
{this.state.selectedTab!=0 &&(

  <View style={{height:'100%',backgroundColor:'#e3e3e3'}}>

  <FlatList style={{marginTop:5,marginBottom:10}}
                       data={this.state.Flatlistitems}
                       
                       showsVerticalScrollIndicator={false}
                       keyExtractor={this._keyExtractor}
                       renderItem={this.renderItem}
              />
</View>


)}

</View>

                    

                  </ScrollView>

                </SafeAreaProvider> 

        );
      }
    }

    export default Appointment;