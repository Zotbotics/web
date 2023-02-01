/** @type {import('tailwindcss').Config } */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,ts,svelte}',
    require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}'),
  ],
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    ...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')(),
  ],
}
