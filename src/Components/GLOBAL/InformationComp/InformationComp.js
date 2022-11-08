import moment from 'moment';
import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

const InformationComp = ({data, type = null, takeTime = null}) => {
  // console.log('InformationComp------data------', data)
  return (
    <>
      {type == 'greeting' ? (
        <>
          <View style={styles.topCard}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 5,
              }}>
              <Text style={{color: 'white', width: '30%'}}>Star:</Text>
              <Text style={{color: 'white', width: '60%'}}>
                {data?.greeting?.star?.first_name}{' '}
                {data?.greeting?.star?.last_name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 5,
              }}>
              <Text style={{color: 'white', width: '30%'}}>Date:</Text>
              <Text style={{color: 'white', width: '60%'}}>
                {moment(data?.request_time).format('LL')}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 5,
              }}>
              <Text style={{color: 'white', width: '30%'}}>Time:</Text>
              <Text style={{color: 'white', width: '60%'}}>
                {moment(data?.request_time, 'HH:mm:ss').format('hh:mm A')}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 5,
              }}>
              <Text style={{color: 'white', width: '30%'}}>Fee:</Text>
              <Text style={{color: 'white', width: '60%'}}>
                {data?.greeting?.cost} BDT
              </Text>
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={styles.topCard}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 5,
              }}>
              <Text style={{color: 'white', width: '30%'}}>Name:</Text>
              <Text style={{color: 'white', width: '60%'}}>
                {data.star?.first_name} {data.star?.last_name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 5,
              }}>
              <Text style={{color: 'white', width: '30%'}}>
                Registration Date:
              </Text>
              <Text style={{color: 'white', width: '60%'}}>
                {moment(data.registration_start_date).format('DD MMMM YYYY')} to{' '}
                {moment(data.registration_end_date).format('DD MMMM YYYY')}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 5,
              }}>
              <Text style={{color: 'white', width: '30%'}}>Date:</Text>
              <Text style={{color: 'white', width: '60%'}}>
                {moment(data.date).format('DD MMMM YYYY')}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 5,
              }}>
              <Text style={{color: 'white', width: '30%'}}>Time:</Text>
              <Text style={{color: 'white', width: '60%'}}>
                {moment(data.start_time, 'HH:mm:ss').format('hh:mm A')} to{' '}
                {moment(data.end_time, 'HH:mm:ss').format('hh:mm A')}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 5,
              }}>
              <Text style={{color: 'white', width: '30%'}}>Fee:</Text>
              <Text style={{color: 'white', width: '60%'}}>
                {data.fee ? data.fee : data.cost} BDT
              </Text>
            </View>
            {takeTime != null && takeTime != '' ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginVertical: 5,
                  }}>
                  <Text style={{color: 'white', width: '30%'}}>Total Fee:</Text>
                  <Text style={{color: 'white', width: '60%'}}>
                    {Number(data.fee) * takeTime} BDT ({Number(data.fee)}*
                    {takeTime})
                  </Text>
                </View>
              </>
            ) : (
              <></>
            )}
          </View>
        </>
      )}
    </>
  );
};

export default InformationComp;
