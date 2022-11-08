import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity,ScrollView } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';


const conditionList=[
  {
    id:1,
    num:'2.1',
    text:'Account" - means Your User account, which is the record of Your subscription maintained and administered by us '
  },

  {
    id:3,
    num:'2.3',
    text:'"Agreement" - means these Conditions of Use together with the e-Registration'
  },
  {
    id:4,
    num:'2.4',
    text:'“Cash” - means BANGLADESHI Taka, being the lawful currencies in Bangladesh or the official currency of any future countries the service shall be offered; '
  },
  {
    id:5,
    num:'2.5',
    text:' “Cellphone” - means the mobile device used by you to access HSS'
  },
  {
    id:6,
    num:'	2.6 ',
    text:'"Package" - means the amount of “Royalty Point” in Your account '
  },
  {
    id:2,
    num:'	2.11 ',
    text:'"11 "Identification (ID) Number" - means the number associated with the form of identification provided to our satisfaction including passport number, national identity card number etc.  '
  },

  {
    id:7,
    num:'2.13',
    text:'MSISDN" - means your cell-phone mobile number'
  },
  {
    id:8,
    num:'2.14 ',
    text:'Network" - means the Global System for Mobile telecommunication ("GSM") system operated by any licensed operator and covering those areas within the BANGLADESH as stipulated from time to time by us'
  },
  {
    id:9,
    num:'2.15 ',
    text:'PIN" - means your personal identification number being the secret code you choose to access and Your Account and authorize transactions.    '
  },
  {
    id:10,
    num:'2.17 ',
    text:'SIM Card" - means the subscriber identity module which when used with your cellphone enables you to access and use the Mobile Money Services. '
  },
  {
    id:11,
    num:'2.18 ',
    text:'"SMS" means a short message service consisting of a text message transmitted from one Cellphone to another.  '
  },
  {
    id:12,
    num:'2.19',
    text:'Subscriber”   means any person who is a holder of a Valid mobile number whether as prepaid, postpaid, hybrid or contract customer'
  },
  {
    id:13,
    num:'2.23',
    text:'User” means every person that uses the HSS Services, whether registered or unregistered'
  },
  {
    id:14,
    num:'2.24 ',
    text:'Application Menu” means the application use case menu on Your Cellphone that lists all HSS. This can be accessed from the user application platform. '
  },
  {
    id:15,
    num:'2.25 ',
    text:'We" or "us" or "our" means HSS'
  },
  {
    id:16,
    num:'2.26 ',
    text:'Hello Super Stars” means HSS'
  },
  {
    id:17,
    num:'2.27 ',
    text:'You" or "Your" means the Customer '
  },




]


