import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
    projectId: 'qf2kw7ti',
    dataset: 'production',
    apiVersion: '2024-01-01', // use current date (YYYY-MM-DD) to target the latest API version
    useCdn: true, // set to `false` to bypass the edge cache
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
    return builder.image(source);
}
