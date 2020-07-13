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
  Modal,
  ActivityIndicator,

  } from 'react-native';
import React, {Component} from 'react';


import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Stars from 'react-native-stars';
const GLOBAL = require('./Global');

class HaircutScreen extends React.Component {
  constructor(props) {
    super(props);

     this.state={
      lat:'',
      long:'',
      modalVisible: false,
      loading:'',
      text:'',
        imageget1:0,
        imageget2:0,
        imageget3:0,
        imageget4:0,
        FlatListItems:[],
}
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


onButtonClick1=()=> {
    this.setState({imageget1:1})
    this.setState({imageget2:0})
    this.setState({imageget3:0})
    this.setState({imageget4:0})
    this.setState({text:'relevence'})
    this.getShop();

  }

  onButtonClick2=()=> {
    this.setState({imageget1:0})
    this.setState({imageget2:1})
    this.setState({imageget3:0})
    this.setState({imageget4:0})
    this.setState({text:'lowest price'})
    this.getShop();
  }

  onButtonClick3=()=> {
    this.setState({imageget1:0})
    this.setState({imageget2:0})
    this.setState({imageget3:1})
    this.setState({imageget4:0})
    this.setState({text:'highest price'})
    
    this.getShop();
  }

  onButtonClick4=()=> {
    this.setState({imageget1:0})
    this.setState({imageget2:0})
    this.setState({imageget3:0})
    this.setState({imageget4:1})
    this.setState({text:'nearest'})
    this.getShop();

  }

  componentDidMount(){
       

      this.onButtonClick4()
      
      // this._unsubscribe = this.props.navigation.addListener('focus', () => {
       
      Geolocation.getCurrentPosition(info => {
        
        this.setState({ lat : info.coords.latitude })
        this.setState({ long : info.coords.longitude })
         // alert(JSON.stringify(this.state.lat))
          // alert(JSON.stringify(this.state.text));
          this.getShop();

          
      });

    // })

      // this.getData();

  }


   getShop=()=>{
      // alert(JSON.stringify(this.state.text));

     const url = GLOBAL.BASE_URL +  'get_shops'

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
              "lat": this.state.lat,
              "long":this.state.long,
              "order_by":this.state.text,
              "used_for": GLOBAL.type
              
            })
        })

            .then((response) => response.json())
            .then((responseData) => {
             


                // alert(JSON.stringify(responseData))
               this.setState({Flatlistitems: responseData.shops})
                 
                 // alert(JSON.stringify(this.state.Flatlistitems))
               this.setModalVisible2()
             

              

    this.hideLoading()
            

           
      })
      .catch((error) =>{
        console.error(error);
      })

   }




    renderItem=({item}) => {
   
 

return(

<View>

   <TouchableOpacity style={{marginLeft:'3%',marginBottom:12,width:'94%',flexDirection:'column',height:'auto',backgroundColor:'white',borderRadius:8,elevation:3}}
    onPress={()=>this.setvalue(item.shop_id)}>

    


        <ImageBackground  source={{ uri: item.image }} imageStyle={{borderTopLeftRadius:8,borderTopRightRadius:8}}
         style={{width:'100%',height:240,resizeMode:'stretch'}}>

           <View style={{height:54,width:'100%',backgroundColor:'rgba(0,0,0,0.6)',marginTop:186,justifyContent:'center'}}>
            <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'white',marginLeft:18}}>{item.shop_name}</Text>
           </View>
        

        </ImageBackground>



       

        <Text style={{fontSize:14,fontFamily:'Poppins-SemiBold',color:'black',marginLeft:'5%',marginTop:12,width:'90%'}}>{item.location}</Text>

         <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'#00000066',marginTop:6,marginLeft:18}}>Distance : {item.distance}</Text>

         <View style={{flexDirection:'row',marginLeft:15,marginTop:5,alignItems:'center',height:30,marginBottom:12}}>

         <Stars
              default={item.rating.average_rate}
              count={5}
              half={true}
              spacing={8}
              starSize={20}
              fullStar={require('./fullstar1.png')}
              emptyStar={require('./emptystar.png')}
              halfStar={require('./halfstar1.png')}
              disabled={true}
               />

            <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'black',marginLeft:5,marginTop:5}}>({item.rating.total_reviews})</Text>   

         </View>

         


     




  </TouchableOpacity>





  </View>



 );
}


_keyExtractor=(item, index)=>item.key;

