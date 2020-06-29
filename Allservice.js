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

class Allservice extends React.Component {
  constructor(props) {
     super(props);
       this.state ={
    
         Flatlistitems1:GLOBAL.allservice,
         
         loading:'',
         gender:'',
         modalVisible:false,
         imageget:0,
       }
   }

   showLoading() {
        this.setState({loading: true})
       }

        hideLoading() {
        this.setState({loading: false})
       }

  componentDidMount() {
         // alert(JSON.stringify(GLOBAL.gender))
         this._unsubscribe = this.props.navigation.addListener('focus', () => {
         this.getcartitems()
        
        
        this.getServices()

      })
  }

  getServices=()=>{

     const url = GLOBAL.BASE_URL +  'get_services_by_category'

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
              "use_for": GLOBAL.gender,
              "category_id": GLOBAL.cat1
              
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

  


 changeimage=()=> {
  this.setState({imageget: 0})
 }

  renderItem=({item}) => {
        // console.log(item)
    return(

<View>




<TouchableOpacity style={{height:40,width:'auto',borderRadius:20,borderWidth:2,borderColor:'#e3e3e3',marginLeft:18,justifyContent:'center'}}
onPress={()=>this.setValue(item.category_id)}>


 
 <Text style={{fontFamily:'Poppins-Medium',color:'#e3e3e3',marginLeft:20,marginRight:20,width:'100%'}}>{item.category_name}</Text>




  


  
</TouchableOpacity>

 

 

 </View>

)
}


_keyExtractor=(item, index)=>item.key;

renderItem2=({item}) => {
         // console.log(item)
    return(

<View>

<TouchableOpacity style={{borderRadius:6,elevation:3,marginLeft:'3%',width:'94%',marginBottom:10}} 
 onPress={()=>this.setValueagain(item.prod_type, item.id)}>


 
 <View style={{width:'100%',height:'auto',borderRadius:6,backgroundColor:'white'}}>

 <View style={{flexDirection:'row',marginLeft:'4%',width:'92%',marginTop:15,alignItems:'center',justifyContent:'space-between'}}>

 <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'black',width:'85%'}}>{item.title}</Text>

  <TouchableOpacity>
  <Image source={require('./info.png')}
  style={{height:22,width:22,resizeMode:'contain'}} /> 
  </TouchableOpacity>

 </View>

 <HTML html={item.description} containerStyle={{marginTop:8}} imagesMaxWidth={Dimensions.get('window').width} />


  <View style={{flexDirection:'row',marginLeft:'4%',width:'92%',alignItems:'center',marginTop:-10}}>
  <Image source={require('./clock.png')}
    style={{height:18,width:18,resizeMode:'contain'}}/>

    <Text style={{fontSize:13,fontFamily:'Poppins-Medium',color:'#00000066',marginLeft:8}}>{item.duration} minutes</Text>
  </View>


   <View style={{flexDirection:'row',alignItems:'center',width:'88%',marginLeft:'8%',justifyContent:'space-between',marginTop:20,marginBottom:15}}>
      <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'#FF8C00',textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>₹ {item.mrp}/-</Text>
      <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'black',width:'40%'}}>₹ {item.selling_price}/-</Text>
      
      <TouchableOpacity style={{height:34,width:76,justifyContent:'center',backgroundColor:'black',borderRadius:16}}
        onPress={()=>this.setcarditem(item.prod_type, item.id)}>
       <Text style={{fontSize:12,fontFamily:'Poppins-Medium',color:'white',alignSelf:'center'}}>Add</Text>
      </TouchableOpacity>
      
   </View>

  


  </View>

  
</TouchableOpacity>



 </View>

)
}
 

setValueagain=(prod_type, id)=> {
  

   if (prod_type== 'package') {

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
              "package_id": id,
              
              
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
                'Content-Type': 'application/json'
            },
            sslPinning: {
                certs: ['yawd']
            },
            body: JSON.stringify({
              "service_id": id,
              
              
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

 setcarditem=(prod_type, id)=> {
  

   if (prod_type== 'package') {

        const url = GLOBAL.BASE_URL +  'add_to_cart'

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
              "user_id":GLOBAL.user_id,
              "service_id":0,
              "package_id":id,
              "quantity":1
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             
             this.hideLoading()

               if (responseData.status == true) {
                
                
                    // alert(JSON.stringify(responseData))
                  
                   
                  this.getcartitems()
                   
                   
                   alert('Successfully Added')
               
            }
            else{
                alert('Please select services of either visit at Home or Salon.')
            }

               

    
            

           
      })
      .catch((error) =>{
        console.error(error);
      })
   }
   
   else if (prod_type== 'service') {
     

      const url = GLOBAL.BASE_URL +  'add_to_cart'



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
              
              "user_id":GLOBAL.user_id,
              "service_id":id,
              "package_id":0,
              "quantity":1
              
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             
             this.hideLoading()

               if (responseData.status == true) {
                
                
                    // alert(JSON.stringify(responseData))
                  
                   this.getcartitems()
                   
                   
                   
                   alert('Successfully Added')

            }
            else{
                alert('Please select services of either visit at Home or Salon.')
            }

               

    
            

           
      })
      .catch((error) =>{
        console.error(error);
      })
   }
 }

 getcartitems=()=> {
      const url = GLOBAL.BASE_URL +  'get_cart_items'

        

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

setValue =(category_id) => {
  // alert(JSON.stringify(category_id))

 

  const url = GLOBAL.BASE_URL +  'get_services_by_category'

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
              "use_for": GLOBAL.gender,
              "category_id": category_id 
              
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
    if(this.state.loading){
      return(
        <View style={{flex: 1}}>
        <ActivityIndicator style = {{position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'}}

       size="large" color="#e41582" />
        </View>
      )
    }
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

export default Allservice;