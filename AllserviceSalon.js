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
  Animated,
  Modal,

  } from 'react-native';
import React, {Component} from 'react';
import Button from 'react-native-button';

import LinearGradient from 'react-native-linear-gradient';
import HTML from 'react-native-render-html';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import {fetch, removeCookieByName} from 'react-native-ssl-pinning';


const GLOBAL = require('./Global');

class AllserviceSalon extends React.Component {
  constructor(props) {
     super(props);
       this.state ={
    
         Flatlistitems1:GLOBAL.cat,
         Flatlistitems2:[],
         loading:'',
         gender:'',
         modalVisible:false,
         imageget:0,
       }
   }

  componentDidMount() {
        // alert(JSON.stringify(GLOBAL.user_id))

        this._unsubscribe = this.props.navigation.addListener('focus', () => {

        const url = GLOBAL.BASE_URL +  'get_services_by_category_for_shop'

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
              "use_for": GLOBAL.type,
              "user_id": GLOBAL.user_id,
              "category_id": GLOBAL.cat1,
              "shop_id": GLOBAL.shop_id
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             
             this.hideLoading()

               if (responseData.status == true) {
                
                
                    // alert(JSON.stringify(responseData))
                
                this.setState({Flatlistitems2: responseData.data })
               
            }
            else{
                alert('Invalid Credentials!')
            }

               

    
            

           
      })
      .catch((error) =>{
        console.error(error);
      })
      
      })

       // this.setValue()
  }

  showLoading() {
        this.setState({loading: true})
       }

        hideLoading() {
        this.setState({loading: false})
       }


       setModalVisible=()=> {
  this.setState({modalVisible: true})
}

setModalVisible2=()=> {
  this.setState({modalVisible: false})
}


 changeimage=()=> {
  this.setState({imageget: 0})
 }

  renderItem=({item}) => {
        // console.log(item)
    return(

<View>




<TouchableOpacity style={{height:40,width:'auto',borderRadius:20,borderWidth:2,borderColor:'#e3e3e3',marginLeft:18,justifyContent:'center'}}
onPress={()=>this.setValue(item.category_id, item)}>


 
 <Text style={{fontFamily:'Poppins-Medium',color:'#e3e3e3',marginLeft:20,marginRight:20,width:'100%'}}>{item.category_name}</Text>




  


  
</TouchableOpacity>

 

 

 </View>

)
}


_keyExtractor=(item, index)=>item.key;

renderItem2=({item, index}) => {
         // console.log(item)
    return(

<View>

<TouchableOpacity style={{borderRadius:6,elevation:3,marginLeft:'3%',width:'94%',marginBottom:10}} 
 onPress={()=>this.setValueagain(item.prod_type, item.id)}>


 
 <View style={{width:'100%',height:'auto',borderRadius:6,backgroundColor:'white'}}>

 <View style={{flexDirection:'row',marginLeft:'4%',width:'92%',marginTop:15,alignItems:'center',justifyContent:'space-between'}}>

 <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'black',width:'85%'}}>{item.title}</Text>

  <TouchableOpacity onPress={()=>this.setModalVisible()}>
  <Image source={require('./info.png')}
  style={{height:22,width:22,resizeMode:'contain'}} /> 
  </TouchableOpacity>

 </View>

 


  <View style={{flexDirection:'row',marginLeft:'4%',width:'92%',alignItems:'center',marginTop:5}}>
  <Image source={require('./clock.png')}
    style={{height:18,width:18,resizeMode:'contain'}}/>

    <Text style={{fontSize:13,fontFamily:'Poppins-Medium',color:'#00000066',marginLeft:8}}>{item.duration} minutes</Text>
  </View>


   <View style={{flexDirection:'row',alignItems:'center',width:'88%',marginLeft:'8%',justifyContent:'space-between',marginTop:20,marginBottom:15}}>
      <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'#FF8C00',textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>₹ {item.mrp}/-</Text>
      <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'black',width:'40%'}}>₹ {item.selling_price}/-</Text>
      
      <TouchableOpacity style={{height:34,width:76,justifyContent:'center',backgroundColor:'black',borderRadius:16}}
        onPress={()=>this.setcarditem(item.prod_type, item.id, item, index)}>
       {item.is_cart == 0 && (  
       <Text style={{fontSize:12,fontFamily:'Poppins-SemiBold',color:'white',alignSelf:'center'}}>Add</Text>
       )}

       {item.is_cart == 1 && (  
       <Text style={{fontSize:12,fontFamily:'Poppins-SemiBold',color:'white',alignSelf:'center'}}>Added</Text>
       )}
      </TouchableOpacity>
      
   </View>

  


  </View>


  

  
