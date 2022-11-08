import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';


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

const Policy = ({ navigation }) => {
  function handleBack() {
    return navigation.goBack()
  }
  return (

    <View style={styles.container}>
      <SafeAreaView>
        <CustomHeader onPress={handleBack} />

        <View style={{ margin: 10 }}>
          <View >
            <Text style={{ color: '#ffaa00', fontSize: 19, fontWeight: 'bold', textAlign: 'center' }}>Privacy Policy</Text>
          </View>



          <View style={{ backgroundColor: '#1F1F1F', margin: 10, padding: 10, borderRadius: 10, overflow: 'scroll', height: '88%' }}>
            <ScrollView >
              <Subtitle title={"Hello Superstars ('HSS')"} />
              <Text style={{ color: '#959595', letterSpacing: 1, lineHeight: 18, }}>
                values the privacy rights of its customers, merchants and corporate clients, and works aiming to keep safe and protect the personal information of the hem. {"\n"} {"\n"}

                This document presents HSS policy on the management of personal information. HSS is not entitled to share any personal information or potentially personal identifying information except in accordance with this privacy policy. {"\n"} {"\n"}

                By accepting the terms and conditions of HSS, you agree to accept this privacy policy.  {"\n"} {"\n"}

                HSS reserves the right to change this privacy policy at any time, in such case HSS will publish the new changed policy in HSS website. {"\n"} {"\n"}

                Throughout this document, HSS will refer to HSS website, software, App, web portal and platform collectively as “HSS Services”.{"\n"} {"\n"}

                Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information. {"\n"} {"\n"}
              </Text>


              <Subtitle title={"What personal information do we collect from the people that uses HSS Services? "} />
              <Text style={{ color: '#959595', letterSpacing: 1, lineHeight: 18, }}>
                When registering on HSS Services, as appropriate, you may be asked to enter your name, email address, mailing address, phone number, ID data, Passport Data or other details to help us serve you better.{"\n"} {"\n"}

                The businesses wanting to work with HSS as Merchants to accept HSS as a medium of payment or as Agents to provide top up services and/or other over the counter services for HSS, must also present the information of their bank account, business registration documents and other related information to verify the legality and the operation of the business. {"\n"} {"\n"}

                We collect information from you when you register on HSS services, fill out a form or enter information on our App, Web Site or Web Portal. When you use HSS Services, we record your transactions and operations in our service, and we may collect information about your location, computer or mobile device. Additional information about you or from you may also be collected in other ways, including answers to surveys, marketing campaigns or interactions with our customer service area.  {"\n"}
              </Text>
              <Subtitle title={"How do we use your information?  "} />

              <Text style={{ color: '#959595', letterSpacing: 1, lineHeight: 18, }}>
                We may use the information we collect from you when you register, make a transaction, sign up for our newsletter, respond to a survey or marketing communication, surf the website, web portal or the app, or use certain other features in the following ways:
              </Text>

              {/*=============== bullet maker point start here =============== */}

              <View style={{ margin: 10 }}>

                <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                  <Text style={{ color: '#959595', }}>1.</Text>
                  <Text style={{ marginLeft: 10, color: '#959595', }}>To personalize your experience and to allow us to deliver the type of content and product offerings in which you are most interested</Text>
                </View>
                <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                  <Text style={{ color: '#959595', }}>2.</Text>
                  <Text style={{ marginLeft: 10, color: '#959595', }}>To improve our website, web portal and app in order to better serve you.
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                  <Text style={{ color: '#959595', }}>3.</Text>
                  <Text style={{ marginLeft: 10, color: '#959595', }}>To allow us to better service you in responding to your customer service requests
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                  <Text style={{ color: '#959595', }}>4.</Text>
                  <Text style={{ marginLeft: 10, color: '#959595', }}>To administer a contest, promotion, survey or other feature
                  </Text>
                </View>


                <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                  <Text style={{ color: '#959595', }}>5.</Text>
                  <Text style={{ marginLeft: 10, color: '#959595', }}>To quickly process your transactions
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                  <Text style={{ color: '#959595', }}>6.</Text>
                  <Text style={{ marginLeft: 10, color: '#959595', }}>To ask for ratings and reviews of services or products
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                  <Text style={{ color: '#959595', }}>7.</Text>
                  <Text style={{ marginLeft: 10, color: '#959595', }}>To follow up with them after correspondence (live chat, email or phone inquiries)

                  </Text>
                </View>
              </View>

              {/*=============== bullet maker point end here =============== */}
              <Text style={{ color: '#959595', letterSpacing: 1, lineHeight: 18, }}>
                Hello Superstars may also use certain information about you with third parties, without identifying you as an individual. This with the purpose of business intelligence analysis, technical diagnostics, marketing content and security ensuring {"\n"}


              </Text>

              <Subtitle title={'How do we protect your information? '} />

              <Text style={{ color: '#959595', letterSpacing: 1, lineHeight: 18, }}>
                We do not use vulnerability scanning and/or scanning to PCI standards. As of now, we only provide Hello Superstars services based on the balance of your mobile wallet. We never ask for credit card numbers.{"\n"}  {"\n"}

                Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology. {"\n"}  {"\n"}

                We implement a variety of security measures when a user places a transaction, submits, or accesses their information to maintain the safety of your personal information. Hello Superstars stores your information securely in its servers, which are implemented in accordance with the best practices in the industry related to security and personal data management.  {"\n"}  {"\n"}
              </Text>

              <Subtitle title={"Do we use 'cookies'? "} />

              <Text style={{ color: '#959595', letterSpacing: 1, lineHeight: 18, }}>
                Yes. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser (if you allow) that enables the site's or service provider's systems to recognize your browser and capture and remember certain information. For instance, we use cookies to help us remember and process the items in your shopping cart. They are also used to help us understand your preferences based on previous or current site activity, which enables us to provide you with improved services. We also use cookies to help us compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future{"\n"}  {"\n"}

                We also collect the Log file information reported by your browser when you visit our website, although, this Log file is automatically reported by your browser every time you visit a website. The information of this Log file may include Internet Protocol (IP) address, browser type, number of clicks, pages viewed, and other information related.
                {"\n"}  {"\n"}


              </Text>

              <Subtitle title={"We use cookies to:"} />

              <Text style={{ color: '#959595', letterSpacing: 1, lineHeight: 18, }}>
                Compile aggregate data about site traffic and site interactions in order to offer better site experiences and tools in the future. We may also use trusted third-party services that track this information on our behalf. {"\n"}  {"\n"}

                You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser settings. Since browser is a little different, look at your browser's Help Menu to learn the correct way to modify your cookies.

                {"\n"}  {"\n"}

                You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser settings. Since browser is a little different, look at your browser's Help Menu to learn the correct way to modify your cookies.

                {"\n"}  {"\n"}
                If you turn cookies off, some of the features that make your site experience more efficient may not function properly. It won't affect the user's experience that make your site experience more efficient and may not function properly.  {"\n"}  {"\n"}

              </Text>

              <Subtitle title={"Third-party disclosure "} />
              <Text style={{ color: '#959595', letterSpacing: 1, lineHeight: 18, }}>
                we do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website, web portal and app hosting partners and other parties who assist us in operating our services, conducting our business, or serving our users, so long as those parties agree to keep this information confidential. We may also release information when its release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property or safety.  {"\n"}  {"\n"}

                However, non-personally identifiable visitor information may be provided to other parties for marketing, advertising, or other uses

                {"\n"}  {"\n"}

                Other Hello Superstars users that make transactions with you may have access to some of your information, such as phone number, name and other public profile data.

                {"\n"}  {"\n"}
                Hello Superstars will also share your information with government entities, representatives or law enforcement authorities when they require us to do so, in order to comply with legal mandates or to report activities that may seem suspicious, or that can prevent illegal actions. Hello Superstars might also share information with the mentioned entities when we consider that such information can be useful to prevent physical harm, illegal actions, money laundry, financial loss and breaches in our policies and agreements.

                {"\n"}  {"\n"}

                Except as otherwise described in this Privacy Policy, Hello Superstars will not disclose Personal Information to any third party unless required to do so by law or subpoena or if we believe that such action is necessary to (a) conform to the law, comply with legal process served on us or our affiliates, or investigate, prevent, or take action regarding suspected or actual illegal activities; (b) to enforce our User agreement, take precautions against liability, to investigate and defend ourselves against any third-party claims or allegations, to assist government enforcement agencies, or to protect the security or integrity of our site; and (c) to exercise or protect the rights, property, or personal safety of Hello Superstars, our Users or others.


                {"\n"}  {"\n"}

              </Text>
              <Subtitle title={"Third-party links"} />

              <Text style={{ color: '#959595', letterSpacing: 1, lineHeight: 18, }}>
                Google's advertising requirements can be summed up by Google's Advertising Principles. They are put in place to provide a positive experience for users.




              </Text>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    'https://support.google.com/adwordspolicy/answer/1316548?hl=en '
                  )
                }>
                <Text style={{ color: 'green' }}>https://support.google.com/adwordspolicy/answer/1316548?hl=en </Text>
              </TouchableOpacity>


              <Text style={{ color: '#959595', letterSpacing: 1, lineHeight: 18, }}>
                we have not enabled Google AdSense on our site but we may do so in the future.

                {"\n"}  {"\n"}



              </Text>

              <Subtitle title={"Hello Superstars agrees to the following:"} />

              <Text style={{ color: '#959595', letterSpacing: 1, lineHeight: 18, }}>
                Users can visit our site anonymously. Once this privacy policy is created, we will add a link to it on our home page or as a minimum, on the first significant page after entering our website. Our Privacy Policy link includes the word 'Privacy' and can easily be found on the page specified above

                {"\n"}  {"\n"}



              </Text>

              <Text style={{ color: '#959595', letterSpacing: 1, lineHeight: 18, }}>
                You will be notified of any Privacy Policy changes:





              </Text>
              <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 5 }}>
                <Text style={{ color: '#959595', }}>1.</Text>
                <Text style={{ marginLeft: 10, color: '#959595', }}>To ask for ratings and reviews of services or products
                  {"\n"}</Text>
              </View>
              <Text style={{ color: '#959595', letterSpacing: 1, lineHeight: 18, }}>
                Can change some of your personal information:




              </Text>
              <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 5 }}>
                <Text style={{ color: '#959595', }}>1.</Text>
                <Text style={{ marginLeft: 10, color: '#959595', }}>By calling us
                </Text>
              </View>
              <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 5 }}>
                <Text style={{ color: '#959595', }}>2.</Text>
                <Text style={{ marginLeft: 10, color: '#959595', }}>By logging in to your account
                </Text>
              </View>

              <Subtitle title={'Does our site allow third-party behavioral tracking? '} />
              <Text style={{ color: '#959595', letterSpacing: 1, lineHeight: 18, }}>
                It's also important to note that we do not allow third-party behavioral tracking{'\n'}
              </Text>

              <Subtitle title={'Children Online Privacy Protection '} />
              <Text style={{ color: '#959595', letterSpacing: 1, lineHeight: 18, }}>
                We do not specifically market to children under the age of 18 years old.
                {'\n'} {'\n'}
                Hello Superstars does not knowingly collect or solicit personal information from anyone under the age of 18 or knowingly allow such persons to register in Hello Superstars Services
                {'\n'} {'\n'}
                No one under age 18 is allowed to provide any personal information to Hello Superstars. If we learn that we have collected personal information from a child under age 18 without verification of parental consent, we will delete that information as quickly as possible.
                {'\n'} {'\n'}

              </Text>

              <Subtitle title={'Fair Information Practices  '} />
              <Text>{'\n'}</Text>
              <Subtitle title={'In order to be in line with Fair Information Practices we will take the following responsive action, should a data breach occur: '} />

              <Text style={{ color: '#959595', letterSpacing: 1, lineHeight: 18, }}>
                {"\n"}
                We will notify you via email


              </Text>
              <Text style={{ color: '#959595', letterSpacing: 1, lineHeight: 18, }}>

                1. Within 7 business days

                {'\n'}{'\n'}
                We also agree to the Individual Redress Principle which requires that individuals have the right to legally pursue enforceable rights against data collectors and processors who fail to adhere to the law. This principle requires not only that individuals have enforceable rights against data users, but also that individuals have recourse to courts or government agencies to investigate and/or prosecute non-compliance by data processors.
                {'\n'}{'\n'}

              </Text>
              <Subtitle title={'SPAM'} />


              <Text style={{ color: '#959595', letterSpacing: 1, lineHeight: 18, }}>
                We collect your email address in order to:





              </Text>
              <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 5 }}>
                <Text style={{ color: '#959595', }}>1.</Text>
                <Text style={{ marginLeft: 10, color: '#959595', }}>Send information, respond to inquiries, and/or other requests or questions
                </Text>
              </View>

              <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 5 }}>
                <Text style={{ color: '#959595', }}>1.</Text>
                <Text style={{ marginLeft: 10, color: '#959595', }}>Send you additional information related to your product and/or service
                </Text>
              </View>

              <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 5 }}>
                <Text style={{ color: '#959595', }}>3.</Text>
                <Text style={{ marginLeft: 10, color: '#959595', }}>Market to our mailing list or continue to send emails to our clients after the original transaction has occurred.
                  {'\n'}
                </Text>
              </View>



              {/*=============================== */}

              <Text style={{ color: '#959595', letterSpacing: 1, lineHeight: 18, }}>
                We agree to the following:
              </Text>
              <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 5 }}>
                <Text style={{ color: '#959595', }}>1.</Text>
                <Text style={{ marginLeft: 10, color: '#959595', }}>Not use false or misleading subjects or email addresses.

                </Text>
              </View>

              <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 5 }}>
                <Text style={{ color: '#959595', }}>2.</Text>
                <Text style={{ marginLeft: 10, color: '#959595', }}>

                  Identify the message as an advertisement in some reasonable way.

                </Text>
              </View>

              <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 5 }}>
                <Text style={{ color: '#959595', }}>3.</Text>
                <Text style={{ marginLeft: 10, color: '#959595', }}>Include the physical address of our business or site headquarters.

                </Text>
              </View>


              <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 5 }}>
                <Text style={{ color: '#959595', }}>4.</Text>
                <Text style={{ marginLeft: 10, color: '#959595', }}>Monitor third-party email marketing services for compliance, if one is used.


                </Text>
              </View>


              <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 5 }}>
                <Text style={{ color: '#959595', }}>5.</Text>
                <Text style={{ marginLeft: 10, color: '#959595', }}>Honor opt-out/unsubscribe requests quickly

                </Text>
              </View>


              <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 5 }}>
                <Text style={{ color: '#959595', }}>6.</Text>
                <Text style={{ marginLeft: 10, color: '#959595', }}>Allow users to unsubscribe by using the link at the bottom of each email.

                  {'\n'}
                </Text>
              </View>
              <Text style={{ color: '#959595', letterSpacing: 1, lineHeight: 18, fontWeight: 'bold' }}>
                If at any time you would like to unsubscribe from receiving future emails, you can email us at





              </Text>
              <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 5 }}>
                <Text style={{ color: '#959595', }}>1.</Text>
                <Text style={{ marginLeft: 10, color: '#959595', }}>Follow the instructions at the bottom of each email. and we will promptly remove you from marketing, newsletter and transaction notification correspondence
                </Text>
              </View>

              <View style={{ flexDirection: 'row', marginVertical: 5, marginHorizontal: 5 }}>
                <Text style={{ color: '#959595', }}>1.</Text>
                <Text style={{ marginLeft: 10, color: '#959595', }}>We might still use your email to communicate with you for customer service purposes
                </Text>
              </View>

              <Subtitle title={'Notification Procedures'} />

              <Text style={{ color: '#959595', letterSpacing: 1, lineHeight: 18, }}>

                Hello Superstars reserves the right to send the customers notifications, when it is required by law, when there is a marketing campaign, when a transaction is processed or when other business-related event happens. Hello Superstars reserves the right to determine the form and means of providing notifications to its clients.

                {'\n'}{'\n'}

              </Text>


              <Subtitle title={'Contacting Us'} />

              <Text style={{ color: '#959595', letterSpacing: 1, lineHeight: 18, }}>
                If there are any questions regarding this privacy policy, you may contact us using the information below

                {'\n'}{'\n'}

              </Text>
              <Subtitle title={'Hello Superstars Address'} />
            </ScrollView>
          </View>

        </View>

      </SafeAreaView>
    </View>

  )
}

export default Policy

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  }
})