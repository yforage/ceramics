import type { GatsbyConfig } from "gatsby";

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const config: GatsbyConfig = {
  siteMetadata: {
    title: `ceramics-shop`,
    siteUrl: `https://www.yourdomain.tld`,
    viewport: "width=device-width, initial-scale=1.0",
  },
  plugins: [
    "gatsby-plugin-postcss",
  ]
};

export default config;
