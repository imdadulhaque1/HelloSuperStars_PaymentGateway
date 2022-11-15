import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MatarialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../Constants/context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import imagePath from '../Constants/imagePath';
const windowHeight = Dimensions.get('window').height;

const HeaderComp = ({action, text, status, backFunc}) => {
  const [showBar, setSHowBar] = React.useState(false);

  const navigation = useNavigation();

  const {authContext} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      {!!status ? (
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => authContext.signOut()}>
          <MaterialCommunityIcons name="logout" color={'#F7F7F7'} size={20} />
          <Text style={{color: 'white'}}>LOGOUT</Text>
        </TouchableOpacity>
      ) : (
        <>
          {backFunc ? (
            <TouchableOpacity style={{marginTop:5}} onPress={() => backFunc()}>
              <Text style={{color: 'white'}}>
                <Icon name="arrow-back" size={25}  />
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Image
                source={imagePath.logo}
                style={{height: 30, width: 30, borderRadius: 50}}
              />
            </TouchableOpacity>
          )}
        </>
      )}

      <View style={styles.row}>
        <View style={styles.Search}>
          {/* {showBar ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={{marginRight: 3,marginTop:3}}
                onPress={() => setSHowBar(false)}>
                <MatarialIcon
                  name="arrow-back-ios"
                  color={'#F7F7F7'}
                  size={18}
                />
              </TouchableOpacity>
              <TextInput
                style={styles.SearchBar}
                placeholder="Search Superstar"></TextInput>
            </View>
          ) : null} */}
        
            <TouchableOpacity
              onPress={()=>navigation.navigate('SearchPage')}
              style={styles.text}>
              <Icon name="search" size={22} color="#F7F6F6" />
            </TouchableOpacity>
     
        </View>

        <TouchableOpacity
          style={styles.Message}
          onPress={() => navigation.navigate('Message')}>
          <Text style={styles.text}>
            <AntIcon name="message1" color="#F7F6F6" size={18} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderComp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#343434',
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1.5,
    borderColor: '#000000',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    marginHorizontal: 0,
    // backgroundColor: '#b3b3b3',
    padding: 3,
    borderRadius: 50,
    padding: 7,
  },
  SearchBar: {
    borderColor: '#FFAD00',
    borderWidth: 0.5,
    width: 260,
    height: 26,
    padding: 3,
    borderRadius: 20,
    paddingLeft: 10,
    marginTop:4,
    backgroundColor: 'white',
  },
  row: {
    justifyContent: 'center',

    flexDirection: 'row',
  },
  row2: {
    justifyContent: 'center',
  },
});
