import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {ScrollView, Text, View ,Linking,AsyncStorage,    StyleSheet,Share,
Image,TouchableOpacity,Alert,} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import 'react-native-gesture-handler';
import {fetch, removeCookieByName} from 'react-native-ssl-pinning';

const GLOBAL = require('./Global');

class Drawer extends Component {

 constructor(props){
    super(props)
 const { navigation } = this.props;
    this.state = {
      loading:false,
      profile:''
    }
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

      GLOBAL.userID = ''
         
       this.props.navigation.navigate('LoginScreen2') 

      // this.props
      //       .navigation
      //       .dispatch(StackActions.reset({
      //           index: 0,
      //           actions: [
      //               NavigationActions.navigate({
      //                   routeName: 'LoginScreen',
      //                   params: { someParams: 'parameters goes here...' },
      //               }),
      //           ],
      //       }))

    }

  



    showLoading(){
      this.setState({loading: true})
    }

    hideLoading(){
      this.setState({loading: false})
    }



    // getData =() => {
    //   this.showLoading()
    //   fetch('https://yawd.in/admin/api/saloon/saloon_my_profile', {
    //   method: 'POST',
    //   timeoutInterval: 1000,
    //   headers: {
    //       'X-API-KEY': 'FCCDB2FFD5830D7F20E67C056DA727002AD9A403DDA29B3FDFAC22ECA226CD4F',
    //       'Content-Type': 'application/json'
    //      },
    //      sslPinning: {
    //          certs: ['yawd']
    //      },
    //   body: JSON.stringify({
    //     "id":GLOBAL.userID
    //     })
    //   })

    //   .then((response) => response.json())
    //   .then((responseData) => {

    //            // console.log(JSON.stringify(responseData))

    //   this.hideLoading()
    //   if(responseData.status==true){
    //     this.setState({profile: responseData.profile_data})
    //           // alert(JSON.stringify(this.state.profile))
    //   }else {
    //   alert("Profile not added!")
    //    }


    //   })
    //   .catch((error) =>{
    //   this.hideLoading()
    //   console.error(error);
    //     })


    // }





  navigateToScreen = (route) => () => {

    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }





  render () {
        

    return (
      <View style={{flex:1, backgroundColor:'black'}}>
        <ScrollView>
          <View style={{backgroundColor:'black'}}>

          <View  style={styles.headertop}>

          <View style={{marginTop:30,marginLeft:'14%', flexDirection: 'column',alignItems:'center',width:'52%'}}>

          <Image source={require('./propic.png')}
            style={{width:120, height:120,borderRadius:60,resizeMode: 'contain'}} />

          <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'white',marginTop:10,textAlign:'center'}}>Akash jha</Text>

           </View>

          </View>


            <View style={{marginTop:'16%'}}>

             <View style={styles.menuItem}>
               <Image style={styles.drawericon}
                             source={require('./home.png')} />
              <Text style = {styles.drawerTexts}
              onPress={()=>this.props.navigation.toggleDrawer()}>
                Home
              </Text>
            </View>






             <View style={styles.menuItem}>
             <Image style={styles.drawericon}
                             source={require('./pro.png')} />

            <Text style = {styles.drawerTexts}
              onPress={this.navigateToScreen('InviteScreen')}>
               Invite Friends
              </Text>
            </View>

            <View style={styles.menuItem}>
            <Image style={styles.drawericon}
                            source={require('./pro.png')} />

           <Text style = {styles.drawerTexts}
             onPress={this.navigateToScreen('SupportScreen')}>
              Support
             </Text>
           </View>

           <View style={styles.menuItem}>
           <Image style={styles.drawericon}
                           source={require('./privacy.png')} />

          <Text style = {styles.drawerTexts}
            onPress={this.navigateToScreen('PrivacyScreen')}>
             Privacy Policy
            </Text>
          </View>

          <View style={styles.menuItem}>
          <Image style={styles.drawericon}
                          source={require('./t&c.png')} />

         <Text style = {styles.drawerTexts}
           onPress={this.navigateToScreen('TcScreen')}>
            Terms & Conditions
           </Text>
         </View>

          <View style={styles.menuItem}>
          <Image style={styles.drawericon}
                          source={require('./logout2.png')} />

         <Text style = {styles.drawerTexts}
           onPress={this.navigateToScreen1()}>
           logout
           </Text>
         </View>



          </View>




          </View>
        </ScrollView>
      </View>
    );
  }
}

Drawer.propTypes = {
  navigation: PropTypes.object
};


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
 drawericon: {
    borderLeftWidth: 1,
    width: 20,
    height: 20,
    marginLeft : 8 ,
    marginTop : 3,
    resizeMode:'contain'


  },

 drawericons: {

    width: 20,
    height: 20,
    marginLeft : 8 ,
    marginTop : 3,

  },


   drawerTexts: {

    width: 210,
    height: 22,
    marginLeft : 45 ,
    marginTop : -18,
    color: 'white',
    fontFamily: 'Poppins-Medium'

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

export default Drawer;
