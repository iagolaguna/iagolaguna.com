import Link from "next/link";
import { PostList } from "@/components/post-list";
import { getPublishedPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

const LATEST_POSTS = 5;

export default function Home() {
  return (
    <>
      <section className="mb-14">
        <h1 className="font-display text-4xl">{siteConfig.author.name}</h1>
        {/* TODO: replace placeholder intro with Iago's bio */}
        <p className="mt-4 text-lg text-foreground/80">
          Desenvolvedor de software. Aqui eu escrevo sobre o que estou
          aprendendo e construindo.
        </p>
      </section>
      <section>
        <h2 className="mb-8 text-sm font-semibold uppercase tracking-wide text-foreground/60">
          Posts recentes
        </h2>
        <PostList posts={getPublishedPosts().slice(0, LATEST_POSTS)} />
        <Link href="/blog" className="mt-10 inline-block underline">
          Ver todos os posts
        </Link>
      </section>
    </>
  );
}
