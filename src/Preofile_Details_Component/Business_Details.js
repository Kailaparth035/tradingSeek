import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
} from "react-native";

import { scale } from "../theme/Scalling";
import Color from "../theme/Color";
import AsyncStorage from "../helper/AsyncStorage";
import Images from "../theme/Images";
import moment from "moment";

const Business_Details = (props) => {
  const { profileDetails } = props;
  return (
    <>
      <Text
        style={[
          styles.outof_rating,
          { paddingHorizontal: scale(12), marginVertical: 15 },
        ]}
      >
        {profileDetails !== null && profileDetails.userType === "Business User"
          ? profileDetails.switchedToCustomerViewApk === false
            ? "Business Details"
            : "My Profile"
          : "My Profile"}
      </Text>
      <ScrollView>
        {profileDetails !== null &&
        profileDetails.userType === "Business User" ? (
          profileDetails.switchedToCustomerViewApk === false ? null : (
            <>
              <View style={styles.bussines_component_view}>
                <View
                  style={[
                    styles.bussines_email_image_view,
                    { alignSelf: "flex-end" },
                  ]}
                >
                  <Image source={Images.Email} style={styles.email_image} />
                </View>
                <View style={[styles.bussines_email_text_view]}>
                  <Text
                    style={[
                      styles.bussines_email_text,
                      {
                        color: Color.BUTTON_LIGHTBLUE,
                        paddingVertical: scale(2),
                      },
                    ]}
                  >
                    Email
                  </Text>
                  <Text
                    style={[
                      styles.bussines_email_text,
                      {
                        color: Color.Grey,
                      },
                    ]}
                  >
                    {profileDetails !== null
                      ? profileDetails.email !== null
                        ? profileDetails.email
                        : null
                      : null}
                  </Text>
                </View>
                {profileDetails !== null ? (
                  <Text
                    disabled={
                      profileDetails.isEmailVerified !== true ? false : true
                    }
                    onPress={() => props.emailVerification()}
                    style={[
                      styles.verifed_text,
                      {
                        color:
                          profileDetails.isEmailVerified !== true
                            ? Color.RED
                            : Color.POSITIVE,
                      },
                    ]}
                  >
                    {profileDetails.isEmailVerified !== true
                      ? "Verify Now"
                      : "Verified"}
                  </Text>
                ) : null}
              </View>
              <View style={styles.bussines_component_view}>
                <View
                  style={[
                    styles.bussines_email_image_view,
                    { alignSelf: "flex-end" },
                  ]}
                >
                  <Image source={Images.Phone} style={styles.email_image} />
                </View>
                <View style={[styles.bussines_email_text_view]}>
                  <Text
                    style={[
                      styles.bussines_email_text,
                      {
                        color: Color.BUTTON_LIGHTBLUE,
                        paddingVertical: scale(2),
                      },
                    ]}
                  >
                    Phone
                  </Text>
                  <Text
                    style={[
                      styles.bussines_email_text,
                      {
                        color: Color.Grey,
                      },
                    ]}
                  >
                    {profileDetails !== null
                      ? profileDetails.phone !== null
                        ? profileDetails.phone
                        : null
                      : null}
                  </Text>
                </View>
                {profileDetails !== null ? (
                  <Text
                    disabled={
                      profileDetails.isPhoneVerified !== true ? false : true
                    }
                    onPress={() => props.verifyPhoneNumber()}
                    style={[
                      styles.verifed_text,
                      {
                        color:
                          profileDetails.isPhoneVerified !== true
                            ? Color.RED
                            : Color.POSITIVE,
                      },
                    ]}
                  >
                    {profileDetails.isPhoneVerified !== true
                      ? "Verify Now"
                      : "Verified"}
                  </Text>
                ) : null}
              </View>
              <View style={styles.bussines_component_view}>
                <View
                  style={[
                    styles.bussines_email_image_view,
                    { alignSelf: "flex-start" },
                  ]}
                >
                  <Image source={Images.Password} style={styles.email_image} />
                </View>

                <View style={[styles.bussines_email_text_view]}>
                  <Text
                    style={[
                      styles.bussines_email_text,
                      {
                        color: Color.BUTTON_LIGHTBLUE,
                        paddingVertical: scale(2),
                      },
                    ]}
                  >
                    Password
                  </Text>
                  <Text
                    style={[
                      styles.bussines_email_text,
                      {
                        color: Color.Grey,
                      },
                    ]}
                  >
                    Password last chnaged:{" "}
                    {profileDetails !== null
                      ? moment(profileDetails.passwordLastChanged).format(
                          "dddd, MMMM DD, YYYY"
                        )
                      : null}
                  </Text>
                </View>
                <Text
                  disabled={
                    profileDetails.isEmailVerified !== true ? false : true
                  }
                  onPress={() => props.navigation_resetPassword()}
                  style={[
                    styles.verifed_text,
                    {
                      color: Color.BLUE_DRESS,
                    },
                  ]}
                >
                  Reset Password
                </Text>
              </View>
            </>
          )
        ) : (
          <>
            <View style={styles.bussines_component_view}>
              <View
                style={[
                  styles.bussines_email_image_view,
                  { alignSelf: "flex-end" },
                ]}
              >
                <Image source={Images.Email} style={styles.email_image} />
              </View>
              <View style={[styles.bussines_email_text_view]}>
                <Text
                  style={[
                    styles.bussines_email_text,
                    {
                      color: Color.BUTTON_LIGHTBLUE,
                      paddingVertical: scale(2),
                    },
                  ]}
                >
                  Email
                </Text>
                <Text
                  style={[
                    styles.bussines_email_text,
                    {
                      color: Color.Grey,
                    },
                  ]}
                >
                  {profileDetails !== null
                    ? profileDetails.email !== null
                      ? profileDetails.email
                      : null
                    : null}
                </Text>
              </View>
              {profileDetails !== null ? (
                <Text
                  disabled={
                    profileDetails.isEmailVerified !== true ? false : true
                  }
                  onPress={() => props.emailVerification()}
                  style={[
                    styles.verifed_text,
                    {
                      color:
                        profileDetails.isEmailVerified !== true
                          ? Color.RED
                          : Color.POSITIVE,
                    },
                  ]}
                >
                  {profileDetails.isEmailVerified !== true
                    ? "Verify Now"
                    : "Verified"}
                </Text>
              ) : null}
            </View>
            <View style={styles.bussines_component_view}>
              <View
                style={[
                  styles.bussines_email_image_view,
                  { alignSelf: "flex-end" },
                ]}
              >
                <Image source={Images.Phone} style={styles.email_image} />
              </View>
              <View style={[styles.bussines_email_text_view]}>
                <Text
                  style={[
                    styles.bussines_email_text,
                    {
                      color: Color.BUTTON_LIGHTBLUE,
                      paddingVertical: scale(2),
                    },
                  ]}
                >
                  Phone
                </Text>
                <Text
                  style={[
                    styles.bussines_email_text,
                    {
                      color: Color.Grey,
                    },
                  ]}
                >
                  {profileDetails !== null
                    ? profileDetails.phone !== null
                      ? profileDetails.phone
                      : null
                    : null}
                </Text>
              </View>
              {profileDetails !== null ? (
                <Text
                  disabled={
                    profileDetails.isPhoneVerified !== true ? false : true
                  }
                  onPress={() => props.verifyPhoneNumber()}
                  style={[
                    styles.verifed_text,
                    {
                      color:
                        profileDetails.isPhoneVerified !== true
                          ? Color.RED
                          : Color.POSITIVE,
                    },
                  ]}
                >
                  {profileDetails.isPhoneVerified !== true
                    ? "Verify Now"
                    : "Verified"}
                </Text>
              ) : null}
            </View>
            <View style={styles.bussines_component_view}>
              <View
                style={[
                  styles.bussines_email_image_view,
                  { alignSelf: "flex-start" },
                ]}
              >
                <Image source={Images.Password} style={styles.email_image} />
              </View>

              <View style={[styles.bussines_email_text_view]}>
                <Text
                  style={[
                    styles.bussines_email_text,
                    {
                      color: Color.BUTTON_LIGHTBLUE,
                      paddingVertical: scale(2),
                    },
                  ]}
                >
                  Password
                </Text>
                <Text
                  style={[
                    styles.bussines_email_text,
                    {
                      color: Color.Grey,
                    },
                  ]}
                >
                  Password last chnaged:{" "}
                  {profileDetails !== null
                    ? moment(profileDetails.passwordLastChanged).format(
                        "dddd, MMMM DD, YYYY"
                      )
                    : null}
                </Text>
              </View>
            </View>
          </>
        )}

        {/* Business name  */}
        {profileDetails !== null &&
        profileDetails.userType === "Business User" ? (
          profileDetails.switchedToCustomerViewApk === false ? (
            <>
              <View style={styles.bussines_component_view}>
                <View
                  style={[
                    styles.bussines_email_image_view,
                    { alignSelf: "flex-start" },
                  ]}
                >
                  <Image
                    source={Images.BusinessName}
                    style={styles.email_image}
                  />
                </View>

                <View style={[styles.bussines_email_text_view]}>
                  <Text
                    style={[
                      styles.bussines_email_text,
                      {
                        color: Color.BUTTON_LIGHTBLUE,
                        paddingVertical: scale(2),
                      },
                    ]}
                  >
                    Business Name
                  </Text>
                  <Text
                    style={[
                      styles.bussines_email_text,
                      {
                        color: Color.Grey,
                      },
                    ]}
                  >
                    {profileDetails.businessName}
                  </Text>
                </View>
                <Text
                  style={styles.editButton}
                  onPress={() =>
                    props.setOpenEditModal(
                      "Business Name",
                      profileDetails.businessName
                    )
                  }
                >
                  Edit
                </Text>
              </View>
              <View style={styles.bussines_component_view}>
                <View
                  style={[
                    styles.bussines_email_image_view,
                    { alignSelf: "flex-start" },
                  ]}
                >
                  <Image
                    source={Images.BusinessName}
                    style={styles.email_image}
                  />
                </View>

                <View style={[styles.bussines_email_text_view]}>
                  <Text
                    style={[
                      styles.bussines_email_text,
                      {
                        color: Color.BUTTON_LIGHTBLUE,
                        paddingVertical: scale(2),
                      },
                    ]}
                  >
                    Business NZBN
                  </Text>
                  <Text
                    style={[
                      styles.bussines_email_text,
                      {
                        color: Color.Grey,
                      },
                    ]}
                  >
                    {profileDetails.businessABN}
                  </Text>
                </View>
              </View>
              <View style={styles.bussines_component_view}>
                <View
                  style={[
                    styles.bussines_email_image_view,
                    { alignSelf: "flex-start" },
                  ]}
                >
                  <Image
                    source={Images.BusinessUserProfile}
                    style={styles.email_image}
                  />
                </View>

                <View style={[styles.bussines_email_text_view]}>
                  <Text
                    style={[
                      styles.bussines_email_text,
                      {
                        color: Color.BUTTON_LIGHTBLUE,
                        paddingVertical: scale(2),
                      },
                    ]}
                  >
                    Business description
                  </Text>
                  <Text
                    style={[
                      styles.bussines_email_text,
                      {
                        color: Color.Grey,
                        textAlign: "justify",
                      },
                    ]}
                  >
                    {profileDetails.businessDescription}
                  </Text>
                </View>
                <Text
                  style={[styles.editButton, { alignSelf: "center" }]}
                  onPress={() =>
                    props.setOpenEditModal(
                      "Business description",
                      profileDetails.businessDescription
                    )
                  }
                >
                  Edit
                </Text>
              </View>

              <View
                style={[
                  styles.bussines_component_view,
                  { flexDirection: "column" },
                ]}
              >
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={[
                      styles.bussines_email_image_view,
                      { alignSelf: "center" },
                    ]}
                  >
                    <Image
                      source={Images.BusinessUserProfile}
                      style={styles.email_image}
                    />
                  </View>

                  <View
                    style={[
                      styles.bussines_email_text_view,
                      { alignSelf: "center" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.bussines_email_text,
                        {
                          color: Color.BUTTON_LIGHTBLUE,
                          paddingVertical: scale(2),
                        },
                      ]}
                    >
                      Business Contact Details
                    </Text>
                  </View>
                </View>
                <View style={styles.contact_details_view}>
                  <View style={styles.contact_title_view}>
                    <Text style={styles.conatct_details_text}>
                      Primary Contact
                    </Text>
                    <Text
                      style={[
                        styles.bussines_email_text,
                        {
                          color: Color.Grey,
                        },
                      ]}
                    >
                      {profileDetails.primaryContact}
                    </Text>
                  </View>
                  <Text
                    style={[styles.editButton]}
                    onPress={() =>
                      props.setOpenEditModal(
                        "Primary Contact",
                        profileDetails.primaryContact
                      )
                    }
                  >
                    Edit
                  </Text>
                </View>
                <View style={styles.contact_details_view}>
                  <View style={styles.contact_title_view}>
                    <Text style={styles.conatct_details_text}>Landline</Text>
                    <Text
                      style={[
                        styles.bussines_email_text,
                        {
                          color: Color.Grey,
                        },
                      ]}
                    >
                      {profileDetails.landline}
                    </Text>
                  </View>
                  <Text
                    style={[styles.editButton]}
                    onPress={() =>
                      props.setOpenEditModal(
                        "Landline",
                        profileDetails.landline
                      )
                    }
                  >
                    Edit
                  </Text>
                </View>
                <View style={styles.contact_details_view}>
                  <View style={styles.contact_title_view}>
                    <Text style={styles.conatct_details_text}>
                      Business Address
                    </Text>
                    <Text
                      style={[
                        styles.bussines_email_text,
                        {
                          color: Color.Grey,
                        },
                      ]}
                    >
                      {profileDetails.address}
                    </Text>
                  </View>
                  <Text
                    style={[styles.editButton]}
                    onPress={() =>
                      props.setOpenEditModal(
                        "Business Address",
                        profileDetails.address
                      )
                    }
                  >
                    Edit
                  </Text>
                </View>
                <View style={styles.contact_details_view}>
                  <View style={styles.contact_title_view}>
                    <Text style={styles.conatct_details_text}>
                      Business Email
                    </Text>
                    <Text
                      style={[
                        styles.bussines_email_text,
                        {
                          color: Color.Grey,
                        },
                      ]}
                    >
                      {profileDetails.email}
                    </Text>
                  </View>
                </View>
                <View style={styles.contact_details_view}>
                  <View style={styles.contact_title_view}>
                    <Text style={styles.conatct_details_text}>Website</Text>
                    <Text
                      style={[
                        styles.bussines_email_text,
                        {
                          color: Color.Grey,
                        },
                      ]}
                    >
                      {profileDetails.website}
                    </Text>
                  </View>
                  <Text
                    style={[styles.editButton]}
                    onPress={() =>
                      props.setOpenEditModal("Website", profileDetails.website)
                    }
                  >
                    Edit
                  </Text>
                </View>
                <View style={styles.contact_details_view}>
                  <View style={styles.contact_title_view}>
                    <Text style={styles.conatct_details_text}>Mobile</Text>
                    <Text
                      style={[
                        styles.bussines_email_text,
                        {
                          color: Color.Grey,
                        },
                      ]}
                    >
                      {profileDetails.mobile}
                    </Text>
                  </View>
                  <Text
                    style={[styles.editButton]}
                    onPress={() =>
                      props.setOpenEditModal("Mobile", profileDetails.mobile)
                    }
                  >
                    Edit
                  </Text>
                </View>
              </View>

              <View style={styles.edit_to_open_new_view}>
                <View style={styles.edit_to_open_new_view2}>
                  <View
                    style={[
                      styles.bussines_email_image_view,
                      { alignSelf: "flex-start" },
                    ]}
                  >
                    <Image
                      source={Images.BusinessName}
                      style={styles.email_image}
                    />
                  </View>

                  <View style={[styles.bussines_email_text_view]}>
                    <Text
                      style={[
                        styles.bussines_email_text,
                        {
                          color: Color.BUTTON_LIGHTBLUE,
                          paddingVertical: scale(2),
                        },
                      ]}
                    >
                      Business Opening Hours
                    </Text>
                    <Text
                      style={[
                        styles.bussines_email_text,
                        {
                          color: Color.Grey,
                        },
                      ]}
                    >
                      Let customers know your business open hours
                    </Text>
                  </View>
                  <Text
                    style={styles.editButton}
                    onPress={() => props.openHoursEditView()}
                  >
                    Edit
                  </Text>
                </View>

                {props.openHoursEditView_value !== false ? (
                  <View
                    style={{
                      marginLeft: 45,
                      marginRight: scale(10),
                    }}
                  >
                    <View style={styles.openCheckbox_view}>
                      <TouchableOpacity
                        style={[
                          styles.checkbox_button,
                          {
                            borderColor: !props.hollidayOpen
                              ? Color.BLUE_DRESS
                              : Color.BorderColor,
                            backgroundColor: !props.hollidayOpen
                              ? Color.BLUE_DRESS
                              : Color.BACKGROUND_WHITE,
                          },
                        ]}
                        onPress={() => props.setOpenHoliday()}
                      >
                        {!props.hollidayOpen ? (
                          <Image
                            source={Images.Check}
                            style={styles.CheckImage}
                          />
                        ) : null}
                      </TouchableOpacity>
                      <Text style={styles.openCheckBox_text}>
                        Open public holidays
                      </Text>
                    </View>
                    <View style={styles.openCheckbox_view}>
                      <TouchableOpacity
                        style={[
                          styles.checkbox_button,
                          {
                            borderColor: props.open24Hourse
                              ? Color.BLUE_DRESS
                              : Color.BorderColor,
                            backgroundColor: props.open24Hourse
                              ? Color.BLUE_DRESS
                              : Color.BACKGROUND_WHITE,
                          },
                        ]}
                        onPress={() => props.open24Hours()}
                      >
                        {props.open24Hourse ? (
                          <Image
                            source={Images.Check}
                            style={styles.CheckImage}
                          />
                        ) : null}
                      </TouchableOpacity>
                      <Text style={styles.openCheckBox_text}>
                        Open 24 hours
                      </Text>
                    </View>
                    {props.open24Hourse === false ? (
                      <FlatList
                        data={props.openingHoursData}
                        renderItem={({ item }) => {
                          return (
                            <View style={styles.open24Hourse_flatlist_view}>
                              <View style={styles.open24_day_view}>
                                <Text style={styles.day_text}>{item.day}</Text>
                                <View style={{ flexDirection: "row" }}>
                                  <Text style={styles.closed_text}>Closed</Text>
                                  <TouchableOpacity
                                    style={[
                                      styles.checkbox_button,
                                      {
                                        borderColor: item.isClosed
                                          ? Color.BLUE_DRESS
                                          : Color.BorderColor,
                                        backgroundColor: item.isClosed
                                          ? Color.BLUE_DRESS
                                          : Color.BACKGROUND_WHITE,
                                      },
                                    ]}
                                    onPress={() => props.open_close_day(item)}
                                  >
                                    {item.isClosed === true ? (
                                      <Image
                                        source={Images.Check}
                                        style={styles.CheckImage}
                                      />
                                    ) : null}
                                  </TouchableOpacity>
                                </View>
                              </View>
                              {item.isClosed === false ? (
                                <View style={styles.dateselect_view}>
                                  <View style={styles.dateselect_sub_view}>
                                    <Text style={styles.dateselect_header_text}>
                                      Opens at{" "}
                                    </Text>
                                    <TouchableOpacity
                                      style={styles.date_select_button}
                                      onPress={() =>
                                        props.setOpenDatePicker(
                                          item,
                                          "opens_at"
                                        )
                                      }
                                    >
                                      <Text
                                        style={{ color: Color.COLOR_BLACK }}
                                      >
                                        {moment(item.opening).format("hh:mm a")}
                                      </Text>
                                      <Image
                                        source={Images.Calener}
                                        style={styles.date_calender_image}
                                      />
                                    </TouchableOpacity>
                                  </View>
                                  <View style={styles.dateselect_sub_view}>
                                    <Text style={styles.dateselect_header_text}>
                                      Closes at{" "}
                                    </Text>
                                    <TouchableOpacity
                                      style={styles.date_select_button}
                                      onPress={() =>
                                        props.setOpenDatePicker(
                                          item,
                                          "closes_at"
                                        )
                                      }
                                    >
                                      <Text
                                        style={{ color: Color.COLOR_BLACK }}
                                      >
                                        {moment(item.closing).format("hh:mm a")}
                                      </Text>
                                      <Image
                                        source={Images.Calener}
                                        style={styles.date_calender_image}
                                      />
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              ) : null}
                            </View>
                          );
                        }}
                      />
                    ) : null}
                    <View style={{ flexDirection: "row", margin: scale(10) }}>
                      <TouchableOpacity
                        style={[styles.save_button, { marginLeft: scale(0) }]}
                        onPress={() => props.update_date()}
                      >
                        <Text style={styles.save_button_text}>Update</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.save_button,
                          {
                            backgroundColor: Color.LIGHT_GREY,
                            marginLeft: scale(0),
                            marginHorizontal: scale(0),
                          },
                        ]}
                        onPress={() => props.openHoursEditView()}
                      >
                        <Text
                          style={[
                            styles.save_button_text,
                            { color: Color.COLOR_BLACK },
                          ]}
                        >
                          Cancel
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      marginHorizontal: scale(20),
                      paddingLeft: 30,
                      // marginLeft: 55,
                    }}
                  >
                    <FlatList
                      data={props.openingHoursData}
                      renderItem={({ item }) => {
                        return (
                          <View
                            style={{
                              marginVertical: scale(3),
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text style={{ color: Color.COLOR_BLACK }}>
                              {item.day}
                            </Text>

                            {props.open24Hourse === true ? (
                              item.day === "Saturday" ||
                              item.day === "Sunday" ? (
                                props.hollidayOpen === true ? (
                                  <Text style={{ color: Color.RED }}>
                                    Closed
                                  </Text>
                                ) : (
                                  <Text style={{ color: Color.COLOR_BLACK }}>
                                    24 hours service
                                  </Text>
                                )
                              ) : (
                                <Text style={{ color: Color.COLOR_BLACK }}>
                                  24 hours service
                                </Text>
                              )
                            ) : item.isClosed === false ? (
                              <Text style={{ color: Color.COLOR_BLACK }}>
                                {moment(item.opening).format("hh:mm a") +
                                  " " +
                                  "-" +
                                  " " +
                                  moment(item.closing).format("hh:mm a")}
                              </Text>
                            ) : (
                              <Text style={{ color: Color.RED }}>Closed</Text>
                            )}
                          </View>
                        );
                      }}
                    />
                  </View>
                )}
              </View>

              <View
                style={[
                  styles.bussines_component_view,
                  { flexDirection: "column" },
                ]}
              >
                <View
                  style={[
                    styles.bussines_email_text_view,
                    { flexDirection: "row", marginHorizontal: scale(0) },
                  ]}
                >
                  <View
                    style={[
                      styles.bussines_email_image_view,
                      { alignSelf: "flex-start" },
                    ]}
                  >
                    <Image
                      source={Images.BusinessName}
                      style={styles.email_image}
                    />
                  </View>
                  <View style={{ flex: 1, marginHorizontal: scale(10) }}>
                    <Text
                      style={[
                        styles.bussines_email_text,
                        {
                          color: Color.BUTTON_LIGHTBLUE,
                          paddingVertical: scale(2),
                        },
                      ]}
                    >
                      Social Media
                    </Text>
                    <Text
                      style={[
                        styles.bussines_email_text,
                        {
                          color: Color.Grey,
                        },
                      ]}
                    >
                      Show customer your social accounts by linking your
                      username or handle
                    </Text>
                  </View>
                </View>
                <View style={styles.socialmedia_view}>
                  <Image
                    style={styles.sociallmedia_image}
                    source={Images.Instaram}
                  />
                  <Text
                    style={[
                      styles.bussines_email_text,
                      {
                        color: Color.BUTTON_LIGHTBLUE,
                      },
                    ]}
                    onPress={() =>
                      props.setOpenEditModal(
                        "Add your Instagram",
                        profileDetails.instagram !== null &&
                          profileDetails.instagram !== undefined &&
                          profileDetails.instagram !== ""
                          ? profileDetails.instagram
                          : ""
                      )
                    }
                  >
                    {profileDetails.instagram !== null &&
                    profileDetails.instagram !== undefined &&
                    profileDetails.instagram !== ""
                      ? profileDetails.instagram
                      : "Add your Instagram"}
                  </Text>
                </View>
                <View style={styles.socialmedia_view}>
                  <Image
                    style={styles.sociallmedia_image}
                    source={Images.Facebook}
                  />
                  <Text
                    style={[
                      styles.bussines_email_text,
                      {
                        color: Color.BUTTON_LIGHTBLUE,
                      },
                    ]}
                    onPress={() =>
                      props.setOpenEditModal(
                        "Add your Facebook",
                        profileDetails.facebook !== null &&
                          profileDetails.facebook !== undefined &&
                          profileDetails.facebook !== ""
                          ? profileDetails.facebook
                          : ""
                      )
                    }
                  >
                    {profileDetails.facebook !== null &&
                    profileDetails.facebook !== undefined &&
                    profileDetails.facebook !== ""
                      ? profileDetails.facebook
                      : "Add your Facebook"}
                  </Text>
                </View>
                <View style={styles.socialmedia_view}>
                  <Image
                    style={styles.sociallmedia_image}
                    source={Images.LinkedIn}
                  />
                  <Text
                    style={[
                      styles.bussines_email_text,
                      {
                        color: Color.BUTTON_LIGHTBLUE,
                      },
                    ]}
                    onPress={() =>
                      props.setOpenEditModal(
                        "Add your LinkedIn",
                        profileDetails.linkedin !== null &&
                          profileDetails.linkedin !== undefined &&
                          profileDetails.linkedin !== ""
                          ? profileDetails.linkedin
                          : ""
                      )
                    }
                  >
                    {profileDetails.linkedin !== null &&
                    profileDetails.linkedin !== undefined &&
                    profileDetails.linkedin !== ""
                      ? profileDetails.linkedin
                      : "Add your LinkedIn"}
                  </Text>
                </View>

                <View style={styles.socialmedia_view}>
                  <Image
                    style={styles.sociallmedia_image}
                    source={Images.Twitter}
                  />
                  <Text
                    style={[
                      styles.bussines_email_text,
                      {
                        color: Color.BUTTON_LIGHTBLUE,
                      },
                    ]}
                    onPress={() =>
                      props.setOpenEditModal(
                        "Add your Twitter",
                        profileDetails.twitter !== null &&
                          profileDetails.twitter !== undefined &&
                          profileDetails.twitter !== ""
                          ? profileDetails.twitter
                          : "Add your Twitter"
                      )
                    }
                  >
                    {profileDetails.twitter !== null &&
                    profileDetails.twitter !== undefined &&
                    profileDetails.twitter !== ""
                      ? profileDetails.twitter
                      : "Add your Twitter"}
                  </Text>
                </View>
                <View style={styles.socialmedia_view}>
                  <Image
                    style={styles.sociallmedia_image}
                    source={Images.Pinterest}
                  />
                  <Text
                    style={[
                      styles.bussines_email_text,
                      {
                        color: Color.BUTTON_LIGHTBLUE,
                      },
                    ]}
                    onPress={() =>
                      props.setOpenEditModal(
                        "Add your Pinterest",
                        profileDetails.pinterest !== null &&
                          profileDetails.pinterest !== undefined &&
                          profileDetails.pinterest !== ""
                          ? profileDetails.pinterest
                          : ""
                      )
                    }
                  >
                    {profileDetails.pinterest !== null &&
                    profileDetails.pinterest !== undefined &&
                    profileDetails.pinterest !== ""
                      ? profileDetails.pinterest
                      : "Add your Pinterest"}
                  </Text>
                </View>
                <View style={styles.socialmedia_view}>
                  <Image
                    style={styles.sociallmedia_image}
                    source={Images.YouTube}
                  />
                  <Text
                    style={[
                      styles.bussines_email_text,
                      {
                        color: Color.BUTTON_LIGHTBLUE,
                      },
                    ]}
                    onPress={() =>
                      props.setOpenEditModal(
                        "Add your Youtube Channel",
                        profileDetails.youtube !== null &&
                          profileDetails.youtube !== undefined &&
                          profileDetails.youtube !== ""
                          ? profileDetails.youtube
                          : ""
                      )
                    }
                  >
                    {profileDetails.youtube !== null &&
                    profileDetails.youtube !== undefined &&
                    profileDetails.youtube !== ""
                      ? profileDetails.youtube
                      : "Add your Youtube Channel"}
                  </Text>
                </View>
              </View>

              {/* <View style={styles.edit_to_open_new_view}>
                <View style={styles.edit_to_open_new_view2}>
                  <View
                    style={[
                      styles.bussines_email_image_view,
                      { alignSelf: "flex-start" },
                    ]}
                  >
                    <Image
                      source={Images.BusinessName}
                      style={styles.email_image}
                    />
                  </View>

                  <View style={[styles.bussines_email_text_view]}>
                    <Text
                      style={[
                        styles.bussines_email_text,
                        {
                          color: Color.BUTTON_LIGHTBLUE,
                          paddingVertical: scale(2),
                        },
                      ]}
                    >
                      Payment Methods
                    </Text>
                    <Text
                      style={[
                        styles.bussines_email_text,
                        {
                          color: Color.Grey,
                        },
                      ]}
                    >
                      Show customer what payment methods you accept
                    </Text>
                  </View>
                  <Text
                    style={styles.editButton}
                    onPress={() => props.openpayment_view("payment_methods")}
                  >
                    Edit
                  </Text>
                </View>
                {props.payment_view === false ? (
                  <FlatList
                    data={props.paymentData}
                    // numColumns={2}
                    renderItem={({ item }) => {
                      return (
                        <View style={styles.payment_method_view}>
                          {item.check === true ? (
                            <View style={{ flexDirection: "row", flex: 1 }}>
                              <Image
                                source={item.image}
                                style={styles.payment_images}
                              />
                              <Text style={styles.payment_method_text}>
                                {item.name}
                              </Text>
                            </View>
                          ) : null}
                        </View>
                      );
                    }}
                  />
                ) : null}

                {props.payment_view !== false ? (
                  <>
                    <FlatList
                      data={props.paymentData}
                      // numColumns={2}
                      renderItem={({ item }) => {
                        return (
                          <View style={styles.payment_method_view}>
                            <View style={{ flexDirection: "row", flex: 1 }}>
                              <Image
                                source={item.image}
                                style={styles.payment_images}
                              />
                              <Text style={styles.payment_method_text}>
                                {item.name}
                              </Text>
                            </View>

                            <TouchableOpacity
                              style={[
                                styles.checkbox_button,
                                {
                                  borderColor: item.check
                                    ? Color.BLUE_DRESS
                                    : Color.BorderColor,
                                  backgroundColor: item.check
                                    ? Color.BLUE_DRESS
                                    : Color.BACKGROUND_WHITE,
                                },
                              ]}
                              onPress={() => props.checkbox_click(item)}
                            >
                              {item.check ? (
                                <Image
                                  source={Images.Check}
                                  style={styles.CheckImage}
                                />
                              ) : null}
                            </TouchableOpacity>
                          </View>
                        );
                      }}
                    />
                    <TouchableOpacity
                      style={styles.save_button}
                      onPress={() => props.save_payment_method()}
                    >
                      <Text style={styles.save_button_text}>Save</Text>
                    </TouchableOpacity>
                  </>
                ) : null}
              </View> */}
            </>
          ) : null
        ) : null}
      </ScrollView>
    </>
  );
};
export default Business_Details;

