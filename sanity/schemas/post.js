export default {
	name: 'post',
	title: 'Post',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required().min(10).max(80),
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'author',
			title: 'Author',
			type: 'reference',
			to: { type: 'author' },
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'mainImage',
			title: 'Main image',
			type: 'image',
			options: {
				hotspot: true,
			},
			validation: (Rule) => Rule.required(),
		},
		{
			name: 'imagesGallery',
			title: 'Images gallery',
			type: 'array',
			of: [
				{
					name: 'image',
					type: 'image',
					title: 'Image',
					options: {
						hotspot: true,
					},
				},
			],
		},
		{
			name: 'categories',
			title: 'Categories',
			type: 'array',
			of: [{ type: 'reference', to: { type: 'category' } }],
			validation: (Rule) => Rule.required().min(1),
		},
		{
			name: 'description',
			title: 'Description',
			type: 'string',
			validation: (Rule) => Rule.required().min(20).max(160),
		},
		{
			name: 'body',
			title: 'Body',
			type: 'blockContent',
			validation: (Rule) => Rule.required(),
		},
	],

	preview: {
		select: {
			title: 'title',
			author: 'author.name',
			media: 'mainImage',
		},
		prepare(selection) {
			const { author } = selection;
			return Object.assign({}, selection, {
				subtitle: author && `by ${author}`,
			});
		},
	},
};
