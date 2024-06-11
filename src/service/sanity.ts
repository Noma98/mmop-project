import { createClient, SanityClient as ClientType } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

interface SanityClientType {
  getClient(): ClientType;
  urlFor(source: SanityImageSource): string;
  extractAssetIdFromUrl(url: string): string | null;
}
class SanityClient implements SanityClientType {
  private client: ClientType;
  private builder: ImageUrlBuilder;

  constructor() {
    this.client = createClient({
      projectId: process.env.SANITY_PROJECT_ID,
      dataset: process.env.SANITY_DATASET,
      useCdn: false,
      apiVersion: '2024-05-25',
      token: process.env.SANITY_SECRET_TOKEN,
    });
    this.builder = imageUrlBuilder(this.client);
  }
  public getClient() {
    return this.client;
  }
  public urlFor(source: SanityImageSource): string {
    return this.builder.image(source).width(800).url();
  }

  public extractAssetIdFromUrl(url: string): string | null {
    const match = url.match(/images\/[^/]+\/[^/]+\/([^?/]+)/);
    return match ? `image-${match[1]}`.replace('.', '-') : null;
  }
}

export default SanityClient;