</TouchableOpacity>

<Modal
                         animationType="slide"
                         transparent={true}
                         visible={this.state.modalVisible}
                         onRequestClose={() => {
              //             Alert.alert('Modal has been closed.');
                            this.setModalVisible2()
                         }}>
                         <TouchableOpacity
                          style={{
                                   flex: 1,
                                   borderRadius:10,
                                   flexDirection: 'column',
                                   justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0, 0.06)',
                                   alignItems: 'center'}}
                          activeOpacity={1}
                          onPressOut={() => this.setModalVisible2()}
                        >
                         <View style={{
                                  borderRadius:10,
                                   flexDirection: 'column',
                                   justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                   alignItems: 'center'}}>
                             <View style={{
                                     width:250,borderRadius:10,backgroundColor: 'white',
                                     height:200}}>
                                     <View style={{width: '95%', margin: 10}}>

                                     
                                      <HTML html={item.description} containerStyle={{marginTop:20,marginLeft:15}} imagesMaxWidth={Dimensions.get('window').width-30} />

                                      <TouchableOpacity style={{justifyContent:'center',width:70,height:36,backgroundColor:'black',alignSelf:'center',marginTop:20,borderRadius:18}}
                                      onPress={()=>this.setModalVisible2()}>

                                      

                                       <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'white',alignSelf:'center'}}>OK</Text>

                                      </TouchableOpacity>
                                    

                                    </View>


                             </View>

                         </View>
                         </TouchableOpacity>
                       </Modal>



 </View>

)
}
 

setValueagain=(prod_type, id)=> {
   // alert(JSON.stringify(id))

   if (prod_type== 'package') {

        const url = GLOBAL.BASE_URL +  'package_details'

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
              "package_id": id,
              "user_id": GLOBAL.user_id
              
              
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
   
   else if (prod_type== 'service') {

      const url = GLOBAL.BASE_URL +  'service_details'



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
              "service_id": id,
              "user_id": GLOBAL.user_id
              
              
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
                alert('Invalid Credentials!')
            }

               

    
            

           
      })
      .catch((error) =>{
        console.error(error);
      })
   }
} 

_keyExtractor2=(item, index)=>item.key;

 setcarditem=(prod_type, id, item, index)=> {
    // alert(JSON.stringify(index))

    if (prod_type== 'package') {

        const url = GLOBAL.BASE_URL +  'add_to_cart'

          // this.showLoading()
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
              "user_id":GLOBAL.user_id,
              "service_id":0,
              "package_id":id,
              "quantity":1
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             
             // this.hideLoading()

               if (responseData.status == true) {
                
                
                    // alert(JSON.stringify(responseData))
                    var a = this.state.Flatlistitems2[index]
                       // alert(JSON.stringify(a))
     if (a.is_cart  == 0) {
       a.is_cart = 1
        // alert(JSON.stringify(item.is_selected))
     }
     else{
            a.is_cart = 0
            
     }

     this.state.Flatlistitems2[index] = a
     this.setState({Flatlistitems2:this.state.Flatlistitems2})
                  
                   
                  this.getcartitems()
                   
                   
                   // alert('Successfully Added')
               
            }
            else{
                alert(JSON.stringify(responseData.message))
            }

               

    
            

           
      })
      .catch((error) =>{
        console.error(error);
      })
   }
   
   else if (prod_type== 'service') {
     // alert(JSON.stringify(id))

      const url = GLOBAL.BASE_URL +  'add_to_cart'



          // this.showLoading()
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
              
              "user_id":GLOBAL.user_id,
              "service_id":id,
              "package_id":0,
              "quantity":1
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             
             // this.hideLoading()

               if (responseData.status == true) {
                
                
                    // alert(JSON.stringify(responseData))
                    var a = this.state.Flatlistitems2[index]
                       // alert(JSON.stringify(a))
     if (a.is_cart  == 0) {
       a.is_cart = 1
        // alert(JSON.stringify(item.is_selected))
     }
     else{
            a.is_cart = 0
            
     }

     this.state.Flatlistitems2[index] = a
     this.setState({Flatlistitems2:this.state.Flatlistitems2})
                  
                   this.getcartitems()
                   
                   
                   
                    // alert('Successfully Added')
               
            }
            else{
                alert(JSON.stringify(responseData.message))
            }

               

    
            

           
      })
      .catch((error) =>{
        console.error(error);
      })
   }
 }

 getcartitems=()=> {
      const url = GLOBAL.BASE_URL +  'get_cart_items'

        

          // this.showLoading()
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
            
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             
             this.hideLoading()

               if (responseData.status == true) {
                
                     
                     // alert(JSON.stringify( responseData))
                     GLOBAL.total = responseData.total_amount
                  
                 
                   

            }
            else{
                alert('Invalid Credentials!')
            }

               

    
            

           
      })
      .catch((error) =>{
        console.error(error);
      })
    }

