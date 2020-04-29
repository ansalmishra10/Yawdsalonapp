import React, {Component} from 'react';
import { View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from 'react-navigation-drawer';
  import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen2 from './SplashScreen2.js';
import StyleScreen2  from './StyleScreen2.js';
import LoginScreen2 from './LoginScreen2.js';
import SignupScreen from './SignupScreen.js';
import OtpScreen from './OtpScreen.js';
import BookServices from './BookServices.js';
import HaircutScreen from './HaircutScreen.js';
import SettingScreen from './SettingScreen.js';
import InviteScreen from './InviteScreen.js';
import ForgetScreen from './ForgetScreen.js';
import HomeScreen from './HomeScreen.js';
import Appointment from './Appointment.js';
import Notification from './Notification.js';
import ProfileScreen from './ProfileScreen.js';
import Drawer from './Drawer.js';
import SupportScreen from './SupportScreen.js';
import PrivacyScreen from './PrivacyScreen.js';
import TcScreen from './TcScreen.js';


const DrawerNavigator = createDrawerNavigator({
   HomeScreen:{
       screen: HomeScreen ,

   navigationOptions: ({ navigation }) => ({
     headerStyle: {
     backgroundColor: 'black',
    headerTintColor: '#ffffff',
    tintColor: {
    color: '#ffffff'
   },
   headerTitleStyle: { color: 'black' }
   },

 }),
 }

},{
   initialRouteName: 'HomeScreen',
   contentComponent: Drawer,
   drawerWidth: 250
});



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
        <Stack.Screen name="BookServices" component={BookServices} />
        <Stack.Screen name="HaircutScreen" component={HaircutScreen} />
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
        <Stack.Screen name="InviteScreen" component={InviteScreen} />
        <Stack.Screen name="ForgetScreen" component={ForgetScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SupportScreen" component={SupportScreen} />
        <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} />
        <Stack.Screen name="TcScreen" component={TcScreen} />
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />

        



        <Stack.Screen name="Tab" component={Tabs} />

      </Stack.Navigator>



    </NavigationContainer>
  );
}


export default App;