import type { Meta, StoryObj } from '@storybook/react';
import { Carousel, type CarouselProps } from '../components/Carousel';
import { Flex } from '../components/Flex';
import { Text } from '../components/Text';
import wallets from '../assets/images/carousel/wallets.svg';
import exchanges from '../assets/images/carousel/exchanges.svg';
import multisigs from '../assets/images/carousel/multisigs.svg';
import offramp from '../assets/images/carousel/offramp.svg';

type CarouselItemProps = {
  image: string;
  title: string;
  description: string;
};

const CarouselItem = ({ image, title, description }: CarouselItemProps) => {
  return (
    <Flex direction="column" align="center" justify="center">
      <img src={image} alt={title} />
      <Text>{title}</Text>
      <Text>{description}</Text>
    </Flex>
  );
};

const defaults: CarouselProps = {
  height: 200,
  withIndicators: false,
  withControls: false,
  withAutoplay: false,
  loop: false,
  draggable: true,
  clickable: false,
  data: [
    <CarouselItem
      key="wallets"
      image={wallets.src}
      title="Wallets"
      description="Use any EVM wallet address or multiple per link"
    />,
    <CarouselItem
      key="exchanges"
      image={exchanges.src}
      title="Exchanges"
      description="Direct to a exchanges with different addresses per token."
    />,
    <CarouselItem
      key="multisigs"
      image={multisigs.src}
      title="Multisigs"
      description="Configure multisig wallets with unique address per chain"
    />,
    <CarouselItem
      key="offramp"
      image={offramp.src}
      title="Offramp"
      description="Input the offramp receive address to automate offramping"
    />,
  ],
};

const meta: Meta<CarouselProps> = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      options: ['horizontal', 'vertical'],
      control: { type: 'select' },
    },
    containScroll: {
      options: ['', 'trimSnaps', 'keepSnaps'],
      control: { type: 'select' },
    },
    align: {
      options: ['center', 'end', 'start'],
      control: { type: 'select' },
    },
    controlSize: {
      control: { type: 'number' },
    },
    draggable: {
      control: { type: 'boolean' },
    },
    dragFree: {
      control: { type: 'boolean' },
    },
    loop: {
      control: { type: 'boolean' },
    },
    withControls: {
      control: { type: 'boolean' },
    },
    withIndicators: {
      control: { type: 'boolean' },
    },
    withKeyboardEvents: {
      control: { type: 'boolean' },
    },
    slideSize: {
      control: { type: 'text' },
    },
    slideGap: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
  },
};

export default meta;

export const Default: StoryObj<CarouselProps> = {
  args: {
    ...defaults,
  },
};

export const WithLoop: StoryObj<CarouselProps> = {
  args: {
    ...defaults,
    loop: true,
  },
};

export const WithAutoplay: StoryObj<CarouselProps> = {
  args: {
    ...defaults,
    loop: true,
    withAutoplay: true,
  },
};

export const VerticalOrientation: StoryObj<CarouselProps> = {
  args: {
    ...defaults,
    orientation: 'vertical',
  },
};

export const WithCustomControls: StoryObj<CarouselProps> = {
  args: {
    ...defaults,
    withControls: true,
    nextControlIcon: '→',
    previousControlIcon: '←',
  },
};

export const WithIndicators: StoryObj<CarouselProps> = {
  args: {
    ...defaults,
    withIndicators: true,
  },
};

export const Clickable: StoryObj<CarouselProps> = {
  args: {
    ...defaults,
    clickable: true,
  },
};
