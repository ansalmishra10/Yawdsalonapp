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




  } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import React, {Component} from 'react';
import Button from 'react-native-button';
const GLOBAL = require('./Global');
import { SafeAreaProvider } from 'react-native-safe-area-context';


class SupportScreen extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
      request:'',
     } 
  }

  onCall=()=> {


     
       Linking.openURL(`tel:${'+91 987654321'}`)
     

  };

  onEmail=()=> {
     Linking.openURL('mailto:support@gym.in');
      
  }

  submitRequest=()=> {

     if (this.state.request=='') {
      alert('Enter a request')
     }

     else {
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
              "subject":"YAWD Support",
              "message": this.state.request
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             
             this.hideLoading()

               
                
                
                      
                       alert(JSON.stringify(responseData.message))
                     
                     

                       

                   })

      .catch((error) =>{
        console.error(error);
      })
     }
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


                        <Text style = {{color:'white',fontFamily:'Exo2-Bold',fontSize: 20,marginLeft:18}}>
                             Support
                        </Text>


                        

                    </View>

                      


                      
            <KeyboardAwareScrollView keyboardShouldPersistTaps='always' style={{height:'100%',backgroundColor:'white'}}>
                       
                 
            <ImageBackground source={require('./coverlogo.png')}
                     style={{height:300,width: Dimensions.get('window').width,resizeMode:'contain'}}>


                   <Text style={{fontSize:18,fontFamily:'Poppins-SemiBold',color:'black',marginTop:'55%',marginLeft:18,width:'55%'}}>We would love to hear from you.</Text> 

            </ImageBackground> 

        <View style={{width:'88%',height:140,borderWidth:1,borderColor:'black',borderRadius:6,alignSelf:'center',backgroundColor:'white',marginTop:15}}>
              <TextInput
         style={{width:'100%',height:120,fontSize:16,color:'black',fontFamily:'Poppins-Medium'}}
         placeholder="We want to know how we can improve your experience on YAWD. Please leave your feedback here."
         placeholderTextColor="#0000004D"
         multiline={true}
         textAlignVertical={'top'}
         
         onChangeText={(text) => this.setState({request: text })}
         value={this.state.request}
         />
            </View>        

          
                        


                        

                       


                        

                        
                 <TouchableOpacity style={{height:50,width:'90%',backgroundColor:'black',borderRadius:25,marginLeft:'5%',justifyContent:'center',marginTop:'60%',marginBottom:30}}
                  onPress={()=>this.submitRequest()}>
                       
                       
                       <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'white',alignSelf:'center'}}>Send</Text>
                       
                       

                    </TouchableOpacity>
                

         </KeyboardAwareScrollView>

         
         
        </SafeAreaProvider>
    );
  }
}

export default SupportScreen;
const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor :'white',

    },
    containers: {

        backgroundColor :'white'
    },
    AndroidSafeArea: {
       flex: 0,
       backgroundColor:'black',
       paddingTop: Platform.OS === "android" ? 0 : 0
   },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },

})