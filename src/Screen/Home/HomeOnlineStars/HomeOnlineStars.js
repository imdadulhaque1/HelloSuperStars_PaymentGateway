import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { AuthContext } from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import navigationStrings from '../../../Constants/navigationStrings';
import AppUrl from '../../../RestApi/AppUrl';
import styles from './styles';

export default function HomeOnlineStars() {
  const Navigation = useNavigation();
  const { axiosConfig, socketData, socket } = useContext(AuthContext);
  const [loder, setLoder] = useState(true);
  const [starList, setStarList] = useState([]);

  useEffect(() => {
    getAllPost();


  }, []);

  const getAllPost = () => {
    setLoder(true);
    axios
      .get(AppUrl.AlluserList, axiosConfig)
      .then(res => {
        setLoder(false);
        setStarList(res?.data?.stars);
      })
      .catch(err => {
        setLoder(false);
        console.log(err);
      });
  };


  const [onlineSuperStar, setOnlineSuperStar] = useState([])
  const [starOnline, setStarOnline] = useState([])
  const prevRates = starOnline?.map((item) => (item.id))

  useEffect(() => {

    socketData.on('recive_online_star', (data) => {
      if (data) {
        setStarOnline((prev) => [...prev, data && data.userInfo]);
      }
      console.log(data.activeStar)
    })
    socketData.on('recive_offonline_star', (data) => {
      console.log('offline star---', data)
    })

  }, [socketData])

  useEffect(() => {
    if (starOnline) {
      sortOnLineStar()
    }
  }, [starOnline])




  const sortOnLineStar = () => {
    let keepRateOrder = starList?.sort((a, b) => {
      if ((prevRates.includes(a.id))) return -1
      if (!(prevRates.includes(a.id))) return 1
      if ((prevRates.includes(b.id))) return 1
      if (!(prevRates.includes(b.id))) return -1

    })
    setOnlineSuperStar(keepRateOrder)
  }


  function handleStarProfile(data) {
    return Navigation.navigate(navigationStrings.STARPROFILE, {
      payload: data,
    });
  }

  return (
    <>
      <View style={styles.topContainer}>
        <View style={styles.textContainer}>

          <Text style={styles.onlineText}>Stars Online</Text>

        </View>
        <ScrollView horizontal style={{ marginHorizontal: 8 }}>
          {loder &&
            [1, 2, 3, 4, 5, 6, 7].map(index => (
              <View key={index} style={styles.container}>
                <SkeletonPlaceholder
                  backgroundColor="#2e2e2e"
                  highlightColor="#3d3d3d"
                  height="200">
                  <SkeletonPlaceholder.Item
                    width={50}
                    height={50}
                    borderRadius={100}
                    marginLeft={5}
                    marginRight={3}
                  />
                </SkeletonPlaceholder>
              </View>
            ))}
          {onlineSuperStar?.length !== 0 ? onlineSuperStar?.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleStarProfile(item)}>
              <View style={styles.container}>
                <Image
                  style={styles.starCardImg}
                  source={
                    item.image == 'null'
                      ? imagePath.noImageUser
                      : { uri: AppUrl.MediaBaseUrl + `/${item.image}` }
                  }
                />
                {prevRates.includes(item.id) &&
                  <View style={styles.dot}></View>
                }
              </View>
            </TouchableOpacity>
          )) : starList && starList.map((item, index) =>
            <TouchableOpacity
              key={index}
              onPress={() => handleStarProfile(item)}>
              <View style={styles.container}>
                <Image
                  style={styles.starCardImg}
                  source={
                    item.image == 'null'
                      ? imagePath.noImageUser
                      : { uri: AppUrl.MediaBaseUrl + `/${item.image}` }
                  }
                />
                {/* {prevRates.includes(item.id) &&
                  <View style={styles.dot}></View>
                } */}
              </View>
            </TouchableOpacity>
          )

          }
        </ScrollView>
      </View>
    </>
  );
}
