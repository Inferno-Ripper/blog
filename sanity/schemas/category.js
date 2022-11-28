export default {
	name: 'category',
	title: 'Category',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required().min(3).max(20),
		},
		{
			name: 'description',
			title: 'Description',
			type: 'text',
			validation: (Rule) => Rule.required().min(10).max(40),
		},
	],
};
