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
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const GLOBAL = require('./Global');


var radio_props = [
        {label: 'Mr', value:0},
        {label: 'Ms', value:1}
        ];





class AddAddress extends React.Component {
  constructor(props){
    super(props);


      this.state = {

        
        value:0,
        name:'',
        address:'',
        text:'',
        imageget1:0,
        imageget2:0,
        imageget3:0,
        
        loading:'',
        


        
      }

  }

  showLoading() {
        this.setState({loading: true})
       }

        hideLoading() {
        this.setState({loading: false})
       }

  onButtonClick1=()=> {
    this.setState({imageget1:1})
    this.setState({imageget2:0})
    this.setState({imageget3:0})
    this.setState({text:'home'})

  }

  onButtonClick2=()=> {
    this.setState({imageget1:0})
    this.setState({imageget2:1})
    this.setState({imageget3:0})
    this.setState({text:'Office'})
  }

  onButtonClick3=()=> {
    this.setState({imageget1:0})
    this.setState({imageget2:0})
    this.setState({imageget3:1})
    this.setState({text:'others'})
  }

  componentDidMount () {
    this.onButtonClick1()
   // alert(JSON.stringify(this.state.text))
  }


getRemoteData=()=> {

    // NetInfo.fetch().then(state => {
    //  if (state.isConnected == false){
    //    alert('Please connect to internet')
    //    return
    //  }
        // })

       // alert(JSON.stringify(GLOBAL.long)) 

     var gender =''
      if (this.state.value==0) {
         gender= 'Mr'
      }
      else if(this.state.value==1) {
         gender='Ms'
      }

       
     
     

      if (this.state.name == ''){
       alert('Please enter name')
     }

      if (this.state.address== ''){
       alert('Please enter your address')
     }
     
    
     else {
          
          const url = GLOBAL.BASE_URL +  'add_address'

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
              "type": gender,
              "name" : this.state.name,
              "appartment": this.state.address ,
              "location": GLOBAL.address,
              "latitude": GLOBAL.lat,
              "longitude":GLOBAL.long,
              "address_nickname":this.state.text,
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
            // alert(JSON.stringify(responseData))

    this.hideLoading()
    if (responseData.status == true ) { 


        

         // alert(JSON.stringify(responseData))

        

        // GLOBAL.user_id = responseData.user_id
         
         this.props.navigation.replace('AddScreen')
      
        // AsyncStorage.setItem('userID', responseData.user_id);
      
}  else {
 
  alert("Invalid Credentials")
}

           
      })
      .catch((error) =>{
        console.error(error);
      })
     
     }

  };

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
                          Add Address
              
          


                       </Text>


                    </View>


                    <KeyboardAwareScrollView style={{height:'100%',backgroundColor:'white'}}>
                        
                        <View style={{flexDirection:'column',marginTop:20}}>
     <RadioForm
       radio_props={radio_props}
       initial={this.state.value}
       formHorizontal={true}
       isSelected = {true}
       style={{marginLeft:'6%'}}
       radioStyle={{paddingRight: 30}}
        onPress={(value) => {this.setState({value:value}) }}>
      <RadioButtonInput
        borderWidth={1}
        buttonInnerColor={'#0592CC'}
        buttonOuterColor={'#0592CC'}
        buttonSize={25}

        
        buttonOuterSize={50}
        buttonWrapStyle={{marginLeft:5}}


      />
    <RadioButtonLabel
        
        labelStyle={{fontSize:16,fontFamily:'Poppins-Medium',color: '#00000066'}}

      />
     </RadioForm>

     </View>

      <View style={{justifyContent:'center',width:'90%',marginLeft:'5%',marginTop:20,borderWidth:2,borderColor:'black',borderRadius:6}}>

            

             <TextInput
             style={{fontSize:16,fontFamily:'Poppins-Medium',color:'black',width:'90%',marginLeft:8}}
             placeholder="Name"

             placeholderTextColor="#00000066"
             
             onChangeText={(text) => this.setState({name: text})}
             value={this.state.name}
             />
         </View>


          <View style={{justifyContent:'center',width:'90%',marginLeft:'5%',marginTop:35,borderWidth:2,borderColor:'black',borderRadius:6}}>

        

             <TextInput
             style={{fontSize:16,fontFamily:'Poppins-Medium',color:'black',width:'90%',marginLeft:8}}
             placeholder="House & Street"

             placeholderTextColor="#00000066"
            
             onChangeText={(text) => this.setState({address: text})}
             value={this.state.address}
             />
         </View>

         <TouchableOpacity style={{justifyContent:'center',width:'90%',marginLeft:'5%',marginTop:35,borderWidth:2,borderColor:'black',borderRadius:6}}
          onPress={()=>this.props.navigation.navigate('Map')}>

            {GLOBAL.address=='' && (
             
             <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'#00000066',marginLeft:8,width:'95%',marginTop:10,marginBottom:10}}>Locality</Text>


            )}

            {GLOBAL.address !='' && (

              <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'black',marginLeft:8,width:'95%',marginTop:10,marginBottom:10}}>{GLOBAL.address}</Text>

            )}


             
         </TouchableOpacity>

          <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'#000000CC',marginLeft:22,marginTop:20}}>Nickname for Address</Text>

           <View style={{flexDirection:'row',width:'90%',alignItems:'center',marginLeft:'5%',marginTop:15}}>
             
            {this.state.imageget1==0  && (
             <TouchableOpacity style={{height:30,borderRadius:15,backgroundColor:'white',borderWidth:2,borderColor:'black',justifyContent:'center'}}
              onPress={()=>this.onButtonClick1()}>
               <Text style={{fontSize:14,fontFamily:'Poppins-Medium',color:'black',marginLeft:15,marginRight:15}}>Home</Text>
             </TouchableOpacity>
             )}

            {this.state.imageget1==1  && (
               <TouchableOpacity style={{height:30,borderRadius:15,backgroundColor:'black',borderWidth:2,borderColor:'black',justifyContent:'center'}}>
               <Text style={{fontSize:14,fontFamily:'Poppins-Medium',color:'white',marginLeft:15,marginRight:15}}>Home</Text>
               </TouchableOpacity> 

             )}


             {this.state.imageget2==0  && (
             <TouchableOpacity style={{height:30,borderRadius:15,backgroundColor:'white',borderWidth:2,borderColor:'black',marginLeft:20,justifyContent:'center'}}
             onPress={()=>this.onButtonClick2()}>
               <Text style={{fontSize:14,fontFamily:'Poppins-Medium',color:'black',marginLeft:15,marginRight:15}}>Office</Text>
             </TouchableOpacity>

             )}

             {this.state.imageget2==1  && (
               <TouchableOpacity style={{height:30,borderRadius:15,backgroundColor:'black',borderWidth:2,borderColor:'black',marginLeft:20,justifyContent:'center'}}>
               <Text style={{fontSize:14,fontFamily:'Poppins-Medium',color:'white',marginLeft:15,marginRight:15}}>Office</Text>
               </TouchableOpacity> 

              )}
             
             {this.state.imageget3==0  && (
             <TouchableOpacity style={{height:30,borderRadius:15,backgroundColor:'white',borderWidth:2,borderColor:'black',marginLeft:20,justifyContent:'center'}}
              onPress={()=>this.onButtonClick3()}>
               <Text style={{fontSize:14,fontFamily:'Poppins-Medium',color:'black',marginLeft:15,marginRight:15}}>Others</Text>
             </TouchableOpacity>
             )}
             

             {this.state.imageget3==1  && (
                <TouchableOpacity style={{height:30,borderRadius:15,backgroundColor:'black',borderWidth:2,borderColor:'black',marginLeft:20,justifyContent:'center'}}>
               <Text style={{fontSize:14,fontFamily:'Poppins-Medium',color:'white',marginLeft:15,marginRight:15}}>Others</Text>
               </TouchableOpacity> 
              )}

           </View>

                     
              
             

                    </KeyboardAwareScrollView>

              <TouchableOpacity style={{height:50,width:'92%',backgroundColor:'black',borderRadius:27,alignSelf:'center',position:'absolute',bottom:15,justifyContent:'center'}}
                  onPress={()=>this.getRemoteData()}>
                       
                       
                       <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'white',alignSelf:'center'}}>Save</Text>
                       
                       

            </TouchableOpacity>


              </SafeAreaProvider>
      );
  }
}


export default AddAddress;