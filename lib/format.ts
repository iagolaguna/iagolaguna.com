import { siteConfig } from "@/lib/site";

const dateFormatter = new Intl.DateTimeFormat(siteConfig.locale, {
  dateStyle: "long",
  timeZone: siteConfig.timeZone,
});

export function formatDate(isoDate: string) {
  return dateFormatter.format(new Date(isoDate));
}
