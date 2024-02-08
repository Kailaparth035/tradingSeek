import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Linking,
} from "react-native";
import { scale } from "../theme/Scalling";
import Images from "../theme/Images";
import Color from "../theme/Color";

const CredentialsCoreComp = (props) => {
  return (
    <View style={styles.main_view}>
      <Text style={styles.content_header_text}>{props.title}</Text>
      <Text style={styles.description_text}>{props.description}</Text>
      {props.file !== null ? (
        <View style={styles.selectedfile_view}>
          <TouchableOpacity
            style={styles.selected_image_view}
            onPress={() => Linking.openURL(props.file)}
          >
            <Image source={Images.Certificate} style={styles.selected_image} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => props.deletCredential()}>
            <Image source={Images.Delet} style={styles.delet_button} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.selectFile_button}
          onPress={() => props.uploadDocument()}
        >
          <Image
            style={styles.uploaddocument_image}
            source={Images.UploadDocument}
          />
          <Text style={[styles.text, { marginTop: scale(3) }]}>
            Select a file
          </Text>
          <Text style={styles.text}>
            File types accepted: PDF, JPEG, JPG and PNG (not more than 4MB)
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default CredentialsCoreComp;

const styles = StyleSheet.create({
  main_view: {
    padding: scale(12),
    borderBottomColor: Color.BorderColor,
    borderBottomWidth: 1,
    marginHorizontal: scale(10),
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
  selectFile_button: {
    padding: scale(10),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.8,
    borderStyle: "dashed",
    borderColor: Color.Grey,
    backgroundColor: Color.Dark_White,
  },
  uploaddocument_image: {
    width: 24,
    height: 24,
    tintColor: Color.Grey,
    marginTop: scale(3),
  },
  text: {
    color: Color.Light_Black,
    paddingVertical: scale(2),
    textAlign: "center",
  },
  selectedfile_view: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selected_image_view: {
    borderWidth: 1,
    borderRadius: scale(5),
    padding: scale(3),
  },
  selected_image: {
    width: 60,
    height: 70,
    resizeMode: "stretch",
    borderRadius: scale(5),
  },
  delet_button: {
    width: 25,
    height: 25,
    tintColor: Color.ERROR,
  },
});
