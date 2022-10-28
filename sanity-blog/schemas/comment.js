export default {
	name: 'comment',
	title: 'Comment',
	type: 'document',
	fields: [
		{
			name: 'name',
			type: 'string',
			readOnly: ({ document }) => !document?.publishedOnce,
		},

		{
			name: 'approved',
			title: 'Approved',
			type: 'boolean',
			description: "Comments won't show on site without approval",
			initialValue: false,
		},

		{
			name: 'comment',
			title: 'Comment',
			type: 'string',
			readOnly: ({ document }) => !document?.publishedOnce,
		},

		{
			name: 'image',
			title: 'Image',
			type: 'string',
			readOnly: ({ document }) => !document?.publishedOnce,
		},

		{
			name: 'post',
			type: 'reference',
			to: [{ type: 'post' }],
		},
	],

	preview: {
		select: {
			title: 'name',
			subtitle: 'comment',
		},
	},
};
