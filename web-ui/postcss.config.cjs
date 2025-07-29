// postcss.config.cjs
module.exports = {
  plugins: {
    '@tailwindcss/postcss7-compat': {},  // 或 '@tailwindcss/postcss'
    autoprefixer: {},
  },
};