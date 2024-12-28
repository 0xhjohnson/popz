import imageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';
import { sanityClient } from 'sanity:client';

const imageBuilder = imageUrlBuilder(sanityClient)

const LARGEST_VIEWPORT = 1920;
const DEFAULT_MIN_STEP = 0.1;
const DEFAULT_WIDTH_STEPS = [430, 640, 768, 1024, 1280];
// Based on statcounter's most common screen sizes: https://gs.statcounter.com/screen-resolution-stats
const DEFAULT_FULL_WIDTH_STEPS = [360, 414, 768, 1366, 1536, 1920];

export function getImageProps({
  image,
  maxWidth: userMaxWidth,
  minimumWidthStep = DEFAULT_MIN_STEP,
  customWidthSteps,
  sizes,
  loading = 'lazy',
}: {
  image: Image
  maxWidth?: CSSStyleDeclaration['maxWidth'] | number;
  minimumWidthStep?: number;
  customWidthSteps?: number[];
  sizes?: HTMLImageElement['sizes'];
  loading?: HTMLImageElement['loading'];
}) {
  const maxWidth =
    typeof userMaxWidth === 'number' ? userMaxWidth : LARGEST_VIEWPORT;

  const builder = imageBuilder.image(image).fit('max').auto('format');
  const imageDimensions = getImageDimensions(image);

  const baseSizes = [
    maxWidth,
    ...(customWidthSteps ||
      (typeof userMaxWidth === 'number'
        ? DEFAULT_WIDTH_STEPS
        : DEFAULT_FULL_WIDTH_STEPS)),
  ];
  const retinaSizes = Array.from(
    new Set([
      ...baseSizes,
      ...baseSizes.map((size) => size * 2),
      ...baseSizes.map((size) => size * 3),
    ])
  )
    .sort((a, b) => a - b) // Lowest to highest
    .filter(
      (size) =>
        // Exclude sizes 10% or more larger than the image itself. Sizes slightly larger
        // than the image are included to ensure we always get closest to the highest
        // quality for an image. Sanity's CDN won't scale the image above its limits.
        size <= imageDimensions.width * 1.1 &&
        // Exclude those larger than maxWidth's retina (x3)
        size <= maxWidth * 3
    )

    // Exclude those with a value difference to their following size smaller than `minimumWidthStep`
    // This ensures we don't have too many srcSet variations, polluting the HTML
    .filter((size, i, arr) => {
      const nextSize = arr[i + 1];
      if (nextSize) {
        return nextSize / size > minimumWidthStep + 1;
      }

      return true;
    });

  return {
    src: builder.width(maxWidth).url(),
    srcset: retinaSizes
      .map((size) => `${builder.width(size).url()} ${size}w`)
      .join(', '),
    sizes:
      userMaxWidth === '100vw'
        ? '100vw'
        : sizes || `(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`,
    width: retinaSizes[0],
    height: retinaSizes[0] / imageDimensions.aspectRatio,
    loading,
  };
}

function getImageDimensions(image: Image) {
  if (!image?.asset?._ref) {
    return
  }

  const dimensions = image.asset._ref.split('-')[2]
  const [width, height] = dimensions.split('x').map(Number)

  if (!width || !height || Number.isNaN(width) || Number.isNaN(height)) {
    return
  }

  return {
    width,
    height,
    aspectRatio: width / height,
  }
}
