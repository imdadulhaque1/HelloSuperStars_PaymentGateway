import React, { useEffect, useState, useContext } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-root-toast';
import { FlatGrid } from 'react-native-super-grid';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Icon from 'react-native-vector-icons/FontAwesome';
import imagePath from '../../../Constants/imagePath';
import { BackHandler } from "react-native";
import styles from './FollowersStyle';
import { useAxiosGet } from '../../../CustomHooks/useAxiosGet';
import AppUrl from '../../../RestApi/AppUrl';
import { AuthContext } from '../../../Constants/context';
import axios from 'axios';
const dummyData = [
  {
    name: 'Shakib All Hasan',
    id: 1,
    imgUrl: imagePath.SakibBalHasan,
    type: 'Unfollow',
  },
  {
    name: 'Ferdous Ahamed',
    id: 2,
    imgUrl: imagePath.Ferdous,
    type: 'Unfollow',
  },

  {
    name: 'Momotaz Begum',
    id: 3,
    imgUrl: imagePath.Momotaz,
    type: 'Unfollow',
  },

  {
    name: 'Purnima',
    id: 4,
    imgUrl: imagePath.Purnima,
    type: 'Unfollow',
  },
];
const suggetionDummy = [
  {
    name: 'Sulaiman Sukoon',
    id: 1,
    imgUrl: imagePath.Sulaiman,
    type: 'Follow',
  },
  {
    name: 'Shakib Khan',
    id: 2,
    imgUrl: imagePath.ShakibKhan,
    type: 'Follow',
  },
];



