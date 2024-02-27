export enum RudderStackNodeEvents {
  LogIn = "LogIn",
  SignUp = "SignUp",
  SublinkCreated = "SublinkCreated",
  SublinkDeleted = "SublinkDeleted",
  SublinkUpdated = "SublinkUpdated",
  LinkCreated = "LinkCreated",
  LinkDeleted = "LinkDeleted",
  LinkUpdated = "LinkUpdated",
  PaymentReceived = "PaymentReceived",
}

export enum RudderStackJSEvents {
  // link creation flow
  AddressEntered = "AddressEntered",
  NetworksChosen = "NetworksChosen",
  TokensChosen = "TokensChosen",
  CustomNetworkAddressEntered = "CustomNetworkAddressEntered",
  OpenNetworkSettings = "OpenNetworkSettings",
  CustomTokenConfigEntered = "CustomTokenConfigEntered",
  OpenTokenSettings = "OpenTokenSettings",
  TokenTabClicked = "TokenTabClicked",
  HandleChosenError = "HandleChosenError",
  HandleChosen = "HandleChosen",
  LinkCreated = "LinkCreated",
  LinkCreatedError = "LinkCreatedError",

  // payment flow
  WelcomeDialogSkipped = "WelcomeDialogSkipped",
  WalletConnected = "WalletConnected",
  NetworkChosen = "NetworkChosen",
  TokenChosen = "TokenChosen",
  ApproveClicked = "ApproveClicked",
  ApproveRejected = "ApproveRejected",
  PayClicked = "PayClicked",
  PayRejected = "PayRejected",
  BackButtonClicked = "BackButtonClicked",
  NetworkChanged = "NetworkChanged",
  WalletDisconnected = "WalletDisconnected",
}

export enum RudderStackJSPageCategories {
  Link = "Link",
  Payment = "Payment",
}

export enum RudderStackJSPageNames {
  // link creation flow
  LinkOpened = "LinkOpened",
  SublinkOpened = "SublinkOpened",
  EditSublink = "EditSublink",
  EditLink = "EditLink",
  CreateSublink = "CreateSublink",
  CreateLink = "CreateLink",

  // payment flow
  WelcomeDialog = "WelcomeDialog",
  WalletDialog = "WalletDialog",
  NetworkDialog = "NetworkDialog",
  TokenDialog = "TokenDialog",
  PaymentDialog = "PaymentDialog",
  SuccessDialog = "SuccessDialog",
  PendingDialog = "PendingDialog",
  ErrorDialog = "ErrorDialog",
}

export enum PaymentLinkAction {
  TEST = "TEST",
}
