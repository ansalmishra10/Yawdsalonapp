import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {ScrollView, Text, View ,Linking,AsyncStorage,    StyleSheet,Share,
Image,TouchableOpacity,Alert,} from 'react-native';
import { CommonActions } from '@react-navigation/native';

import 'react-native-gesture-handler';
// import {fetch, removeCookieByName} from 'react-native-ssl-pinning';

const GLOBAL = require('./Global');

class DrawerComponent extends Component {

 constructor(props){
    super(props)
 const { navigation } = this.props;
    this.state = {
      loading:false,
      profile:'',

    }
}

navigateToScreen = (route) => () => {

    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }

componentDidMount() {

      // alert(JSON.stringify(GLOBAL.draw))
     
         
     
   }



navigateToScreen1 = (route) => {

        Alert.alert('Logout!','Are you sure you want to Logout?',
            [{text:"Cancel"},
                {text:"Yes", onPress:()=>this._YesLogout()
                },
            ],
            {cancelable:false}
        )

    }

    _YesLogout=()=>{

      AsyncStorage.removeItem('userID');

      GLOBAL.user_id = ''
         
       this.props.navigation.navigate('LoginScreen2') 

      

    }

 



    showLoading(){
      this.setState({loading: true})
    }

    hideLoading(){
      this.setState({loading: false})
    }

   

    

    






  




  render () {
        
    return (
      <View style={{flex:1, backgroundColor:'black'}}>
        <ScrollView>
          <View style={{backgroundColor:'black'}}>

          <View  style={styles.headertop}>

          <View style={{flexDirection:'row',marginTop:50,alignItems:'center'}}>

          <Image source={{ uri: GLOBAL.draw.profile_pic}}
            style={{width:80, height:80,resizeMode: 'contain',marginLeft:10}} />
          
          <View style={{flexDirection:'column'}}>
          <Text style={{fontSize:18,fontFamily:'Poppins-SemiBold',color:'white',marginLeft:10}}>{GLOBAL.draw.firstname} {GLOBAL.draw.lastname}</Text>
           
          <Text style={{fontSize:12,fontFamily:'Poppins-Medium',color:'white',marginLeft:10,marginTop:5,width:'100%'}}>{GLOBAL.draw.email_id}</Text> 
          </View>
           </View>

          </View>


            <View>

             <View style={{flexDirection:'row',alignItems:'center'}}>
               <Image style={{width: 30,height: 30,marginLeft : 15 ,resizeMode:'contain'}}
                             source={require('./home.png')} />
              <Text style = {{width: 210,height: 22,marginLeft : 30 ,fontSize:16,color: 'white',fontFamily: 'Poppins-SemiBold'}}
              onPress={()=>this.props.navigation.toggleDrawer()}>
                Home
              </Text>
            </View>






             <TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginTop:24}} onPress={()=>this.props.navigation.navigate('InviteScreen')}>
             <Image style={{width: 30,height: 30,marginLeft : 15 ,resizeMode:'contain'}}
                             source={require('./pro.png')} />
          
            <Text style = {{width: 210,height: 22,marginLeft : 30 ,fontSize:16,color: 'white',fontFamily: 'Poppins-SemiBold'}}>Invite Friends</Text>
              
            </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginTop:24}} onPress={()=>this.props.navigation.navigate('SupportScreen')}>
            <Image style={{width: 30,height: 30,marginLeft : 15 ,resizeMode:'contain'}}
                            source={require('./pro.png')} />

           <Text style = {{width: 210,height: 22,marginLeft : 30 ,fontSize:16,color: 'white',fontFamily: 'Poppins-SemiBold'}}>
              Support
             </Text>
           </TouchableOpacity>

           <TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginTop:24}} onPress={()=>this.props.navigation.navigate('PrivacyScreen')}>
           <Image style={{width: 30,height: 30,marginLeft : 15 ,resizeMode:'contain'}}
                           source={require('./privacy.png')} />

          <Text style = {{width: 210,height: 22,marginLeft : 30 ,fontSize:16,color: 'white',fontFamily: 'Poppins-SemiBold'}}>
             Privacy Policy
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginTop:24}} onPress={()=>this.props.navigation.navigate('TcScreen')}>
          <Image style={{width: 30,height: 30,marginLeft : 15 ,resizeMode:'contain'}}
                          source={require('./t&c.png')} />

         <Text style = {{width: 210,height: 22,marginLeft : 30 ,fontSize:16,color: 'white',fontFamily: 'Poppins-SemiBold'}}>
            Terms & Conditions
           </Text>
         </TouchableOpacity>

          <TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginTop:24}} onPress={()=>this.navigateToScreen1()}>
          <Image style={{width: 30,height: 30,marginLeft : 20 ,resizeMode:'contain'}}
                          source={require('./logout2.png')} />

         <Text style = {{width: 210,height: 22,marginLeft : 25 ,fontSize:16,color: 'white',fontFamily: 'Poppins-SemiBold'}}>
           logout
           </Text>
         </TouchableOpacity>



          </View>




          </View>
        </ScrollView>
      </View>
    );
  }
}




const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'#f1f1f1',

    },
       drawerText :{
      marginTop : 2,
      color : 'white',
      marginLeft : 10,
      fontSize: 13,

  } ,
headertop :{

    width : 300,
   height : 180,
    backgroundColor : 'black',
    flexDirection:'column'
  } ,

    containers: {
        flex: 1,

    },
    menuItem:{
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    },
 

 drawericons: {

    width: 25,
    height: 25,
    marginLeft : 10 ,
    marginTop : 3,

  },


   


    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },
    slide1: {

        marginLeft : 50,

        width: window.width - 50,
        height:300,
        resizeMode:'contain',
        marginTop : window.height/2 - 200


    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    account :{
        marginTop : 20,
        textAlign : 'center',
        fontSize: 17,
        justifyContent:'center',
        color : '#262628',
        fontFamily:'Poppins-Regular',


    } ,
    createaccount :{
        marginLeft : 5,
        fontSize: 17,
        textAlign : 'center',
        marginTop : 30,
        color : '#0592CC',




    } ,

    createaccounts :{
        marginLeft : 5,
        fontSize: 17,
        textAlign : 'center',
        marginTop : 30,
        color : '#0592CC',
        textDecorationLine: 'underline',



    } ,
    transcript: {
        textAlign: 'center',
        color: 'red',

    },
})

export default DrawerComponent;