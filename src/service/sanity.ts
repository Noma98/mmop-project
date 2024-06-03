import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-05-25',
  token: process.env.SANITY_SECRET_TOKEN,
});
const builder = imageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source).width(800).url();
};
export const extractAssetIdFromUrl = (url: string) => {
  const match = url.match(/images\/[^/]+\/[^/]+\/([^?/]+)/);
  return match ? `image-${match[1]}`.replace('.', '-') : null;
};
