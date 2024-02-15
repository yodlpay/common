import { clsx, createStyles } from "@mantine/core";
import { Flex } from "./Flex";

const useStyles = createStyles((theme) => ({
  emoji: {},
}));

export type EmojiProps = {
  symbol: string;
  label?: string;
  className?: string;
  m?: number;
  my?: number;
  mx?: number;
  mr?: number;
  mb?: number;
  ml?: number;
  mt?: number;
};

export const Emoji = ({
  symbol,
  label,
  className,
  m,
  my,
  mx,
  mr,
  mb,
  ml,
  mt,
}: EmojiProps) => {
  const { classes } = useStyles();

  return (
    <Flex
      className={clsx(classes.emoji, className)}
      role="img"
      aria-label={label ? label : ""}
      aria-hidden={label ? "false" : "true"}
      m={m}
      my={my}
      mx={mx}
      mr={mr}
      mb={mb}
      ml={ml}
      mt={mt}
    >
      {symbol}
    </Flex>
  );
};
