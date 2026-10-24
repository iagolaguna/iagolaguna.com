import Link from "next/link";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-foreground/10">
      <nav className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
        <Link href="/" aria-label={`${siteConfig.name}, página inicial`}>
          <Logo size={36} />
        </Link>
        <Link href="/blog" className="text-foreground/70 hover:text-foreground">
          Blog
        </Link>
      </nav>
    </header>
  );
}
