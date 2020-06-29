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
  Modal,
  ActivityIndicator,

  } from 'react-native';
import React, {Component} from 'react';


import LinearGradient from 'react-native-linear-gradient';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import {fetch, removeCookieByName} from 'react-native-ssl-pinning';
const GLOBAL = require('./Global');
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import MaterialTabs from 'react-native-material-tabs';


var radio_props = [
        {label: 'Placed the request by mistake', value:0},
        {label: 'Hired someone else outside YAWD', value:1},
        {label: 'Want the service at some other time', value:2},
        {label: 'Did not get the service provider details', value:3},
        {label: 'Prices are high', value:4},
        {label: 'Others', value:5}
        ];


class DetailScreen extends React.Component {
  constructor(props) {
    super(props);

     this.state={
      
      value:0,
      modalVisible: false,
      loading:'',
      text:'',
        
}
  }

  showLoading() {
        this.setState({loading: true})
       }

        hideLoading() {
        this.setState({loading: false})
       }

  setModalVisible=()=> {
  this.setState({modalVisible: true})
}

setModalVisible2=()=> {
  this.setState({modalVisible: false})
}

  componentDidMount(){
     // alert(JSON.stringify(GLOBAL.booking.job_status))
  }

  

  newMessage=()=>{
    if (GLOBAL.booking.job_status=='Accepted' || GLOBAL.booking.job_status=='Rescheduled' ) {
      this.props.navigation.navigate('AgainScreen')
    }
    else {
      alert('Cancelled booking can not be resheduled')
    }
  }