const styles = StyleSheet.create({
  outof_rating: {
    fontSize: 15,
    fontWeight: "500",
    color: Color.COLOR_BLACK,
  },
  business_description_text: {
    color: Color.Grey,
    fontSize: 14,
    paddingVertical: scale(5),
    paddingHorizontal: scale(12),
  },

  // new
  bussines_component_view: {
    flexDirection: "row",
    padding: scale(10),
    borderBottomWidth: 0.5,
    borderBottomColor: Color.BorderColor,
  },
  bussines_email_image_view: {
    borderRadius: 22,
    width: 34,
    height: 34,
    borderWidth: 1,

    alignItems: "center",
    justifyContent: "center",
    borderColor: Color.BUTTON_LIGHTBLUE,
  },
  email_image: {
    width: 20,
    height: 20,
    tintColor: Color.BUTTON_LIGHTBLUE,
  },
  bussines_email_text_view: {
    flex: 1,
    marginHorizontal: scale(10),
  },
  bussines_email_text: {
    fontSize: 14,
  },
  verifed_text: {
    alignSelf: "center",
    fontWeight: "600",
    fontSize: 14,
  },
  editButton: {
    alignSelf: "center",
    paddingHorizontal: scale(7),
    fontWeight: "600",
    fontSize: 15,
    color: Color.BLUE_DRESS,
  },
  contact_details_view: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  contact_title_view: {
    padding: scale(10),
    marginLeft: 35,
  },
  conatct_details_text: {
    color: Color.COLOR_BLACK,
    fontWeight: "600",
    fontSize: 15,
  },
  socialmedia_view: {
    paddingLeft: 40,
    paddingVertical: scale(5),
    flexDirection: "row",
    alignItems: "center",
  },
  sociallmedia_image: {
    width: 24,
    height: 24,
    marginHorizontal: scale(5),
  },
  checkbox_button: {
    height: 20,
    width: 20,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: scale(10),
    alignSelf: "center",
  },

  CheckImage: {
    width: 15,
    height: 15,
    tintColor: Color.BACKGROUND_WHITE,
  },
  payment_method_view: {
    marginLeft: Dimensions.get("window").width / 6.7,
    marginRight: scale(10),
    flexDirection: "row",
    padding: scale(5),
    justifyContent: "space-between",
  },
  payment_images: {
    width: scale(50),
    height: scale(50),
  },
  payment_method_text: {
    alignSelf: "center",
    textAlign: "left",
    marginHorizontal: scale(10),
    flex: 1,
    color: Color.COLOR_BLACK,
  },
  save_button: {
    marginHorizontal: 60,
    marginVertical: scale(10),
    backgroundColor: Color.BUTTON_LIGHTBLUE,
    alignSelf: "flex-start",
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    borderRadius: scale(5),
  },
  save_button_text: {
    color: Color.BACKGROUND_WHITE,
    fontWeight: "600",
    fontSize: 14,
  },
  edit_to_open_new_view: {
    borderBottomWidth: 0.5,
    borderBottomColor: Color.BorderColor,
  },
  edit_to_open_new_view2: {
    flexDirection: "row",
    padding: scale(10),
  },

  // date view

  openCheckBox_text: {
    alignSelf: "center",
    color: Color.COLOR_BLACK,
    fontSize: 14,
  },
  openCheckbox_view: {
    flexDirection: "row",
    marginVertical: scale(5),
  },
  open24Hourse_flatlist_view: {
    paddingLeft: scale(10),
    paddingVertical: scale(3),
  },
  open24_day_view: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  day_text: {
    fontSize: 16,
    fontWeight: "600",
    color: Color.COLOR_BLACK,
    alignSelf: "center",
  },
  dateselect_view: {
    flexDirection: "row",
    marginBottom: 20,
  },
  dateselect_sub_view: {
    flex: 1,
    alignSelf: "flex-start",
    marginTop: scale(5),
  },
  dateselect_header_text: {
    fontSize: 13,
    color: Color.Grey,
    paddingVertical: scale(3),
  },
  date_select_button: {
    flexDirection: "row",
    padding: scale(5),
    marginHorizontal: scale(7),
    borderBottomColor: Color.COLOR_BLACK,
    borderBottomWidth: 1,
    alignSelf: "flex-start",
  },
  date_calender_image: {
    marginLeft: scale(20),
    width: scale(15),
    height: scale(15),
    tintColor: Color.Grey,
  },
  closed_text: {
    alignSelf: "center",
    fontWeight: "600",
    color: Color.COLOR_BLACK,
  },
});
