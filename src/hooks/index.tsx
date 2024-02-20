import { ColorScheme, MantineThemeOverride } from "@mantine/core";
import { getChain } from "@yodlpay/tokenlists";
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Flex, Tooltip } from "../components";
import { Text } from "../components/Text";
import { CURRENCY_SYMBOL_SPECIAL_CASES } from "../constants";
import {
  COLOR_SCHEME,
  MOBILE_BREAKPOINT,
  MOBILE_HEADING_SIZES,
  theme,
} from "../styles";
import {
  Payment,
  PaymentState,
  type FormState,
  type FormattedPayment,
  type LinkTypeAction,
} from "../types";
import {
  consolidateLinkFormData,
  fetchToken,
  formatBalance,
  formatPaymentAmount,
  formatUnitsDecimal,
  tokenAddressToToken,
  truncateTxHash,
} from "../utils";

export const useCopyToClipboard = (
  resetInterval = 2000
): [boolean, (text: string) => Promise<boolean>] => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copy = async (text: string) => {
    if (!navigator?.clipboard) {
      // logger.warn("Clipboard not supported");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      return true;
    } catch (error) {
      // logger.error("Copy failed", error);
      setIsCopied(false);
      return false;
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isCopied && resetInterval) {
      timeout = setTimeout(() => setIsCopied(false), resetInterval);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isCopied, resetInterval]);

  return [isCopied, copy];
};

export const useConsolidatedData = (shouldCalculate = false) => {
  const context = useFormContext();

  const values = context?.watch();

  return useMemo(() => {
    if (!shouldCalculate || !values) {
      return null;
    }

    return consolidateLinkFormData(values as FormState);
  }, [values, shouldCalculate]);
};

