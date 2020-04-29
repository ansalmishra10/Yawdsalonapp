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




  } from 'react-native';

import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MaterialTabs from 'react-native-material-tabs';

 class InviteScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={

      selectedTab:0,
    }

  }


  showData=(index)=>{

     this.setState({selectedTab:index})

   }

  render() {
    return(
             <SafeAreaProvider>
                   <StatusBar backgroundColor="black" barStyle="light-content" />

                 <LinearGradient
                     start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                     colors={['#F80E94','#FF69B4' ]}
                     style={{height:65,flexDirection:'row',width:'100%',alignItems:'center',elevation:3}}>
                     <View>
                        <TouchableOpacity style={{marginLeft:20}}     onPress= {()=>this.props.navigation.goBack()}>
                            <Image
                                source={require('./back2.png')}
                                style={{width: 24, height: 20,resizeMode:'contain'}}


                            />
                            
                        </TouchableOpacity>
                        </View>


                        <Text style = {{color:'white',fontFamily:'Poppins-Medium',fontSize: 20,marginLeft:20}}>
                           Invite Friends
                        </Text>
                  </LinearGradient> 

                  <View style={{flex:1,backgroundColor:'white'}}>

         <MaterialTabs
                items={['INVITE FRIENDS', 'FAQ']}
                selectedIndex={this.state.selectedTab}
                onChange={(index)=>this.showData(index)}
                barColor="#FF69B4"
                indicatorColor="white"
                activeTextColor="white"
                inactiveTextColor="rgba(255,255,255,0.5)"
              />
        {this.state.selectedTab == 0 &&  (
          <View style={{flex:1,backgroundColor:'white'}}>
           <ScrollView>
              <ImageBackground source={require('./invite.png')}
               style={{height:250,width:'100%',resizeMode:'cover'}}>
                 <Text style={{fontSize:20,fontFamily:'Poppins-Medium',color:'white',marginTop:135,width:'82%',alignSelf:'center'}}>Invite a friend and get SGDO off</Text>
                 <Text style={{fontSize:20,fontFamily:'Poppins-Medium',color:'white',width:'82%',alignSelf:'center',textAlign:'center',marginTop:-4}}>after they make a booking</Text>
                 <Text style={{fontSize:14,fontFamily:'Poppins-Medium',color:'#FF69B4',alignSelf:'center',textAlign:'center',marginTop:12}}>Terms and Conditions</Text>
              </ImageBackground> 

              <TouchableOpacity style={{marginTop:25,alignSelf:'center',width:'90%'}}
                 onPress={()=>this.props.navigation.navigate('BookServices')}>


      

                   <LinearGradient
                     start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                     colors={['#F80E94','#FF69B4' ]}
                     style={{height:54,width:'100%',borderRadius:27,justifyContent:'center'}}>
                     <Text style={{fontSize:18,color:'#ffffff',fontFamily:'Poppins-Medium',alignSelf:'center',backgroundColor: 'transparent'}}>
                      Invite Friends
                     </Text>
                  </LinearGradient>

                </TouchableOpacity>

                <View style={{flexDirection:'row',width:'90%',alignItems:'center',justifyContent:'space-between',alignSelf:'center',marginTop:22}}>
                   <View style={{height:1,width:'42%',backgroundColor:'#e3e3e3'}}>
                   </View>

                   <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'black'}}>or</Text>

                   <View style={{height:1,width:'42%',backgroundColor:'#e3e3e3'}}>
                   </View>
                </View>

                <View style={{flexDirection:'row',height:60,width:'90%',alignItems:'center',marginLeft:'5%',marginTop:22,borderWidth:1,borderColor:'#e3e3e3'}}>

                 
                 
                 <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'black',textAlign:'center',marginLeft:'27%'}}>SHARE YOUR LINK</Text>
                
                 <Image source={require('./share.png')}
                  style={{height:25,width:25,resizeMode:'contain',marginLeft:'18%'}}/>

                </View>


           </ScrollView>
          </View> 
        )}

        {this.state.selectedTab==1 &&(
           <View style={{flex:1,backgroundColor:'white'}}>
           <ScrollView>
            <Text>hey</Text>
           </ScrollView>
          </View>
         )}
                  </View>

                  </SafeAreaProvider> 

      );
   }
 }


 export default InviteScreen;