export const siteConfig = {
  url: "https://iagolaguna.com",
  name: "Iago Laguna",
  title: "Iago Laguna",
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
