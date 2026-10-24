import type { ComponentPropsWithoutRef } from "react";
import Image from "next/image";
import Link from "next/link";

function MdxLink({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return <Link href={href} {...props} />;
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

function MdxImage({ src, alt = "" }: ComponentPropsWithoutRef<"img">) {
  if (typeof src !== "string") return null;
  // Markdown images carry no dimensions, so render at intrinsic size,
  // capped at the column width.
  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes="(min-width: 672px) 672px, 100vw"
      className="h-auto w-auto max-w-full"
      unoptimized={src.endsWith(".gif")}
    />
  );
}

export const mdxComponents = {
  a: MdxLink,
  img: MdxImage,
};
