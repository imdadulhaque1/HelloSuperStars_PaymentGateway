//import liraries
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Toast from 'react-native-root-toast';
import * as Animatable from 'react-native-animatable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
// import {LinearTextGradient} from 'react-native-text-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoaderComp from '../../Components/LoaderComp';
import { AuthContext } from '../../Constants/context';
import imagePath from '../../Constants/imagePath';
import AppUrl from '../../RestApi/AppUrl';
// create a component
const Login = () => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const { authContext } = useContext(AuthContext);
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const [buffer, setBuffer] = useState(false);
  const [error, setError] = useState(null);
  const [showPass, setShowPass] = useState(true);

  const HandelLogin = () => {
    setBuffer(true);

    if (email != null || pass != null) {
      const data = {
        email: email,
        password: pass,
      };

      axios
        .post(AppUrl.UserLogin, data)
        .then(res => {
          //console.log(res.data)
          if (res.data.status === 200) {
            if (res.data.user.otp_verified_at) {
              setBuffer(false);
              authContext.signIn(res.data.token, res.data.user);
            } else {
              authContext.signUp(res.data.token, res.data.user);
              navigation.navigate('Otp', {
                phone: res.data.user.phone,
                user: {
                  token: res.data.token,
                  information: res.data.user,
                },
              });
            }
          } else {
            setBuffer(false);
            setError('user and password not match !!');
          }
        })
        .catch(err => {
          Toast.show(
            'Network Problem, Check you Internet',
            Toast.durations.SHORT,
          );
          setBuffer(false);
          console.log(err);
        });
    } else {
      setError('All field required !!');
      setBuffer(false);
    }
  };

  return (
    <>
      {buffer ? <LoaderComp /> : <></>}
      <KeyboardAwareScrollView>
        <ImageBackground
          source={imagePath.background}
          resizeMode="cover"
          style={
            windowWidth > 600 ? styles.containerWideScreen : styles.container
          }>
          <View style={styles.header}>
            <Animatable.Image
              animation="pulse"
              iterationCount="infinite"
              // duration="1500"

              source={imagePath.logo}
              style={{ height: 150, width: 150 }}
            />
          </View>

          <Animatable.View style={styles.footer} animation="slideInUp">

            <Text style={styles.title}>LOGIN</Text>

            <Text style={styles.inputText}>Email</Text>
            <View style={styles.input}>
              <Icon
                name="user"
                color={'#ffaa00'}
                size={20}
                style={styles.Icon}
              />
              <TextInput
                placeholder="Enter Your Email !"
                style={styles.input_fild}
                placeholderTextColor="#9e9e9e"
                onChangeText={newText => setEmail(newText)}
              />
            </View>
            <Text style={{ color: 'red', marginLeft: 8, marginBottom: -10 }}>
              {error}
            </Text>
            {/* password input  */}
            <Text style={styles.inputText}>Password</Text>
            <View style={styles.input}>
              <Icon
                name="lock"
                color={'#ffaa00'}
                size={20}
                style={styles.Icon}
              />
              <TextInput
                placeholder="Enter Your Password !"
                style={styles.input_fild}
                placeholderTextColor="#9e9e9e"
                secureTextEntry={showPass}
                onChangeText={newText => setPass(newText)}
              />
              <TouchableOpacity
                style={styles.password}
                onPress={() => setShowPass(!showPass)}>
                {showPass ? (
                  <Entypo name="eye-with-line" size={20} color={'#ffaa00'} />
                ) : (
                  <Entypo name="eye" size={20} color={'#ffaa00'} />
                )}
              </TouchableOpacity>
            </View>
            {/* button */}
            <View style={styles.btn_container}>
              <TouchableOpacity
                style={styles.sign_btn}
                onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.input_title}>SIGN UP</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={HandelLogin}>
                <LinearGradient
                  style={styles.login_btn}
                  colors={['#F1A817', '#F5E67D', '#FCB706', '#DFC65C']}>
                  <Text style={{ color: 'black' }}>LOGIN</Text>
                </LinearGradient>
                {/* <Text style={styles.input_title}>LOGIN</Text> */}
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    </>
  );
};

const windowHeight = Dimensions.get('window').height;
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
  },
  Icon: {
    marginTop: 8,
  },
  password: {
    marginTop: 8,
    marginLeft: '8%',
  },
  containerWideScreen: {
    flex: 1,
    height: windowHeight,
    paddingHorizontal: 150,
  },
  input: {
    justifyContent: 'center',
    alignItems: 'stretch',
    borderWidth: 1,
    height: 40,
    borderColor: '#ffaa00',
    borderRadius: 50,
    paddingLeft: 16,
    marginTop: 10,
    color: '#ffaa00',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  input_fild: {
    marginLeft: 10,
    color: '#ffaa00',
    height: 40,
    width: '76%',
    // backgroundColor: 'red'
  },
  inputText: {
    marginTop: 20,
    marginLeft: 5,
    color: '#ffaa00',
  },
  input_title: {
    color: '#ddd',
  },

  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 2,
    backgroundColor: 'Loadergba(0, 0, 0, 0.212)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    //   borderTopWidth: 1.5,
    //   borderRightWidth: 1.5,
    //   borderLeftWidth:1.5,
    //   borderColor: "#D4AF37",
  },

  title: {
    color: '#ffaa00',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  btn_container: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',

  },

  login_btn: {
    // backgroundColor: '#D4AF37',
    borderWidth: 1,
    // borderColor: '#D4AF37',
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 30,
    color: 'black',
  },

  sign_btn: {
    borderWidth: 1,
    borderColor: '#ffaa00',
    borderRadius: 50,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 30,

    color: 'black',
  },
});

//make this component available to the app
export default Login;
