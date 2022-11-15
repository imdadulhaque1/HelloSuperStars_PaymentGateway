// import {
//   Button,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,

import { ReactNativeForegroundService } from "@videosdk.live/react-native-sdk";

// } from 'react-native';
// import React, {useContext, useEffect, useState} from 'react';
// import HeaderComp from '../../../Components/HeaderComp';
// import {SafeAreaView} from 'react-native-safe-area-context';

// import LinearGradient from 'react-native-linear-gradient';
// import CheckBox from '@react-native-community/checkbox';
// import axios from 'axios';
// import AppUrl from '../../../RestApi/AppUrl';
// import {AuthContext} from '../../../Constants/context';
// import TitleHeader from '../../../Components/TitleHeader';
// const initialState = {
//   All: false,
//   Wooing: false,
//   Traveling: false,
//   Singing: false,
//   Playing: false,
// };

// const InterestInfo = ({navigation}) => {
//   const [state, setState] = useState(initialState);
//   const [toggleButton, setToggleButton] = useState(false);
//   const {axiosConfig} = useContext(AuthContext);
//   const [interests, setInterestType] = useState([]);
//   const [isCheck, setIsCheck] = useState([]);

//   useEffect(() => {
//     axios
//       .get(AppUrl.userEmploymentData, axiosConfig)
//       .then(res => {
//         if (res.status === 200) {
//           console.log(res.data);
//           setInterestType(res.data.allinteresttypes);
//           setIsCheck(res.data.interest_topic_id);
//         }
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }, []);

//   return (
//     <View style={{flex: 1, backgroundColor: 'black'}}>
//       <SafeAreaView>
//         <HeaderComp backFunc={() => navigation.goBack()} />
//         <TitleHeader title={'Interest information'}/>
//         <View style={{marginHorizontal:10,backgroundColor: '#202020',borderRadius:10}}>


//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               marginVertical: 10,
//             }}>
//             <CheckBox
//               disabled={false}
//               value={state.All}
//               tintColors={{true: '#F1A817', false: '#fff'}}
//               onValueChange={value =>
//                 setState({
//                   All: value,
//                   Wooing: value,
//                   Traveling: value,
//                   Singing: value,
//                   Playing: value,
//                 })
//               }
//             />
//             <Text style={styles.whiteText}>Select All</Text>
//           </View>

//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               marginVertical: 10,
//             }}>
//             <CheckBox
//               disabled={false}
//               value={state.Wooing}
//               tintColors={{true: '#F1A817', false: '#fff'}}
//               onValueChange={value => setState({...state, Wooing: value})}
//             />
//             <Text style={styles.whiteText}>Wooing</Text>
//           </View>

//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               marginVertical: 10,
//             }}>
//             <CheckBox
//               disabled={false}
//               value={state.Traveling}
//               tintColors={{true: '#F1A817', false: '#fff'}}
//               onValueChange={value => setState({...state, Traveling: value})}
//             />
//             <Text style={styles.whiteText}>Traveling</Text>
//           </View>

//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               marginVertical: 10,
//             }}>
//             <CheckBox
//               disabled={false}
//               value={state.Singing}
//               tintColors={{true: '#F1A817', false: '#fff'}}
//               onValueChange={value => setState({...state, Singing: value})}
//             />
//             <Text style={styles.whiteText}>Singing</Text>
//           </View>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               marginVertical: 10,
//             }}>
//             <CheckBox
//               disabled={false}
//               value={state.Playing}
//               tintColors={{true: '#F1A817', false: '#fff'}}
//               onValueChange={value => setState({...state, Playing: value})}
//             />
//             <Text style={styles.whiteText}>Playing</Text>
//           </View>

//           <TouchableOpacity style={{padding: 20}}>
//             <LinearGradient
//               style={styles.login_btn}
//               colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}>
//               <Text style={{color: 'black'}}>Save</Text>
//             </LinearGradient>
//             {/* <Text style={styles.input_title}>LOGIN</Text> */}
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     </View>
//   );
// };

// export default InterestInfo;

// const styles = StyleSheet.create({
//   login_btn: {
//     // backgroundColor: '#D4AF37',
//     borderWidth: 1,
//     // borderColor: '#D4AF37',
//     borderRadius: 50,
//     paddingHorizontal: 55,
//     paddingVertical: 10,
//     borderRadius: 50,
//     alignItems: 'center',
//     marginTop: 10,

//     color: 'black',
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     marginVertical: 20,
//     marginHorizontal: 10,
//   },
//   checkbox: {
//     alignSelf: 'center',
//   },
//   label: {
//     margin: 8,
//   },
//   whiteText: {
//     color: '#fff',
//   },
// });

import { View, Text } from 'react-native'
import React from 'react'

const InterestInfo = () => {
  return (
    <View>
      <Text>InterestInfo</Text>
    </View>
  )
}

export default InterestInfo