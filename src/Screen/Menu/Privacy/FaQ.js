import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ScrollView} from 'react-native-gesture-handler';

function CustomHeader(props) {
  return (
    <View style={{backgroundColor: '#343434', paddingVertical: 10}}>
      <TouchableOpacity
        style={{flexDirection: 'row', marginLeft: 10}}
        onPress={() => props.onPress()}>
        <Text style={{color: 'white'}}>
          <Icon name="arrow-back" size={25} />
        </Text>
        <Text style={{color: 'white', fontSize: 18, marginLeft: 4}}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const FaQ = ({navigation}) => {
  function handleBack() {
    return navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <CustomHeader onPress={handleBack} />

        <View style={{margin: 10}}>
          <View>
            <Text
              style={{
                color: '#ffaa00',
                fontSize: 19,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              FAQ
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#1F1F1F',
              margin: 10,
              padding: 10,
              borderRadius: 10,
              height: '87%',
              overflow: 'scroll',
            }}>
            <ScrollView>

            {[1,2,3,4,5].map((i,index)=>{
              return <View key={String(index)}>
              <TouchableOpacity

                style={{
                  margin: 10,
                  backgroundColor: 'black',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    paddingVertical: 10,
                  }}>
                  Q{i}. I have a Technical I need resolved, Who do I email?
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  marginHorizontal: 10,
                  backgroundColor: '#2A3942',
                  padding: 5,
                }}>
                <Text style={{color: 'white'}}>
                  Ans: Lorem ipsum may be used as a placeholder before final
                  copy is available.
                </Text>
              </View>
              </View>
            })}
             

        

           
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default FaQ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