const accountDocList=[
  {
    id:1,
    num:'3.1',
    text:' Any mobile subscriber who has a smartphone may register for a HSS account by completing basic registration on the app.  '
  }, 
  {
    id:2,
    num:'3.2',
    text:'Minors and other persons who do not have contractual capacity in terms of the laws will not be allowed to register'
  }, 
  {
    id:3,
    num:'3.3',
    text:' provide all of the details and particulars required in the E-registration Form to Our satisfaction; and '
  }, 
  {
    id:4,
    num:'3.4',
    text:' Provide a copy of Your ID document together with the original ID document for verification (when required).  '
  }, 
  {
    id:5,
    num:'3.5',
    text: 'After You have been successfully registered and an account created for You, You will receive a confirmation SMS on Your cellphone. You can then activate Your account by following the instructions on Your App menu.'
  }, 
  {
    id:6,
    num:'3.6 ',
    text:' Once Your account has been activated, You will be required to create a PIN, which will entitle You to use HSS with immediate effect.  '
  }, 
  {
    id:7,
    num:'3.7',
    text:' You may not open more than one account on the same number and ID with Us '
  }, 

]
const AccountList=[
  {
    id:1,
    num:'5.1',
    text:' Transactions   '
  }, 
  {
    id:2,
    num:'5.1.1 ',
    text:'You may use Your account to perform the following transactions from Your Cellphone:'
  }, 
  {
    id:3,
    num:'5.1.1.3',
    text:' Send E-Money to a registered user; '
  }, 
  {
    id:4,
    num:'5.1.1.4',
    text:'  Send E-Money to an unregistered user.'
  }, 
  {
    id:5,
    num:'5.1.1.5',
    text:`Buy prepaid airtime from your provider with E-Money`
  }, 

  {
    id:6,
    num:'5.1.2 ',
    text:` We reserve the right to add or substitute other transactions and functionalities to HSS from time to time and We will notify You of such additions or substitution from time to time through such communication medium as We may determine`
  }, 
  {
    id:7,
    num:'5.1.3  ',
    text:`All Debit Transactions from Your account will be effected by transfer instructions authorized with Your PIN or such other method we may prescribe from time to time. You therefore acknowledge that, unless and until HSS receives notice from You that Your phone has been lost or stolen, HSS may rely on the use of the PIN as conclusive evidence that a Debit Transaction has been authorized by You, even if it is actually made without Your authority. HSSshall not require any written confirmation of any transaction instruction. 
    `
  }, 
  {
    id:8,
    num:'5.1.4  ',
    text:`HSSmay carry out identity and/or security checks when We receive Your transfer instructions and We may refuse any transaction if we are not satisfied with the results of Our checks. 
    `
  },
  {
    id:9,
    num:'5.1.5  ',
    text:`You will not be able effect any transactions from Your account in the event that You do not have sufficient E-Money to meet the value of the transaction plus fees applicable thereto.  
    `
  },
  {
    id:10,
    num:'5.1.6  ',
    text:`It is Your responsibility to ensure the correctness of the details of the designated payee and amounts which You intend to transfer before You effect a transaction. HSSshall not be liable for reimbursing You for E-Money sent to a wrong recipient by You nor will it be obliged to reverse any wrongful transaction.  
    `
  },
  {
    id:11,
    num:'5.1.7 ',
    text:`Airtime is not a substitute for E-Money. You may not use Your airtime to effect Mobile Money transactions`
  },
  {
    id:12,
    num:'5.1.8  ',
    text:`We will confirm all Your successful transactions by sending You a confirmation message with total transaction amounts.`
  },
  {
    id:13,
    num:'5.2  ',
    text:`Transaction Limits  `
  },

  {
    id:14,
    num:'5.2.1',
    text:`You may not affect any transactions which, in aggregate, exceed the transactions limits. These Limits are imposed as per the directions of Bank Negara Bangladesh the Central Bank`
  },
  {
    id:15,
    num:'5.2.2  ',
    text:`Any transactions which exceed the transaction limits will not be processed.`,
   
    
  },

  {
    id:16,
    num:'5.3.1  ',
    text:`You may obtain a balance on Your account using the "balance enquiry" function under my account menu at no cost to You. Please note that printed statements will not be provided, but a longer statement can be sent to your e-mail at no cost  `,
   
  },

]

const trnsitionFees=[
  {
    id:1,
    num:'4.1 ',
    text:`You will have to pay honorarium when you want to avail HSS Services. Applicable fees shall be displayed before the completion of any transactions, you can also check such fees from our website at www.hellosuperstars.com. under the HSS section which can be accessed from the home page. `
  }, 
  {
    id:2,
    num:'4.3  ',
    text:`Fees include applicable taxes.  `
  },
  {
    id:3,
    num:'4.4 ',
    text:`HSS may revise applicable fees from time to time. We will notify You of such change through any communication medium as we may determine10 days prior to introducing the revised fees.  `
  },
]

const securityData=[
  {
    id:1,
    num:'6.1',
    text:`You are at all times responsible for the safekeeping and proper use of Your Cellphone and PIN in relation to the HSS services. As a measure to ensure the security of Your account, You will be given only 3 attempts to enter the correct PIN. If You enter the wrong PIN on Your third attempt, Your account will be deactivated. To reactivate Your account, You will be required to call the Customer Call Centre and follow the verification process directed by the Customer Call Centre. `
  },
  {
    id:2,
    num:'6.2',
    text:`Only You may use Your Cellphone and PIN to access Your account and You will be responsible for all transactions made from Your account.  `
  },
  {
    id:3,
    num:'6.3',
    text:`6.3 Do not disclose Your PIN to anyone, including but not limited to Your family members, employees of HSS (including Customer Call Centre and HSS employees), employees of the Trustee Bank, merchants etc.  `
  },
]

