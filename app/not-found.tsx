import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-10 text-center">
      <h1 className="text-3xl font-bold">Página não encontrada</h1>
      <p className="mt-4 text-foreground/70">
        O conteúdo que você procura não existe ou foi movido.
      </p>
      <Link href="/blog" className="mt-6 inline-block underline">
        Ver todos os posts
      </Link>
    </div>
  );
}
