import { IBlog } from "@/types";
import Image from "next/image";

interface Props {
  blog: IBlog;
}

function CoverImage({ blog }: Props) {
  return (
    <div className="container mx-auto max-w-5xl">
      <div className="relative mt-8 overflow-hidden rounded-[28px] border border-white/10">
        <Image
          src={blog.image.url}
          alt={blog.title}
          width={1120}
          height={595}
          priority
          className="h-auto w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
      </div>
    </div>
  );
}

export default CoverImage;