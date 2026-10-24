export const siteConfig = {
  url: "https://iagolaguna.com",
  name: "lgn",
  title: "lgn",
  description: "Blog do Iago Laguna sobre desenvolvimento de software.",
  locale: "pt-BR",
  timeZone: "America/Sao_Paulo",
  author: {
    name: "Iago Laguna",
    github: "https://github.com/iagolaguna",
    linkedin: "https://www.linkedin.com/in/iago-laguna-106878119",
  },
} as const;

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

// Next.js replaces `alternates` per page instead of merging it with the
// layout's, so every page builds it here to keep the RSS feed link.
export function pageAlternates(canonical: string) {
  return {
    canonical,
    types: {
      "application/rss+xml": [{ url: "/rss.xml", title: siteConfig.title }],
    },
  };
}
