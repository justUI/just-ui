/** @type {import('next').NextConfig} */
const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  transpilePackages: ["@repo/ui"],
});

module.exports = withNextra()

