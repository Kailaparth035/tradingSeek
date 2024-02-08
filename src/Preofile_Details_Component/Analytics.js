import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Color from "../theme/Color";
import Images from "../theme/Images";
import { scale } from "../theme/Scalling";
import DropDownComp from "../component/DropDown";
import { ScrollView } from "react-native-gesture-handler";

const Analytics = (props) => {
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.header_text,
          { marginBottom: scale(15), color: Color.COLOR_BLACK },
        ]}
      >
        Analytics
      </Text>
      <ScrollView>
        <Text
          style={[
            styles.header_text,
            { color: Color.Dark_Grey, marginHorizontal: scale(15) },
          ]}
        >
          Please select your date range
        </Text>
        <DropDownComp
          selectedValue={props.selectedDaterange}
          placeholder="Select"
          data={props.date_range}
          labelField={"date"}
          valueField={"date"}
          dropdown={styles.dropdown}
          selected={(item) => props.selectdate_range(item)}
        />
        <Text
          style={[
            styles.header_text,
            {
              color: Color.Dark_Grey,
              marginTop: scale(15),
              marginHorizontal: scale(15),
            },
          ]}
        >
          Please select your chart type
        </Text>
        <DropDownComp
          selectedValue={props.selectedchartType}
          placeholder="Select"
          data={props.chart_type}
          labelField={"chartName"}
          valueField={"chartName"}
          dropdown={styles.dropdown}
          selected={(item) => props.selectChartType(item)}
        />

        <View
          style={{
            borderWidth: 1,
            backgroundColor: Color.Dark_White,

            elevation: 10,
            borderColor: Color.Dark_White,
            marginVertical: scale(10),
            marginHorizontal: scale(25),
            padding: scale(10),
          }}
        >
          <Text
            style={[
              styles.header_text,
              { marginVertical: scale(10), color: Color.COLOR_BLACK },
            ]}
          >
            Overview
          </Text>
          <Text
            style={[
              styles.header_text,
              {
                marginTop: scale(-10),
                color: Color.Dark_Grey,
              },
            ]}
          >
            Directory Impressions
          </Text>
          <View style={{ flexDirection: "row", padding: scale(10) }}>
            <Text style={{ color: Color.COLOR_BLACK }}> 1.0</Text>
            <Text style={{ color: Color.COLOR_BLACK }}>
              {"   "}--------------------------------------------{" "}
            </Text>
          </View>
          <View style={{ flexDirection: "row", padding: scale(10) }}>
            <Text style={{ color: Color.COLOR_BLACK }}> 2.0</Text>
            <Text style={{ color: Color.COLOR_BLACK }}>
              {"   "}
              --------------------------------------------{" "}
            </Text>
          </View>
          <View style={{ flexDirection: "row", padding: scale(10) }}>
            <Text style={{ color: Color.COLOR_BLACK }}> 3.0</Text>
            <Text style={{ color: Color.COLOR_BLACK }}>
              {"   "}
              --------------------------------------------{" "}
            </Text>
          </View>
          <View style={{ flexDirection: "row", padding: scale(10) }}>
            <Text style={{ color: Color.COLOR_BLACK }}> 4.0</Text>

            <Text style={{ color: Color.COLOR_BLACK }}>
              {"   "}--------------------------------------------{" "}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default Analytics;

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
  content_header_text: {
    fontSize: 15,
    fontWeight: "500",
    paddingHorizontal: scale(12),
    marginVertical: scale(5),
  },
  dropdown: {
    flex: 1,
    borderBottomColor: Color.BorderColor,
    paddingLeft: 3,
    marginHorizontal: scale(25),
    borderBottomWidth: 1,
  },
});
