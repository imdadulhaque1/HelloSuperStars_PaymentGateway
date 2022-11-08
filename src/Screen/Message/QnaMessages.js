import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState, useRef } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import EmojiSelector from 'react-native-emoji-selector';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../../Constants/context';
import imagePath from '../../Constants/imagePath';
import AppUrl from '../../RestApi/AppUrl';
import moment from 'moment';
import { ActionSheet, Button } from 'react-native-ui-lib';
import { LogBox } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { readFile } from "react-native-fs";

import CountDown from 'react-native-countdown-component';
import MatarialIcon from 'react-native-vector-icons/MaterialIcons';
LogBox.ignoreLogs(['EventEmitter.removeListener']);

import axios from 'axios';
import QnaSingleMessage from './QnaSingleMessage';
import { timecoundFunc } from '../../CustomHelper/timecoundFunc';
const data = [1, 2, 3, 4, 5, 6];
// var room_id = 12;
// var group_id = 134;

const audioRecorderPlayer = new AudioRecorderPlayer();
const QnaMessages = ({ route }) => {
    const { messageInfo } = route.params;
    const { room_id, qna_id, data } = messageInfo;
    const { useInfo, socketData, axiosConfig } = useContext(AuthContext);
    const navigation = useNavigation();
    const [showEmoji, setShowEmoji] = React.useState(false);
    const [store, setStore] = React.useState(null);
    const [sendType, setSendType] = React.useState(false);
    const [visable, setvisible] = React.useState(false);
    const [text, setText] = useState();
    const [sessionEnd, setSessionEnd] = useState(true)
    const [leftTiem, setLeftTiem] = useState(data ? timecoundFunc(data?.qna_date.split(" ")[0] + " " + data?.qna_end_time) / 1000 : 0)

    console.log('message inforamtion', data.qna)

    const [audio, setAudio] = useState({
        type: null,
        base64: null,
    })

    const scrollViewRef = useRef();

    let time = new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes();
    let messageData = {
        sender_id: useInfo.id,
        room_id: room_id,
        sender_name: useInfo.first_name,
        sender_image: useInfo.image,
        qna_id: qna_id,
        msg_type: 'text',
        media: null,
        text: text,
        time: time,
    };

    const starNotify = [
        {
            key: 1,
            img: imagePath.StarZ,
            name: 'Mizanur Rahman Raihan',
            title: 'Hi man',
            time: '2 min ago',
        },
        {
            key: 2,
            img: imagePath.notify2,
            name: 'Ayman Siddique',
            title: 'Hlo',
            time: '4 min ago',
        },
    ];

    /**
     * start recording 
     */
    const [audioPick, setAudioPick] = useState(false)
    const onStartRecord = async () => {
        setAudioPick(true)
        const result = await audioRecorderPlayer.startRecorder();
        audioRecorderPlayer.addRecordBackListener((e) => {
            console.log(e)
            return;
        });
        console.log(result);
    };

    /**
     * stop recording
     */
    const onStopRecord = async () => {
        setAudioPick(false)
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();

        const base64String = await readFile(result, "base64");
        console.log(base64String)
        setAudio({
            type: 'video/mp3',
            base64: base64String,
        })
    };

    /**
     * chancel audio pick
     */
    const chancelAudioPick = () => {
        setvisible(false)
        onStopRecord()
        setAudio({
            type: null,
            base64: null,
        })
    }

    /**
     * audio send to server
     */
    const [uploadStatus, setUploadStatus] = useState(false)
    const AudioSentToServer = () => {

        setvisible(false)
        setUploadStatus(true)
        axios.post(AppUrl.OnlyMediaUpload, audio, axiosConfig).then((res) => {
            setUploadStatus(false)

            let mediaUpload = {
                sender_id: useInfo.id,
                room_id: room_id,
                sender_name: useInfo.first_name,
                sender_image: useInfo.image,
                qna_id: qna_id,
                msg_type: 'audio',
                media: res.data.path,
                text: null,
                time: time,
            };

            socketData.emit('qna_send_message', mediaUpload);
            setMsgData(prv => {
                return [...prv, mediaUpload];
            });


        }).catch((err) => {
            console.log(err)

        })
    }


    /**
 * message history get
 */
    const [messageLoad, setMessageLoad] = useState(true)
    const getMessageHistory = () => {
        axios.get(AppUrl.qnaChatHistory + room_id, axiosConfig).then((res) => {
            setMessageLoad(false)
            if (res.data.status === 200) {
                console.log(res.data.qna_history)
                setMsgData(res.data.qna_history)
            }
        }).catch((err) => {
            console.log(err)

        })
    }





    const handelType = async e => {
        console.log(e);
        let eventdata = {
            room_id: room_id,
            status: true,
        };
        await socketData.emit('type_event_send', eventdata);

        setText(e);
        if (e.length > 0) {
            setSendType(true);
        } else {
            setSendType(false);
        }
    };

    const [msgData, setMsgData] = useState([]);
    const handelSendMessage = async () => {


        await socketData.emit('qna_send_message', messageData);
        setMsgData(prv => {
            return [...prv, messageData];
        });
        setText('');
        setSendType(false)
    };

    const [onType, setOnType] = useState(false);
    useEffect(() => {
        socketData.on('qna_recive_message', data => {
            console.log('recive data', data)
            setMsgData(prv => {
                return [...prv, data];
            });
        });

        socketData.on('type_event_recive', data => {
            setOnType(data.status);
            console.log(data.status);
        });
    }, [socketData]);

    useEffect(() => {
        getMessageHistory()
        socketData.emit('join_room', room_id);
    }, []);


    return (
        <>
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                <View
                    style={{
                        backgroundColor: 'black',
                        padding: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        {/* <Image source={imagePath.logo} style={{ height: 30, width: 30 }} /> */}

                        <MatarialIcon name='arrow-back' size={25} color='#fff' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'white',
                            height: 30,
                            width: 30,
                            borderRadius: 100,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text>
                            <MaterialCommunityIcons
                                name="android-messages"
                                color={'#FFAD00'}
                                size={20}
                            />
                        </Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={{ backgroundColor: '#343434', marginVertical: 3, padding: 10 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: '15%' }} onPress={() => navigation.goBack()}>
                            <View>
                                <Image
                                    style={{ height: 40, width: 40, borderRadius: 50 }}
                                    source={{ uri: AppUrl.MediaBaseUrl + useInfo.image }}
                                />
                            </View>
                        </View>
                        <TouchableOpacity style={{ width: '70%', justifyContent: 'center' }}>
                            <Text style={styles.Name}>
                                {useInfo.first_name + ' ' + useInfo.last_name}
                            </Text>
                            {/* <TextInput  */}
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '20%' }}>
                            <Text style={styles.Name}>
                                <MaterialCommunityIcons
                                    name="dots-vertical"
                                    color={'white'}
                                    size={30}
                                />
                            </Text>
                            {/* <TextInput  */}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ paddingVertical: 5, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    {sessionEnd ?
                        <CountDown
                            // until={totalSecond}
                            until={leftTiem}
                            onFinish={() => setSessionEnd(false)}
                            // onPress={() => alert('hello')}
                            digitStyle={{
                                backgroundColor: 'black',
                                borderWidth: 2,
                                borderColor: '#FFAD00',
                                borderRadius: 10,
                            }}
                            digitTxtStyle={{ color: '#FFAD00' }}
                            timeLabelStyle={{
                                color: '#FFAD00',
                                fontWeight: 'bold',
                            }}
                            size={10}
                        />
                        :
                        <Text style={{ color: '#FFAD00', marginRight: 12, backgroundColor: 'black', paddingHorizontal: 10, borderColor: '#FFAD00', borderWidth: 1, padding: 5, borderRadius: 50 }}>Your session is Ended</Text>
                    }

                </View>
                {messageLoad ?
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: 300 }}>

                        <Image source={imagePath.lazyDog} style={{ height: 100, width: 200 }} />
                        <Text style={{ color: '#ffaa00', fontSize: 15 }}>Try to finding your message!</Text>
                    </View>
                    :
                    <ScrollView
                        ref={scrollViewRef}
                        onContentSizeChange={() =>
                            scrollViewRef.current.scrollToEnd({ animated: true })
                        }>
                        <View style={{ flex: 1, paddingBottom: 60 }}>
                            {showEmoji && (
                                <EmojiSelector
                                    onEmojiSelected={emoji => {
                                        setStore(emoji);
                                        setShowEmoji(false);
                                    }}
                                />
                            )}



                            {msgData && msgData.map((item, index) =>

                                <QnaSingleMessage data={item} key={index} />
                            )}



                            {uploadStatus &&
                                <View style={styles.remoteChatStyle}>
                                    <Image
                                        source={{
                                            uri: 'https://m.cricbuzz.com/a/img/v1/192x192/i1/c170912/shakib-al-hasan.jpg',
                                        }}
                                        style={styles.UserImg}
                                    />
                                    <View style={styles.ownChatBodyAudio}>
                                        <Text style={{ color: '#000', textAlign: 'center' }}>loading...</Text>
                                    </View>
                                    <View style={{ justifyContent: 'center' }}>
                                        <Text style={{ color: 'gray' }}>12.3</Text>
                                    </View>
                                </View>
                            }

                            {/*=============== VOice message code end here==========  */}


                        </View>
                    </ScrollView>
                }


                <View style={styles.bottomContainer}>
                    <View
                        style={{
                            justifyContent: 'center',
                            width: '75%',
                            position: 'relative',
                        }}>
                        <TextInput
                            onChangeText={e => handelType(e)}
                            value={text}
                            placeholder="Type your message here..."
                            placeholderTextColor={'gray'}
                            style={styles.inputTxt}
                        />
                    </View>
                    {sessionEnd &&
                        <>
                            {sendType ? (
                                <View style={{ justifyContent: 'center' }}>
                                    <TouchableOpacity
                                        style={styles.sendBtn}
                                        onPress={handelSendMessage}>
                                        <Icon name="send" color={'white'} size={15} />
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View style={{ justifyContent: 'center' }}>
                                    <TouchableOpacity
                                        style={styles.sendBtn}
                                        onPress={() => setvisible(true)}>
                                        <Icon name="microphone" color={'white'} size={15} />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </>
                    }
                </View>
            </View>
            {/*<================ Bottom modal start here ============> */}
            <ActionSheet
                containerStyle={{
                    backgroundColor: '#3F484E',
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    padding: 20,
                }}
                dialogStyle={{ backgroundColor: 'transparent' }}
                cancelButtonIndex={3}
                destructiveButtonIndex={0}
                renderAction={(item, index) => {
                    return (
                        <View key={index}>
                            <Text style={{ fontSize: 15, color: '#fff' }}>Recording....</Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    paddingVertical: 50,
                                    alignItems: 'center',
                                }}>
                                <TouchableOpacity style={styles.sendIconStyle} onPress={chancelAudioPick}>
                                    <Icon name="close" size={25} color="#ffaa00" />
                                </TouchableOpacity>
                                <Animatable.View
                                    animation={audioPick ? "pulse" : ""}
                                    easing="ease-out"
                                    iterationCount="infinite">
                                    <TouchableOpacity
                                        onPress={audioPick ? onStopRecord : onStartRecord}
                                        style={{
                                            borderWidth: 1,
                                            borderColor: '#ffaa00',
                                            height: 60,
                                            width: 60,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 50,
                                        }}>
                                        <Icon name="microphone" size={25} color={audioPick ? "red" : "#ffaa00"} />
                                    </TouchableOpacity>
                                </Animatable.View>
                                <View style={{ height: 35, width: 35, }}>
                                    {!audioPick &&

                                        <TouchableOpacity style={styles.sendIconStyle} onPress={AudioSentToServer}>
                                            <Icon name="send" size={20} color="#ffaa00" />
                                        </TouchableOpacity>
                                    }
                                </View>
                            </View>
                            <Text
                                style={{ textAlign: 'center', fontSize: 15, color: '#ffaa00' }}>
                                {/* Time: 10s */}
                            </Text>
                        </View>
                    );
                }}
                options={[{}]}
                visible={visable}
                onDismiss={() => setvisible(false)}
            />
        </>
    );
};

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
    },

    ownChatBodyAudio: {
        backgroundColor: '#E4E3E9',
        justifyContent: 'center',
        marginHorizontal: 8,
        width: '20%',
        borderRadius: 20,
    },
});

export default QnaMessages;
