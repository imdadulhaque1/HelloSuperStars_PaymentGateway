import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import HeaderComp from '../../../Components/HeaderComp';
import {Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import navigationStrings from '../../../Constants/navigationStrings';
import {SafeAreaView} from 'react-native-safe-area-context';

function SettingsTitle({title, icon, clickFunc}) {
  return (
    <TouchableOpacity
      style={{paddingHorizontal: 10, marginVertical: 8}}
      onPress={() => clickFunc(title)}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.centerView}>{icon}</View>
          <View style={styles.centerView}>
            <Title style={{fontSize: 15, color: '#fff'}}>{title}</Title>
          </View>
        </View>

        <View style={styles.centerView}></View>
      </View>
      <View
        style={{borderWidth: 0.2, borderColor: 'gray', marginVertical: 8}}
      />
    </TouchableOpacity>
  );
}

const Settings = ({navigation}) => {
  function handleRoute(title) {
    if (title === 'Personal Information') {
      return navigation.navigate(navigationStrings.PERSONALINFO);
    }
    if (title === 'Educational Information') {
      return navigation.navigate(navigationStrings.EDUCATIONINFO);
    }
    if (title === 'Employment Information') {
      return navigation.navigate(navigationStrings.EMPLOYMENTINFO);
    }

    if (title === 'Interest Information') {
      return navigation.navigate(navigationStrings.INTERESTINFO);
    }

    if (title === 'Security Information') {
      return navigation.navigate(navigationStrings.SECURITYINFO);
    }

    if (title === 'Report Information') {
      return navigation.navigate(navigationStrings.REPORTINFO);
    }
    if (title === 'Educational Information') {
      return navigation.navigate(navigationStrings.EDUCATIONINFO);
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <HeaderComp backFunc={() => navigation.goBack()} />
        <View style={{margin: 10}}>
          <Text style={styles.titile}>Settings</Text>

          <SettingsTitle
            title="Personal Information"
            icon={<Icon name="user-circle" size={20} color="#fff" />}
            clickFunc={handleRoute}
          />

          <SettingsTitle
            title="Educational Information"
            icon={<FontAwesome5 name="user-graduate" size={20} color="#fff" />}
            clickFunc={handleRoute}
          />
          <SettingsTitle
            title="Employment Information"
            icon={<MaterialIcons name="work" size={20} color="#fff" />}
            clickFunc={handleRoute}
          />
          <SettingsTitle
            title="Interest Information"
            icon={<FontAwesome5 name="brain" size={20} color="#fff" />}
            clickFunc={handleRoute}
          />
          <SettingsTitle
            title="Security Information"
            icon={<MaterialIcons name="security" size={20} color="#fff" />}
            clickFunc={handleRoute}
          />
          <SettingsTitle
            title="Report Information"
            icon={<MaterialIcons name="report" size={20} color="#fff" />}
            clickFunc={handleRoute}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  titile: {
    color: '#fff',
    fontSize: 25,
    marginLeft:10,
    marginBottom:10
  },
  centerView: {marginHorizontal: 5, justifyContent: 'center'},
});
