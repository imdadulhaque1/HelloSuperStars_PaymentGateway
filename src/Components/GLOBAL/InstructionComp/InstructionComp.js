import React from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import RenderHtml from 'react-native-render-html';
import UnderlineImage from '../Reuseable/UnderlineImage';
// import {LinearTextGradient} from 'react-native-text-gradient';

function InstructionComp({title, instruction}) {
  const {width} = useWindowDimensions();
  const source = {
    html: `<div style='color:#e6e6e6'>${instruction ? instruction : ''}</div>`,
  };
  return (
    <>
      <View style={styles.topCard}>
        <Text style={styles.fonts}>{title}</Text>
        <UnderlineImage />

        <View
          style={{borderWidth: 0.2, borderColor: 'black', marginVertical: 10}}
        />
        {/* <UnderlineImage /> */}
        <RenderHtml contentWidth={width} source={source} />
      </View>
    </>
  );
}

export default InstructionComp;

const styles = StyleSheet.create({
  topCard: {
    backgroundColor: '#282828',
    margin: 8,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  fonts: {
    color: '#FFAD00',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5,
    fontSize: 20,
  },
});
