import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useContext } from 'react';
import { BackHandler, Image, Text, TouchableOpacity, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { AuthContext } from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import navigationStrings from '../../../Constants/navigationStrings';
import AppUrl from '../../../RestApi/AppUrl';
import MenuNavigator from '../../../Screen/Menu/MenuNavigator';

// import { AuthContext } from '../../Constants/context';
// import imagePath from '../../Constants/imagePath'
// import navigationStrings from '../../Constants/navigationStrings';
// import AppUrl from '../../RestApi/AppUrl';

import styles from './ActivitiesCardStyle';


const AuctionActivityCard = ({ childActivityEventList, childActivityEventType,setMenuNavigator,setMenuChange }) => {
    const Navigation = useNavigation();
    const { useInfo, authContext } = useContext(AuthContext);







//============back handler==================
function handleBackButtonClick() {
    setMenuNavigator(MenuNavigator.MENUACTIVITIES);
    setMenuChange(0);
    return true;
    
    }
    
    React.useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
      };
    }, []);
    
    
    //============back handler==================



    // const width = Dimensions.get('window').width;
    const renderEventItem = ({ item }) => {
        let event = item.auction;

        let EventDateWithEndTime = new Date(moment(event.bid_to));
        let CurrentDateWithTime = new Date();

        let days = parseInt((EventDateWithEndTime - CurrentDateWithTime) / (1000 * 60 * 60 * 24));
        let hours = parseInt((EventDateWithEndTime - CurrentDateWithTime) / (1000 * 60 * 60) % 24);
        let minutes = parseInt(Math.abs(EventDateWithEndTime.getTime() - CurrentDateWithTime.getTime()) / (1000 * 60) % 60);
        const handleAuctionParticipate = () => {
            Navigation.navigate(navigationStrings.MARKETPLACE, {
                screen: navigationStrings.AUCTIONPARTICIPATENOW,
                params: {
                    product: item.auction,
                },
            });
        }
        return (

            <View style={{ flexDirection: 'row' }}>

                <View style={styles.Container}>

                    {event?.product_image == null
                        ? <Image source={imagePath.AuditionTitle} style={styles.ImgBanner} />
                        : <Image source={{
                            uri: `${AppUrl.MediaBaseUrl + event?.product_image}`,
                        }} style={styles.ImgBanner}
                        />
                    }
                    <Text style={styles.Title}>{event?.title}</Text>

                    <View style={styles.DateBox}>
                        <>
                            {EventDateWithEndTime.getTime() > CurrentDateWithTime.getTime() ? (
                                <>
                                    <View style={styles.DateColor} >
                                        <Text style={styles.textDay}>{days}</Text>
                                        <Text style={styles.textSec}>DAYS</Text>
                                    </View>

                                    <View style={styles.DateColor} >
                                        <Text style={styles.textDay}>{hours}</Text>
                                        <Text style={styles.textSec}>HOURS</Text>
                                    </View>

                                    <View style={styles.DateColor} >
                                        <Text style={styles.textDay}>{minutes}</Text>
                                        <Text style={styles.textSec}>MIN</Text>
                                    </View>
                                </>
                            ) : (
                                <>
                                    <View style={styles.DateColor} >
                                        <Text style={styles.textDay}>00</Text>
                                        <Text style={styles.textSec}>DAYS</Text>
                                    </View>

                                    <View style={styles.DateColor} >
                                        <Text style={styles.textDay}>00</Text>
                                        <Text style={styles.textSec}>HOURS</Text>
                                    </View>

                                    <View style={styles.DateColor} >
                                        <Text style={styles.textDay}>00</Text>
                                        <Text style={styles.textSec}>MIN</Text>
                                    </View>
                                </>
                            )}
                        </>

                        {EventDateWithEndTime.getTime() < CurrentDateWithTime.getTime() ? (
                            <View style={styles.Join}>
                                <TouchableOpacity onPress={handleAuctionParticipate}>
                                    <Text style={styles.JoinText}>Bid Time End</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <>
                                <View style={styles.Join}>
                                    <TouchableOpacity onPress={handleAuctionParticipate}>
                                        <Text style={styles.JoinText}>Bid Now</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </View>
                    <View style={styles.bannerTag}>
                        <Image source={imagePath.BgTag} />
                    </View>

                </View>
            </View>
        )
    }

    return (
        <>
            <View style={styles.Header}>
                <Image source={imagePath.BgLane} style={styles.HeaderImg} />
                <Text style={styles.HeaderText}>Auction</Text>
            </View>

            <FlatGrid
                itemDimension={150}
                data={childActivityEventList}
                renderItem={renderEventItem}
            />
        </>
    )
}

export default AuctionActivityCard