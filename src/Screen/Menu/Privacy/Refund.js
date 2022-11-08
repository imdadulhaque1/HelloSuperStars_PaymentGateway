import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
const refundData=[
  {id:1,
  num:'1',
text:`The processing time of your refund depends on the type of refund and the payment method you used`},
{id:2,
  num:'1',
text:`The refund period / process starts when Hello Superstars has processed your refund according to your refund type.`},
{id:3,
  num:'3',
text:`The refund amount covers the subscription fee for the particular event/service.
`},
]
const refundTypeData=[
  {id:1,
  text:`Refunds from cancelled Subscriptions - Refund is automatically triggered once cancelation is successfully processed`},
  {id:2,
    text:`Refunds from cancelled Events - Refund process starts when any event is cancelled for unforeseen and unavoidable circumstances. `},
  

]

const returnPolicyData=[
  {
    id:1,
    num:'1',
    text:`If your product is damaged, defective, incorrect or incomplete at the time of delivery, please raise a return request on Hello
    Superstars app or website. Return request must be raised within 14 days for Hello Superstars, E-showcase before the date
    of delivery.`
  },

  {
    id:1,
    num:'2',
    text:`For selected categories, we accept a change of mind. Please refer to the section below on Return Policy per Category for more
    information.`
  },


]

function CustomHeader(props) {
  return <View style={{ backgroundColor: '#343434', paddingVertical: 10 }} >
    <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 10 }} onPress={() => props.onPress()}>
      <Text style={{ color: 'white' }}>
        <Icon name="arrow-back" size={25} />
      </Text>
      <Text style={{ color: 'white', fontSize: 18, marginLeft: 4 }}>
        Back
      </Text>
    </TouchableOpacity>
  </View>
}
function Subtitle({ title }) {
  return <Text style={{ fontSize: 17, color: '#ffaa00' }}>{title}</Text>
}
function SimpleText({ text }) {
  return <Text style={{ color: '#959595', letterSpacing: 1, lineHeight: 18, }}>{text}</Text>
}
function SpaceText() {
  return <Text>{'\n'}</Text>
}

function ListItem({ num, text }) {
  return <View style={{ margin: 10 }}>
    <View style={{ flexDirection: 'row' }}>
      <Text style={{ flex: 1, flexWrap: 'wrap', color: '#959595' }}>{num} {text}
      </Text>
    </View>
  </View>
}



