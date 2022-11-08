import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';


function CustomHeader(props) {
  return <View style={{ backgroundColor: '#343434', paddingVertical: 10 }} >
    <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 10 }} onPress={()=>props.onPress()}>
      <Text style={{ color: 'white' }}>
        <Icon name="arrow-back" size={25} />
      </Text>
      <Text style={{ color: 'white', fontSize: 18, marginLeft: 4 }}>
        Back
      </Text>
    </TouchableOpacity>
  </View>
}

const ProductPurse = ({ navigation }) => {
  function handleBack(){
    return navigation.goBack()
  }
  return (

    <View style={styles.container}>
      <SafeAreaView>
        <CustomHeader onPress={handleBack} />

        <View style={{ margin: 10 }}>
          <View >
            <Text style={{ color: '#ffaa00', fontSize: 19, fontWeight: 'bold', textAlign: 'center' }}>Product purchase flow</Text>
          </View>



          <View style={{backgroundColor:'#1F1F1F',margin:10,padding:10,borderRadius:10,height:'85%',overflow:'scroll'}}>
      <ScrollView >
      <Text style={{color:'#959595', letterSpacing: 1,lineHeight:18,}}>
            
      Process Flow To Purchase The Product & Service – End to End {"\n"} {"\n"}

      To place an order or subscribe for any HSS services/products, User needs to select the services/products from the app or official website and add the desired product to the user profile/cart. {"\n"} {"\n"}

      After adding the product to the user profile service/cart, Customer needs to proceed to checkout to complete the registration/ordering process.{"\n"} {"\n"}

     <Text style={{fontWeight:'bold'}}>At the checkout page, user needs to provide their details like name, email, photo,mobile number & address.</Text> 
      
       After providing the details, user selected the payment method to complete the payment for the order.{"\n"} {"\n"}
      Once the payment method is selected, user reaches to the order completion page displaying his/her Product/Services ID & transaction ID for the payment along with the details{"\n"} {"\n"}
      
User is also notified about the details & payment receipts via email, sms & notifications

            </Text>
      </ScrollView>
          </View>

        </View>

      </SafeAreaView>
    </View>

  )
}

export default ProductPurse

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  }
})