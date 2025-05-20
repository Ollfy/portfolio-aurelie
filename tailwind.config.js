export default {
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: 'class', // active le dark mode via la classe 'dark'
	theme: {
	  extend: {
		animation: {
		  marquee: 'marquee 40s linear infinite',
		},
		keyframes: {
		  marquee: {
			'0%': { transform: 'translateX(0%)' },
			'100%': { transform: 'translateX(-50%)' },
		  },
		},
		borderRadius: {
		  lg: '16px',
		  md: '14px',
		  sm: '12px',
		},
		fontFamily: {
			porkys: ['Porkys', 'sans-serif'],
		  },
	  },
	},
	plugins: [require("tailwindcss-animate")],
  }
  

  