const Refund = ({ navigation }) => {
  function handleBack() {
    return navigation.goBack()
  }



  return (
    <View style={styles.container}>
      <SafeAreaView>
        <CustomHeader onPress={handleBack} />

        <View style={{ margin: 10 }}>
          <View >
            <Text style={{ color: '#ffaa00', fontSize: 19, fontWeight: 'bold', textAlign: 'center' }}>Refund, return and cancellation policy</Text>
          </View>



          <View style={{ backgroundColor: '#1F1F1F', margin: 10, padding: 10, borderRadius: 10, height: '87%', overflow: 'scroll' }}>
            <ScrollView >
              <Subtitle title={'Cancellation Policy'} />
              <SimpleText text={`For Cancellations Hello Superstars is to be contacted by various method mentioned under contact us link. Please quote UserID in all communications. It is advised that query is sent from the registered emailID.
Cancellation requests can be raised no later than a day prior to the occurrence of an event.
Your registration will be cancelled instantly and refund will be processed within 3 to 4 working days in your original payment method.
Following deductions will be made under Refund Process
Cancellation charges : 0.5% of subscription fee, Minimum of BDT 100/- , maximum BDT 500/-
Online Transaction Charges: 1.75% of total payment made. 
Note: GST paid during purchase will not be refunded.
Any request of cancellation will not be entertained after the stipulated period has passed.
`} />

<Subtitle title={`Issuance of Refunds`} />
{refundData.map((item,index)=>{
  return <ListItem num={item.num} text={item.text} key={String(index)} />
})}


<Subtitle title={`Refund Types`} />
<SimpleText text={`Hello Superstars will process your refund according to the following refund types
`} />
{refundTypeData.map((item,index)=>{
  return <ListItem num={item.id} text={item.text} key={String(index)} />
})}
{/* table content start here  */}
<View style={{flexDirection:'row',justifyContent:'space-around'}}>
  <View style={{borderWidth:0.8,borderColor:'gray'}}><Text style={{color:'#ffaa00'}}>Payment Method</Text>
  
  <Text style={{color:'red'}}>Debit or Credit Card</Text>
  <Text style={{color:'red'}}>Other MFS</Text>
  </View>
  <View  style={{borderWidth:0.8,borderColor:'gray'}}><Text style={{color:'#ffaa00'}}>Refund Option</Text>
  <Text style={{color:'red'}}>Card Payment{`\n`} reversal</Text>
  <Text style={{color:'red'}}>Mobile Wallet{`\n`} Reversal</Text>
  <Text style={{color:'red'}}>Refund Voucher</Text>
  </View>
  <View  style={{borderWidth:0.8,borderColor:'gray'}}><Text style={{color:'#ffaa00'}}>Refund Times</Text>
  
  <Text style={{color:'red'}}>10 working days</Text>
  <Text style={{color:'red'}}>5 working day</Text>
  </View>
</View>
{/* table content start here  */}

<SimpleText text={`Maximum refund timeline excludes weekends and public holidays`} />

{/* table content start here  */}
<View style={{margin:10}}>
  <Subtitle title={`Modes of Refund`} />
  <SimpleText text={`Bank Deposit: The bank account details provided must be correct. The account must be

active and should hold some balance.`} />
<SpaceText />
<SimpleText text={`Debit Card or Credit Card: If the refunded amount is not reflecting in your card statement after the refund
is completed and you have received a notification by Hello Superstars, please
contact your personal bank.`} />
<SpaceText />
  <SimpleText text={`Other MFS: Similar to bank deposit, the amount will be refunded to the same mobile

account details which you inserted at the time of payment.`} />
<SpaceText />
  <SimpleText text={`Refund Voucher: Vouchers will be sent to the customer registered email ID on Hello Superstars

and can be redeemed against the same email ID.`} />
</View>
{/* table content start here  */}


<Subtitle title={`Return Policy`} />
{returnPolicyData.map((item,index)=>{
  return <ListItem num={item.num} text={item.text} key={String(index)} />
})}

<Subtitle title={`Valid reasons to return an item`} />
<SimpleText text={`
1. Delivered product is damaged (i.e. physically destroyed or broken) / defective (e.g. unable to switch on)
2. Delivered product is incomplete (i.e. has missing items and/or accessories)
3. Delivered product is incorrect (i.e. wrong product/size/colour, fake item, or expired)
4. Delivered product is does not match product description or picture (i.e product not as advertised)
5. Delivered product does not fit. (i.e. size is unsuitable)

`} />

<SimpleText text={`
1. The product must be unused, unworn, unwashed and without any flaws. Fashion products can be tried on to see if they fit and will still
be considered unworn. If a product is returned to us in an inadequate condition, we reserve the right to send it back to you.
2. The product must include the original tags, user manual, warranty cards, freebies and accessories.
3. The product must be returned in the original and undamaged manufacturer packaging / box. If the product was delivered in a second
layer Hello Superstars packaging, it must be returned in the same condition with return shipping label attached. Do not put tape or
stickers on the manufacturers box.
4. While you return the item, please collect the Hello Superstars Return Acknowlegement Form from the website and fill it in by
yourself. Keep one copy to yourself and we will keep another copy of it for the record.
Note: It is important to indicate the order number and return tracking number on your return package to avoid any
inconvenience/delay in process of your return.

`} />

            </ScrollView>
          </View>

        </View>

        

      </SafeAreaView>
    </View>

  )
}

export default Refund

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  }
})