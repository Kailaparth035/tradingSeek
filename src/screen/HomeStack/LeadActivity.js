import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import Color from "../../theme/Color";
import Images from "../../theme/Images";
import { scale } from "../../theme/Scalling";
import Header from "../../component/Header";
import MultiSelect from "react-native-multiple-select";
import { useDispatch, useSelector } from "react-redux";
import ReduxActions from "../../helper/ReduxActions";
import Loader from "../../component/Loader";
import AusLocation from "../../../duplicate_aus.json";
// import AusLocation from "../../../aus.json";
import AsyncStorage from "../../helper/AsyncStorage";

const LeadActivity = ({ navigation }) => {
  const dispatch = useDispatch();
  const loaderResponse = useSelector((state) => state.loader);
  const professionResponse = useSelector((state) => state.profession);
  const [selectProfession, setSelectProfession] = useState([]);
  const [professiondata, setProfessiondata] = useState();
  const [selectLocation, setSelectLocation] = useState([]);
  const [checkBox, setCheckBox] = useState(false);
  const [profileDetails, setProfileDetails] = useState({});

  useEffect(() => {
    AsyncStorage.getItem("userProfile").then((profileData) => {
      setProfileDetails(JSON.parse(profileData));
    });
  }, []);

  const onSelectedItemsChange = (selectedItems) => {
    setSelectProfession([...selectedItems]);
  };
  const onSelectLocation = (selectedItems) => {
    setSelectLocation([...selectedItems]);
  };

  useEffect(() => {
    if (professionResponse.data !== null) {
      // console.log("profession response ::", professionResponse.data);
      setProfessiondata(professionResponse.data);
    } else {
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.ProfessionRequest());
    }
  }, [professionResponse.data]);

  const update_profession = () => {
    console.log("selectProfession :::", selectProfession);
    if (selectProfession.length !== 0) {
      let temp = [];
      professiondata.map((prfItem) => {
        selectProfession.map((selItem) => {
          if (prfItem.name === selItem) {
            temp.push(prfItem);
          }
        });
      });
      console.log("temp ::", temp);
      let bodyData = {
        professions: temp,
      };
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.UpdateProfessionRequest(bodyData));
    }
  };

  const update_location = () => {
    if (selectLocation.length !== 0) {
      console.log("update location", selectLocation);
      let temp = [];

      selectLocation.map((mapItem) => {
        temp.push({ locality: mapItem });
      });
      console.log("temp::", temp);
      profileDetails.locations = temp;
      console.log("profile details :::", profileDetails);
      dispatch(ReduxActions.loaderAction(true));
      dispatch(ReduxActions.UpdateLocationRequest(profileDetails));
    }
  };

  const checkbox_click = () => {
    setCheckBox(!checkBox);
    profileDetails.allLocations = !checkBox;
    console.log("profile details :::", profileDetails);
    dispatch(ReduxActions.loaderAction(true));
    dispatch(ReduxActions.UpdateLocationRequest(profileDetails));
  };

  // useEffect(() => {
  //   let temp = [];

  //   AusLocation.map((ausItem) => {
  //     let var_check = false;
  //     // console.log("ausItem :::", ausItem.locality);
  //     if (temp.length !== 0) {
  //       temp.map((item) => {
  //         if (item.locality === ausItem.locality) {
  //           // console.log("match", var_check);
  //           var_check = true;
  //         }
  //       });
  //     } else {
  //       temp.push(ausItem);
  //     }

  //     if (!var_check) {
  //       temp.push(ausItem);
  //       var_check = false;
  //     }
  //   });

  //   console.log("temp :::: ", temp);
  // }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle="dark-content"
      />
      <Header goBack={() => navigation.goBack()} header_title="Lead Activity" />
      <Text style={styles.header_text}>Job Types</Text>
      <ScrollView>
        <Text style={styles.title_text}>
          Receive leads for services added here:
        </Text>
        <View style={{ marginHorizontal: scale(20) }}>
          <MultiSelect
            hideTags
            items={professiondata}
            uniqueKey="name"
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectProfession}
            selectText={
              selectProfession.length !== 0 ? selectProfession : "Services"
            }
            searchInputPlaceholderText="Search Items..."
            itemFontSize={14}
            fontSize={14}
            textColor={Color.COLOR_BLACK}
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: "#CCC", paddingVertical: scale(10) }}
            submitButtonColor={Color.BUTTON_LIGHTBLUE}
            submitButtonText="Submit"
            styleItemsContainer={{
              backgroundColor: Color.BACKGROUND_WHITE,
              paddingVertical: scale(7),
              height: Dimensions.get("window").height / 3,
            }}
            onToggleList={() => update_profession()}
          />
        </View>
        <Text style={styles.title_text}>
          Receive leads from locations added here:
        </Text>
        <View style={{ marginHorizontal: scale(20) }}>
          <MultiSelect
            hideTags
            items={AusLocation}
            uniqueKey="locality"
            onSelectedItemsChange={onSelectLocation}
            selectedItems={selectLocation}
            selectText={
              selectLocation.length !== 0 ? selectLocation : "Location"
            }
            searchInputPlaceholderText="Search Items..."
            itemFontSize={14}
            fontSize={14}
            textColor={Color.COLOR_BLACK}
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            itemTextColor="#000"
            displayKey="locality"
            searchInputStyle={{ color: "#CCC", paddingVertical: scale(10) }}
            submitButtonColor={Color.BUTTON_LIGHTBLUE}
            submitButtonText="Submit"
            styleItemsContainer={{
              backgroundColor: Color.BACKGROUND_WHITE,
              paddingVertical: scale(7),
              height: Dimensions.get("window").height / 3,
            }}
            onToggleList={() => update_location()}
          />
        </View>
        <View style={styles.checkbox_view}>
          <TouchableOpacity
            style={[
              styles.checkbox_button,
              {
                borderColor: checkBox ? Color.BLUE_DRESS : Color.BorderColor,
                backgroundColor: checkBox
                  ? Color.BLUE_DRESS
                  : Color.BACKGROUND_WHITE,
              },
            ]}
            onPress={() => checkbox_click()}
          >
            {checkBox ? (
              <Image source={Images.Check} style={styles.CheckImage} />
            ) : null}
          </TouchableOpacity>
          <Text style={styles.checkbox_text}>Service All of Australia</Text>
        </View>

        <Loader val={loaderResponse.loader} />
      </ScrollView>
    </View>
  );
};
export default LeadActivity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BACKGROUND_WHITE,
  },
  header_text: {
    padding: scale(10),
    fontSize: 16,
    fontWeight: "500",
    color: Color.COLOR_BLACK,
  },
  title_text: {
    marginTop: scale(15),
    color: Color.Grey,
    marginHorizontal: scale(20),
    fontSize: 15,
    fontWeight: "500",
  },
  CheckImage: {
    width: 15,
    height: 15,
    tintColor: Color.BACKGROUND_WHITE,
  },
  checkbox_button: {
    height: 20,
    width: 20,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkbox_view: {
    flexDirection: "row",
    padding: scale(10),
    paddingHorizontal: scale(20),
  },
  checkbox_text: {
    alignSelf: "center",
    marginHorizontal: scale(5),
    color: Color.Grey,
    fontSize: 14,
  },
});
