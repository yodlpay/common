import type { ChainInfo } from '@yodlpay/tokenlists';
import {
  chainlist,
  getLatestRouter,
  getTokens,
  tokenlist,
} from '@yodlpay/tokenlists';
import { Address, toHex } from 'viem';
import { Connector } from 'wagmi';
import coinbasewallet from '../assets/images/wallets/coinbasewallet.svg';
import metamask from '../assets/images/wallets/metamask.svg';
import rainbow from '../assets/images/wallets/rainbow.svg';
import walletconnect from '../assets/images/wallets/walletconnect.svg';
import { PointEventType, StrippedConnector } from '../types';
import usdtABI from '../usdt.abi.json';

export const DISCORD = 'https://discord.gg/tKHvxh384Y';
export const TWITTER = 'https://twitter.com/yodlpay';

export const YODL_URL = 'yodl.me';

export const PAYMENTS_PER_PAGE = 10;

export const PAYMENT_LINK_CURRENCIES = [
  { value: 'USD', label: 'USD', icon: '$' },
  { value: 'EUR', label: 'EUR', icon: '€' },
  // Use the flag emoji so it fits into the UI. The actual symbol would
  // be CHF (Fr. or SFr.). Which we already display in the combo box.
  { value: 'CHF', label: 'CHF', icon: '🇨🇭' },
  { value: 'JPY', label: 'JPY', icon: '¥' },
  { value: 'ETH', label: 'ETH', icon: 'Ξ', isToken: false },
];

export const MINIMUM_CURRENCY_AMOUNT = 0.01;
export const MINIMUM_NATIVE_TOKEN_AMOUNT = 0.000001;

export const EXCLUDED_HEADER_ROUTES = ['/home'];

// Based off of https://help.coinbase.com/en/coinbase/getting-started/crypto-education/glossary/confirmations
// Polygon is a special case as it has many reorgs
export const CONFIRMATIONS_REQUIRED: Record<number, number> = {
  1: 15,
  10: 15,
  100: 15,
  137: 50,
  42161: 15,
};

export const GOLDSKY_SOURCE_TO_CHAIN_ID: Record<string, number> = {
  'yodl-indexer-mainnet': 1,
  'yodl-indexer-optimism': 10,
  'yodl-indexer-xdai': 100,
  'yodl-indexer-matic': 137,
  'yodl-indexer-arbitrum-one': 42161,
};

export const REDIRECT_COUNTDOWN_KEYWORD = '$timeRemaining';
export const REDIRECT_UNIT_KEYWORD = '$timeUnit';

// We will use these to attempt to match a fetch request that should be tracked as an RPC call
export const ANKR_HOSTNAME = 'rpc.ankr.com';
export const INFURA_HOSTNAME = 'infura.io';
export const RPC_URLS = [INFURA_HOSTNAME, ANKR_HOSTNAME];

export const OLD_WEBHOOK_SECRET_EXPIRY = 24 * 60 * 60 * 1000; // 1 day
export const WEBHOOK_TIMEOUT = 3000; // 3 seconds
export const WEBHOOK_RETRY_ATTEMPTS = 10;
// Increase slowly up to an hours sleep interval
export const WEBHOOK_RETRY_SLEEP_INTERVAL_SECONDS = [
  0, 1, 5, 10, 60, 120, 300, 600, 1800, 3600,
];

export const POINT_EVENT_TO_POINTS = {
  [PointEventType.FIRST_LINK_CREATION]: 10,
  [PointEventType.FIRST_SUBLINK_CREATION]: 5,
  [PointEventType.FIRST_PAYMENT]: 5,
  [PointEventType.FIRST_SWAP_PAYMENT]: 5,
  [PointEventType.FIRST_100_PAYMENT]: 10,
  [PointEventType.PAYMENT]: 1,
};

export const YODL_PRODUCT_NAME = 'YodlPay';
export const YODL_RECEIPT_EMAIL = 'noreply@yodlpay.com';
export const YODL_RECEIPT_ENDPOINT = `https://${YODL_URL}/tx`;
export const EMAIL_TEMPLATE_ALIAS = 'receipt';

export const GNOSIS_MULTICALL_ADDRESS: Address =
  '0xcA11bde05977b3631167028862bE2a173976CA11';

export const OPTIMISM_GAS_PRICE_ORACLE: Address =
  '0xc0d3C0d3C0d3c0D3C0D3C0d3C0d3C0D3C0D3000f';

// This will be used to represent the native token on all chains
export const NATIVE_TOKEN_ADDRESS =
  '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' as Address;

export const LOCAL_RPC_URL = 'http://localhost:8545';

export const LOCAL_DATA_API_URL = 'http://localhost:3003';

export const THEME_COLOR_SCHEME = 'light';

export const CURRENCIES = {
  USD: 'USD',
};

export const DEFAULT_CURRENCY = 'USD';

export const CURRENCIES_WITH_PLAIN_STYLE = ['CHF'];

// The 'approve' function in the USDT contract has no return types, whereas the ERC20 return type is bool
// This results in an error when simulating the tx.
// Ultimately, this doesn't have an impact on the tx, but we don't want errors being raised unnecessarily.
export const CUSTOM_ABI = {
  USDT: {
    1: usdtABI,
  },
} as { [symbol: string]: { [chainId: number]: any } };

