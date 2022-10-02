/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				'custom-dark-full': '#18191A',
				'custom-dark-light': '#242526',
				'custom-dark-border': '#2F3031',
				'custom-text-light': '#D9DBE0',
				'custom-white-dark': '#FAFAFA',
				'custom-white-light': '#FFFFFF',
				'custom-white-border': '#DBDBDB',
			},
		},
	},
	plugins: [require('tailwind-scrollbar')],
};
