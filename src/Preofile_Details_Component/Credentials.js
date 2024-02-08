import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

import Color from "../theme/Color";
import Images from "../theme/Images";
import { scale } from "../theme/Scalling";
import CredentialsCoreComp from "../component/CredentialCoreComp";

const Credentials = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header_text}>Credentials</Text>
      <ScrollView>
        <CredentialsCoreComp
          title={"Insurance Details"}
          description={
            " If you require Public Liability Insurance, please upload forverification."
          }
          uploadDocument={() => props.uploadDocument("insuranceFile")}
          file={props.profileDetails.insuranceFile}
          deletCredential={() =>
            props.deletCredential(
              "insuranceFile",
              props.profileDetails.insuranceFile
            )
          }
        />
        <CredentialsCoreComp
          title={"Trade License"}
          description={"Upload any trade license you might have."}
          uploadDocument={() => props.uploadDocument("tradeLicense")}
          file={props.profileDetails.tradeLicense}
          deletCredential={() =>
            props.deletCredential(
              "tradeLicense",
              props.profileDetails.tradeLicense
            )
          }
        />
        <CredentialsCoreComp
          title={"Certification"}
          description={"Upload any certificates you might have."}
          uploadDocument={() => props.uploadDocument("businessCertification")}
          file={props.profileDetails.businessCertification}
          deletCredential={() =>
            props.deletCredential(
              "businessCertification",
              props.profileDetails.businessCertification
            )
          }
        />

        <View style={styles.mainView}>
          <Text style={styles.content_header_text}>Awards</Text>
          <Text style={styles.description_text}>
            These annual awards showcase the top rated and most hired businesses
            in your industry. You will be notified via email if you won an award
          </Text>
          <View style={styles.award_image_view}>
            <Image source={Images.TopRated} style={styles.awardImages} />
            <Image source={Images.MostHired} style={styles.awardImages} />
          </View>
        </View>
        <View style={styles.mainView}>
          <Text style={styles.content_header_text}>Badges</Text>
          <Text style={styles.description_text}>
            Customers often look for badges when choosing which business to
            hire. Verified and On time badges show you are reliable and
            trustworthy
          </Text>
          <View style={styles.award_image_view}>
            <Image source={Images.OnTimeGurantee} style={styles.awardImages} />
            <Image source={Images.Verified} style={styles.awardImages} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default Credentials;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_WHITE,
    marginTop: scale(10),
  },
  header_text: {
    fontSize: 15,
    fontWeight: "500",
    color: Color.COLOR_BLACK,
    paddingHorizontal: scale(12),
  },
  content_header_text: {
    fontSize: 15,
    fontWeight: "500",
    color: Color.COLOR_BLACK,
  },
  description_text: {
    paddingVertical: scale(7),
    color: Color.Grey,
  },
  awardImages: {
    width: scale(100),
    height: scale(100),
    marginHorizontal: scale(7),
  },
  mainView: {
    padding: scale(12),
    borderBottomColor: Color.BorderColor,
    borderBottomWidth: 1,
    marginHorizontal: scale(10),
  },
  award_image_view: {
    flexDirection: "row",
    padding: scale(10),
    alignItems: "center",
    justifyContent: "center",
  },
});
