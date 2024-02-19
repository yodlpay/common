import type { ChainInfo, TokenInfo } from "@yodlpay/tokenlists";
import { type FieldError } from "react-hook-form";
import {
  Address,
  Chain,
  type EstimateContractGasParameters,
  type PublicClient,
  type TransactionReceipt,
} from "viem";
import type { Decimal } from "../lib";

export enum PointEventType {
  FIRST_LINK_CREATION = "FIRST_LINK_CREATION",
  FIRST_SUBLINK_CREATION = "FIRST_SUBLINK_CREATION",
  FIRST_PAYMENT = "FIRST_PAYMENT",
  FIRST_SWAP_PAYMENT = "FIRST_SWAP_PAYMENT",
  FIRST_100_PAYMENT = "FIRST_100_PAYMENT",
  PAYMENT = "PAYMENT",
}

export enum NotificationSource {
  TENDERLY = "TENDERLY",
  SDK = "SDK",
  IMPORTOOOR = "IMPORTOOOR",
  GOLDSKY = "GOLDSKY",
  EVENT_LISTENER = "EVENT_LISTENER",
}

export enum PaymentState {
  NEW = "NEW",
  INDEXING = "INDEXING",
  INDEXED = "INDEXED",
  ERRORED = "ERRORED",
}

export enum LinkType {
  SELF_CUSTODIAL = "SELF_CUSTODIAL",
  EXCHANGE = "EXCHANGE",
  MULTISIG = "MULTISIG",
}

export enum LinkState {
  UNVERIFIED = "UNVERIFIED",
  VERIFIED = "VERIFIED",
  FORCE_VERIFIED = "FORCE_VERIFIED",
}

export type Link = {
  id: string;
  accountId: string;
  address: string | null;
  handle: string;
  parentId: string | null;
  state: LinkState;
  type: LinkType;
  exchange: string | null;
  config: LinkConfig;
  jobs: Record<string, string | number>;
  createdAt: Date;
  updatedAt: Date;
};

export enum AccountRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export type Account = {
  id: string;
  provider: string;
  userId: string;
  profile: Record<string, string | number> | null;
  apiKey: string | null;
  role: AccountRole[];
  createdAt: Date;
  updatedAt: Date;
};

export type Payment = {
  id: string;
  chainId: number;
  txHash: string;
  source: NotificationSource;
  state: PaymentState;
  notifiedAt: Date[];
  importedAt: Date | null;
  indexStartedAt: Date | null;
  indexedAt: Date | null;
  blockTimestamp: Date | null;
  blockNumber: number | null;
  notifications: NotificationSource[];
  paymentIndex: number;
  routerVersion: string | null;
  sender: string | null;
  receiver: string | null;
  tokenAddress: string | null;
  amount: Decimal | null;
  fees: Decimal | null;
  memo: string | null;
  gasFee: Decimal | null;
  yodlFee: Decimal | null;
  extraFee: Decimal | null;
  extraFeeAddress: string | null;
  invoiceAmount: Decimal | null;
  invoiceAmountInUsd: Decimal | null;
  invoiceCurrency: string | null;
  priceFeeds: string[];
  exchangeRates: Decimal[];
  exchangeRate: Decimal | null;
  swapTokenIn: string | null;
  swapTokenInAmount: Decimal | null;
  swapTokenOutAmount: Decimal | null;
  swapVenue: SwapVenue;
  swapTokenPath: string[];
  txReceipt: Record<string, string | number> | null;
};

export type FormatAmountParams = {
  amount: number;
  currency?: string;
  symbol?: string;
  isFiatOrStablecoin?: boolean;
  converted?: boolean;
  shouldFormatCurrency?: boolean;
  useHigherPrecisionForSmallAmounts?: boolean;
  precision?: number;
};

export type Network = {
  enabled: boolean;
  defaultAddress?: string;
};

export type Networks = {
  [chainId: number]: Network;
};

export type TokenNetworks = {
  [chainId: number]: { enabled?: boolean; address?: string; edited?: boolean };
};