/*
Approximate cost of returning remainders:
345240 - 333488 = 11752 from curve tests
220680 - 207025 = 13655 from uniswap tests

We'll use the more expensive value.
*/
export const RETURN_REMAINDER_COST = 14000n;

// For now, we will always return the remainder. This is so that we know where
// we have hardcoded it
export const RETURN_REMAINDER_DEFAULT = true;

export const DESIRED_NUMBER_OF_CONFIRMATIONS = 5;

// The maximum number of requests we should make to reach a swap amount out that
// satisfies the invoice
export const MAX_CURVE_ATTEMPTS = 10;

export const MIN_RAW_BALANCE = 0.01;

export const MAX_RAW_BALANCE = 1000000;

/*
This is duplicated in transmogrifier/src/constants.ts
Please be sure to update that if you update this.

These symbols/tokens are a supported currency for payments - however they are not stablecoins so they will require
special treatment in certain cases:
- validation for payment (0.01 vs 0.000001 minimum)
- formatting (stable vs non-stable)
*/
export const CURRENCY_SYMBOL_SPECIAL_CASES = ['ETH', 'WETH', 'MATIC', 'WMATIC'];

export const NON_STABLE_CURRENCIES = ['ETH', 'MATIC'];

export const CURRENCY_TO_SYMBOL = {
  EUR: { symbol: '€' },
  USD: { symbol: '$' },
  GBP: { symbol: '£' },
  JPY: { symbol: '¥' },
  CNY: { symbol: '¥' },
  KRW: { symbol: '₩' },
  INR: { symbol: '₹' },
  RUB: { symbol: '₽' },
  TRY: { symbol: '₺' },
  BRL: { symbol: 'R$' },
  CAD: { symbol: 'C$' },
  AUD: { symbol: 'A$' },
  NZD: { symbol: 'NZ$' },
  CHF: { symbol: 'CHF' },
  ETH: { symbol: 'ETH', alt: 'Ξ' },
  WETH: { symbol: 'WETH', alt: 'Ξ' },
  USDT: { symbol: '$' },
  USDC: { symbol: '$' },
  EURe: { symbol: '€' },
  DAI: { symbol: '$' },
};

export const DEFAULT_QUOTE = {
  amountIn: 0n,
  amountOut: 0n,
  path: [],
  priceImpact: 0,
};

export const APPROXIMATE_RATE_DECIMALS = 8;

export const FIAT_DECIMALS = 2;

export const FIAT_PRECISION_DECIMALS = 6;

export const TOKEN_DECIMALS = 6;

export const NON_STABLECOIN_SLIPPAGE = 0.005; // 0.5%
export const STABLECOIN_SLIPPAGE = 0.001; // 0.1%

export function walletParams(chain: ChainInfo) {
  if (!chain) {
    return undefined;
  }

  return {
    chainName: chain.chainName,
    chainId: toHex(chain.chainId),
    rpcUrls: chain.rpcUrls,
    blockExplorerUrls: [chain.explorerUrl],
  };
}

function chainConfig(chain: ChainInfo) {
  const tokens = getTokens(chain.chainId);
  const router = getLatestRouter(chain.chainId);

  return Object.assign(
    {
      tokens: tokens,
      router: router?.address,
    },
    chain,
  );
}

export const TEST_NETS = chainlist.chains
  .filter((chain) => chain.testnet)
  .map(chainConfig);

export const MAIN_NETS = chainlist.chains
  .filter((chain) => !chain.testnet)
  .map(chainConfig);

export const CHAINS = MAIN_NETS.concat(TEST_NETS);

export const SUPPORTED_CHAINS = MAIN_NETS.filter(
  (chain) => chain.chainName !== 'Avalanche',
);

export const getChainById = (chainId: number) =>
  CHAINS.find((c) => c.chainId === chainId);

export const getChainsByTokenName = (tokenName: string) =>
  tokenlist.tokens
    .filter((token) => token.name === tokenName)
    .map((item) => getChainById(item.chainId));

// Chain id -> block time in seconds
export const AVERAGE_BLOCK_TIMES: Record<number, number> = {
  1: 15,
  10: 15,
  42161: 15,
  100: 5,
  5: 15,
};

// Chain id -> average finality time
// This is approximate based off
// https://www.curvegrid.com/blog/2023-06-28-all-you-need-to-know-about-layer-1-and-2-transaction-finality
export const AVERAGE_FINALITY_DURATION: Record<number, string> = {
  1: '15 minutes',
  10: '20 minutes',
  42161: '20 minutes',
  100: '5 minutes', // same as ETH but 3x faster block times
  5: '15 minutes',
};

export const ICONS: { [key: string]: string } = {
  metamask: metamask.src,
  walletconnect: walletconnect.src,
  coinbasewallet: coinbasewallet.src,
  rainbow: rainbow.src,
};

export function connectorWalletIcon(
  connector: Connector | StrippedConnector,
): string | undefined {
  return ICONS[connector.id.toLocaleLowerCase()];
}

export function walletIcon(id: string): string | undefined {
  return ICONS[id];
}
