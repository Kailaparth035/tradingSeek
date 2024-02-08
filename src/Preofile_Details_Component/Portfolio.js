import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Color from "../theme/Color";
import { scale } from "../theme/Scalling";
import Images from "../theme/Images";
import CredentialsCoreComp from "../component/CredentialCoreComp";

const Portfolio = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header_text}>Portfolio</Text>
      <ScrollView>
        <CredentialsCoreComp
          title={"Image Gallery"}
          description={
            "Photos help customers learn more about you and your business. Upload photos of your recent projects,your team or even your workspace."
          }
          uploadDocument={() => props.uploadDocument("businessPortfolio")}
          file={null}
          deletCredential={() => props.deletportFolio()}
        />
        <Text style={styles.myportfolio_text}>My Portfolio</Text>
        <TouchableOpacity
          style={styles.button_to_delet_image}
          onPress={() => props.deletportFolio()}
        >
          {props.profileDetails.businessPortfolio.length !== 0 ? (
            <FlatList
              data={props.profileDetails.businessPortfolio}
              renderItem={({ item }) => {
                console.log("item :::", item);
                return (
                  <View style={styles.flatlist_view}>
                    <Image
                      source={{ uri: item }}
                      style={styles.image}
                      resizeMode="stretch"
                    />
                  </View>
                );
              }}
            />
          ) : null}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
export default Portfolio;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.BACKGROUND_WHITE,
    marginTop: scale(10),
  },
  header_text: {
    fontSize: 15,
    fontWeight: "500",
    color: Color.COLOR_BLACK,
    paddingHorizontal: scale(12),
  },
  button_to_delet_image: {
    borderWidth: 1,
    margin: scale(10),
    borderRadius: scale(5),
    borderColor: Color.BorderColor,
  },
  flatlist_view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: scale(10),
  },
  image: {
    width: scale(200),
    height: scale(200),
  },
  myportfolio_text: {
    color: Color.COLOR_BLACK,
    padding: scale(10),
    fontWeight: "500",
    fontSize: 14,
  },
});