setValue =(category_id, item) => {
    // alert(JSON.stringify(item))

 

  const url = GLOBAL.BASE_URL +  'get_services_by_category_for_shop'

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
              "use_for": GLOBAL.type,
              "user_id": GLOBAL.user_id,
              "category_id": category_id,
              "shop_id": GLOBAL.shop_id
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             
             this.hideLoading()

               if (responseData.status == true) {
                
                
                      // alert(JSON.stringify(responseData))
     
                this.setState({Flatlistitems2: responseData.data })
               
            }
            else{
                alert('Invalid Credentials!')
            }

               

    
            

           
      })
      .catch((error) =>{
        console.error(error);
      })

}



  render () {
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
                            Allservice
                        </Text>


                        

                    </View>

            



           <ScrollView style={{backgroundColor:'#e3e3e3'}}>
           
           <View style={{width:'100%',height:56,backgroundColor:'black'}}>
             <FlatList  contentContainerStyle={{backgroundColor:'black',height:56,width:'auto'}}
                       data={this.state.Flatlistitems1}
                       horizontal={true}
                       showsHorizontalScrollIndicator={false}
                       keyExtractor={this._keyExtractor}
                       renderItem={this.renderItem}
              />
             </View> 
            
            { this.state.Flatlistitems2 != '' &&(
              <FlatList style={{marginTop:10}}
                       data={this.state.Flatlistitems2}
                       
                       showsVerticalScrollIndicator={false}
                       keyExtractor={this._keyExtractor2}
                       renderItem={this.renderItem2}
              />
              )}

              { this.state.Flatlistitems2 == '' &&(
                <Text style={{fontSize:20,fontFamily:'Poppins-Medium',color:'black',marginTop:'70%',alignSelf:'center'}}>No Services Found</Text>

                )}
              

           </ScrollView>

           <View style = {{height:80,backgroundColor:'#e3e3e3',flexDirection:'row',width:'100%',alignItems:'center',elevation:2}}>
                        


                        

                    <TouchableOpacity style={{flexDirection:'row',height:54,width:'92%',backgroundColor:'black',borderRadius:27,marginLeft:'4%',alignItems:'center',justifyContent:'space-between'}}
                     onPress={()=>this.props.navigation.navigate('Summary')}>
                       
                       {GLOBAL.total == ''&&(
                       <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'white',marginLeft:15}}>₹ 0.00</Text>
                       )}

                       {GLOBAL.total != ''&&(
                       <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'white',marginLeft:15}}>₹ {GLOBAL.total}</Text>
                       )}
                       <Text style={{fontSize:18,fontFamily:'Poppins-Medium',color:'white',width:'68%',textAlign:'right'}}>Summary</Text>
                       
                       <View style={{width:35}}>
                       <Image style={{height:22,width:22,}}
                        source={require('./right.png')} />
                       </View>

                    </TouchableOpacity>   


                        

                        

                    </View>

           </SafeAreaProvider>

      );
  }
}

export default AllserviceSalon;