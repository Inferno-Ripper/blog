export default {
	name: 'featured-post',
	title: 'Featured Post',
	type: 'document',
	fields: [
		{
			name: 'featuredPost',
			title: 'featured post',
			type: 'reference',
			to: { type: 'post' },
			validation: (Rule) => Rule.required(),
		},
	],

	preview: {
		select: {
			title: 'featuredPost.title',
			media: 'featuredPost.mainImage',
		},
	},
};