const disconnectionData=[
  {
    id:1,
    num:'7.1',
    text:`We may suspend, restrict or terminate provision of the Service and/or close Your account without informing You and without any liability whatsoever (although, We will, where possible, try to inform You that such action is or may be taken) if:  `
  },
  {
    id:2,
    num:'7.1.1',
    text:`We are aware or have reason to believe that Your Cellphone, PIN or Application is or are being used in an unauthorized, unlawful, improper or fraudulent manner or for criminal activities (or has been so used previously);  `
  },
  {
    id:3,
    num:'7.1.2',
    text:`You do not comply with any of the conditions relating to the use of HSS which have been communicated to You by Us, including these Conditions of Use;  `
  },
  {
    id:4,
    num:'7.1.3 ',
    text:`You notify Us that Your Cellphone or SIM card has been lost or stolen or Your PIN has been disclosed to any other party;  `
  },
  {
    id:5,
    num:'7.1.4 ',
    text:`You do anything (or allow anything to be done) with Your Cellphone which We think may damage or affect the operation or security of HSS;  `
  },
  {
    id:6,
    num:'7.1.5',
    text:` Your Cellphone number is disconnected from the network you initially registered with.  `
  },
  {
    id:7,
    num:'7.1.6',
    text:`We will close Your account where You have not provided a certified copy of Your ID document or a reliable certified ID document per clause 3.3.2 above within 30 days after being notified to provide the document.  `
  },
  {
    id:8,
    num:'7.2',
    text:`We will close Your account on receiving a written request from You to do so or upon receiving written notification about Your death. 
    `
  },
  {
    id:9,
    num:'7.3',
    text:`We will not be responsible to You for any direct, indirect, consequential or special damages arising from any act or omission by us or any third party for whom we are responsible, whether arising in contract, or statute, if we close or suspend Your account in terms of this clause 7.   `
  },
  {
    id:10,
    num:' 7.4',
    text:` We will close Your account if you upload adult material
     `
  },
  {
    id:11,
    num:'7.6',
    text:` We will close Your account if you use any abuse words
    `
  },
  {
    id:12,
    num:'7.7',
    text:`We will close Your account if you deliver any political statements `
  },

]

const assistanceData=[
  {
    id:1,
    text:'	8.1 You may call the Customer Call Centre on +*********** if You want to do any of the following: '
  },
  {
    id:2,
    text:'	8.1.1 receive information about Account; '
  }

  ,
  {
    id:3,
    text:'	8.1.2 query Your account;  '
  }

  ,

  {
    id:4,
    text:'8.1.3 query any transactions performed through Your account; '
  }

  ,

  {
    id:5,
    text:'8.1.4 have a problem with the Service; '
  }

  ,

  {
    id:6,
    text:'	8.1.5 lodge a complaint; and/or  '
  }

  ,

  {
    id:7,
    text:'	8.1.6 Require further information regarding HSS and our complaints procedure. '
  }

  ,

 



]
const responsiblities=[
  {
    id:1,
    num:'9.1',
    text:' It is Your responsibility to ensure that the information You provide to HSS about Yourself is accurate. To this end, You undertake to HSS that any information You have provided to us is true and correct and that You will provide any additional information that we may require from time to time, failing which We will suspend Your account.     '
  },
  {
    id:2,
    num:'9.2',
    text:'You will be responsible for payment of all applicable fees for any transaction effected using Your application and your PIN whether these were made by You or someone else with or without Your authority or knowledge	'
  },
  {
    id:3,
    num:'9.3',
    text:'You must not use HSS to commit any offence(s). '
  },
  {
    id:3,
    num:'9.4',
    text:' In the event of damage to, loss or theft of your phone, You are obliged to inform us immediately of such damage, loss or theft. We will then disable such damaged, lost or stolen SIM Card so as to prevent possible use of HSS until the SIM card has been replaced'
  },
  {
    id:4,
    num:'9.5',
    text:' You will be responsible for all fees and transactions effected up to the time of receipt by HSS of Your report of the damage to, loss or theft of Your phone. '
  },
  {
    id:5,
    num:'9.6',
    text:' You must comply with any instructions that HSS may issue from time to time about the use of the HSS Services. 	'
  },
]
const personalData=[
  {
    id:1,
    text:`You acknowledge and agree that we may disclose and/or receive personal information, communications or documents about You: `,
    num:'13.1 '
  },
  {
    id:2,
    text:`to and/from national and international law enforcement or any competent regulatory or governmental agencies to assist in the prevention, detection or prosecution of criminal activities or fraud. `,
    num:'13.1.1  '
  },
  {
    id:3,
    text:`to Our legal advisors, financial advisors or auditors, or to a court of law in connection with any legal or other proceedings.  `,
    num:'13.1.2  '
  },
  {
    id:4,
    text:`to Our parent company and its affiliates who will process Your personal information to market and sell its products and services to You. `,
    num:'13.1.3 '
  },
  {
    id:5,
    text:`You agree that all of Your information, including personal information and Your transactions will be recorded and Centered for record keeping purposes for 10 years from the date on which Your Account is closed.  `,
    num:'13.2  '
  },
    {
    id:5,
    text:`13.3 You consent that all transactions may be monitored or recorded by Us in accordance with the laws of Land, for use in business practices, prevention of unauthorized use of HSS platform, and in respect of the detection and prevention of crime   `,
    num:'13.3   '
  },
]
const liablity=[
  {id:1,
  num:'14.1 ',
text:`In the event that we are compelled to change or reassign Your account details to meet regulatory requirements or for any other reason, Our liability will be limited to retaining Your account and where possible, transferring Your account to a new regulated format, failing which You will be paid out the credit balance in Your account in cash. `},
{id:2,
  num:'14.2',
text:` We make no representations and give no warranties of whatsoever nature to and in favor of You, whether express or implied in respect of HSS`},
{id:3,
  num:'14.4 ',
text:` We will use commercially reasonable efforts to ensure that the Service is secure and cannot be accessed by unauthorized third parties. We shall not be liable for any loss which You suffer unless it is directly caused by our being grossly negligent or deliberately acting wrongly. Our liability for such acts will be limited to the amount of the loss that an ordinary person in Your position would have suffered. For the avoidance of doubt, any such liability shall exclude liability for indirect, punitive, special and/or consequential losses and/or damages. `},

]
const notices=[
  {id:1,
  num:'15.1  ',
text:`we are entitled to send information to You via SMS to the contact Mobile Phone number supplied on Your application form. These SMS's are for information purposes only. 
`},
{id:2,
  num:' 15.2',
text:` You should send any legal notice to us at our chosen address: Office UAE Address`},


]