export type Token = {
  enabled: boolean;
  networks: TokenNetworks;
};

export type Tokens = {
  [tokenSymbol: string]: Token;
};

export type TokenData = {
  symbol: string;
  name: string;
  decimals: number;
  address: string;
};

export type FormState = {
  linkHandle: string;
  defaultAddress: string;
  networks: Networks;
  tokens: Tokens;
};

export type NetworksFormErrorState = {
  networks?: {
    [chainId: string]: {
      defaultAddress?: { message: string };
    };
  };
};

export type NetworkError = {
  enabled?: FieldError;
  defaultAddress?: FieldError;
};

export type TokenNetworkError = {
  enabled?: FieldError;
  address?: FieldError;
  edited?: FieldError;
};

export type TokenError = {
  enabled?: FieldError;
  networks?: Record<string, TokenNetworkError>;
};

export type TokensFormErrorState = {
  linkHandle?: FieldError;
  defaultAddress?: FieldError;
  networks?: Record<string, NetworkError>;
  tokens?: Record<string, TokenError>;
};

export type LinkProps = {
  handle: string;
  address?: string | null;
  type?: LinkType | undefined;
  exchange?: string | undefined;
  config: LinkConfig;
  primary?: boolean;
  parentId?: string | undefined;
};

export type FormattedPayment = {
  date: string;
  chainDetails: JSX.Element;
  txHash: string;
  sender?: string;
  receiver?: string;
  amountDetails?: JSX.Element;
  sentAmountDetails?: JSX.Element;
  invoiceAmount?: string;
  txUrl?: string;
  state: PaymentState;
};

export type LinkTypeAction = {
  type: "link" | "sublink";
  action: "new" | "edit";
};

export type PriceFeed = {
  name: string;
  contract: string;
  rate: string;
};

export enum Currency {
  EUR = "EUR",
  USD = "USD",
  GBP = "GBP",
  JPY = "JPY",
  CNY = "CNY",
  KRW = "KRW",
  INR = "INR",
  RUB = "RUB",
  TRY = "TRY",
  BRL = "BRL",
  CAD = "CAD",
  AUD = "AUD",
  NZD = "NZD",
  CHF = "CHF",
  ETH = "ETH",
}

export type VerifyPaymentArgs = {
  paymentDetails: LookupTxDetails;
  amount: Decimal;
  currency: Currency;
  address: Address;
  link?: Link;
};

export type CryptoValue = {
  formatted: string;
  value: string;
};

export type FeeType = "YodlFee" | "ExtraFee";
export type FeeObject = CryptoValue & { type: FeeType };

export type LookupTxDetails = {
  chainId: number;
  txHash: string;
  memo: string;
  receiver: string;
  tokenSymbol: string;
  tokenAmount: CryptoValue;
  tokenAmountNet: CryptoValue;
  totalFees: CryptoValue;
  fees: FeeObject[];
  invoiceAmount: string;
  invoiceCurrency: string;
  conversion: string;
  priceFeeds: PriceFeed[];
  blockNumber: number;
  final?: boolean;
};

export type VerifiedTxDetails = LookupTxDetails & {
  verified: boolean;
  verificationErrors: string[];
};

export type ReindexSchemaType = {
  chainId: number;
  txHash: string;
  fields: string[];
};

export type QuestnResponsePayload = {
  error?: QuestnError;
  data: {
    result: boolean;
  };
};

export type QuestnError = {
  status?: number;
  errorCode: string;
  errorMessage: string;
};

export type PointEventProps = {
  txHash?: string;
  linkId?: string;
  accountId?: string;
  walletAddress?: string;
};

export type TokenBalance = TokenInfo & { balance: string };

export type CoinConfig = {
  chainId: number;
  defaultAddress?: string;
  tokens: {
    symbol: string;
    address?: string;
  }[];
};

export type LinkConfig = {
  coins: CoinConfig[];
  onCompleteAction?: OnCompleteAction;
};

export enum SwapVenue {
  NONE = "NONE",
  UNISWAP = "UNISWAP",
  CURVE = "CURVE",
}

