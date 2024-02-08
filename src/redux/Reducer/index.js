import { combineReducers } from "redux";
import { LoaderReducer } from "./LoaderReducer";
import { TostReducer } from "./ToastReducer";
import { LoginReducer } from "../Reducer/LoginReducer";
import { ForgetPasswordReducer } from "./ForgetPasswordReducer";
import { SignUpReducer } from "./SignUpReducer";
import { RegisterBusinessReducer } from "./RegisterBusinessReducer";
import { ProfessionReducer } from "./ProfessionReducer";
import { BussinessNumberReducer } from "./BussinessNumberReducer";
import { PostJobReducer } from "./PostJobReducer";
import { EmailVerifyReducer } from "./EmailVerifyReducer";
import { ProfileImgReducer } from "./ProfileImgReducer";
import { GetProfileDataReducer } from "./GetProfileDataReducer";
import { GetUserJobReducer } from "./GetUserJobReducer";
import { UpdateStatusReducer } from "./UpdateStatusReducer";
import { DeletAccountReducer } from "./DeletAccountReducer";
import { OtpReducer } from "./OtpReducer";
import { PasswordReducer } from "./PasswordReducer";
import { UpdateUserNameReducer } from "./UpdateUserNameReducer";
import { ResetPasswordReducer } from "./ResetPasswordReducer";
import { UpdateDescriptionReducer } from "./UpdateDescriptionReducer";
import { AccountActivateReducer } from "./AccountActivateReducer";
import { ConversationReducer } from "./ConversationReducer";
import { SenderMessageReducer } from "./SenderMessageReducer";
import { MessagesReducer } from "./MessagesReducer";
import { VerifyEmailReducer } from "./VerifyEmailReducer";
import { UpdateUserInfoReducer } from "./UpdateUserInfoReducer";
import { SeenMessageReducer } from "./SeenMessageReducer";
import { IpinfoReducer } from "./IpinfoReducer";
import { LeadReducer } from "./LeadReducer";
import { HiredReducer } from "./HiredUserReducer";
import { ComplainReducer } from "./ComplainReducer";
import { UpdateProfessionReducer } from "./UpdateProfessionReducer";
import { UpdateLocationReducer } from "./UpdateLocationReducer";
import { AddCredentialReducer } from "./AddCredentialReducer";
import { GetFaqsReducer } from "./GetFaqsReducer";
import { AddQuestionReducer } from "./AddQuestionReducer";
import { DeletFaqsReducer } from "./DeletFaqsReducer";
import { SavedraftReducer } from "./SavedraftReducer";
import { RemoveDraftReducer } from "./RemoveDraftReducer";
import { AutoQuoteReducer } from "./AutoQuoteReducer";
import { PaymentMethodReducer } from "./PaymentMethodReducer";
import { UpdateBusinessHoursReducer } from "./UpdateBusinessHoursReducer";
import { AskQuestionReducer } from "./AskQuestionReducer";
import { DeletCredentialReducer } from "./DeletCredentialReducer";
import { DeletPortfolioReducer } from "./DeletPortfolioReducer";
import { SendMediaReducer } from "./SendMediaReducer";
import { SendQuoteReducer } from "./SendQuoteReducer";
import { RemoveProfileImgReducer } from "./RemoveProfileImgReducer";
import { ConversationMsgReducer } from "./ConversationMsgReducer";

export default combineReducers({
  loader: LoaderReducer,
  login: LoginReducer,
  forgetPassword: ForgetPasswordReducer,
  signUp: SignUpReducer,
  toast: TostReducer,
  registerBusiness: RegisterBusinessReducer,
  profession: ProfessionReducer,
  bussinessnumber: BussinessNumberReducer,
  PostJob: PostJobReducer,
  EmailVerify: EmailVerifyReducer,
  ProfileImg: ProfileImgReducer,
  GetProfileData: GetProfileDataReducer,
  GetJobUser: GetUserJobReducer,
  UpdateStatus: UpdateStatusReducer,
  DeletAccount: DeletAccountReducer,
  Otp: OtpReducer,
  Password: PasswordReducer,
  UpdateUserName: UpdateUserNameReducer,
  ResetPassword: ResetPasswordReducer,
  UpdateDescription: UpdateDescriptionReducer,
  AccountActivate: AccountActivateReducer,
  Conversation: ConversationReducer,
  SenderMessage: SenderMessageReducer,
  Messages: MessagesReducer,
  VerifyEmail: VerifyEmailReducer,
  UpdateUserInfo: UpdateUserInfoReducer,
  SeenMessage: SeenMessageReducer,
  Ipinfo: IpinfoReducer,
  Lead: LeadReducer,
  hiredUser: HiredReducer,
  complaint: ComplainReducer,
  updateProfession: UpdateProfessionReducer,
  updateLocation: UpdateLocationReducer,
  AddCredential: AddCredentialReducer,
  GetFaqs: GetFaqsReducer,
  AddQuestion: AddQuestionReducer,
  DeletFaws: DeletFaqsReducer,
  Savedraft: SavedraftReducer,
  RemoveDraft: RemoveDraftReducer,
  AutoQuote: AutoQuoteReducer,
  PaymentMethod: PaymentMethodReducer,
  UpdateBusinessHours: UpdateBusinessHoursReducer,
  AskQuestion: AskQuestionReducer,
  DeletCredential: DeletCredentialReducer,
  DeletPortfolio: DeletPortfolioReducer,
  SendMedia: SendMediaReducer,
  SendQuote: SendQuoteReducer,
  RemoveProfileImg: RemoveProfileImgReducer,
  ConversationMsg: ConversationMsgReducer,
});
