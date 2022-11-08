import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },

  line: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    marginVertical: 10,
    width: '40%',
  },
  lineText: {
    // width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  category: {
    backgroundColor: '#202020',
    marginHorizontal: 10,
    paddingHorizontal: 27,
    paddingVertical: 5,
    borderRadius: 5,
  },
  //star category
  followMainrow: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
  },
  followCard: {
    backgroundColor: '#202020',
    borderRadius: 10,
    // width: '48%',
    marginHorizontal: 3,
    borderWidth: 2,
    borderColor: 'gold',
  },
  followContents: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  followImage: {
    height: 80,
    width: 80,
    borderRadius: 100,
    marginVertical: 5,
  },
  followText: {
    color: 'white',
    marginVertical: 2,
    fontSize: 10,
  },
  unfollowButton: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingBottom: 2,
  },
  followButton: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    // backgroundColor: 'gold',
  },
  followBtnText: {
    textAlign: 'center',
    color: 'white',
    padding: 5,
  },
});

export default styles;
