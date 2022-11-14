import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TitleHeader = ({title}) => {
  return (
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
          color:'#ffaa00'
        },
      ]}>
     {title.toUpperCase()}
    </Text>


  </View>
  )
}

export default TitleHeader

const styles = StyleSheet.create({})