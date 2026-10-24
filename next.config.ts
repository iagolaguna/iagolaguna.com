import { withContentCollections } from "@content-collections/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old Hugo URLs. Feed rules must come before `/post/:slug`.
  async redirects() {
    return [
      { source: "/index.xml", destination: "/rss.xml", permanent: true },
      { source: "/post/index.xml", destination: "/rss.xml", permanent: true },
      { source: "/post", destination: "/blog", permanent: true },
      { source: "/post/:slug", destination: "/blog/:slug", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withContentCollections(nextConfig);