export enum PaymentType {
  "DIRECT",
  "SWAP",
}

export type Pool = {
  poolAddress: string;
  tokenIn: string;
  tokenOut: string;
  poolFee: string;
  amountIn: bigint | undefined;
  amountOut: bigint | undefined;
  // This is specifically for Curve - we will assign the swapParams and factoryAddress when we fetch the quote
  // The Curve client may return routes for which we don't want to or can't calculate the swap parameters for
  swapParams: [number, number, number] | undefined; // [inCoinIndex, outCoinIndex, swapType]
  factoryAddress: string | undefined;
};

export type Quote = {
  path: Pool[];
  amountIn: bigint;
  amountOut: bigint;
  priceImpact: number | undefined;
  slippage?: bigint; // in terms of token in
};

export type UniswapV3PoolResponse = {
  type: string;
  address: string;
  tokenIn: TokenInfo;
  tokenOut: TokenInfo;
  fee: string;
  amountIn?: string;
  amountOut?: string;
};

export type PaymentPayload = {
  tokenOut: TokenInfo | undefined;
  contractFunctionName: string;
  contractArgs: any[];
  isSwap: boolean;
  value: bigint;
};

export type TokenHeld = {
  tokenInfo: TokenInfo;
  balance: bigint;
  invoiceCurrency: string;
  invoiceCurrencyBalance: bigint; // should this be a bigint or a string?
  isAccepted: boolean;
};

export type Invoice = {
  memo: string | undefined;
  amountInMinor: number; // 100 = $1.00
  recipientAddress: Address;
  recipientHandle?: string;
  extraFeeAddress: Address | null;
  extraFeeBps: number | null;
  currency: string;
  coins: CoinConfig[];
  excludedVenues: SwapVenue[];
  isDemo?: boolean;
  onCompleteAction?: OnCompleteAction;
};

export type InvoiceConfig = Pick<
  Invoice,
  | "memo"
  | "amountInMinor"
  | "recipientAddress"
  | "recipientHandle"
  | "extraFeeAddress"
  | "extraFeeBps"
  | "currency"
  | "coins"
  | "onCompleteAction"
>;

export type PaymentReceipt = {
  hash: string;
  chain: Chain;
  receipt: TransactionReceipt;
  confirmed: boolean;
};

export type GasDetails = {
  gas: bigint;
  gasInInvoiceCurrency: bigint;
  gasInUsd: bigint;
  gasPrice: bigint;
  tokenOut: TokenInfo;
};

export type RemainderDetails = {
  remainderInInvoiceCurrency: bigint;
  returnRemainderCost: bigint;
  returnRemainderDelta: bigint;
  shouldReturnRemainder: boolean;
};

export type PriceFeedDetails = {
  feedAddresses: Address[];
  approximateRate: bigint; // 8 decimal places
  convertedAmount: bigint;
  decimals: number;
};

export type PriceFeedData = {
  rate: bigint;
  decimals: number;
  description: string;
};

export const LoadingState = {
  AllowanceLoading: "allowance-loading",
  SwapsLoading: "swaps-loading",
  DirectPaymentLoading: "direct-payment-loading",
  NoSwaps: "no-swaps",
  Confirming: "confirming",
  Allowing: "allowing",
};

export type ExchangeRate = {
  raw: PricesResponse | null;
  data: ExchangeRates | null;
  loading: boolean;
  error: string | null;
};

export type ExchangeRates = {
  [key: string]: number | undefined;
};

export type ExtendedMantineSize = number | "xs" | "sm" | "md" | "lg" | "xl";

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
export type CurveSwapRoute = {
  poolId: string;
  poolAddress: string;
  inputCoinAddress: string;
  outputCoinAddress: string;
  i: number;
  j: number;
  swapType: number;
  swapAddress: string;
};

export type CurveBestRouteAndOutput = {
  route: CurveSwapRoute[];
  output: string;
  priceImpact: number;
};

export type PricesResponse = {
  [key: string]: {
    [currency: string]: number;
  };
};

