import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  topCard: {
    backgroundColor: '#282828',
    margin: 8,
    borderRadius: 5,
    paddingBottom: 20,
  },
  fonts: {
    color: '#FFAD00',
    textAlign: 'center',
    marginTop: 10,
  },
  lineImg: {
    marginVertical: 3,
  },
  lineImgView: {
    alignItems: 'center',
  },
  formText: {
    color: 'white',
    marginBottom: 5,
    // width:'50%'
  },
  formText2: {
    color: 'white',
    marginBottom: 5,
  },
  textInputStyleTime: {
    width: 160,
    borderWidth: 1,
    borderColor: '#FFAD00',
    borderRadius: 10,
    backgroundColor: '#343434',
    height: 38,
    color: '#fff',
    paddingLeft: 10,
  },
  textInputView: {
    alignItems: 'center',
    marginVertical: 5,
  },
  textInputView3: {
    color: 'white',
    margin: 10,
    marginBottom: 5,
    backgroundColor: '#FFAD00',
    width: '35%',
    borderRadius: 5,
  },
  textInputPass: {
    textAlign: 'center',
    paddingVertical: 4,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
});

export default styles;