const generalData=[
  {
    id:1,
    num:'16.1',
    text:`You will pay all our expenses for recovering any amounts You owe us including legal fees, collection fees and tracing fees. `
  },
  {
    id:2,
    num:'16.2 ',
    text:`You must notify us immediately of any change of Your details in Your Registration Form.  `
  },
  {
    id:3,
    num:'16.3 ',
    text:`All copyright, trademarks and other intellectual property rights used as part of HSS or contained in our documents are owned by HSS or its licensors. You agree that You acquire no rights thereto`
  },
  {
    id:4,
    num:'16.4 ',
    text:`This Agreement may not be assigned to any other person `
  },
  {
    id:5,
    num:'16.5',
    text:` No failure or delay by either of us in exercising any right or remedy hereunder shall operate as a waiver thereof, nor shall any single or partial exercise of any right or remedy prevent any further or other exercise thereof or the exercise of any other right or remedy. 
    `
  },
  {
    id:6,
    num:'16.6',
    text:` The rights and remedies herein provided are cumulative and not exclusive of any rights or remedies provided by law. 
    `
  },
  {
    id:7,
    num:'16.7',
    text:` If any provision of these Conditions of Use shall be found by a court or of competent jurisdiction to be invalid or unenforceable, the invalidity or unenforceability of such provision shall not affect the other provisions and all provisions not so affected by such invalidity or unenforceability shall remain in full force and effect. `
  },

  {
    id:8,
    num:'16.8 ',
    text:` Although HSS will try to ensure that You are able to make full use of HSS at all times to access Mobile wallet Services within Our platform, We do not guarantee that the Mobile Wallet Services will be available at all times. HSS will not be responsible or liable for any loss whatsoever or howsoever arising as a consequence of any non-availability of the HSS `
  },
]

const governingData=[
  {
    id:1,
    num:' 17.1 ',
    text:`This agreement is governed by the laws of the Land. `
  },
  {
    id:2,
    num:'17.1.1',
    text:` Any disputes arising out of this agreement and which cannot be settled amicably by You and Us will be submitted to litigation in the Magistrate Courts even if the claim made by either You or Us exceeds the jurisdiction of such courts.`
  },
]


function CustomHeader(props) {
  return <View style={{ backgroundColor: '#343434', paddingVertical: 10 }} >
    <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 10 }} onPress={()=>props.onPress()}>
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
function SimpleText({text}){
  return     <Text style={{color:'#959595', letterSpacing: 1,lineHeight:18,}}>{text}</Text>
}
function SpaceText(){
return<Text>{'\n'}</Text>
}

function ListItem({num,text}){
return <View style={{margin:10}}>
<View style={{flexDirection:'row'}}> 
 <Text style={{flex: 1, flexWrap: 'wrap',color:'#959595'}}>{num} {text}
 </Text>
</View>
</View>
}


