import { takeEvery, all, take } from "redux-saga/effects";
import { loginSaga } from "./LoginSaga";
import { forgetPasswordSaga } from "./ForgetPasswordSaga";
import { signUpSaga } from "./SignUpSaga";
import { registerBusinessSaga } from "./RegisterBusinessSaga";
import { professionSaga } from "./ProfessionSaga";
import { bussinessnumberSaga } from "./BussinessNumberSaga";
import { PostJobSaga } from "./PostJobSaga";
import { emailVerifySaga } from "./EmailVerifySaga";
import { profileImgSaga } from "./ProfileImgSaga";
import { getProfileDataSaga } from "./GetProfileDataSaga";
import { getUserPostedJobSaga } from "./GetUserJobSaga";
import { updateStatusSaga } from "./UpdateStatusSaga";
import { deletAccountSaga } from "./DeletAccountSaga";
import { otpSaga } from "./OtpSaga";
import { passwordSaga } from "./PasswordSaga";
import { updateUserNameSaga } from "./UpdateUserNameSaga";
import { resetPasswordSaga } from "./ResetPasswordSaga";
import { updateDescriptionSaga } from "./UpadateDescriptionSaga";
import { accountActivateSaga } from "./AccountActivateSaga";
import { conversationSaga } from "./ConversationSaga";
import { senderMessageSaga } from "./SenderMessageSaga";
import { messagesSaga } from "./MessagesSaga";
import { verifyEmailSaga } from "./VerifyEmailSaga";
import { updateUserInfoSaga } from "./UpdateUserInfoSaga";
import { seenMessageSaga } from "./SeenMessageSaga";
import { ipInfoSaga } from "./IpinfoSaga";
import { leadSaga } from "./LeadSaga";
import { hiredUserSaga } from "./HiredUserSaga";
import { complaintSaga } from "./ComplainSaga";
import { updateProfessionSaga } from "./UpdateProfessionSaga";
import { updateLocationSaga } from "./UpdateLocationSaga";
import { addCredentialSaga } from "./AddCredentialSaga";
import { getFaqSaga } from "./GetFaqsSaga";
import { addQuestionSaga } from "./AddQuestionSaga";
import { deletFaqsSaga } from "./DeletFaqsSaga";
import { saveDraftSaga } from "./SaveDraftSaga";
import { removeDraftSaga } from "./RemoveDraftSaga";
import { autoQuoteSaga } from "./AutoQuoteSaga";
import { paymentMethodSaga } from "./PaymentMethodSaga";
import { updateBusinessHoursSaga } from "./UpdateBusinessHoursSaga";
import { askQuestionSaga } from "./AskQuestionSaga";
import { deletCredentialSaga } from "./DeletCredentialSaga";
import { deletPortfolioSaga } from "./DeletPortfolioSaga";
import { sendMediaSaga } from "./SendMediaSaga";
import { sendQuoteSaga } from "./SendQuoteSaga";
import { removeProfileImgSaga } from "./RemoveProfileImgSaga";
import { conversationMsgSaga } from "./ConversationMsgSaga";

export default function* root_saga() {
  yield all([
    takeEvery("LOGIN_REQUEST", loginSaga),
    takeEvery("FORGETPASSWORD_REQUEST", forgetPasswordSaga),
    takeEvery("SIGNUP_REQUEST", signUpSaga),
    takeEvery("REGISTERBUSINESS_REQUEST", registerBusinessSaga),
    takeEvery("PROFESSION_REQUEST", professionSaga),
    takeEvery("BUSSINESSNUMBER_REQUEST", bussinessnumberSaga),
    takeEvery("POSTJOB_REQUEST", PostJobSaga),
    takeEvery("EMAIL_VERIFY_REQUEST", emailVerifySaga),
    takeEvery("PROFILEIMG_REQUEST", profileImgSaga),
    takeEvery("GETPROFILEDATA_REQUEST", getProfileDataSaga),
    takeEvery("GETUSER_JOB_REQUEST", getUserPostedJobSaga),
    takeEvery("UPDATE_STATUS_REQUEST", updateStatusSaga),
    takeEvery("DELET_ACCOUNT_REQUEST", deletAccountSaga),
    takeEvery("OTP_REQUEST", otpSaga),
    takeEvery("PASSWORD_REQUEST", passwordSaga),
    takeEvery("UPDATE_USERNAME_REQUEST", updateUserNameSaga),
    takeEvery("RESET_PASSWORD_REQUEST", resetPasswordSaga),
    takeEvery("UPDATE_DESCRIPTION_REQUEST", updateDescriptionSaga),
    takeEvery("ACCOUNT_ACTIVATE_REQUEST", accountActivateSaga),
    takeEvery("CONVERSATION_REQUEST", conversationSaga),
    takeEvery("SENDERMESSAGE_REQUEST", senderMessageSaga),
    takeEvery("MESSAGES_REQUEST", messagesSaga),
    takeEvery("VERIFYEMAIL_REQUEST", verifyEmailSaga),
    takeEvery("UPDATE_USERINFO_REQUEST", updateUserInfoSaga),
    takeEvery("SEEN_MESSAGE_REQUEST", seenMessageSaga),
    takeEvery("IPINFO_REQUEST", ipInfoSaga),
    takeEvery("LEAD_REQUEST", leadSaga),
    takeEvery("HIRED_USER_REQUEST", hiredUserSaga),
    takeEvery("COMPLAIN_REQUEST", complaintSaga),
    takeEvery("UPADATE_PROFESSION_REQUEST", updateProfessionSaga),
    takeEvery("UPADATE_LOCATION_REQUEST", updateLocationSaga),
    takeEvery("ADD_CREDENTIAL_REQUEST", addCredentialSaga),
    takeEvery("GETFAQS_REQUEST", getFaqSaga),
    takeEvery("ADD_QUESTION_REQUEST", addQuestionSaga),
    takeEvery("DELET_FAQS_REQUEST", deletFaqsSaga),
    takeEvery("SAVEDRAFT_REQUEST", saveDraftSaga),
    takeEvery("REMOVEDRAFT_REQUEST", removeDraftSaga),
    takeEvery("AUTOQUOTE_SETTING_REQUEST", autoQuoteSaga),
    takeEvery("PAYMENT_METHOD_REQUEST", paymentMethodSaga),
    takeEvery("UPDATE_BUSINESS_HOURS_REQUEST", updateBusinessHoursSaga),
    takeEvery("ASK_QUESTIONS_REQUEST", askQuestionSaga),
    takeEvery("DELET_CREDENTIAL_REQUEST", deletCredentialSaga),
    takeEvery("DELET_PORTFOLIO_REQUEST", deletPortfolioSaga),
    takeEvery("SEND_MEDIA_REQUEST", sendMediaSaga),
    takeEvery("SEND_QUOTE_REQUEST", sendQuoteSaga),
    takeEvery("REMOVE_PROFILEIMG_REQUEST", removeProfileImgSaga),
    takeEvery("CONVERSATION_MSG_REQUEST", conversationMsgSaga),
  ]);
}
