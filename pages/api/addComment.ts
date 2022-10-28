// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import sanityClient from '@sanity/client';

export const config = {
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	apiVersion: '2021-08-11', // or today's date for latest
	useCdn: process.env.NODE_ENV === 'production',
	token: process.env.NEXT_SANITY_API_TOKEN,
};

const client = sanityClient(config);

export default async function addComment(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { postId, name, image, comment } = JSON.parse(req.body);

	try {
		await client.create({
			_type: 'comment',
			post: {
				_type: 'reference',
				_ref: postId,
			},
			name,
			image,
			comment,
		});
	} catch (error) {
		console.log(error);
	}

	res.status(200).json({ message: 'Comment Submitted' });
}
