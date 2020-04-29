import {
  SafeAreaView,
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
  TouchableHighlight,
  Linking,
  FlatList,
  Dimensions,



  } from 'react-native';


import React, {Component} from 'react';
import Button from 'react-native-button';
import { WebView } from 'react-native-webview';
import { SafeAreaProvider } from 'react-native-safe-area-context';


class PrivacyScreen extends React.Component {
  render() {
    return(

      <SafeAreaProvider>

       <View style = {{height:60,backgroundColor:'black',flexDirection:'row',width:'100%',alignItems:'center'}}>
                        <View>
                        <TouchableOpacity onPress= {()=>this.props.navigation.goBack()}>
                            <Image
                                source={require('./arrowlogo2.png')}
                                style={{width: 18, height: 20,marginLeft:20,resizeMode:'contain'}}


                            />
                        </TouchableOpacity>
                        </View>


                        <Text style = {{color:'white',fontFamily:'Exo2-Bold',fontSize: 20,marginLeft:20}}>
                           Privacy Policy
                        </Text>


                        

                    </View>

       <View style={{flex:1}}>

          <WebView source={{ uri: 'http://Yawd.in/admin/customers/privacy_policy' }} />

       </View>
      </SafeAreaProvider>
    );
  }
}

export default PrivacyScreen;