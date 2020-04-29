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
  Dimensions
  } from 'react-native';
import React, {Component} from 'react';


import LinearGradient from 'react-native-linear-gradient';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Stars from 'react-native-stars';

class HaircutScreen extends React.Component {
  constructor(props) {
    super(props);

     this.state={
       FlatListItems: [
    {"key": "#1",
     "add": "Men's haircut from ₹100",
     "add2": "FINDER by COVO",
     "add3": "C-6/62, Sec-18, Rohini, Delhi-110085",
     "add4": "5",
     "add5": "16",
     "add6": "PROMOTIONS",
     "image": require('./haircut1.png'),
    },
    {"key": "#2",
     "add": "Men's haircut from ₹200",
     "add2": "FINDER by COVO",
     "add3": "C-6/62, Sec-18, Rohini, Delhi-110085",
     "add4": "5",
     "add5": "20",
     "add6": "PROMOTIONS",
     "image": require('./haircut2.png'),
    },
    
    


  ],
}
  }


    renderItem=({item }) => {

 

return(

<View>

   <TouchableOpacity style={{margin:'3%',width:'94%'}}>

     <View style={{flexDirection:'column',width:'100%',height:395,backgroundColor:'white',borderRadius:8,elevation:2}}>


        <ImageBackground  source={item.image} imageStyle={{borderTopLeftRadius:8,borderTopRightRadius:8}}
         style={{width:'100%',height:240,resizeMode:'cover'}}>

           <View style={{height:54,width:'100%',backgroundColor:'rgba(0,0,0,0.6)',marginTop:186,justifyContent:'center'}}>
            <Text style={{fontSize:15,fontFamily:'Poppins-Medium',color:'white',marginLeft:18}}>{item.add}</Text>
           </View>
        

        </ImageBackground>



        <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'black',marginTop:12,marginLeft:18}}>{item.add2}</Text>

        <Text style={{fontSize:14,fontFamily:'Poppins-Medium',color:'black',marginLeft:'5%',marginTop:5,width:'90%'}}>{item.add3}</Text>

         <View style={{flexDirection:'row',marginLeft:15,marginTop:5,alignItems:'center',height:30}}>

         <Stars
              default={item.add4}
              count={5}
              half={true}
              spacing={8}
              starSize={20}
              fullStar={require('./fullstar.png')}
              emptyStar={require('./emptystar.png')}
              halfStar={require('./halfstar.png')}
               />

            <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'black',marginLeft:5,marginTop:5}}>({item.add5})</Text>   

         </View>

         <LinearGradient
                     start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                     colors={['#F80E94','#FF69B4' ]}
                     style={{height:30,width:130,borderRadius:15,justifyContent:'center',marginTop:8,marginLeft:18}}>
                     <Text style={{fontSize:13,color:'#ffffff',fontFamily:'Poppins-Medium',alignSelf:'center',backgroundColor: 'transparent'}}>
                      {item.add6}
                     </Text>
        </LinearGradient>


     </View>




  </TouchableOpacity>


  </View>



 );
}


_keyExtractor=(item, index)=>item.key;


  render() {
   return(
        
         <SafeAreaProvider>
                   <StatusBar backgroundColor="black" barStyle="light-content" />

                 <View style = {{height:65,backgroundColor:'white',flexDirection:'row',width:'100%',alignItems:'center',elevation:3,shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0}}>
                        <View>
                        <TouchableOpacity style={{marginLeft:20}}     onPress= {()=>this.props.navigation.goBack()}>
                            <Image
                                source={require('./back.png')}
                                style={{width: 24, height: 20,resizeMode:'contain'}}


                            />
                            
                        </TouchableOpacity>
                        </View>


                        <Text style = {{color:'black',fontFamily:'Poppins-Medium',fontSize:20,marginLeft:20,width:'72%'}}>Men Haircut</Text>


                        <TouchableOpacity>
                          <Image source={require('./sort.png')}   
                           style={{height:25,width:25,resizeMode:'contain'}}/>
                        </TouchableOpacity>

                    </View>

                  <View style={{flex:1,backgroundColor:'#e3e3e3'}}>
                     <View style={{height:65,width:'100%',alignItems:'center',justifyContent:'space-between',flexDirection:'row',backgroundColor:'white',marginTop:1}}>

                          <Image source={require('./location.png')}
                           style={{height:25,width:22,resizeMode:'contain',marginLeft:'5%'}}/>

                           <View style={{flexDirection:'column',width:'60%',height:54,marginLeft:12}}>
                            <Text style={{fontSize:14,fontFamily:'Poppins-Medium',color:'#00000066'}}>Your current Location:</Text>
                            <Text style={{fontSize:17,fontFamily:'Poppins-Medium',color:'black',marginTop:8}}>New delhi</Text>

                           </View>

                          <TouchableOpacity style={{marginRight:'5%'}}>
                          <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'#FF69B4'}}>Change</Text>
                          </TouchableOpacity>
                     </View>

          <View style={{width:Dimensions.get('window').width,marginBottom:80}}>
            <FlatList  contentContainerStyle={{width:'100%'}}
             data={this.state.FlatListItems}
             showsHorizontalScrollIndicator={false}
             keyExtractor={this._keyExtractor}
             renderItem={this.renderItem}
              />
          </View>
                  </View>

          </SafeAreaProvider>
    ); 
  }
}


export default HaircutScreen;