export interface IChainDataAPI {
  setWalletAddress(address: string): void;
  getExchangeRates: (
    tokensIn: string[],
    currencies: string[]
  ) => Promise<PricesResponse>;
  getTokenBalances: (
    chainId: number,
    address: Address
  ) => Promise<TokenBalance[]>;
  getCurveQuote: (
    tokenInAddress: Address,
    tokenOutAddress: Address,
    amount: number | string,
    chainId: number
  ) => Promise<CurveBestRouteAndOutput | undefined>;
  getUniswapQuote: (
    tokenInAddress: Address,
    tokenOutAddress: Address,
    amount: bigint,
    chainId: number
  ) => Promise<Quote | undefined>;
  getChainsWithBalance: (address: Address) => Promise<number[]>;
}

export type DirectPaymentState = {
  data: bigint;
  loading: boolean;
  error: string | null;
};

export type TransactionState = {
  data: PaymentReceipt | null;
  loading: boolean;
  error: string | null;
};

export type ChainsWithBalanceState = {
  data: number[] | null;
  loading: boolean;
  error: string | null;
};

export type TokensHeldState = {
  data: TokenHeld[] | null;
  loading: boolean;
  error: string | null;
};

export type SwapState = {
  bestSwap: [Quote, SwapVenue] | null;
  swapQuotes: [Quote, SwapVenue][] | null;
  loading: boolean;
  error: string | null;
};

export type GasState = {
  data: GasDetails | null;
  loading: boolean;
  error: string | null;
};

export type PriceFeedState = {
  data: PriceFeedDetails | null;
  loading: boolean;
  error: string | null;
};

export type AllowanceState = {
  data: boolean;
  loading: boolean;
  error: string | null;
};

export type PriceFeedDataState = {
  data: Record<string, PriceFeedData> | null;
  loading: boolean;
  error: string | null;
};

export type EstimationResult = {
  quote: Quote;
  venue: SwapVenue;
  gas: bigint;
  gasInInvoiceCurrency: bigint;
  gasInUsd: bigint;
  gasPrice: bigint;
  remainderInInvoiceCurrency: bigint;
  returnRemainderCost: bigint;
  returnRemainderDelta: bigint;
  shouldReturnRemainder: boolean;
  tokenOut: TokenInfo;
};

export type SimulateTransactionArgs = {
  contractArgs: EstimateContractGasParameters;
  provider: PublicClient | undefined;
  chain?: Chain;
  nativeTokenPrice?: bigint;
  nativeTokenPriceDecimals?: number;
  tokenOut: TokenInfo;
  routerAddress: `0x${string}` | undefined;
  quote: Quote;
  venue: SwapVenue;
  invoice: Invoice;
  priceFeedDetails: PriceFeedDetails | null;
};

export enum OnCompleteActionType {
  NOTHING = "NOTHING",
  REDIRECT = "REDIRECT",
  CLOSE_WINDOW = "CLOSE_WINDOW",
}

export type OnCompleteAction =
  | { type: OnCompleteActionType.NOTHING; payload?: null }
  | {
      type: OnCompleteActionType.REDIRECT;
      payload: {
        url: string;
        text?: string;
        excludeParams?: boolean;
      };
    }
  | {
      type: OnCompleteActionType.CLOSE_WINDOW;
      payload: {
        delayMilliseconds: number;
        text?: string;
        excludeParams?: boolean;
      };
    };

export type ConsolidatedLinkForm = {
  handle: string;
  address: string | undefined;
  coins: CoinConfig[];
};

export type ExpandedNetwork = ChainInfo & { customTokenAddress: string };

export type ExpandedToken = TokenInfo & { networks: ExpandedNetwork[] };

export type PickEnum<T, K extends T> = {
  [P in keyof K]: P extends K ? P : never;
};

export type EnvData = {
  isDemo: boolean;
  isTest: boolean;
  testnetMode: boolean;
  rpcUrl: string;
  dataApiUrl: string;
};

export type StrippedConnector = {
  id: string;
  name: string;
};
