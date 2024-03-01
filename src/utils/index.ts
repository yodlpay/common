import AggregatorV3Interface from "@chainlink/contracts/abi/v0.8/AggregatorV3Interface.json";
import { type ColorScheme } from "@mantine/core";
import { getDefaultConfig, getDefaultWallets } from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  ledgerWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";
import type { ChainInfo, TokenInfo } from "@yodlpay/tokenlists";
import {
  getChain,
  getTokenBySymbol,
  routerlist,
  tokenlist,
} from "@yodlpay/tokenlists";
import {
  differenceInDays,
  format,
  formatDistanceToNow,
  isToday,
  isYesterday,
} from "date-fns";
import {
  Address,
  MulticallParameters,
  PublicClient,
  createPublicClient,
  http,
  parseAbi,
  zeroAddress,
  type Chain,
} from "viem";
import * as chains from "viem/chains";
import { Config } from "wagmi";
import { arbitrum, gnosis, mainnet, optimism, polygon } from "wagmi/chains";
import { ZodError } from "zod";
import {
  ANKR_HOSTNAME,
  CURRENCY_TO_SYMBOL,
  FIAT_DECIMALS,
  FIAT_PRECISION_DECIMALS,
  GNOSIS_MULTICALL_ADDRESS,
  LOCAL_RPC_URL,
  MAX_RAW_BALANCE,
  MIN_RAW_BALANCE,
  NATIVE_TOKEN_ADDRESS,
  PAYMENT_LINK_CURRENCIES,
  RPC_URLS,
  THEME_COLOR_SCHEME,
  TOKEN_DECIMALS,
  YODL_URL,
} from "../constants";
import { PaymentLinkAction } from "../enums";
import { Decimal } from "../lib";
import type {
  Account,
  CoinConfig,
  ConsolidatedLinkForm,
  ExpandedNetwork,
  ExpandedToken,
  FormatAmountParams,
  Link,
} from "../types";
import {
  LinkConfig,
  SwapVenue,
  TokenBalance,
  TokenData,
  type LinkFormState,
} from "../types";

const DEFAULT_REDIRECT = "/";

export const AddressZero = zeroAddress as Address;
export const MaxUint256 = BigInt(2 ** 256) - BigInt(1);

export const isYodlUrl = (url: string) => url.toLowerCase().includes(YODL_URL);

const tokens = tokenlist.tokens;

const memoizeFetchToken: Record<string, TokenData> = {};

type UnipoolData = {
  token0: string;
  token1: string;
};

const memoizeUniPool: Record<string, UnipoolData> = {};

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(id: string): Account | undefined {
  // const matchingRoutes = useMatches();
  // const route = useMemo(
  //   () => matchingRoutes.find((route) => route.id === id),
  //   [matchingRoutes, id]
  // ) as { data: { account?: Account } };
  // return route?.data?.account;

  console.log("id", id);

  return undefined;
}

// function isAccount(account: any): account is Account {
//   return (
//     account &&
//     typeof account === "object" &&
//     typeof account.provider === "string"
//   );
// }

// check the auth status of domains
export function useOptionalOauth(): Account | undefined {
  // const data = useMatchesData("routes/__app/home");
  // const data_admin = useMatchesData("routes/__admin");
  // if (!data || !isAccount(data)) {
  //   if (!data_admin || !isAccount(data_admin)) {
  //     return undefined;
  //   }
  //   return data_admin;
  // }

  // return data;

  return undefined;
}

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}

export const extractErrorMessage = (error: any) => {
  if (!!error.data.error) {
    return error.data.error;
  } else if (typeof error.data === "string") {
    return error.data;
  } else if (!!error.data) {
    return JSON.stringify(error.data);
  } else {
    return null;
  }
};

