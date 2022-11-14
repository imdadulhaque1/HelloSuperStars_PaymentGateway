import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes from './src/Navigation/Routes';
import { Provider as PaperProvider } from 'react-native-paper';
import { StripeProvider } from '@stripe/stripe-react-native';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <StripeProvider
      publishableKey="pk_test_51LtqaHHGaW7JdcX6i8dovZ884aYW9wHVjPgw214lNBN19ndCHovhZa2A62UzACaTfavZYOzW1nf3uw2FHyf3U6C600GXAjc3Wh"
      merchantIdentifier="merchant.com.hellosuperstars"
    >
      <PaperProvider>
        <Routes />
      </PaperProvider>

    </StripeProvider>

  );
}

export default App;


// ------> Stripe setup done successfully
// import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { StripeProvider } from '@stripe/stripe-react-native'
// import CheckoutScreen from './stripeNormal/CheckoutScreen'

// const App = () => {
//   return (
//     <StripeProvider
//       publishableKey="pk_test_51LtSJLGiXzKYuOYkQjOQcod5ZhxNxnsyIezQUgDHHC5BPSr1JVrOeCrBUwdG1owKJEzFjh9V9CsXtRB9RTzEtaU200Kr8oNp8P"
//       merchantIdentifier="merchant.com.hellosuperstars"
//     >
//       <View>
//         <SafeAreaView>
//           <CheckoutScreen />
//         </SafeAreaView>
//       </View>
//     </StripeProvider>
//   )
// }

// export default App

// const styles = StyleSheet.create({})


// ---> Paytm environment setup done
// import { Alert, Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import AllInOneSDKManager from 'paytm_allinone_react-native';

// // "c030ee7b9aba490f926c18d2101ac8651667279341156"

// const App = () => {
//   function handlePayment() {
//     AllInOneSDKManager.startTransaction(
//       "da9eb459-38c1-4a90-8c3e-cbd741ddae3c",
//       "iELVJt50414347554560",
//       "470d2a53072e44f6ba56886219c1ea381667885402784",
//       "1.00",
//       `https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=da9eb459-38c1-4a90-8c3e-cbd741ddae3c`,
//       true,
//       false,
//       ''
//     )
//       .then((result) => {
//         console.log(result)
//       })
//       .catch((err) => {
//         console.log(err)
//       });
//   }
//   return (
//     <View>
//       <SafeAreaView>
//         <Text>App</Text>

//         <Button title='paymoneys' color={'blue'} onPress={handlePayment} />

//       </SafeAreaView>

//     </View>
//   )
// }

// export default App

// const styles = StyleSheet.create({})