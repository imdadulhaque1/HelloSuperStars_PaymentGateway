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

const About = ({ navigation }) => {
  function handleBack(){
    return navigation.goBack()
  }
  return (

    <View style={styles.container}>
      <SafeAreaView>
        <CustomHeader onPress={handleBack} />

        <View style={{ margin: 10 }}>
          <View >
            <Text style={{ color: '#ffaa00', fontSize: 19, fontWeight: 'bold', textAlign: 'center' }}>About Us</Text>
          </View>



          <View style={{backgroundColor:'#1F1F1F',margin:10,padding:10,borderRadius:10,height:450,overflow:'scroll'}}>
      <ScrollView >
      <Text style={{color:'#959595', letterSpacing: 1,lineHeight:18,}}>
            
            The concept of Superstardom has changed many times in the last century. Social media brought the stars closer to their fans- may be closer than ever, yet not quite close enough.{"\n"} {"\n"}

HSS is the next step in evolution. It is an innovation. It is unique. HSS offers many unprecedented instruments of interaction between the superstars of various fields and the fans. All our segments, such as, Live chat, E-Learning, Greetings etc. are designed to ensure highest possible outcome for both sides of the coin, i.e. the fans and the superstars. {"\n"} {"\n"}

The technology is cutthroat, sophisticated, vast under the surface. Yet it is very user friendly. And above all it serves the purpose spectacularly- the purpose of being the bridge between the superstars and their superfans
            </Text>
      </ScrollView>
          </View>

        </View>

      </SafeAreaView>
    </View>

  )
}

export default About

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  }
})