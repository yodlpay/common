import {
  Carousel as MantineCarousel,
  type Embla,
  type CarouselProps as MantineCarouselProps,
} from "@mantine/carousel";
import { createStyles } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState, type ReactNode } from "react";

const SLIDE_IDENTIFIER = "slide";

const useStyles = createStyles(() => ({
  activeSlide: {
    opacity: 1,
    transition: "opacity 300ms ease",
  },
  inactiveSlide: {
    opacity: 0.5,
    transition: "opacity 300ms ease",
  },
}));

type CarouselBreakpoint = {
  maxWidth: string;
  slideSize: string;
};

export type CarouselProps = {
  /** Determines how slides will be aligned relative to the container. */
  align?: number | "center" | "end" | "start";

  /** Control slideSize and slideGap at different viewport sizes */
  breakpoints?: CarouselBreakpoint[];

  /** `<Carousel.Slide />` components */
  children?: ReactNode;

  /** Clear leading and trailing empty space that causes excessive scrolling. */
  containScroll?: "" | "trimSnaps" | "keepSnaps";

  /** Previous/next controls size */
  controlSize?: number;

  /** Key of theme.spacing or number to set space between next/previous control and carousel boundary */
  controlsOffset?: number | "xs" | "sm" | "md" | "lg" | "xl";

  /** Carousel contents */
  data?: ReactNode[];

  /** Determines whether momentum scrolling should be enabled. */
  dragFree?: boolean;

  /** Determines whether carousel can be scrolled with mouse and touch interactions. */
  draggable?: boolean;

  /** Determines whether carousel slides can be clicked. */
  clickable?: boolean;

  /** Get embla API as ref */
  getEmblaApi?: (embla: Embla) => void;

  /** Slides container height, required for vertical orientation */
  height?: string | number;

  /** Choose a fraction representing the percentage portion of a slide that needs to be visible in order to be considered in view. */
  inViewThreshold?: number;

  /** Determines whether gap should be treated as part of the slide size. */
  includeGapInSize?: boolean;

  /** Index of initial slide */
  initialSlide?: number;

  /** Enables infinite looping. */
  loop?: boolean;

  /** Icon of next control */
  nextControlIcon?: ReactNode;

  /** Next control aria-label */
  nextControlLabel?: string;

  /** Called when user clicks next button */
  onNextSlide?: () => void;

  /** Called when user clicks previous button */
  onPreviousSlide?: () => void;

  /** Called with slide index when slide changes */
  onSlideChange?: (index: number) => void;

  /** Carousel orientation */
  orientation?: "horizontal" | "vertical";

  /** An array of embla plugins */
  plugins?: unknown[];

  /** Previous control icon */
  previousControlIcon?: ReactNode;

  /** Previous control aria-label */
  previousControlLabel?: string;

  /** Allow the carousel to skip scroll snaps if it's dragged vigorously. */
  skipSnaps?: boolean;

  /** Key of theme.spacing or number to set gap between slides */
  slideGap?: number | "xs" | "sm" | "md" | "lg" | "xl";

  /** Slide width */
  slideSize?: string | number;

  /** Number of slides that should be scrolled with next/previous buttons */
  slidesToScroll?: number | "auto";

  /** Adjusts scroll speed when triggered by any of the methods. */
  speed?: number;

  /** Determines whether next/previous controls should be displayed. */
  withControls?: boolean;

  /** Determines whether indicators should be displayed. */
  withIndicators?: boolean;

  /** Determines whether carousel should autoplay */
  withAutoplay?: boolean;

  /** Determines autoplay delay if withAutoplay is set */
  autoplayDelay?: number;

  /** Determines whether arrow key should switch slides. */
  withKeyboardEvents?: boolean;

  /** NavLink class name */
  className?: string;
} & Omit<MantineCarouselProps, "children">;

export type CarouselSlideProps = {
  /** Slide content */
  children: ReactNode;

  /** Key of theme.spacing or number to set gap between slides */
  gap?: number | "xs" | "sm" | "md" | "lg" | "xl";

  /** Slide width */
  size?: string | number;
};

export const Carousel = ({
  data,
  children,
  className,
  initialSlide = 0,
  slideSize = "40%",
  draggable = true,
  clickable = true,
  loop = true,
  withControls = false,
  withIndicators = false,
  withAutoplay = true,
  autoplayDelay = 2000,
  ...props
}: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const autoplay = useRef(
    Autoplay({ delay: autoplayDelay, stopOnInteraction: false })
  );
  const [embla, setEmbla] = useState<Embla | null>(null);

  const { classes } = useStyles();

  const handleSlideChange = (slide: number) => {
    setCurrentSlide(slide);
  };

  const handleClick = (e: any) => {
    const slideElement = e.target.closest(".mantine-Carousel-slide");

    if (slideElement) {
      const slide = slideElement.id.split(SLIDE_IDENTIFIER)?.[1];
      const slideId = parseInt(slide ?? "-1");

      if (embla && slideId > -1 && slideId !== currentSlide) {
        embla.scrollTo(slideId);
        setCurrentSlide(slideId);
      }
    }
  };

  return (
    <MantineCarousel
      {...props}
      getEmblaApi={setEmbla}
      initialSlide={initialSlide}
      onSlideChange={handleSlideChange}
      slideSize={slideSize}
      draggable={draggable}
      loop={loop}
      withControls={withControls}
      withIndicators={withIndicators}
      {...(withAutoplay && { plugins: [autoplay.current] })}
      className={className}
    >
      {children ??
        data?.map((item, index) => (
          <MantineCarousel.Slide
            id={`${SLIDE_IDENTIFIER}${index}`}
            key={`${SLIDE_IDENTIFIER}${index}`}
            {...(clickable && { onClick: handleClick })}
            className={
              index === currentSlide
                ? classes.activeSlide
                : classes.inactiveSlide
            }
          >
            {item}
          </MantineCarousel.Slide>
        ))}
    </MantineCarousel>
  );
};
