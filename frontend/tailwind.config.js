/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
		"./src/**/*.{html,ts}",
	],
  theme: {
    extend: {
			colors: {
				"primary": "var(--primary)",
				"secondary": "var(--secondary)",
				"tertiary": "var(--tertiary)",
				"quaternary": "var(--quaternary)",
			}
		},
  },
  plugins: [],
}

