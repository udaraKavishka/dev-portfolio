import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
    projectId: 'qf2kw7ti',
    dataset: 'production',
    apiVersion: '2024-01-01', // use current date (YYYY-MM-DD) to target the latest API version
    useCdn: true, // set to `false` to bypass the edge cache
});

const builder = createImageUrlBuilder(client);

type ImageSource = Parameters<typeof builder.image>[0];

export function urlFor(source: ImageSource) {
    return builder.image(source);
}
