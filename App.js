import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StripeProvider } from '@stripe/stripe-react-native'
import CheckoutScreen from './stripeNormal/CheckoutScreen'


const App = () => {
  return (
    <StripeProvider
      publishableKey="pk_test_51LtSJLGiXzKYuOYkQjOQcod5ZhxNxnsyIezQUgDHHC5BPSr1JVrOeCrBUwdG1owKJEzFjh9V9CsXtRB9RTzEtaU200Kr8oNp8P"
      merchantIdentifier="merchant.com.hellosuperstars"
    >
      <View>
        <SafeAreaView>
          <CheckoutScreen />
        </SafeAreaView>
      </View>
    </StripeProvider>
  )
}

export default App

const styles = StyleSheet.create({})