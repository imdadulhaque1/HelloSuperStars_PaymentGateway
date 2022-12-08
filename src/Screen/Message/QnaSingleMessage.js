import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppUrl from '../../RestApi/AppUrl';
import { AuthContext } from '../../Constants/context';


const QnaSingleMessage = ({ data }) => {
    const [music, setMusic] = React.useState(null);
    const [msgIcon, setMsgIcon] = useState(true);
    const { useInfo } = useContext(AuthContext)
    //<================= Audio playing funciton ==================>
    const play = () => {

        let summer = new Sound(AppUrl.MediaBaseUrl + data?.media,
            Sound.MAIN_BUNDLE,
            err => {
                if (err) {
                    console.log('error', err);
                    return;
                }
                summer.play(success => {
                    console.log('music playing', success);
                });
            },
        );
        console.log('success,', summer);
        setMusic(summer);
    };
    function handlePlayMusic() {
        play();
        setMsgIcon(false);
    }
    function handlePauseMusic() {
        music.stop();
        setMsgIcon(true);
    }
    //<================= Audio playing funciton ==================>
    return (
        <View style={data.sender_id === useInfo.id ? styles.remoteChatStyle : styles.ownChatStyle}>
            <Image
                source={{
                    uri: AppUrl.MediaBaseUrl + data.sender_image,
                }}
                style={styles.UserImg}
            />
            <View style={data.sender_id === useInfo.id ? styles.remoteChatBodyAudio : styles.ownChatBodyAudio}>
                {data.msg_type === 'text' ?
                    <Text style={{ color: '#000' }}>
                        {data.text}
                    </Text>
                    :
                    <TouchableOpacity
                        onPress={msgIcon ? handlePlayMusic : handlePauseMusic}>
                        <Text style={{ color: 'black', marginLeft: 5, padding: 5 }}>
                            <Icon
                                name={`${msgIcon ? 'play-circle' : 'pause-circle'}`}
                                size={22}
                                color={'white'}
                            />
                        </Text>
                    </TouchableOpacity>
                }

            </View>
            <View style={{ justifyContent: 'center' }}>
                <Text style={{ color: 'gray' }}>12.3</Text>
            </View>
        </View>
    )
}

export default QnaSingleMessage

const styles = StyleSheet.create({
    sendIconStyle: {
        borderWidth: 1,
        borderColor: 'white',
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    Name: {
        color: 'white',
        fontSize: 20,
    },

    BorderA: {
        flex: 2,
        borderBottomWidth: 0.2,
        borderBottomColor: 'gray',
    },
    UnderLine: {
        flexDirection: 'row',
        paddingVertical: 20,
    },
    starNameT: {
        fontSize: 15,
        color: 'gray',
        paddingHorizontal: 10,
    },
    starName: {
        fontSize: 25,
        color: 'white',
        paddingHorizontal: 10,
    },

    starCardImgS: {
        borderRadius: 100,
    },

    StarPro: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        //    height:200,
    },

    UserImg: {
        width: 30,
        height: 30,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'gold',
    },
    UserImgTyping: {
        width: 30,
        height: 30,
        borderRadius: 100,
        borderWidth: 0.3,
        borderColor: 'gold',
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },

    StarImg: {
        width: 40,
        height: 40,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'gold',
    },

    inputTxt: {
        paddingLeft: 10,
        backgroundColor: '#2C323A',
        height: 39,
        borderRadius: 20,
        color: 'white',
    },
    sendBtn: {
        backgroundColor: '#1DAECA',
        height: 30,
        width: 30,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },

    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'black',
        width: '100%',
        height: 50,
        position: 'absolute',
        bottom: 0,
        borderTopColor: 'gray',
        borderWidth: 1,
    },
    ownChatStyle: {
        flexDirection: 'row',
        marginVertical: 8,
        // justifyContent: 'flex-end',
        marginLeft: 10,
    },
    remoteChatStyle: {
        flexDirection: 'row',
        marginVertical: 8,
        justifyContent: 'flex-end',
        marginRight: 10,
    },

    ownChatBody: {
        backgroundColor: '#E4E3E9',
        justifyContent: 'center',
        marginHorizontal: 8,
        width: '50%',
        borderRadius: 20,
    },
    remoteChatBody: {
        backgroundColor: '#0E82FD',
        justifyContent: 'center',
        marginHorizontal: 8,
        width: '50%',
        borderRadius: 20,
    },
    remoteChatBodyAudio: {
        backgroundColor: '#0E82FD',
        justifyContent: 'center',
        marginHorizontal: 8,
        width: '20%',
        borderRadius: 20,
        alignItems: 'center'
    },

    ownChatBodyAudio: {
        backgroundColor: '#E4E3E9',
        justifyContent: 'center',
        marginHorizontal: 8,
        width: '20%',
        borderRadius: 20,
        alignItems: 'center'
    },
});