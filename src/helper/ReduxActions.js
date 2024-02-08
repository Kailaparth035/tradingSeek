import { LoginRequest, LoginResponse } from "../redux/Action/LoginAction";
import { loaderAction } from "../redux/Action/LoaderAction";
import { SignUpRequest, SignUpResponse } from "../redux/Action/SignUpAction";
import { ToastDisplay } from "../redux/Action/ToastAction";
import { RegisterBusinessRequest } from "../redux/Action/RegisterBusinessAction";
import {
  ForgetPasswordRequest,
  ForgetPasswordResponse,
} from "../redux/Action/ForgotPasswordAction";
import { ProfessionRequest } from "../redux/Action/ProfessionAction";
import {
  BussinessNumberRequest,
  BussinessNumberResponse,
} from "../redux/Action/BussinessNumberAction";
import { PostJobRequest, PostJobResponse } from "../redux/Action/PostJobAction";
import {
  EmailVerifyRequest,
  EmailVerifyResponse,
} from "../redux/Action/EmailVerifyAction";
import { ProfileImgRequest } from "../redux/Action/ProfileImgAction";
import {
  GetProfileDataRequest,
  GetProfileDataResponse,
} from "../redux/Action/GetProfileDataAction";
import {
  GetUserJobRequest,
  GetUserJobResponse,
} from "../redux/Action/GetUserJobAction";
import {
  UpdateStatusRequest,
  UpdateStatusResponse,
} from "../redux/Action/UpdateStatusAction";
import {
  DeletAccountRequest,
  DeletAccountResponse,
} from "../redux/Action/DeletAccountAction";
import { OtpRequest, OtpResponse } from "../redux/Action/OtpAction";
import {
  PasswordRequest,
  PasswordResponse,
} from "../redux/Action/PasswordAction";
import {
  UpdateUserNameRequest,
  UpdateUserNameResponse,
} from "../redux/Action/UpdateUseNameAction";
import {
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "../redux/Action/ResetPasswordAction";

import {
  UpdateDescriptionRequet,
  UpdateDescriptionResponse,
} from "../redux/Action/UpadateDescriptionAction";

import {
  AccountActivateResponse,
  AccountActivateReuest,
} from "../redux/Action/AccountActivateAction";

import {
  ConversationRequest,
  ConversationResponse,
} from "../redux/Action/ConversationAction";

import {
  SenderMessageRequest,
  SenderMessageResponse,
} from "../redux/Action/SenderMessageAction";

import {
  MessagesRequest,
  MessagesResponse,
} from "../redux/Action/MessagesAction";
import {
  VerifyEmailRequest,
  VerifyEmailResponse,
} from "../redux/Action/VerifyEmailAction";
import {
  UpadateUserInfoRequest,
  UpadateUserInfoResponse,
} from "../redux/Action/UpadateUserInfoAction";

import {
  SeenMessageResponse,
  SeenMessageRequest,
} from "../redux/Action/SeenMessageAction";

import { IpinfoRequest, IpinfoResponse } from "../redux/Action/IpinfoAction";
import { LeadResponse, LeadRequest } from "../redux/Action/LeadAction";
import {
  HiredUserRequest,
  HiredUserResponse,
} from "../redux/Action/HiredUserAction";
import {
  ComplainRequest,
  ComplainResponse,
} from "../redux/Action/ComplainAction";
import {
  UpdateProfessionRequest,
  UpdateProfessionResponse,
} from "../redux/Action/UpdateProfessionAction";
import {
  UpdateLocationRequest,
  UpdateLocationResponse,
} from "../redux/Action/UpdateLocationAction";

import {
  AddCredentialResponse,
  AddCredentialRequest,
} from "../redux/Action/AddCredentialAction";

import { GetFaqResponse, GetFaqRequest } from "../redux/Action/GetFaqsAction";

import {
  AddQuestionRequest,
  AddQuestionResponse,
} from "../redux/Action/AddQuestionAction";

import { DeletFaqsRequest, DeletFaqsResponse } from "../redux/Action/DeletFaqs";

import {
  SaveDraftRequest,
  SaveDraftResponse,
} from "../redux/Action/SaveDraftAction";

import {
  RemoveDraftRequest,
  RemoveDraftResponse,
} from "../redux/Action/RemoveDraftAction";

import {
  AutoQuoteRequest,
  AutoQuoteResponse,
} from "../redux/Action/AutoQuoteAction";

import {
  PaymentMethodRequest,
  PaymentMethodResponse,
} from "../redux/Action/PaymentMethodAction";

import {
  UpdateBusinessHoursRequest,
  UpdateBusinessHoursResponse,
} from "../redux/Action/UpdateBusinessHoursAction";

import {
  AskQuestionRequest,
  AskQuestionRespons,
} from "../redux/Action/AskQestionActions";

import {
  DeletCredentialRequest,
  DeletCredentialResponse,
} from "../redux/Action/DeletCredentialAction";

import {
  DeletPortFolioRequest,
  DeletPortFolioResponse,
} from "../redux/Action/DeletPortFolioAction";

import {
  SendMedialRequest,
  SendMedialResponse,
} from "../redux/Action/SendMedialAction";

import {
  SendQuoteRequest,
  SendQuoteResponse,
} from "../redux/Action/SendQuoteAction";

import {
  RemoveProfileImgRequest,
  RemoveProfileImgResponse,
} from "../redux/Action/RemoveProfiImageAction";

import {
  ConversationMsgRequest,
  ConversationMsgResponse,
} from "../redux/Action/ConversationMsgAction";

export default {
  LoginRequest: LoginRequest,
  LoginResponse: LoginResponse,
  SignUpResponse: SignUpResponse,
  loaderAction: loaderAction,
  SignUpRequest: SignUpRequest,
  ForgetPasswordRequest: ForgetPasswordRequest,
  ForgetPasswordResponse: ForgetPasswordResponse,
  ToastDisplay: ToastDisplay,
  RegisterBusinessRequest: RegisterBusinessRequest,
  ProfessionRequest: ProfessionRequest,
  BussinessNumberRequest: BussinessNumberRequest,
  BussinessNumberResponse: BussinessNumberResponse,
  PostJobRequest: PostJobRequest,
  PostJobResponse: PostJobResponse,
  EmailVerifyRequest: EmailVerifyRequest,
  EmailVerifyResponse: EmailVerifyResponse,
  ProfileImgRequest: ProfileImgRequest,
  GetProfileDataRequest: GetProfileDataRequest,
  GetProfileDataResponse: GetProfileDataResponse,
  GetUserJobRequest: GetUserJobRequest,
  GetUserJobResponse: GetUserJobResponse,
  UpdateStatusRequest: UpdateStatusRequest,
  UpdateStatusResponse: UpdateStatusResponse,
  DeletAccountRequest: DeletAccountRequest,
  DeletAccountResponse: DeletAccountResponse,
  OtpRequest: OtpRequest,
  OtpResponse: OtpResponse,
  PasswordRequest: PasswordRequest,
  PasswordResponse: PasswordResponse,
  UpdateUserNameRequest: UpdateUserNameRequest,
  UpdateUserNameResponse: UpdateUserNameResponse,
  ResetPasswordRequest: ResetPasswordRequest,
  ResetPasswordResponse: ResetPasswordResponse,
  UpdateDescriptionRequet: UpdateDescriptionRequet,
  UpdateDescriptionResponse: UpdateDescriptionResponse,
  AccountActivateReuest: AccountActivateReuest,
  AccountActivateResponse: AccountActivateResponse,
  ConversationRequest: ConversationRequest,
  ConversationResponse: ConversationResponse,
  SenderMessageRequest: SenderMessageRequest,
  SenderMessageResponse: SenderMessageResponse,
  MessagesRequest: MessagesRequest,
  MessagesResponse: MessagesResponse,
  VerifyEmailRequest: VerifyEmailRequest,
  VerifyEmailResponse: VerifyEmailResponse,
  UpadateUserInfoRequest: UpadateUserInfoRequest,
  UpadateUserInfoResponse: UpadateUserInfoResponse,
  SeenMessageRequest: SeenMessageRequest,
  SeenMessageResponse: SeenMessageResponse,
  IpinfoRequest: IpinfoRequest,
  IpinfoResponse: IpinfoResponse,
  LeadResponse: LeadResponse,
  LeadRequest: LeadRequest,
  HiredUserResponse: HiredUserResponse,
  HiredUserRequest: HiredUserRequest,
  ComplainRequest: ComplainRequest,
  ComplainResponse: ComplainResponse,
  UpdateProfessionRequest: UpdateProfessionRequest,
  UpdateProfessionResponse: UpdateProfessionResponse,
  UpdateLocationRequest: UpdateLocationRequest,
  UpdateLocationResponse: UpdateLocationResponse,
  AddCredentialRequest: AddCredentialRequest,
  AddCredentialResponse: AddCredentialResponse,
  GetFaqRequest: GetFaqRequest,
  GetFaqResponse: GetFaqResponse,
  AddQuestionRequest: AddQuestionRequest,
  AddQuestionResponse: AddQuestionResponse,
  DeletFaqsRequest: DeletFaqsRequest,
  DeletFaqsResponse: DeletFaqsResponse,
  SaveDraftRequest: SaveDraftRequest,
  SaveDraftResponse: SaveDraftResponse,
  RemoveDraftRequest: RemoveDraftRequest,
  RemoveDraftResponse: RemoveDraftResponse,
  AutoQuoteRequest: AutoQuoteRequest,
  AutoQuoteResponse: AutoQuoteResponse,
  PaymentMethodRequest: PaymentMethodRequest,
  PaymentMethodResponse: PaymentMethodResponse,
  UpdateBusinessHoursResponse: UpdateBusinessHoursResponse,
  UpdateBusinessHoursRequest: UpdateBusinessHoursRequest,
  AskQuestionRequest: AskQuestionRequest,
  AskQuestionRespons: AskQuestionRespons,
  DeletCredentialRequest: DeletCredentialRequest,
  DeletCredentialResponse: DeletCredentialResponse,
  DeletPortFolioRequest: DeletPortFolioRequest,
  DeletPortFolioResponse: DeletPortFolioResponse,
  SendMedialResponse: SendMedialResponse,
  SendMedialRequest: SendMedialRequest,
  SendQuoteRequest: SendQuoteRequest,
  SendQuoteResponse: SendQuoteResponse,
  RemoveProfileImgRequest: RemoveProfileImgRequest,
  RemoveProfileImgResponse: RemoveProfileImgResponse,
  ConversationMsgRequest: ConversationMsgRequest,
  ConversationMsgResponse: ConversationMsgResponse,
};
