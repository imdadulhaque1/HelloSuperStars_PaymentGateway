import axios from 'axios';
import * as React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {AuthContext} from '../../../Constants/context';
import imagePath from '../../../Constants/imagePath';
import AppUrl from '../../../RestApi/AppUrl';
import AuctionProductCard from './AuctionPorductCard';
import styles from './styles';

function AuctionTab(props) {
  const {axiosConfig} = React.useContext(AuthContext);
  const {setProduct} = props.setProduct;
  const [productInfo, setProductInfo] = React.useState([]);
  React.useEffect(() => {
    axios.get(`${AppUrl.AuctionStar}${props.starId}`, axiosConfig).then(res => {
      console.log(res.data);
      if (res.data.status === 200) {
        setProductInfo(res.data.product);
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.row1}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#e7a825', '#e7c233', '#ffad00']}
            style={{borderRadius: 15}}>
            <Text style={styles.AuctionT}>Auction</Text>
          </LinearGradient>
        </View>

        <ScrollView>
          {productInfo.map(item => {
            console.log(item);
            return (
              <AuctionProductCard
                setView={props.setView}
                name={item.title}
                productImg={item.product_image}
                price={item.base_price}
                ownerImg={item.star.image}
                owerName={item.star.first_name + ' ' + item.star.last_name}
                key={item.id}
                productDetails={item}
                buttonText="Participate"
                setProduct={props.setProduct}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default AuctionTab;