setvalue=(shop_id)=> {

   GLOBAL.shop_id = shop_id
  
  // alert(JSON.stringify(shop_id))
  
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
              "shop_id": shop_id,
              "used_for": GLOBAL.type
              
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


  render() {
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

                 <View style = {{height:60,backgroundColor:'black',flexDirection:'row',width:'100%',alignItems:'center',elevation:3,shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0}}>
                        <View>
                        <TouchableOpacity style={{marginLeft:20}}     onPress= {()=>this.props.navigation.goBack()}>
                            <Image
                                source={require('./back2.png')}
                                style={{width: 25, height: 28,resizeMode:'contain'}}/>
                            
                        </TouchableOpacity>
                        </View>


                        <Text style = {{color:'white',fontFamily:'Poppins-SemiBold',fontSize:20,marginLeft:20,width:'72%'}}>Nearest Salon</Text>


                        <TouchableOpacity onPress={()=>this.setModalVisible()}>
                          <Image source={require('./filter.png')}   
                           style={{height:22,width:22,resizeMode:'contain'}}/>
                        </TouchableOpacity>

                    </View>

                  <View style={{flex:1,backgroundColor:'#e3e3e3'}}>
                     

          <View style={{width:Dimensions.get('window').width}}>
            <FlatList style={{marginTop:12}}
             data={this.state.Flatlistitems}
             showsHorizontalScrollIndicator={false}
             keyExtractor={this._keyExtractor}
             renderItem={this.renderItem}
              />
          </View>

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
                                   justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
                                     width:280,borderRadius:10,backgroundColor: 'white',
                                     height: 320}}>
                                     <View style={{width: '95%', margin: 10}}>

                                     <Text style={{fontSize:18,fontFamily:'Poppins-SemiBold',color:'black',marginTop:12,marginLeft:15}}>Sort by</Text>
                                      
                                      {this.state.imageget1==0  && (
                                      <TouchableOpacity style={{width:'auto',height:38,alignSelf:'center',borderRadius:4,marginTop:15,justifyContent:'center'}}
                                       onPress={()=>this.onButtonClick1()}>
                                       <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'black',marginLeft:18,marginRight:18}}>Relevance</Text>
                                      </TouchableOpacity>
                                      )}

                                      {this.state.imageget1==1  && (
                                        <TouchableOpacity style={{width:'auto',height:38,backgroundColor:'black',alignSelf:'center',borderRadius:4,marginTop:15,justifyContent:'center'}}>
                                       <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'white',marginLeft:18,marginRight:18}}>Relevance</Text>
                                      </TouchableOpacity>
                                      )}  
                                       
                                      {this.state.imageget2==0  && (
                                      <TouchableOpacity style={{width:'auto',height:38,alignSelf:'center',borderRadius:4,marginTop:12,justifyContent:'center'}}
                                       onPress={()=>this.onButtonClick2()}>
                                       <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'black',marginLeft:18,marginRight:18}}>Lowest Price</Text>
                                      </TouchableOpacity>
                                      )}

                                      {this.state.imageget2==1  && (
                                      <TouchableOpacity style={{width:'auto',height:38,backgroundColor:'black',alignSelf:'center',borderRadius:4,marginTop:12,justifyContent:'center'}}>
                                       <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'white',marginLeft:18,marginRight:18}}>Lowest Price</Text>
                                      </TouchableOpacity>
                                      )}
                                      
                                      {this.state.imageget3==0  && (
                                      <TouchableOpacity style={{width:'auto',height:38,alignSelf:'center',borderRadius:4,marginTop:12,justifyContent:'center'}}
                                       onPress={()=>this.onButtonClick3()}>
                                       <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'black',marginLeft:18,marginRight:18}}>Highest Price</Text>
                                      </TouchableOpacity>
                                      )}

                                      {this.state.imageget3==1  && (
                                      <TouchableOpacity style={{width:'auto',height:38,backgroundColor:'black',alignSelf:'center',borderRadius:4,marginTop:12,justifyContent:'center'}}>
                                       <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'white',marginLeft:18,marginRight:18}}>Highest Price</Text>
                                      </TouchableOpacity>
                                      )}
                                      
                                      {this.state.imageget4==0  && (
                                      <TouchableOpacity style={{width:'auto',height:38,alignSelf:'center',borderRadius:4,marginTop:12,justifyContent:'center'}}
                                       onPress={()=>this.onButtonClick4()}>
                                       <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'black',marginLeft:18,marginRight:18}}>Nearest</Text>
                                      </TouchableOpacity>
                                      )}

                                      {this.state.imageget4==1  && (
                                      <TouchableOpacity style={{width:'auto',height:38,backgroundColor:'black',alignSelf:'center',borderRadius:4,marginTop:12,justifyContent:'center'}}>
                                       <Text style={{fontSize:16,fontFamily:'Poppins-Medium',color:'white',marginLeft:18,marginRight:18}}>Nearest</Text>
                                      </TouchableOpacity>
                                      )}

                                      <TouchableOpacity style={{alignSelf:'flex-end',marginTop:22,marginRight:15}} onPress={()=>this.setModalVisible2()}>
                                       <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'black'}}>Cancel</Text>
                                      </TouchableOpacity>
                                    

                                    </View>


                             </View>

                         </View>
                         </TouchableOpacity>
                       </Modal>


                  </View>

          </SafeAreaProvider>
    ); 
  }
}


export default HaircutScreen;