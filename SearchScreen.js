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




  } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import React, {Component} from 'react';
import Button from 'react-native-button';
const GLOBAL = require('./Global');
import { SafeAreaProvider } from 'react-native-safe-area-context';


class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
      loading:'',
      search:'',
      FlatListItems:[]
     } 
  }


    showLoading() {
        this.setState({loading: true})
       }

        hideLoading() {
        this.setState({loading: false})
       }


   SearchFilterFunction(text) {

    this.setState({search:text})

     // alert(JSON.stringify(text))

     if(text != '') {
          const url = GLOBAL.BASE_URL +  'search'

        

          this.showLoading()
            fetch(url, {
            method: 'POST',
            timeoutInterval: 1000, 
            headers: {
                'X-API-KEY': 'FCCDB2FFD5830D7F20E67C056DA727002AD9A403DDA29B3FDFAC22ECA226CD4F',
                'Content-Type': 'application/json',
                'Authorization': GLOBAL.token
            },
            sslPinning: {
                certs: ['yawd']
            },
            body: JSON.stringify({
              
          
              "search": text,
            
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             
             this.hideLoading()

               
                
                
                      
                       // alert(JSON.stringify(responseData))
                     
                    
                if (responseData.status == true) {
                
                   // alert(JSON.stringify(responseData))

                   if (responseData.shops!='') {
                    this.setState({FlatListItems: responseData.shops })
                   }

                   
                   else  {
                    this.setState({FlatListItems: responseData.rows })

                   }

                 }

                 
                  else{
             this.setState({FlatListItems: [] })
          }
                  
               
            
            

                       

                   })
      .catch((error) =>{
        console.error(error);
      })

     }

     else{
       this.state.FlatListItems.length =0
     }
      
   }

     renderItem =({item,index})=> {


     return (
<View>

        <TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginTop:20,width:'94%',height:'auto',marginLeft:'3%'}} onPress={()=>this.setScreen(item, index)}>
          
          

          {item.shop_name != ''&&(
          <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'black'}}>{item.shop_name}</Text>
           
           )}

           {item.title != '' &&(
           <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'black'}}>{item.title}</Text>
            )}
           
          </TouchableOpacity>
        </View>

     )
   }

   setScreen=(item, index)=> {
     // alert(JSON.stringify(item))

    if (item.prod_type== 'package') {

        const url = GLOBAL.BASE_URL +  'package_details'

          this.showLoading()
            fetch(url, {
            method: 'POST',
            timeoutInterval: 1000, 
            headers: {
                'X-API-KEY': 'FCCDB2FFD5830D7F20E67C056DA727002AD9A403DDA29B3FDFAC22ECA226CD4F',
                'Content-Type': 'application/json'
            },
            sslPinning: {
                certs: ['yawd']
            },
            body: JSON.stringify({
              "package_id": item.id,
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             
             this.hideLoading()

               if (responseData.status == true) {
                
                
                  // alert(JSON.stringify(responseData))
                  
                  GLOBAL.package = responseData.package
                  
                   this.props.navigation.navigate('PackageScreen')
               
            }
            else{
                alert('Invalid Credentials!')
            }

               

    
            

           
      })
      .catch((error) =>{
        console.error(error);
      })
   }
   
   else if (item.prod_type== 'service') {

      const url = GLOBAL.BASE_URL +  'service_details'



          this.showLoading()
            fetch(url, {
            method: 'POST',
            timeoutInterval: 1000, 
            headers: {
                'X-API-KEY': 'FCCDB2FFD5830D7F20E67C056DA727002AD9A403DDA29B3FDFAC22ECA226CD4F',
                'Content-Type': 'application/json'
            },
            sslPinning: {
                certs: ['yawd']
            },
            body: JSON.stringify({
              "service_id": item.id,
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             
             this.hideLoading()

               if (responseData.status == true) {
                
                
                  // alert(JSON.stringify(responseData))
                  
                  GLOBAL.package = responseData.service
                   this.props.navigation.navigate('PackageScreen')
               
            }
            else{
                
            }

               

    
            

           
      })
      .catch((error) =>{
        console.error(error);
      })
   }

   else {
       const url = GLOBAL.BASE_URL +  'get_shops_categories'

          this.showLoading()
            fetch(url, {
            method: 'POST',
            timeoutInterval: 1000, 
            headers: {
                'X-API-KEY': 'FCCDB2FFD5830D7F20E67C056DA727002AD9A403DDA29B3FDFAC22ECA226CD4F',
                'Content-Type': 'application/json',
                'Authorization': GLOBAL.token
            },
            sslPinning: {
                certs: ['yawd']
            },
            body: JSON.stringify({
              "user_id": GLOBAL.user_id,
              "shop_id": item.shop_id,
              "used_for": ''
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {


              if (responseData.status == true) {
                
                // alert(JSON.stringify(responseData.data[0].category_id))
               // this.setState({Flatlistitems: responseData.shops})
                GLOBAL.cat = responseData.data
                GLOBAL.cat1 = responseData.data[0].category_id
                 this.props.navigation.navigate('AllserviceSalon')
                 // alert(JSON.stringify(this.state.Flatlistitems))
               
            }
            else{
                alert('Invalid Credentials!')
             
               }

                 
             

              

    this.hideLoading()
            

           
      })
      .catch((error) =>{
        console.error(error);
      })
    }


   }

   _keyExtractor=(item, index)=>item.key;

  render() {
    return(

          <SafeAreaProvider>
                      <StatusBar backgroundColor="black" barStyle="light-content" />
                      
                      <View style = {{height:70,backgroundColor:'black',flexDirection:'row',width:'100%',alignItems:'center'}}>
                        <View>
                        <TouchableOpacity onPress= {()=>this.props.navigation.goBack()}>
                            <Image
                                source={require('./back2.png')}
                                style={{width: 25, height: 28,marginLeft:18,resizeMode:'contain'}}


                            />
                        </TouchableOpacity>
                        </View>


                        <Text style={{fontSize:13,fontFamily:'Poppins-Medium',color:'white',width:'80%',marginLeft:15}}>{GLOBAL.house}</Text>


                        

                    
                       


                        

                        

                    </View>

                    <View style = {{flex:1,backgroundColor:'white'}} >




           <View style={{flexDirection:'row',width:'92%',marginLeft:'4%',marginTop:15,borderRadius:4 ,alignItems:'center',justifyContent:'space-between',backgroundColor:'white',elevation:4}}>

                <View style={{flexDirection:'row',width:'100%',height:50,alignItems:'center'}}>

                      <Image style={{height:20,width:20,resizeMode:'contain',marginLeft:9}}
                       source={require('./search2.png')} />

                       <TextInput
                         style={{fontSize:16,fontFamily:'Poppins-Medium',color:'#23222280',width:'88%',height:50,marginLeft:5}}
                         placeholder="Search Service/Package"
                         placeholderTextColor="#23222280"
                         textAlignVertical={'center'}
                         maxLength={100}
                          onChangeText={(text) => this.SearchFilterFunction(text)}
                         value={this.state.search}
                         />


                        

                </View>

                

           </View>

              <View style={{height:Dimensions.get('window').height,width:'90%',alignSelf:'center',marginTop:5}}>
              {this.state.FlatListItems.length != 0 && (
                <FlatList style= {{ height:'auto', flexGrow:0,borderTopColor:'#c0c0c0',width:'100%',height:'90%',backgroundColor:'white'}}
                data={this.state.FlatListItems}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                keyExtractor={this._keyExtractor}
                renderItem={this.renderItem}
                />
              )}
              {this.state.FlatListItems.length == 0 && (
                <View style={{marginTop:'50%'}}>
                <Image style={{height:100,width:100,resizeMode:'contain',borderRadius:8,alignSelf:'center'}}
                source={require('./nodata.png')} />

                 <Text style={{fontSize:15,fontFamily:'Poppins-Medium',color:'black',marginTop:10,alignSelf:'center'}}>No Data Found</Text>
               </View>

              )}
              </View>







         </View>


                   </SafeAreaProvider> 
      );
  }
}

export default SearchScreen;