export const errorHandler = (loaderArgs: any, err: Error) => {
  if (
    err instanceof ZodError ||
    (err as Error).constructor.name == "ZodError"
  ) {
    // ZodError errors have a 'errors' property that contains an array of validation errors
    // return jsonLogged(
    //   loaderArgs,
    //   {
    //     error: "Invalid query parameters",
    //     details: (err as ZodError).errors,
    //   },
    //   {
    //     status: 400,
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //   }
    // );
    return Response.json(
      {
        error: "Invalid query parameters",
        details: (err as ZodError).errors,
      },
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } else if (err instanceof Response) {
    // The remix error boundary should catch and handle this
    throw err;
  } else {
    // Some other error occurred
    // logger.error(err);
    // logger.error(err.stack);
    // return jsonLogged(
    //   loaderArgs,
    //   { error: "Server error" },
    //   {
    //     status: 500,
    //     headers: {
    //       "Content-Type": "text/plain",
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //   }
    // );
    return Response.json(
      { error: "Server error" },
      {
        status: 500,
        headers: {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
};

export const chainById = (
  id: number
): { viemChain: Chain; chainInfo: ChainInfo } => {
  const viemChain = getViemChain(id);
  const chainInfo = getChain(id);

  if (!viemChain) throw `viemChain not found for id=${id}`;
  if (!chainInfo) throw `chainInfo not found for id=${id}`;

  return {
    viemChain,
    chainInfo,
  };
};

export const getViemChainOrRaise = (id: number): Chain => {
  const chain = Object.values(chains).find((x) => x.id === id);
  if (!chain) throw `chain not found for id: ${id}`;
  return chain;
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const stringifyBigInt = (obj: any) =>
  JSON.stringify(
    obj,
    (_, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
  );

export function coinSelected(link: Link, coinId: string): boolean {
  const [symbol, chainId] = coinId.split("-");
  const coinConfigs = link?.config![
    "coins" as keyof typeof link.config
  ] as CoinConfig[];
  const chainConfig = coinConfigs.find(
    (config) => config.chainId === parseInt(chainId)
  );
  return !!chainConfig
    ? !!chainConfig.tokens.find((token) => token.symbol === symbol)
    : false;
}

const coins = tokenlist.tokens;

export const coinsByChain: any = {};
coins.forEach((c) => {
  if (coinsByChain[c.chainId]) {
    coinsByChain[c.chainId].push(c);
  } else {
    coinsByChain[c.chainId] = [c];
  }
});

export const filteredChainIds: number[] = [];
routerlist.routers.forEach((routerInfo) => {
  if (routerInfo.version == "0.2") {
    if (!filteredChainIds.includes(routerInfo.chainId)) {
      filteredChainIds.push(routerInfo.chainId);
    }
  }
});

export const filteredChains = filteredChainIds
  .map((chainId) => {
    return getChain(chainId);
  })
  .filter((chain) => {
    return chain && !chain.testnet;
  });

export const coinIdsToCoinConfig = (coinIds: string[]) => {
  return coinIds.reduce((acc, coin) => {
    const [symbol, chainIdStr] = coin.split("-");
    const chainId = parseInt(chainIdStr);

    const existing = acc.find((item) => item.chainId === chainId);

    if (!!existing) {
      existing.tokens.push({ symbol });
    } else {
      acc.push({
        chainId,
        tokens: [{ symbol }],
      });
    }

    return acc;
  }, [] as CoinConfig[]);
};

export const getUniqueChainsForTokens = (coinConfig: CoinConfig[]) => {
  const uniqueChainIds = new Set<number>();

  coinConfig.forEach((token) => {
    uniqueChainIds.add(token.chainId);
  });

  const chains = Array.from(uniqueChainIds).map((chainId) =>
    chainById(chainId)
  );
  return chains.map((chain) => chain.viemChain);
};

export const invoiceAmountToUsd = (
  priceFeedDetails: { [currency: string]: bigint },
  tokenAddress: string,
  chainId: number,
  invoiceAmount: bigint,
  invoiceCurrency: string
) => {
  let invoiceAmountInUsd;
  const tokenInfo = tokenAddressToToken(tokenAddress, chainId) as TokenInfo;
  if (invoiceCurrency === "USD") {
    invoiceAmountInUsd =
      parseFloat(
        (invoiceAmount / 10n ** BigInt(tokenInfo.decimals - 2)).toString()
      ) / 100;
  } else {
    const rate = priceFeedDetails[invoiceCurrency];
    invoiceAmountInUsd =
      parseFloat(
        (
          (invoiceAmount * rate) /
          10n ** 8n /
          10n ** BigInt(tokenInfo.decimals - 2)
        ).toString()
      ) / 100;
  }
  return invoiceAmountInUsd;
};

export const isValidNumber = (value?: string | null): boolean => {
  if (!value) return false;
  const num = Number(value);
  return !isNaN(num) && value.trim() !== "";
};

export const isValidAction = (value?: string | null): boolean => {
  if (!value) return false;
  return Object.values(PaymentLinkAction).includes(value as PaymentLinkAction);
};

export const validateSearchParams = (searchParams: URLSearchParams) => {
  const amountParam = searchParams.get("amount");
  const currencyParam = searchParams.get("currency")?.toUpperCase();
  const isTestPayment = searchParams.get("test") === "true";
  const actionParam = searchParams.get("action")?.toUpperCase();

  const isValidAmountParam = isValidNumber(amountParam);
  const isValidCurrencyParam = PAYMENT_LINK_CURRENCIES.some(
    (item) => item.value === currencyParam
  );
  const isValidActionParam = isValidAction(actionParam);

  const formattedAmountParam = new Decimal(
    isValidAmountParam ? (amountParam as string) : 100
  )
    .dividedBy(new Decimal(100))
    .toNumber();
  const formattedCurrencyParam = isValidCurrencyParam ? currencyParam : "USD";
  const formattedActionParam = isValidActionParam ? actionParam : "";

  return {
    amount: formattedAmountParam,
    currency: formattedCurrencyParam,
    action: formattedActionParam,
    isTestPayment: isTestPayment,
    isValidAmount: isValidAmountParam,
    isValidCurrency: isValidCurrencyParam,
    isValidConfig: isValidAmountParam && isValidCurrencyParam,
    isValidAction: isValidActionParam,
  };
};

export const getTokenCurrency = (tokenInfo: TokenInfo) => {
  if (["ETH", "WETH"].includes(tokenInfo.symbol)) {
    return "ETH";
  } else if (["MATIC", "WMATIC"].includes(tokenInfo.symbol)) {
    return "MATIC";
  } else {
    return tokenInfo.currency;
  }
};

export const extractCoinConfigData = (coinConfig: CoinConfig[]) => {
  let customNetworkAddresses = 0;
  let customTokenAddresses = 0;
  const uniqueChainIds = new Set<number>();
  const uniqueTokenSymbols = new Set<string>();

  for (const network of coinConfig) {
    if (network.defaultAddress) {
      customNetworkAddresses++;
    }
    uniqueChainIds.add(network.chainId);

    for (const token of network.tokens) {
      if (token.address) {
        customTokenAddresses++;
      }
      uniqueTokenSymbols.add(token.symbol);
    }
  }

  const uniqueChains = Array.from(uniqueChainIds).map((chainId) =>
    getChain(chainId)
  );
  const uniqueTokens = Array.from(uniqueTokenSymbols).map((tokenSymbol) =>
    tokenlist.tokens.find((token) => token.symbol == tokenSymbol)
  );

  return {
    customAddresses: customNetworkAddresses + customTokenAddresses,
    networkCustomAddresses: customNetworkAddresses,
    tokenCustomAddresses: customTokenAddresses,
    networksSize: uniqueChains.length,
    networks: uniqueChains,
    tokensSize: uniqueTokens.length,
    tokens: uniqueTokens,
  };
};

export const convertDataToTokenList = (
  formData: ConsolidatedLinkForm | null
): ExpandedToken[] => {
  const tokenMap = formData?.coins.reduce<Map<string, ExpandedToken>>(
    (acc, { chainId, tokens }) => {
      return tokens.reduce((mapAcc, { symbol, address }) => {
        const foundNetwork = getChain(chainId);
        const network: ExpandedNetwork = {
          ...foundNetwork,
          customTokenAddress: address ?? "",
        };

        const existingToken = mapAcc.get(symbol);
        if (existingToken) {
          existingToken.networks.push(network);
        } else {
          const foundToken = getTokenBySymbol(symbol);
          if (foundToken) {
            mapAcc.set(symbol, { ...foundToken, networks: [network] });
          }
        }
        return mapAcc;
      }, acc);
    },
    new Map()
  );

  return Array.from(tokenMap?.values() ?? []);
};

export const consolidateLinkFormData = (
  values: LinkFormState
): ConsolidatedLinkForm => {
  // Iterate over networks to create the coins array
  const coinConfigArray = Object.entries(
    values.networks as {
      [chainId: number]: {
        enabled: boolean;
        defaultAddress?: string;
      };
    }
  )
    .filter(([_, networkInfo]) => networkInfo.enabled)
    .map(([chainIdStr, networkInfo]) => {
      const chainId = parseInt(chainIdStr, 10);

      // Filter tokens that are enabled for this chainId
      const tokens = Object.entries(
        values.tokens as {
          [tokenSymbol: string]: {
            enabled: boolean;
            networks: {
              [chainId: number]: {
                enabled?: boolean;
                address?: string;
                edited?: boolean;
              };
            };
          };
        }
      )
        .filter(
          ([_, tokenInfo]) =>
            tokenInfo.enabled && tokenInfo.networks[chainId]?.enabled
        )
        .map(([tokenName, tokenInfo]) => {
          const address = tokenInfo.networks[chainId]?.address;
          const foundToken = tokenlist.tokens.find(
            (token) => token.name === tokenName
          );

          return {
            symbol: foundToken?.symbol ?? "N/A",
            ...(address
              ? { address: tokenInfo.networks[chainId]?.address }
              : {}),
          };
        });

      const defaultAddress = networkInfo.defaultAddress;

      return {
        chainId,
        ...(defaultAddress
          ? { defaultAddress: networkInfo.defaultAddress }
          : {}),
        tokens,
      };
    });

  return {
    handle: values.linkHandle,
    address: values.defaultAddress,
    coins: coinConfigArray,
  };
};

export const parseUnitsDecimal = (value: string | number, decimals: number) => {
  return BigInt(
    new Decimal(value)
      .mul(new Decimal((10n ** BigInt(decimals)).toString()))
      .toFixed(0)
  );
};

export const formatUnitsDecimal = (
  value: string | number,
  decimals: number
) => {
  return new Decimal(value).div(
    new Decimal((10n ** BigInt(decimals)).toString())
  );
};

export const formatDate = (date: Date) =>
  date.toLocaleString("en-US", {
    weekday: "long", // "Monday"
    day: "numeric", // "1"
    month: "long", // "July"
    hour: "numeric", // "2"
    minute: "2-digit", // "02"
    hour12: true, // use 12-hour time
  });

export const truncateTxHash = (
  hash: string,
  start: number = 8,
  end: number = 0
): string => {
  if (hash.length <= 2 * start) {
    return hash;
  }

  if (end == 0) {
    return `${hash.slice(0, start)}...`;
  } else {
    return `${hash.slice(0, start)}...${hash.slice(-end)}`;
  }
};

export const fetchIntercept = (
  fetchMethod: (
    input: RequestInfo | URL,
    init?: RequestInit | undefined
  ) => Promise<Response>,
  sentry: any
) => {
  return async (input: RequestInfo | URL, init?: RequestInit | undefined) => {
    // Extract url as string
    let url: URL | null = null;
    try {
      if (typeof input === "string") {
        url = new URL(input);
      } else if (input instanceof Request) {
        url = new URL(input.url);
      } else if (input instanceof URL) {
        url = input;
      }
    } catch (err) {
      console.log("err", err);
    }

    if (!!url && RPC_URLS.some((rpc_url) => url?.host.includes(rpc_url))) {
      let identifier = url.host;
      if (url.host.includes(ANKR_HOSTNAME)) {
        // We cannot identify the chain from just the Ankr hostname
        identifier = url.hostname + url.pathname;
      }
      return await sentry.startSpan(
        { name: `RPC Call - ${identifier}` },
        async () => {
          return await fetchMethod(input, init);
        }
      );
    } else {
      return await fetchMethod(input, init);
    }
  };
};

export const formatRelativeTimestamp = (
  timestamp: Date | string,
  threshold = 7
) => {
  const date = new Date(timestamp);
  const now = new Date();

  if (isToday(date)) {
    // Format as "Today, H:mm pm"
    return `Today, ${format(date, "p")}`;
  } else if (isYesterday(date)) {
    // Format as "Yesterday, H:mm pm"
    return `Yesterday, ${format(date, "p")}`;
  } else if (differenceInDays(now, date) < threshold) {
    // Format as "X days ago, H:mm pm"
    const daysAgo = formatDistanceToNow(date, { addSuffix: false });
    return `${daysAgo}, ${format(date, "p")}`;
  } else {
    // Format as "01.01.2023 H:mm pm" for dates older than the specified threshold (7 days default)
    return format(date, "dd.MM.yy p");
  }
};

export const formatExactTimestamp = (timestamp: Date | string) => {
  return format(new Date(new Date(timestamp)), "yyyy-MM-dd HH:mm");
};

export const getHomeLink = (link: Link, parentLink?: Link | null) => {
  return parentLink
    ? `/home/${parentLink.handle}/${link.handle}`
    : `/home/${link.handle}`;
};

export const getPreviewUrl = (link: Link, parentLink?: Link | null) => {
  const isUnverified = link.state === "UNVERIFIED";
  return parentLink
    ? `/${parentLink.handle}/${link.handle}${
        isUnverified ? `?action=${PaymentLinkAction.TEST}` : ""
      }`
    : `/${link.handle}${
        isUnverified ? `?action=${PaymentLinkAction.TEST}` : ""
      }`;
};

export const getLinkHandle = (link: Link, parentLink?: Link | null) => {
  return parentLink ? `${parentLink.handle}/${link.handle}` : `${link.handle}`;
};

export const getPriceFromFeed = async (
  provider: PublicClient | undefined,
  feedAddress: Address
): Promise<[bigint, number]> => {
  // multicall doesn't work ons ome chains, so use a helper function
  const data = await Promise.allSettled([
    provider?.readContract({
      address: feedAddress,
      abi: AggregatorV3Interface as any,
      functionName: "latestRoundData",
      args: [],
    }),
    provider?.readContract({
      address: feedAddress,
      abi: AggregatorV3Interface as any,
      functionName: "decimals",
      args: [],
    }),
  ]);

  if (data[0].status !== "fulfilled") {
    // logger.error(
    //   `Failed to fetch latestRoundData with error: ${data[0].reason}`
    // );
    throw Error("Failed to fetch latestRoundData from feed.");
  }
  // Unlikely that decimals will have failed and latestRoundData succeeded, but just in case
  if (data[1].status !== "fulfilled") {
    // logger.error(
    //   `Failed to fetch exchange rate decimals with error ${data[1].reason}`
    // );
    throw Error("Failed to fetch exchange rate decimals from feed.");
  }
  const [, exchangeRate] = data[0].value as bigint[];
  const decimals = data[1].value as unknown as number;
  return [exchangeRate as bigint, decimals as number]; // [ exchangeRate, decimals ]
};

type WagmiConfigParams = {
  isTest: boolean;
  testnetMode: boolean;
  rpcUrl: string;
  theme?: ColorScheme;
  supportedChains?: Chain[];
};

export const generateWagmiConfig = ({
  testnetMode,
  rpcUrl = LOCAL_RPC_URL,
  supportedChains = [
    mainnet as Chain,
    optimism as Chain,
    arbitrum as Chain,
    gnosis as Chain,
    polygon as Chain,
  ],
}: WagmiConfigParams): Config => {
  const projectId = "fba45f29001cdfe9595549f725192905";
  const infuraApiKey = "7c96628b378d451fb1522e9de03413ee";

  const rpcUrls = {
    [mainnet.id]: testnetMode
      ? rpcUrl
      : `https://mainnet.infura.io/v3/${infuraApiKey}`,
    [optimism.id]: `https://optimism-mainnet.infura.io/v3/${infuraApiKey}`,
    [arbitrum.id]: `https://arbitrum-mainnet.infura.io/v3/${infuraApiKey}`,
    [gnosis.id]: `https://rpc.ankr.com/gnosis`,
    [polygon.id]: `https://polygon-mainnet.infura.io/v3/${infuraApiKey}`,
  };

  const createTransports = (rpcUrls: Record<number, string>) => {
    return Object.fromEntries(
      supportedChains.map((chain) => [
        chain.id,
        http(rpcUrls[chain.id] || (chain.rpcUrls.default as unknown as string)),
      ])
    );
  };

  const walletConnectMetadata = {
    name: "YODL",
    description: "YODL",
    // required by wallet connect. if it does not match, then some wallets
    // will show a nasty warning. You have to enable verify api on walletconnect cloud.
    url: "https://yodl.me",
    icons: [
      "https://framerusercontent.com/images/AAmKW17l9jseK4hJPDy2uYxVEdU.png",
    ],
  };

  const chains = (testnetMode ? [mainnet] : [...supportedChains]) as readonly [
    Chain,
    ...Chain[]
  ];

  const transports = createTransports(rpcUrls);

  const { wallets } = getDefaultWallets();

  const wagmiConfig = getDefaultConfig({
    chains,
    transports,
    multiInjectedProviderDiscovery: false,
    projectId,
    appName: walletConnectMetadata.name,
    appDescription: walletConnectMetadata.description,
    appIcon: walletConnectMetadata.icons[0],
    appUrl: walletConnectMetadata.url,
    wallets: [
      ...wallets.map((wallet) => ({ ...wallet, shimDisconnect: true })),
      {
        groupName: "Other",
        wallets: [argentWallet, trustWallet, ledgerWallet],
      },
    ],
  });
  return wagmiConfig;
};

type DefaultWagmiConfigParams = {
  isTest: boolean;
  testnetMode: boolean;
  rpcUrl: string;
};

export const defaultWagmiConfig = ({
  isTest,
  testnetMode,
  rpcUrl,
}: DefaultWagmiConfigParams) => {
  const wagmiConfig = generateWagmiConfig({
    isTest,
    testnetMode,
    rpcUrl,
    theme: THEME_COLOR_SCHEME,
  });

  return wagmiConfig;
};

export const getViemChain = (id: number): Chain | undefined => {
  return Object.values(chains).find((x) => x.id === id);
};

export const fetchToken = async (
  chainId: number,
  address: `0x${string}`
): Promise<TokenData> => {
  const key = `${chainId}-${address}`;

  // Check if the result is in the cache
  if (memoizeFetchToken[key]) {
    return memoizeFetchToken[key];
  }

  // logger.info(`fetchToken ${key}`);

  const client = createPublicClient({
    chain: getViemChain(chainId),
    transport: http(),
  });
  const tokenAbi = parseAbi([
    "function symbol() view returns (string)",
    "function name() view returns (string)",
    "function decimals() view returns (uint8)",
  ]);
  const contract = {
    address,
    abi: tokenAbi,
  };
  const [symbol, name, decimals] = await client.multicall({
    contracts: [
      {
        ...contract,
        functionName: "symbol",
      },
      {
        ...contract,
        functionName: "name",
      },
      {
        ...contract,
        functionName: "decimals",
      },
    ],
    allowFailure: false,
  });

  // Store the result in memoizeFetchToken
  memoizeFetchToken[key] = { symbol, name, decimals, address };

  return memoizeFetchToken[key];
};

export const fetchUniPool = async (
  chainId: number,
  address: string
): Promise<UnipoolData> => {
  const key = `${chainId}-${address}`;

  // Check if the result is in the cache
  if (memoizeUniPool[key]) {
    return memoizeUniPool[key];
  }

  // logger.info(`fetchUniPool ${key}`);

  const client = createPublicClient({
    chain: getViemChain(chainId),
    transport: http(),
  });
  const tokenAbi = parseAbi([
    "function token0() view returns (address)",
    "function token1() view returns (address)",
  ]);
  const contract = {
    address: address as Address,
    abi: tokenAbi,
  };
  const [token0, token1] = await client.multicall({
    contracts: [
      {
        ...contract,
        functionName: "token0",
      },
      {
        ...contract,
        functionName: "token1",
      },
    ],
    allowFailure: false,
  });

  // Store the result in memoizeUniPool
  memoizeUniPool[key] = { token0, token1 };

  return memoizeUniPool[key];
};

export const getNativeTokenBalance = async (
  client: PublicClient,
  address: Address
) => {
  const res = await client.getBalance({ address });
  const tokenInfo = tokenAddressToToken(NATIVE_TOKEN_ADDRESS, client.chain?.id);
  return {
    ...tokenInfo,
    balance: res.toString(),
  } as TokenInfo & { balance: string };
};

export const getTokenBalances = async (
  client: PublicClient,
  address: Address,
  tokens: TokenInfo[]
): Promise<TokenBalance[]> => {
  // We shouldn't try read the contract balance for native tokens
  const filteredTokens = tokens.filter(isNotNativeToken);
  const tokensRes = (await multicallWithGnosis(client, {
    contracts: filteredTokens.map((tokenInfo) => ({
      address: tokenInfo.address as Address,
      // tokens should all have a `balanceOf(address)` function
      abi: parseAbi([
        "function balanceOf(address owner) view returns (uint256)",
      ]),
      functionName: "balanceOf",
      args: [address as Address],
    })),
  })) as (
    | {
        error: Error;
        result?: undefined;
        status: "failure";
      }
    | {
        error?: undefined;
        result: unknown;
        status: "success";
      }
  )[];
  return tokensRes
    .map((balanceRes, index: number) => ({
      ...filteredTokens[index],
      balance:
        balanceRes.status === "success"
          ? (balanceRes.result as bigint)
          : undefined,
    }))
    .filter(isSuccessfulAndPositiveBalance)
    .map(transformToTokenBalance);
};

export const multicallWithGnosis = async (
  client: PublicClient,
  args: MulticallParameters
) => {
  // All other supported chains should have a multicall address
  if (client.chain?.id !== gnosis.id && !client.chain?.contracts?.multicall3) {
    throw new Error(
      `Multicall does not exist for chain id ${client.chain?.id}`
    );
  }
  return await client.multicall({
    ...args,
    multicallAddress:
      client.chain?.id === gnosis.id
        ? GNOSIS_MULTICALL_ADDRESS
        : client.chain?.contracts?.multicall3?.address,
  });
};

export const isSuccessfulAndPositiveBalance = (
  tokenDetails: TokenInfo & { balance?: bigint }
) => !!tokenDetails.balance && tokenDetails.balance > 0;

export const transformToTokenBalance = (
  tokenDetails: TokenInfo & { balance?: bigint }
) =>
  ({
    ...tokenDetails,
    balance: (tokenDetails.balance as bigint).toString(),
  } as TokenBalance);

// In our tokenlist we will always represent the native token with the native token address
export const isNativeToken = (tokenInfo: TokenInfo) =>
  tokenInfo.address.toLowerCase() === NATIVE_TOKEN_ADDRESS.toLowerCase();

export const isNotNativeToken = (tokenInfo: TokenInfo) =>
  tokenInfo.address.toLowerCase() !== NATIVE_TOKEN_ADDRESS.toLowerCase();

export const tokenAddressToToken = (
  tokenAddress: string,
  chainId?: number
): TokenInfo | undefined => {
  return tokens.find(
    (token) =>
      token?.address?.toLowerCase() === tokenAddress?.toLowerCase() &&
      (!chainId || token.chainId === chainId)
  ) as TokenInfo;
};

export const coinIdToToken = (coinId: string) => {
  const [symbol, chainIdString] = coinId.split("-");
  const token = tokens.find(
    (t) => t.symbol === symbol && t.chainId === parseInt(chainIdString)
  );
  return token;
};

export const coinIdToChain = (coinId: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_symbol, chainIdString] = coinId.split("-");
  const chain = getChain(parseInt(chainIdString));
  return chain;
};

export function supportedTokensOfLink(link: Link): TokenInfo[] {
  const coinConfigs = (link?.config as LinkConfig)?.["coins"] || [];
  return coinConfigs
    .flatMap((config) =>
      config.tokens.map((token) =>
        coinIdToToken(`${token.symbol}-${config.chainId}`)
      )
    )
    .filter((tokenInfo) => !!tokenInfo) as TokenInfo[];
}

export function supportedChainsOfLink(link: Link): ChainInfo[] {
  const coinConfigs = (link?.config as LinkConfig)?.["coins"] || [];
  return coinConfigs.map((config) => getChain(config.chainId));
}

export const getFractionDigits = (amount: number) => {
  const decimals = amount.toString().split(".")[1];
  return decimals ? decimals.replace(/0+$/, "").length : 0;
};

export const formatCurrencySymbol = (
  amount: string,
  symbol = "",
  prefix = "",
  isFiatOrStablecoin = true
) => {
  if (isFiatOrStablecoin) {
    return `${prefix}${symbol}${amount}`;
  }
  return `${prefix}${amount}${symbol ? ` ${symbol}` : ""}`;
};

export const formatBalanceAmount = ({
  amount,
  currency = "",
  symbol = currency,
  isFiatOrStablecoin = true,
  converted = false,
  shouldFormatCurrency = true,
}: FormatAmountParams) => {
  const currencySymbol =
    CURRENCY_TO_SYMBOL[currency as keyof typeof CURRENCY_TO_SYMBOL]?.symbol ||
    symbol ||
    "";

  const flooredAmount =
    Math.floor(amount * (isFiatOrStablecoin ? 100 : 10)) /
    (isFiatOrStablecoin ? 100 : 10);

  const fractionDigits = isFiatOrStablecoin
    ? 2
    : getFractionDigits(flooredAmount);

  const formatter = new Intl.NumberFormat("en-GB", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });

  if (flooredAmount < MIN_RAW_BALANCE) {
    return shouldFormatCurrency
      ? formatCurrencySymbol(`0.01`, currencySymbol, "<", isFiatOrStablecoin)
      : "0.01";
  }

  if (flooredAmount >= MAX_RAW_BALANCE) {
    const compactFormatter = new Intl.NumberFormat("en-GB", {
      notation: "compact",
      compactDisplay: "short",
    });
    return shouldFormatCurrency
      ? formatCurrencySymbol(
          compactFormatter.format(flooredAmount),
          currencySymbol,
          "~",
          isFiatOrStablecoin
        )
      : compactFormatter.format(flooredAmount);
  }

  return shouldFormatCurrency
    ? formatCurrencySymbol(
        formatter.format(flooredAmount),
        currencySymbol,
        converted ? "~" : "",
        isFiatOrStablecoin
      )
    : formatter.format(flooredAmount);
};

export const formatBalance = (
  balance: bigint,
  decimals: number,
  symbol: string = ""
) => {
  if (balance) {
    const divisor = 10 ** decimals;
    const balanceAmount = Number(balance);

    const balanceHuman = balanceAmount / divisor;
    const balanceSanitized = Math.abs(balanceHuman);

    return formatBalanceAmount({
      amount: balanceSanitized,
      isFiatOrStablecoin: false,
      ...(symbol && { symbol }),
    });
  }
  return formatBalanceAmount({ amount: 0, isFiatOrStablecoin: false });
};

export const formatPaymentAmount = ({
  amount,
  currency = "",
  symbol = currency,
  isFiatOrStablecoin = true,
  shouldFormatCurrency = true,
  useHigherPrecisionForSmallAmounts = false,
  precision = isFiatOrStablecoin ? FIAT_DECIMALS : TOKEN_DECIMALS,
}: FormatAmountParams): string => {
  const currencySymbol =
    CURRENCY_TO_SYMBOL[currency as keyof typeof CURRENCY_TO_SYMBOL]?.symbol ||
    symbol ||
    "";

  const smallAmountThreshold = Math.pow(10, -FIAT_DECIMALS);

  const shouldUseHigherPrecision =
    amount < smallAmountThreshold &&
    useHigherPrecisionForSmallAmounts &&
    isFiatOrStablecoin;

  const finalPrecision = shouldUseHigherPrecision
    ? FIAT_PRECISION_DECIMALS
    : precision;

  const scaleFactor = Math.pow(10, finalPrecision);
  const ceiledAmount = Math.ceil(amount * scaleFactor) / scaleFactor;

  const fractionDigits = isFiatOrStablecoin
    ? shouldUseHigherPrecision
      ? Math.min(getFractionDigits(ceiledAmount), FIAT_PRECISION_DECIMALS)
      : finalPrecision
    : Math.min(getFractionDigits(ceiledAmount), finalPrecision);

  const formatter = new Intl.NumberFormat("en-GB", {
    minimumFractionDigits:
      isFiatOrStablecoin && !shouldUseHigherPrecision
        ? FIAT_DECIMALS
        : fractionDigits,
    maximumFractionDigits: fractionDigits,
  });

  return shouldFormatCurrency
    ? formatCurrencySymbol(
        formatter.format(ceiledAmount),
        currencySymbol,
        "",
        isFiatOrStablecoin
      )
    : formatter.format(ceiledAmount);
};

export const parseExcludedVenues = (searchParams: URLSearchParams) => {
  const excludedVenuesString = searchParams.get("excluded_venues");
  return !!excludedVenuesString
    ? (excludedVenuesString
        .split(",")
        .map((excludedVenue) => excludedVenue.toUpperCase())
        .filter((excludedVenue) => excludedVenue in SwapVenue) as SwapVenue[])
    : [];
};

export const getTxUrl = (chain: Chain | null, txHash: string | undefined) => {
  if (!chain?.id || !chain?.blockExplorers?.default.url || !txHash) return "";
  // Use ChainInfo instead of Chain because we have selected specific explorers
  const chainInfo = getChain(chain?.id);
  return `${chainInfo.explorerUrl}/tx/${txHash}`;
};
