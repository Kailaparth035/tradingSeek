import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  Dimensions,
  ScrollView,
} from "react-native";
import { scale } from "../../theme/Scalling";
import Images from "../../theme/Images";
import Color from "../../theme/Color";
import Header from "../../component/Header";
import { quote_Activity } from "../../theme/Array";
import moment from "moment";

const QuoteActivity = ({ navigation }) => {
  const [selectField, setSelectField] = useState("All");
  const [openModal, setOpenModal] = useState(false);

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={[
          styles.touchabale_view_flatlist,
          { marginTop: index === 0 ? scale(12) : scale(0) },
        ]}
        disabled={index === 0 ? true : false}
        onPress={() => setOpenModal(true)}
      >
        <View
          style={{
            flex: 0.9,
          }}
        >
          <Text
            style={[
              styles.text,
              {
                fontWeight: index === 0 ? "600" : "400",
                color: index === 0 ? Color.COLOR_BLACK : Color.Grey,
                alignSelf: "flex-start",
              },
            ]}
          >
            {index === 0 ? item.date : moment(item.date).format("DD-MM-YYYY")}
          </Text>
        </View>
        <View
          style={{
            flex: 1.1,
          }}
        >
          <Text
            style={[
              styles.text,
              {
                fontWeight: index === 0 ? "600" : "400",
                color: index === 0 ? Color.COLOR_BLACK : Color.Grey,

                alignSelf: "flex-start",
              },
            ]}
          >
            {item.description.length > 11
              ? item.description.slice(0, 11) + "..."
              : item.description}
          </Text>
        </View>

        {selectField !== "Used" ? (
          <View
            style={{
              flex: 0.8,
            }}
          >
            <Text
              style={[
                styles.text,
                {
                  fontWeight: index === 0 ? "600" : "400",
                  color: index === 0 ? Color.COLOR_BLACK : Color.Grey,
                  alignSelf: "flex-start",
                },
              ]}
            >
              {item.purchase}
            </Text>
          </View>
        ) : null}

        {selectField !== "Purchased" ? (
          <View style={{ flex: 0.5 }}>
            <Text
              style={[
                styles.text,
                {
                  fontWeight: index === 0 ? "600" : "400",
                  color: index === 0 ? Color.COLOR_BLACK : Color.Grey,
                  flex: 0.5,
                  alignSelf: "flex-start",
                },
              ]}
            >
              {item.used}
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle="dark-content"
      />
      <Header
        goBack={() => navigation.goBack()}
        header_title="Quote Activity"
      />
      <View style={styles.main_view}>
        <TouchableOpacity
          style={[
            styles.touchabale_view,
            { borderBottomWidth: selectField === "All" ? scale(2) : 0 },
          ]}
          onPress={() => setSelectField("All")}
        >
          <Text
            style={[
              styles.button_text,
              {
                color:
                  selectField === "All"
                    ? Color.BUTTON_LIGHTBLUE
                    : Color.COLOR_BLACK,
              },
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.touchabale_view,
            { borderBottomWidth: selectField === "Purchased" ? scale(2) : 0 },
          ]}
          onPress={() => setSelectField("Purchased")}
        >
          <Text
            style={[
              styles.button_text,
              {
                color:
                  selectField === "Purchased"
                    ? Color.BUTTON_LIGHTBLUE
                    : Color.COLOR_BLACK,
              },
            ]}
          >
            Purchased
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.touchabale_view,
            {
              borderBottomWidth: selectField === "Used" ? scale(2) : 0,
            },
          ]}
          onPress={() => setSelectField("Used")}
        >
          <Text
            style={[
              styles.button_text,
              {
                color:
                  selectField === "Used"
                    ? Color.BUTTON_LIGHTBLUE
                    : Color.COLOR_BLACK,
              },
            ]}
          >
            Used
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchbar_View}>
        <TextInput
          placeholder="Search"
          placeholderTextColor={Color.Grey}
          style={styles.textInpute}
        />
        <Image source={Images.Search} style={{ tintColor: Color.Grey }} />
      </View>
      <FlatList data={quote_Activity} renderItem={renderItem} />
      <Modal visible={openModal} transparent={true}>
        <Image source={Images.Black} style={styles.modalBackground} />
        <View
          style={{
            marginTop: Dimensions.get("window").height / 8,
            backgroundColor: Color.BACKGROUND_WHITE,
            marginHorizontal: scale(12),
            borderWidth: 0.3,
            borderRadius: scale(5),
            height: Dimensions.get("window").height / 1.35,
          }}
        >
          <TouchableOpacity
            onPress={() => setOpenModal(false)}
            style={{ padding: scale(10) }}
          >
            <Image source={Images.ViewClose} style={styles.close_image} />
          </TouchableOpacity>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.activity_details_header_view}>
              <Text style={styles.popup_header_text}>Activity Details</Text>
            </View>
            <View style={styles.description_view}>
              <Image source={Images.Dote} style={styles.dott_image} />
              <Text style={styles.description_header_text}>Description : </Text>
              <Text style={styles.description_answer}>
                Purchased 500 credits
              </Text>
            </View>
            <View style={styles.description_view}>
              <Image source={Images.Dote} style={styles.dott_image} />
              <Text style={styles.description_header_text}>
                Transaction type: :
              </Text>
              <Text style={styles.description_answer}> Purchased</Text>
            </View>
            <View style={styles.description_view}>
              <Image source={Images.Dote} style={styles.dott_image} />
              <Text style={styles.description_header_text}>
                Purchased credits :
              </Text>
              <Text style={styles.description_answer}> 500</Text>
            </View>
            <View style={styles.description_view}>
              <Image source={Images.Dote} style={styles.dott_image} />
              <Text style={styles.description_header_text}>
                Bonus credits :
              </Text>
              <Text style={styles.description_answer}> 100</Text>
            </View>
            <View style={styles.description_view}>
              <Image source={Images.Dote} style={styles.dott_image} />
              <Text style={styles.description_header_text}>
                Total credits :
              </Text>
              <Text style={styles.description_answer}> 600</Text>
            </View>
            <View style={styles.description_view}>
              <Image source={Images.Dote} style={styles.dott_image} />
              <Text style={styles.description_header_text}>Purchased on :</Text>
              <Text style={styles.description_answer}> Nov 12th, 2022</Text>
            </View>
            <View style={styles.description_view}>
              <Image source={Images.Dote} style={styles.dott_image} />
              <Text style={styles.description_header_text}>
                Credits expiry :
              </Text>
              <Text style={styles.description_answer}> Feb 10th, 2023</Text>
            </View>
            <View
              style={[
                styles.activity_details_header_view,
                { marginTop: scale(10) },
              ]}
            >
              <Text style={styles.popup_header_text}>
                Payment Method Details
              </Text>
            </View>
            <View style={styles.description_view}>
              <Image source={Images.Dote} style={styles.dott_image} />
              <Text style={styles.description_header_text}>Card brand :</Text>
              <Text style={styles.description_answer}>visa</Text>
            </View>
            <View style={styles.description_view}>
              <Image source={Images.Dote} style={styles.dott_image} />
              <Text style={styles.description_header_text}>
                Card last 4 digits :
              </Text>
              <Text style={styles.description_answer}> 4242</Text>
            </View>
            <View style={styles.description_view}>
              <Image source={Images.Dote} style={styles.dott_image} />
              <Text style={styles.description_header_text}>Card expiry :</Text>
              <Text style={styles.description_answer}>11/2023</Text>
            </View>
            <View style={styles.description_view}>
              <Image source={Images.Dote} style={styles.dott_image} />
              <Text style={styles.description_header_text}>Country :</Text>
              <Text style={styles.description_answer}>US</Text>
            </View>
            <View style={styles.description_view}>
              <Image source={Images.Dote} style={styles.dott_image} />
              <Text style={styles.description_header_text}>Amount paid :</Text>
              <Text style={styles.description_answer}>$200</Text>
            </View>
            <View style={styles.description_view}>
              <Image source={Images.Dote} style={styles.dott_image} />
              <Text style={styles.description_header_text}>Receipt URL :</Text>
              <Text style={styles.description_answer}>
                https://pay.stripe.com/receipt
              </Text>
            </View>
            <View style={styles.description_view}>
              <Image source={Images.Dote} style={styles.dott_image} />
              <Text style={styles.description_header_text}>
                Transaction Status :
              </Text>
              <Text style={styles.description_answer}>succeeded</Text>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};