  newMessage2=()=>{
     if (GLOBAL.booking.job_status=='Accepted' || GLOBAL.booking.job_status=='Rescheduled' ) {
      this.setModalVisible()
    }
    else {
      alert('Booking is already Cancelled')
    }
  }

  
  submitAnswer=()=>{
    alert(this.state.value)

     if(this.state.value==0){
       this.setState({ text: 'Placed the request by mistake'})
     }

     else if(this.state.value==1){
       this.setState({ text: 'Hired someone else outside YAWD'})
     }

     else if(this.state.value==2){
       this.setState({ text: 'Want the service at some other time'})
     }

     else if(this.state.value==3){
       this.setState({ text: 'Did not get the service provider details'})
     }

     else if(this.state.value==4){
       this.setState({ text: 'Prices are high'})
     }

     else if(this.state.value==5){
       this.setState({ text: 'Others'})
     }

      const url = GLOBAL.BASE_URL +  'cancel_booking'

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
              "booking_id": GLOBAL.booking.booking_id,
              "cancel_reason":this.state.text,
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             


                 alert(JSON.stringify(responseData))
                 this.props.navigation.navigate('Appointment')
               
               this.setModalVisible2()
             

              

    this.hideLoading()
            

           
      })
      .catch((error) =>{
        console.error(error);
      })
  }

  render() {
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


                        <Text style = {{color:'white',fontFamily:'Poppins-SemiBold',fontSize: 18,marginLeft:18}}>
                           Appointment Confirm
                        </Text>


                        

                    
                       


                        

                        

                    </View>

                    <ScrollView style={{backgroundColor:'#e3e3e3'}}>
                      
                      <View style={{height:76,width:'100%',backgroundColor:'white',elevation:3,justifyContent:'center'}}>

                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'92%',marginLeft:'4%'}}>
                        <TouchableOpacity style={{flexDirection:'row',height:40,width:'auto',borderRadius:4,alignItems:'center',backgroundColor:'white',elevation:4}}
                         onPress={()=>this.props.navigation.navigate('ViewScreen')}>
                         <Image source={require('./detail.png')}
                          style={{height:18,width:18,resizeMode:'contain',marginLeft:12}}/>
                          <Text style={{fontSize:13,fontFamily:'Poppins-Medium',color:'black',marginLeft:6,marginRight:12,marginTop:2}}>View Details</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{flexDirection:'row',height:40,width:'auto',borderRadius:4,alignItems:'center',backgroundColor:'white',elevation:4}}
                         onPress={()=>this.newMessage()}>
                         <Image source={require('./reshed.png')}
                          style={{height:18,width:18,resizeMode:'contain',marginLeft:12}}/>
                          <Text style={{fontSize:13,fontFamily:'Poppins-Medium',color:'black',marginLeft:6,marginRight:12,marginTop:2}}>Reshedule</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{flexDirection:'row',height:40,width:'auto',borderRadius:4,alignItems:'center',backgroundColor:'white',elevation:4}}
                         onPress={()=>this.newMessage2()}>
                         <Image source={require('./del.png')}
                          style={{height:18,width:18,resizeMode:'contain',marginLeft:12}}/>
                          <Text style={{fontSize:13,fontFamily:'Poppins-Medium',color:'black',marginLeft:6,marginRight:12,marginTop:2}}>Cancel</Text>
                        </TouchableOpacity>
                       </View>  
                      </View>


                      <View style={{height:'auto',width:'94%',marginLeft:'3%',borderRadius:6,backgroundColor:'white',elevation:3,marginTop:16}}>
                       <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'auto',alignSelf:'center',marginTop:20}}>
                         <Image source={require('./tick.png')}
                          style={{height:30,width:30,resizeMode:'contain'}}/>
                           
                        {GLOBAL.booking.status== 0 && (
                          <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'#008000',marginLeft:5}}>Appointment {GLOBAL.booking.job_status}</Text>
                        )}

                        {GLOBAL.booking.status != 0 && (
                          <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'#fe0000',marginLeft:5}}>Appointment {GLOBAL.booking.job_status}</Text>
                        )}
                       </View>

                       <View style={{height:1,width:'92%',alignSelf:'center',backgroundColor:'#e3e3e3',marginTop:20}}>
                       </View>

                       <Text style={{fontSize:20,fontFamily:'Poppins-Medium',color:'black',marginTop:20,alignSelf:'center',width:'90%'}}>{GLOBAL.booking.booking_msg}</Text>
                       
                       <View style={{height:1,width:'92%',alignSelf:'center',backgroundColor:'#e3e3e3',marginTop:20}}>

                       </View>

                       <Text style={{fontSize:15,fontFamily:'Poppins-Medium',color:'#00000066',marginTop:25,marginLeft:'5%'}}>Arrival time of your professional</Text>

                       <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'black',marginTop:4,marginLeft:'5%',marginBottom:20}}>{GLOBAL.booking.appointment_date} at {GLOBAL.booking.appointment_time}</Text>
                         



                       

                      </View>

                      <View style={{height:'auto',width:'94%',marginLeft:'3%',borderRadius:6,backgroundColor:'#e3ede4',elevation:3,marginTop:16}}>
                          
                          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:15,marginBottom:15}}>
                             <Text style={{fontSize:13,fontFamily:'Poppins-Medium',color:'black',width:'70%',marginLeft:15}}>Share this code with proffesional in-person only to start the job.</Text>
                             <Text style={{fontSize:34,fontFamily:'Poppins-Medium',color:'black',marginRight:18,marginTop:2}}>{GLOBAL.booking.start_job_otp}</Text>
                          </View>
                      </View>

                      <View style={{height:'auto',width:'94%',marginTop:15,marginBottom:15,elevation:3,borderRadius:4,marginLeft:'3%',backgroundColor:'white',flexDirection:'column'}}>

    <Text style={{fontSize:16, color:'black',marginLeft:12,marginTop:12,fontFamily:'Poppins-SemiBold'}}>Payment Summary</Text>
    <View
    style={{borderBottomColor: '#CCCCCC',borderBottomWidth: 1, marginTop:12,width:'94%',alignSelf:'center'}}>
    </View>
    <View style={{marginTop:12,flexDirection:'row',alignItems:'center',width:'92%',justifyContent:'space-between',alignSelf:'center'}}>
    <Text style={{fontSize:14,color:'black',fontFamily:'Poppins-Medium'}}>Booking Amount</Text>
    <Text style={{fontSize:14,color:'black',fontFamily:'Poppins-Medium'}}>₹ {GLOBAL.booking.total_amount}</Text>
    </View>
    <View
    style={{borderBottomColor: '#CCCCCC',borderBottomWidth: 1, marginTop:12,width:'94%',alignSelf:'center'}}>
    </View>
    <View style={{marginTop:12,flexDirection:'row',alignItems:'center',width:'92%',justifyContent:'space-between',alignSelf:'center'}}>
    <Text style={{fontSize:14,color:'black',fontFamily:'Poppins-Medium'}}>Discount</Text>
    <Text style={{fontSize:14,color:'black',fontFamily:'Poppins-Medium'}}>₹ 0</Text>
    </View>

    <View
    style={{borderBottomColor: '#CCCCCC',borderBottomWidth: 1, marginTop:12,width:'94%',alignSelf:'center'}}>
    </View>

    <View style={{marginTop:12,flexDirection:'row',alignItems:'center',width:'92%',justifyContent:'space-between',alignSelf:'center'}}>
    <Text style={{fontSize:14,color:'black',fontFamily:'Poppins-Medium'}}>Sub total</Text>
    <Text style={{fontSize:14,color:'black',fontFamily:'Poppins-Medium'}}>₹ {GLOBAL.booking.total_amount}</Text>
    </View>

    <View
    style={{borderBottomColor: '#CCCCCC',borderBottomWidth: 1, marginTop:12,width:'94%',alignSelf:'center'}}>
    </View>

    <View style={{marginTop:12,flexDirection:'row',alignItems:'center',width:'92%',justifyContent:'space-between',alignSelf:'center',marginBottom:12}}>
    <Text style={{fontSize:16,color:'black',fontFamily:'Poppins-SemiBold'}}>Amount to be paid</Text>
    <Text style={{fontSize:16,color:'black',fontFamily:'Poppins-SemiBold'}}>₹ {GLOBAL.booking.total_amount}</Text>
    </View>

  </View>

     
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
                                     width:320,borderRadius:10,backgroundColor: 'white',
                                     height: 450}}>
                                     <View style={{width: '95%', margin: 10}}>

                                     <Text style={{fontSize:18,fontFamily:'Poppins-SemiBold',color:'black',marginTop:8,marginLeft:10}}>Cancellation reason:</Text>
                                      
                                      <View style={{width:'70%',marginLeft:20,marginTop:5}}>
     
     <RadioForm
       radio_props={radio_props}
       initial={this.state.value}
       
       isSelected = {true}
       style={{marginLeft:'4%'}}
       radioStyle={{paddingTop:14}}
        onPress={(value) => {this.setState({value:value}) }}>
      <RadioButtonInput
        borderWidth={1}
        buttonInnerColor={'#0592CC'}
        buttonOuterColor={'#0592CC'}
        buttonSize={15}

        
        buttonOuterSize={20}
        buttonWrapStyle={{marginLeft:5}}


      />
    <RadioButtonLabel
        
        labelStyle={{fontSize:16,fontFamily:'Poppins-SemiBold',color: '#00000066'}}

      />
     </RadioForm>
     </View>
                                      
                                      <View style={{flexDirection:'row',alignItems:'center',marginTop:22,width:'60.6%',justifyContent:'space-between',alignSelf:'flex-end',marginRight:9}}>
                                      <TouchableOpacity style={{alignSelf:'flex-end',width:'auto',height:34,borderRadius:4,backgroundColor:'black',elevation:2,justifyContent:'center'}} onPress={()=>this.setModalVisible2()}>
                                       <Text style={{fontSize:14,fontFamily:'Poppins-SemiBold',color:'white',marginLeft:15,marginRight:15}}>DISMISS</Text>
                                      </TouchableOpacity>

                                      <TouchableOpacity style={{alignSelf:'flex-end',width:'auto',height:34,borderRadius:4,backgroundColor:'black',elevation:2,justifyContent:'center'}} onPress={()=>this.submitAnswer()}>
                                       <Text style={{fontSize:14,fontFamily:'Poppins-SemiBold',color:'white',marginLeft:15,marginRight:15}}>SUBMIT</Text>
                                      </TouchableOpacity>
                                       </View>

                                    

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

export default DetailScreen;