/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	theme: {
		screens: {
			sm: '640px',
			// => @media (min-width: 640px) { ... }

			md: '768px',
			// => @media (min-width: 768px) { ... }

			lg: '1024px',
			// => @media (min-width: 1024px) { ... }

			xl: '1280px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1400px',
			// => @media (min-width: 1536px) { ... }
		},

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
	plugins: [require('tailwind-scrollbar'), require('daisyui')],
};