export default QuoteActivity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_WHITE,
  },
  main_view: {
    flexDirection: "row",
    padding: scale(5),
    // borderWidth: 0.3,
    marginVertical: scale(12),
    borderColor: Color.BorderColor,
  },
  touchabale_view: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: scale(5),
    padding: scale(5),
    justifyContent: "center",
    borderColor: Color.BUTTON_LIGHTBLUE,
  },
  button_text: {
    fontSize: 15,
    fontWeight: "600",
  },
  searchbar_View: {
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: Color.Dark_White,
    marginHorizontal: scale(12),
    padding: scale(5),
    height: 37,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInpute: {
    height: scale(37),
    color: Color.COLOR_BLACK,
    width: "90%",
  },
  text: {
    alignSelf: "center",
    padding: scale(5),
    fontSize: 14,
  },
  touchabale_view_flatlist: {
    flexDirection: "row",
    marginHorizontal: scale(12),
    borderBottomWidth: 0.31,
    borderBottomColor: Color.BorderColor,
  },
  popup_header_text: {
    fontSize: 16,
    fontWeight: "500",
    color: Color.BUTTON_LIGHTBLUE,
  },
  description_view: {
    flexDirection: "row",
    borderBottomWidth: 0.31,
    borderColor: Color.Grey,
    padding: scale(10),
    marginHorizontal: scale(12),
    alignItems: "center",
  },
  description_header_text: {
    fontSize: 14,
    fontWeight: "500",
    alignSelf: "center",
  },
  description_answer: {
    alignSelf: "center",
    fontSize: 14,
    color: Color.Grey,
  },
  modalBackground: {
    position: "absolute",
    height: "100%",
    width: "100%",
    opacity: 0.8,
  },
  dott_image: {
    width: scale(10),
    height: scale(10),
    tintColor: Color.BUTTON_LIGHTBLUE,
    marginHorizontal: scale(5),
  },
  close_image: {
    width: scale(27),
    height: scale(27),
    alignSelf: "flex-end",
  },
  activity_details_header_view: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: scale(10),
    borderTopRightRadius: scale(5),
    borderTopLeftRadius: scale(5),
  },
});
