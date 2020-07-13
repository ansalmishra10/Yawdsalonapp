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
                            Invite Friends
                        </Text>


                        

                    </View>

                  <View style={{flex:1,backgroundColor:'white'}}>

         <MaterialTabs
                items={['INVITE FRIENDS', 'FAQ']}
                selectedIndex={this.state.selectedTab}
                onChange={(index)=>this.showData(index)}
                barColor="black"
                indicatorColor="white"
                activeTextColor="white"
                inactiveTextColor="rgba(255,255,255,0.5)"
              />
        {this.state.selectedTab == 0 &&  (
          <View style={{flex:1,backgroundColor:'white'}}>
           <ScrollView>
              <ImageBackground source={require('./invite.png')}
               style={{height:250,width:'100%',resizeMode:'cover'}}>
                 <Text style={{fontSize:20,fontFamily:'Poppins-Medium',color:'white',marginTop:'36%',width:'82%',alignSelf:'center'}}>Invite a friend and get SGDO off</Text>
                 <Text style={{fontSize:20,fontFamily:'Poppins-Medium',color:'white',width:'82%',alignSelf:'center',textAlign:'center',marginTop:-4}}>after they make a booking</Text>
                 <Text style={{fontSize:14,fontFamily:'Poppins-SemiBold',color:'white',alignSelf:'center',textAlign:'center',marginTop:12}}>Terms and Conditions</Text>
              </ImageBackground> 

              <TouchableOpacity style={{marginTop:25,alignSelf:'center',width:'90%',height:50,borderRadius:25,justifyContent:'center',backgroundColor:'black'}}
                 onPress={()=>this.props.navigation.navigate('BookServices')}>


                   <Text style={{fontSize:16,color:'#ffffff',fontFamily:'Poppins-Medium',alignSelf:'center'}}>
                      Invite Friends
                    </Text>

                   

                </TouchableOpacity>

                <View style={{flexDirection:'row',width:'90%',alignItems:'center',justifyContent:'space-between',alignSelf:'center',marginTop:22}}>
                   <View style={{height:1,width:'42%',backgroundColor:'#e3e3e3'}}>
                   </View>

                   <Text style={{fontSize:18,fontFamily:'Poppins-SemiBold',color:'black'}}>or</Text>

                   <View style={{height:1,width:'42%',backgroundColor:'#e3e3e3'}}>
                   </View>
                </View>

                <TouchableOpacity style={{flexDirection:'row',height:60,width:'90%',alignItems:'center',marginLeft:'5%',marginTop:22,elevation:3,marginBottom:10,borderRadius:4,backgroundColor:'white'}}>

                 
                 
                 <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'black',textAlign:'center',marginLeft:'27%'}}>SHARE YOUR LINK</Text>
                
                 <Image source={require('./share1.png')}
                  style={{height:25,width:25,resizeMode:'contain',marginLeft:'18%'}}/>

                </TouchableOpacity>


           </ScrollView>
          </View> 
        )}

        {this.state.selectedTab==1 &&(
           <View style={{flex:1,backgroundColor:'white'}}>
           <ScrollView>
            <Text style={{fontSize:16,fontFamily:'Poppins-Bold',color:'black',marginLeft:'5%',marginTop:20,width:'90%'}}>How does it work?</Text>
            <Text style={{fontSize:12,fontFamily:'Poppins-Medium',color:'#00000099',marginLeft:'5%',marginTop:13,width:'90%'}}>Yawd being a salon aggregator ensures you to provide all the beauty services at your doorstep only by the salons situated near you also for few services which are difficult to accomplish at your home, yawd helps you to get the right salon, with right pricing to avail it in the salon near you at your preffered time</Text>
           
            <Text style={{fontSize:16,fontFamily:'Poppins-Bold',color:'black',marginLeft:'5%',marginTop:50,width:'90%'}}>How can i invite friends?</Text>
            <Text style={{fontSize:12,fontFamily:'Poppins-Medium',color:'#00000099',marginLeft:'5%',marginTop:13,width:'90%'}}>It's quick and easy, you can refer your friend in few simple steps:</Text>
            <Text style={{fontSize:12,fontFamily:'Poppins-Medium',color:'#00000099',marginLeft:'5%',marginTop:13,width:'90%'}}>1. Sign into "yawd" app</Text>
            <Text style={{fontSize:12,fontFamily:'Poppins-Medium',color:'#00000099',marginLeft:'5%',marginTop:13,width:'90%'}}>2. Go to "My Account" button on the top right-hand corner and click onto the respective option, i.e. - Invite Friend</Text>
            <Text style={{fontSize:12,fontFamily:'Poppins-Medium',color:'#00000099',marginLeft:'5%',marginTop:13,width:'90%'}}>3. Their you can invite your friend via SMS or y sharing the link.</Text>

            <Text style={{fontSize:16,fontFamily:'Poppins-Bold',color:'black',marginLeft:'5%',marginTop:50,width:'90%'}}>What are the benifits of referring a friend?</Text>
            <Text style={{fontSize:12,fontFamily:'Poppins-Medium',color:'#00000099',marginLeft:'5%',marginTop:13,width:'90%'}}>With our "Invite friend" Offer we get an opportunity to increase the brand awareness and to serve more. More than that you being a referrer earns Rs. 50 in your wallet for every friend who registers and completes their first order with yawd and also your friend earns Rs 50 in his wallet after being referred by you.</Text>
           </ScrollView>
          </View>
         )}
                  </View>

                  </SafeAreaProvider> 

      );
   }
 }


 export default InviteScreen;