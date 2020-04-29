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
import Shimmer from 'react-native-shimmer';



class BookServices extends React.Component {
  constructor(props) {
    super(props);

     this.state={
       FlatListItems: [
    {"key": "#1",
     "add": "Platinum hair & beauty salon",
     "add2": "499",
     "image": require('./service1.png'),
    },
    {"key": "#2",
     "add": "Figaro's unisex salon",
     "add2": "599",
     "image": require('./service2.png'),
    },
    {"key": "#3",
     "add": "Aquarious unisex salon",
     "add2": "450",
     "image": require('./service3.png'),
    },
    {"key": "#4",
     "add": "Hermione beauty salon",
     "add2": "550",
     "image": require('./service4.png'),
    },
    


  ],
}
  }



  renderItem=({item }) => {

 

return(

<View>

   <TouchableOpacity style={{marginTop:10}}
    onPress={()=>this.props.navigation.navigate('HaircutScreen')}>

     <View style={{flexDirection:'column',width:180,height:236,margin:5,backgroundColor:'white',borderRadius:6,elevation:3}}>
        
        <Shimmer  
                  animationOpacity={0.2}
                 
                  opacity={1}
                  tilt={45}
                  intensity={0}>

        <Image  source={item.image}
         style={{width:180,height:180,resizeMode:'cover',borderTopLeftRadius:6,borderTopRightRadius:6}}/>

        </Shimmer>

        <Text style={{fontSize:10,fontFamily:'Poppins-Bold',color:'black',marginTop:10,width:'90%',marginLeft:'5%'}}>{item.add}</Text>

        <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'#00000066',marginLeft:'5%'}}>₹ {item.add2}</Text>




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
                            Book a Service
                        </Text>
                  </LinearGradient> 

                  <View style={{flex:1,backgroundColor:'white'}}>
                   

          <View style={{width:Dimensions.get('window').width}}>
            <FlatList  contentContainerStyle={{width:'100%',alignItems:'center',justifyContent:'space-between'}}
             data={this.state.FlatListItems}
             numColumns={2}
             horizontal={false}
             keyExtractor={this._keyExtractor}
             renderItem={this.renderItem}
              />
          </View> 


             </View>

           </SafeAreaProvider>        
      );
  }
}

export default BookServices;