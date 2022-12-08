import React from "react";
import { View, StyleSheet } from "react-native";
import ParticipantView from "./ParticipantView";
import {
  getGridRowsAndColumns,
  getGridForMainParticipants,
  calcQuality,
} from "../utils/common";
import { useMeetingAppContext } from "../context/MeetingAppContextDef";
import { useMeeting, useParticipant } from "@videosdk.live/react-native-sdk";
import VideoChatParticipantView from "./VideoChatParticipantView";
import { useContext } from "react";
import { MeetingContex } from "../../../VideoSdk";
import { create } from "react-test-renderer";

const ActiveParticipantsGrid = ({ toggleBars, isLandscape }) => {
  const isMobile = true;
  const isTab = false;

  const mMeeting = useMeeting();

  const participants = mMeeting?.participants;

  const { mainViewParticipants } = useMeetingAppContext();
  const { type } = useContext(MeetingContex)

  const { singleRow } = React.useMemo(() => {
    const participants = [...mainViewParticipants];

    const participantsCount = participants?.length || 1;

    const gridInfo = getGridRowsAndColumns({
      participantsCount,
      isMobile,
      isTab,
      isLandscape: isLandscape,
    });

    return getGridForMainParticipants({ participants, gridInfo });
  }, [mainViewParticipants, isLandscape, isMobile, isTab]);

  //self video 
  const myVideo = (participantId) => {
    const {
      displayName,
      webcamStream,
      webcamOn,
      micOn,
      isLocal,
      setQuality,
      isActiveSpeaker,
      setViewPort
    } = useParticipant(participantId);


  }

  return (
    <View
      style={{
        flex: 1,
        marginVertical: 8,
        marginHorizontal: 8,
        marginBottom: 12,
      }}
    >
      {singleRow.map(({ participantId, left, top, height, width }) => (
        <>
          {type !== "videoChat" ?
            //for one to many video chat
            <View
              key={participantId}
              style={{
                borderRadius: 4,
                overflow: "hidden",
                position: "absolute",
                left: `${left}%`,
                top: `${top}%`,
                height: `${height}%`,
                width: `${width}%`,
              }}
            >

              <ParticipantView
                quality={calcQuality(participants?.size || 1)}
                participantId={participantId}
                presstoHide={() => {
                  toggleBars();
                }}
              />
            </View>
            :
            //for one to one video chat
            <VideoChatParticipantView
              quality={calcQuality(participants?.size || 1)}
              participantId={participantId}
              presstoHide={() => {
                toggleBars();
              }}
            />
          }


        </>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({


})

export default ActiveParticipantsGrid;