const Condition = ({ navigation }) => {
  function handleBack(){
    return navigation.goBack()
  }

 
  return (

    <View style={styles.container}>
      <SafeAreaView>
        <CustomHeader onPress={handleBack} />

        <View style={{ margin: 10 }}>
          <View >
            <Text style={{ color: '#ffaa00', fontSize: 19, fontWeight: 'bold', textAlign: 'center' }}>Terms and Condition</Text>
          </View>



          <View style={{backgroundColor:'#1F1F1F',margin:10,padding:10,borderRadius:10,height:'87%',overflow:'scroll'}}>
      <ScrollView >


      <Subtitle title={`1.OUR AGREEMENT`} />
    

<SimpleText text={'These are the Terms and Conditions ("Conditions of Use") upon which You may use our Hello Superstars App (hereinafter, “HSS”). You must read them carefully before deciding to register for HSS. By accepting these Conditions of use, you agree that we should register you as a user and that you have received, read, fully understood and accept these Conditions of Use. Please note that these Conditions of Use together with your e-registration form constitute a binding agreement between you and us. If you do not accept these Conditions of Use, '} />
<SpaceText />
<SimpleText text={`You must not proceed to register for and/or use HSS. `} />
<SpaceText />


<Subtitle title={`2.WHAT WE MEAN 
`} />

{conditionList.map((item,index)=>{
  return<ListItem num={item.num} text={item.text} key={String(index)} />
})}



<Subtitle title={'3. HOW TO REGISTER FOR AN ACCOUNT '} />

{accountDocList.map((item,index)=>{
  return<ListItem num={item.num} text={item.text} key={String(index)} />
})}


<Subtitle title={'4. TRANSACTION FEES '} />

{trnsitionFees.map((item,index)=>{
  return<ListItem num={item.num} text={item.text} key={String(index)} />
})}


<Subtitle title={'5. USING YOUR ACCOUNT  '} />

{AccountList.map((item,index)=>{
  return<ListItem num={item.num} text={item.text} key={String(index)} />
})}




<Subtitle title={'6. SECURITY MEASURES  '} />
{securityData.map((item,index)=>{
  return<ListItem num={item.num} text={item.text} key={String(index)} />
})}

<Subtitle title={'7. SUSPENSION AND DISCONNECTION OF HSS/CLOSURE OF ACCOUNT  '} />
{disconnectionData.map((item,index)=>{
  return<ListItem num={item.num} text={item.text} key={String(index)} />
})}
<Subtitle title={'8. GETTING ASSISTANCE  '} />
{assistanceData.map((item,index)=>{
  return<ListItem num={item.num} text={item.text} key={String(index)} />
})}
<Subtitle title={'9. YOUR RESPONSIBILITIES  '} />
{responsiblities.map((item,index)=>{
  return<ListItem num={item.num} text={item.text} key={String(index)} />
})}
<Subtitle title={'11.CHANGES '} />
<SimpleText text={`We reserve the right to change these conditions of use from time to time. We shall give You 21 days’ notice of any proposed changes through such communication medium as We may determine and You shall be deemed to have been notified of any such variations regardless that the same may not have actually come to your attention. After 21 days, the changes will be deemed to be fully effective. If You do not agree with the changes, You must terminate HSS, otherwise You shall be deemed to have accepted the changes. `} />
<SpaceText />

<Subtitle title={'12. EVENTS BEYOND OUR CONTROL  '} />
<SimpleText text={`HSS may not be able to provide HSS or perform our obligations as a result of events which are beyond our reasonable control including failure, malfunction or delay in banking channels and networks, Our networks, Your Cellphone or SIM card. HSS will not be responsible for any loss arising as a result of the occurrence of such events  `} />
<SpaceText />

<Subtitle title={'13.YOUR PERSONAL INFORMATION   '} />
{personalData.map((item,index)=>{
  return<ListItem num={item.num} text={item.text} key={String(index)} />
})}

<Subtitle title={'14.LIABILITY AND EXCLUSIONS    '} />
{liablity.map((item,index)=>{
  return<ListItem num={item.num} text={item.text} key={String(index)} />
})}

<Subtitle title={'15. NOTICIES    '} />
{notices.map((item,index)=>{
  return<ListItem num={item.num} text={item.text} key={String(index)} />
})}
<Subtitle title={'16.GENERAL   '} />
{generalData.map((item,index)=>{
  return<ListItem num={item.num} text={item.text} key={String(index)} />
})}

<Subtitle title={'17.DISPUTE SETTLEMENT AND GOVERNING LAW   '} />
{governingData.map((item,index)=>{
  return<ListItem num={item.num} text={item.text} key={String(index)} />
})}
      </ScrollView>
          </View>

        </View>

      </SafeAreaView>
    </View>

  )
}

export default Condition

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  }
})