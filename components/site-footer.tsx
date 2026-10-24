import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-foreground/10">
      <div className="mx-auto flex max-w-2xl gap-4 px-4 py-6 text-sm text-foreground/60">
        <a href={siteConfig.author.github} className="hover:text-foreground">
          GitHub
        </a>
        <a href={siteConfig.author.linkedin} className="hover:text-foreground">
          LinkedIn
        </a>
        <a href="/rss.xml" className="hover:text-foreground">
          RSS
        </a>
      </div>
    </footer>
  );
}
