import React, {Component} from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
  import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen2 from './SplashScreen2.js';
import StyleScreen2  from './StyleScreen2.js';
import LoginScreen2 from './LoginScreen2.js';
import SignupScreen from './SignupScreen.js';
import OtpScreen from './OtpScreen.js';
import OtpScreen2 from './OtpScreen2.js';
import BookServices from './BookServices.js';
import HaircutScreen from './HaircutScreen.js';
import SettingScreen from './SettingScreen.js';
import InviteScreen from './InviteScreen.js';
import ForgetScreen from './ForgetScreen.js';
import HomeScreen from './HomeScreen.js';
import Appointment from './Appointment.js';
import Notification from './Notification.js';
import ProfileScreen from './ProfileScreen.js';

import SupportScreen from './SupportScreen.js';
import PrivacyScreen from './PrivacyScreen.js';
import PackageScreen from './PackageScreen.js';
import TcScreen from './TcScreen.js';
import Allservice from './Allservice.js';
import Summary from './Summary.js';
import AddScreen from './AddScreen.js';
import AddAddress from './AddAddress.js';
import Map from './Map.js';
import AppointScreen from './AppointScreen.js';
import PaymentScreen from './PaymentScreen.js';
import ThankScreen from './ThankScreen.js';
import OnlineScreen from './OnlineScreen.js';
import DetailScreen from './DetailScreen.js';
import AllserviceSalon from './AllserviceSalon.js';
import ViewScreen from './ViewScreen.js';
import ChangePassword from './ChangePassword.js';
import NotifService from './NotifService.js';
import Dummy from './Dummy.js';
import Wallet from './Wallet.js';
import AgainScreen from './AgainScreen.js';





const Tab = createBottomTabNavigator();     

function Tabs() {
  return (

      <Tab.Navigator
      screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
              ? require('./home2.png')
              : require('./home1.png')
            } else if(route.name === 'Appointment'){
              iconName = focused
              ? require('./appon2.png')
              : require('./appon1.png')
            } else if(route.name === 'Notification'){
              iconName = focused
              ? require('./noti2.png')
              : require('./noti1.png')
            }  
 else if(route.name === 'Profile'){
              iconName = focused
              ? require('./popi2.png')
              : require('./popi1.png')
            }



            // You can return any component that you like here!
            return<Image
                            source={iconName}
                            style={{height:25, width:25, resizeMode:'contain'}}
                        />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: 'gray',
          activeBackgroundColor :'white',
          inactiveBackgroundColor :'white'
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Appointment" component={Appointment} />
          <Tab.Screen name="Notification" component={Notification} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        
      </Tab.Navigator>

  );
}


 

const Drawer = createDrawerNavigator();


function DrawerTab() {
  return (
       
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="HomeScreen" >
        <Drawer.Screen name="HomeScreen" component={HomeScreen} />
        <Drawer.Screen name="TcScreen" component={TcScreen} />
      </Drawer.Navigator>
    </NavigationContainer>

);
}




const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen2" component={SplashScreen2} />
        <Stack.Screen name="StyleScreen2" component={StyleScreen2} />
        
        <Stack.Screen name="LoginScreen2" component={LoginScreen2} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="OtpScreen2" component={OtpScreen2} />
        <Stack.Screen name="BookServices" component={BookServices} />
        <Stack.Screen name="HaircutScreen" component={HaircutScreen} />
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
        <Stack.Screen name="InviteScreen" component={InviteScreen} />
        <Stack.Screen name="ForgetScreen" component={ForgetScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SupportScreen" component={SupportScreen} />
        <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} />
        <Stack.Screen name="TcScreen" component={TcScreen} />
        <Stack.Screen name="PackageScreen" component={PackageScreen} />
        <Stack.Screen name="Allservice" component={Allservice} />
        <Stack.Screen name="Summary" component={Summary} />
        <Stack.Screen name="AddScreen" component={AddScreen} />
        <Stack.Screen name="AddAddress" component={AddAddress} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="AppointScreen" component={AppointScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="ThankScreen" component={ThankScreen} />
        <Stack.Screen name="OnlineScreen" component={OnlineScreen} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
        <Stack.Screen name="AllserviceSalon" component={AllserviceSalon} />
        <Stack.Screen name="ViewScreen" component={ViewScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="NotifService" component={NotifService} />
        <Stack.Screen name="Dummy" component={Dummy} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="AgainScreen" component={AgainScreen} />

        


        <Stack.Screen name="DrawerTab" component={DrawerTab} />
        <Stack.Screen name="Tab" component={Tabs} />

      </Stack.Navigator>



    </NavigationContainer>
  );
}


export default App;