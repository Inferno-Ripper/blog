import { createClient, createCurrentUserHook } from 'next-sanity';
import createImageUrlBuilder from '@sanity/image-url';
import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image';

export const config = {
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	apiVersion: '2021-08-11', // or today's date for latest
	useCdn: process.env.NODE_ENV === 'production',
};

// helper functions

export const sanityClient = createClient(config);

export const urlFor = (source) => createImageUrlBuilder(config).image(source);

export const useCurrentUser = createCurrentUserHook(config);

export const SanityImage = ({ asset }) => {
	const imageProps = useNextSanityImage(config, asset);

	if (!imageProps) return null;

	return (
		<img
			{...imageProps}
			style={{ height: '500px', width: '100%' }}
			className='object-contain my-10 rounded-lg cursor-pointer '
		/>
	);
};
