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
import {NavigationActions,StackActions} from 'react-navigation';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {fetch, removeCookieByName} from 'react-native-ssl-pinning';
const GLOBAL = require('./Global');

class HomeScreen extends React.Component {
  render() {
    return(
         <SafeAreaProvider>
                      <StatusBar backgroundColor="black" barStyle="light-content" />


                      <View style = {{height:60,backgroundColor:'black',flexDirection:'row',width:'100%',alignItems:'center',justifyContent:'space-between'}}>
                        <View>
                        <TouchableOpacity onPress={() =>this.props.navigation.toggleDrawer()}>
                            <Image
                                source={require('./drawer.png')}
                                style={{width: 30, height:30,marginLeft:20,resizeMode:'contain'}}


                            />
                        </TouchableOpacity>
                        </View>


                        <View>
                        <TouchableOpacity>
                            <Image
                                source={require('./search.png')}
                                style={{width: 25, height: 25,resizeMode:'contain',marginRight:20}}


                            />
                        </TouchableOpacity>
                        </View>


                        

                        

                    </View>

                    <ScrollView style={{flex:1,backgroundColor:'white'}}>
                    </ScrollView>

                   </SafeAreaProvider> 
      );
  }
} 

export default HomeScreen; 