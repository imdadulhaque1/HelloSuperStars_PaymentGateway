import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    backgroundColor: '#242424',
    marginBottom: 5,
    marginTop: 3

  },
  textContainer: {
    justifyContent: 'center',


  },
  onlineText: {
    color: '#01FF67',
    fontSize: 11,
    backgroundColor: 'black',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 50,
    marginLeft: 7,
  },
  container: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#242424',
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 100,
    position: 'relative',

    padding: 2,
    borderWidth: 1,
    borderColor: '#FFAD00',


  },
  dot: {
    height: 9,
    width: 9,

    backgroundColor: '#01FF67',
    position: 'absolute',
    borderRadius: 100,
    left: 38,
    top: 38,
  },
  text: {
    color: 'pink',
  },
  starCardImg: {
    width: '100%',
    height: '100%',
    borderRadius: 100
  },
});

export default styles;