export const useFormattedPayments = (page: number) => {
  const [formattedPayments, setFormattedPayments] = useState<
    FormattedPayment[] | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchFormattedPayments = async () => {
    try {
      const res = await fetch(`/payments/${page}`);
      if (!res.ok) {
        throw new Error(
          `Failed to get payments with status code ${res.status}`
        );
      }
      const { payments } = (await res.json()) as {
        payments: (Payment & { timestamp: string })[];
      };

      const sentTokensUsed = await Promise.all(
        payments
          .flatMap((payment) => [
            { address: payment.tokenAddress, chainId: payment.chainId },
            { address: payment.swapTokenIn, chainId: payment.chainId },
          ])
          .filter(
            (tokenDetails, index, self) =>
              !!tokenDetails.address &&
              index ===
                self.findIndex(
                  (item) =>
                    item.address?.toLowerCase() ===
                    tokenDetails.address!.toLowerCase()
                )
          )
          .map(async (tokenDetails) => {
            let swapTokenDetails = tokenAddressToToken(
              tokenDetails.address!,
              tokenDetails.chainId
            ) as {
              symbol: string;
              currency?: string;
              decimals: number;
              address: string;
            };
            if (!swapTokenDetails) {
              swapTokenDetails = await fetchToken(
                tokenDetails.chainId,
                tokenDetails.address as `0x${string}`
              );
            }
            return swapTokenDetails;
          })
      );

      const formattedPayments = payments
        .map((payment) => {
          const chain = getChain(payment.chainId);
          const txUrl = `${chain.explorerUrl}/tx/${payment.txHash}`;
          const chainDetails = (
            <Flex>
              <Tooltip label={chain.chainName}>
                <img
                  src={chain.logoUri}
                  style={{
                    marginRight: "0.25rem",
                  }}
                  width={16}
                  height={16}
                  aria-hidden="true"
                  alt={`${chain.chainName} Logo`}
                />
              </Tooltip>
              <Text
                style={{ flexGrow: 1 }}
                component="a"
                href={txUrl}
                c="primary.0"
                size={14}
                target="_blank"
                variant="link"
              >
                {payment.txHash ? truncateTxHash(payment.txHash) : ""}
              </Text>
            </Flex>
          );

          let amountDetails, sentAmountDetails, invoiceAmount;
          if (payment.state === PaymentState.INDEXED) {
            // Get the token used
            const tokenInfo = tokenAddressToToken(
              payment.tokenAddress as string,
              payment.chainId
            );
            if (!tokenInfo) {
              // logger.error(
              //   `Failed to get token info for token address ${payment.tokenAddress}`
              // );
              return null;
            }

            const amount = formatPaymentAmount({
              amount: formatUnitsDecimal(
                payment.amount?.toString() as string,
                tokenInfo.decimals
              ).toNumber(),
              currency: tokenInfo.currency ?? tokenInfo.symbol,
              isFiatOrStablecoin: !CURRENCY_SYMBOL_SPECIAL_CASES.includes(
                tokenInfo.currency ?? tokenInfo.symbol
              ),
            });
            amountDetails = (
              <Flex align={"center"}>
                {tokenInfo.logoUri && (
                  <img
                    src={tokenInfo.logoUri}
                    style={{
                      marginRight: "0.75rem",
                    }}
                    width={16}
                    height={16}
                    alt={`${tokenInfo.name} Logo`}
                  />
                )}
                {amount}
              </Flex>
            );
            invoiceAmount = `${formatBalance(
              BigInt(Number(payment.invoiceAmount!.toString())),
              tokenInfo.decimals
            )} ${payment.invoiceCurrency}`;

            let sentAmount = amount;
            let swapTokenDetails = tokenInfo;
            if (!!payment.swapTokenInAmount) {
              swapTokenDetails = sentTokensUsed.find(
                (tokenDetails) =>
                  tokenDetails.address.toLowerCase() ===
                  payment.swapTokenIn!.toLowerCase()
              )! as any;
              sentAmount = formatPaymentAmount({
                amount: formatUnitsDecimal(
                  payment.swapTokenInAmount.toString() as string,
                  swapTokenDetails.decimals
                ).toNumber(),
                currency: swapTokenDetails.symbol,
                isFiatOrStablecoin:
                  !!swapTokenDetails.currency &&
                  !CURRENCY_SYMBOL_SPECIAL_CASES.includes(
                    swapTokenDetails.currency
                  ),
                shouldFormatCurrency: false,
              });
            }
            sentAmountDetails = (
              <Flex align={"center"}>
                {!!swapTokenDetails.logoUri && (
                  <img
                    src={swapTokenDetails.logoUri}
                    style={{
                      marginRight: "0.75rem",
                    }}
                    width={16}
                    height={16}
                    alt={`${swapTokenDetails.name} Logo`}
                  />
                )}
                {sentAmount}
              </Flex>
            );
          }

          return {
            date: payment.timestamp,
            chainDetails,
            txHash: payment.txHash,
            sender: payment.sender,
            receiver: payment.receiver,
            amountDetails,
            txUrl,
            sentAmountDetails,
            invoiceAmount,
            state: payment.state,
          };
        })
        .filter((payment) => !!payment) as FormattedPayment[];
      setFormattedPayments(formattedPayments);
    } catch (err) {
      // logger.error(err);
      // logger.error(
      //   `Failed to get payments for page number ${page} with error: ${err}`
      // );
      setError(err as Error);
      // So that Sentry has a record of the error
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setFormattedPayments(null);
    setError(null);
    fetchFormattedPayments();
  }, [page]);

  return {
    formattedPayments,
    isLoading,
    error,
  };
};

export const useLinkTypeAction = (): LinkTypeAction => {
  // const params = useParams();
  // const location = useLocation();

  const params = new URLSearchParams(document.location.search);
  const pathname = window.location.pathname;

  const parentHandle = params?.get("handle") ?? null;
  const descendantHandle = params?.get("subhandle") ?? null;
  const isEdit = pathname.includes("edit");

  if (isEdit) {
    if (descendantHandle) {
      return { type: "sublink", action: "edit" };
    }
    return { type: "link", action: "edit" };
  }
  if (parentHandle) {
    return { type: "sublink", action: "new" };
  }
  return { type: "link", action: "new" };
};

export const useCustomTheme = (preferredColorScheme: ColorScheme = "dark") => {
  // const preferredColorScheme = useColorScheme();
  // TODO remove this when we introduce light mode support

  const width = typeof window !== "undefined" ? window.innerWidth : 0;

  const dynamicTheme: MantineThemeOverride = {
    ...theme,
    colorScheme: preferredColorScheme,
    headings: {
      ...theme.headings,
      sizes: {
        ...theme.headings?.sizes,
        ...(width < MOBILE_BREAKPOINT && {
          ...MOBILE_HEADING_SIZES,
        }),
      },
    },
    colors: { ...theme.colors, ...COLOR_SCHEME[preferredColorScheme] },
  };

  return { preferredColorScheme, dynamicTheme };
};
