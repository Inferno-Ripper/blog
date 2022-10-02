/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	theme: {
		extend: {},
		colors: {
			'custom-dark-full': '#18191A',
			'custom-dark-light': '#242526',
			'custom-dark-border': '#2F3031',
			'custom-blue-light': '#297BE5',
			'custom-blue-dark': '#4292FF',
			'custom-text-light': '#4292FF',
			'custom-white-dark': '#4292FF',
			'custom-white-light': '#FFFFFF',
		},
	},
	plugins: [require('tailwind-scrollbar')],
};