const MenuFollowers = ({ setMenuNavigator,
  MenuNavigator,
  menuChange,
  setMenuChange,
  setFollowerArrayId,
  resData,
  buffer,
  HandelGetData
}) => {


  const [followingCat, setStarCategory] = useState([]);
  const [followingStarCat, setFollowStarCategory] = useState([]);
  const [followersIds, setFollowersIds] = useState([])
  const { useInfo, axiosConfig } = useContext(AuthContext);

  useEffect(() => {
    setStarCategory(resData.allSuperstar);
    setFollowStarCategory(resData.followStarCategory);
    setFollowersIds(resData.followingStarCategory)
    setFollowerArrayId(resData.followingStarCategory?.split(","))
  }, [resData])


  const handleFollowing = (id) => {
    if (!followingStarCat.includes(id)) {

      setFollowStarCategory([...followingStarCat, id]);
      handleChange([...followingStarCat, id]);
    }

    if (followingStarCat.includes(id)) {

      const checked_data = followingStarCat.filter((item) => item !== id);
      setFollowStarCategory(checked_data);
      handleChange(checked_data);
    }
  }


  const handleChange = (data) => {
    let followData = {
      'star_id': JSON.stringify(data)
    }
    axios.post(AppUrl.followStor, followData, axiosConfig).then((res) => {
      console.log(res.data)
      if (res.data.status === 200) {
        setFollowersIds(res.data.followers)
        setFollowerArrayId(res.data.followers?.split(","))
        Toast.show("Followers list updated", Toast.durations.SHORT);
      }
    }).catch((err) => {

      console.log(err.message)
    });
  }
  //============back handler==================
  function handleBackButtonClick() {
    setMenuNavigator('MenuHome');
    setMenuChange(0);
    return true;

  }

  React.useEffect(() => {
    HandelGetData()
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };

  }, []);




  const RenderStarsFollowList = ({ item }) => {
    if (followersIds.includes(item.super_star.id)) {
      return (
        <View>
          <View style={styles.followCard}>
            <View style={styles.followContents}>
              <Image style={styles.followImage} source={{ uri: AppUrl.MediaBaseUrl + item?.super_star?.image }} />
              <Text style={styles.followText}>SuperStar</Text>
              <Text
                style={[styles.text, { marginVertical: 8, fontSize: 18 }]}>
                {item.super_star.first_name + " " + item.super_star.last_name}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                handleFollowing(item?.super_star?.id);
              }}
              style={
                item.type === 'Follow'
                  ? styles.followButton
                  : styles.unfollowButton
              }>
              <Text style={styles.followBtnText}>
                <Icon
                  name={
                    followingStarCat.includes(item.super_star.id)
                      ? 'plus-circle'
                      : 'check-circle'
                  }
                  size={18}
                />{' '}
                {followingStarCat.includes(item.super_star.id) ? "Following" : "Follow"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

  }

  const RenderStarsSugestedList = ({ item }) => {
    if (!followersIds.includes(item.super_star.id)) {
      return (
        <View>
          <View style={styles.followCard}>
            <View style={styles.followContents}>
              <Image style={styles.followImage} source={{ uri: AppUrl.MediaBaseUrl + item?.super_star?.image }} />
              <Text style={styles.followText}>SuperStar</Text>
              <Text
                style={[styles.text, { marginVertical: 8, fontSize: 18 }]}>
                {item.super_star.first_name + " " + item.super_star.last_name}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                handleFollowing(item?.super_star?.id);
              }}
              style={
                item.type === 'Follow'
                  ? styles.followButton
                  : styles.unfollowButton
              }>
              <Text style={styles.followBtnText}>
                <Icon
                  name={
                    followingStarCat.includes(item.super_star.id)
                      ? 'plus-circle'
                      : 'check-circle'
                  }
                  size={18}
                />{' '}
                {followingStarCat.includes(item.super_star.id) ? "Following" : "Follow"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

  }



  return (
    <View>

      {/* =====line row end ==== */}
      {/* <SwiperFlatList
        style={{marginVertical: 10}}
        autoplay
        autoplayDelay={5}
        autoplayLoop
        data={Category}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => setSelect(item)}
              style={
                item === select
                  ? {
                      backgroundColor: 'gold',
                      marginHorizontal: 10,
                      borderRadius: 10,
                      height: 35,
                      width: 150,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }
                  : {
                      backgroundColor: '#202020',
                      marginHorizontal: 10,
                      borderRadius: 10,
                      height: 35,
                      width: 150,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }
              }>
              <Text
                style={
                  item === select
                    ? [
                        styles.text,
                        {
                          paddingHorizontal: 20,
                          paddingVertical: 5,
                          color: 'black',
                          fontWeight: 'bold',
                        },
                      ]
                    : [
                        styles.text,
                        {
                          paddingHorizontal: 20,
                          paddingVertical: 5,
                        },
                      ]
                }>
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}></SwiperFlatList> */}
      {buffer &&
        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
          <Image source={imagePath.loadingGif} style={{ height: 20, width: 30, margin: 10 }} />
        </View>
      }

      {!buffer &&
        <View
          style={{
            backgroundColor: '#202020',
            margin: 10,
            borderRadius: 18,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            minHeight: 10
          }}>

          <Text
            style={[
              styles.text,
              {
                paddingVertical: 8,
                fontWeight: 'bold',
              },
            ]}>
            You Follows
          </Text>


        </View>
      }


      <View style={styles.followMainrow}>
        <>

          {/* here i used flat grid package if any problem in backend please use top commented code  */}
          <FlatGrid
            itemDimension={160}
            data={followingCat}
            renderItem={RenderStarsFollowList}
          />
        </>
      </View>
      {/* follow list end  */}


      {/* sugested list  */}
      {!buffer &&
        <View
          style={{
            backgroundColor: '#202020',
            margin: 10,
            borderRadius: 18,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>

          <Text
            style={[
              styles.text,
              {
                paddingVertical: 8,
                fontWeight: 'bold',
              },
            ]}>
            Suggissions
          </Text>

        </View>
      }

      <View style={styles.followMainrow}>
        <>
          {/* here i used flat grid package if any problerm in backend please use top commented code  */}
          <FlatGrid
            itemDimension={160}
            data={followingCat}
            renderItem={RenderStarsSugestedList}
          />
        </>
      </View>
    </View>
  );
};

export default MenuFollowers;
