import { getReadingTime } from "@/lib/utils";
import { IBlog } from "@/types";
import { format } from "date-fns";
import { CalendarDays, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  blog: IBlog;
}

function BlogHeader({ blog }: Props) {
  return (
    <div className="container mx-auto max-w-6xl pt-8">
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href={`/blogs?category=${blog.category.slug}`}
          className="rounded-full border border-amber-500/30 bg-amber-500/5 px-3 py-1 text-xs font-medium text-amber-500 transition-colors hover:bg-amber-500/10">
          {blog.category.name}
        </Link>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
          {blog.tag.name}
        </span>
      </div>

      <h1 className="mt-5 font-space-grotesk text-4xl font-bold leading-tight md:text-5xl lg:text-[56px]">
        {blog.title}
      </h1>

      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        {blog.description}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-white/10 pt-5">
        <div className="flex items-center gap-2.5">
          <Image
            src={blog.author.image.url}
            alt={blog.author.name}
            width={36}
            height={36}
            className="rounded-full object-cover ring-2 ring-green-500/20"
          />
          <span className="text-sm font-medium">{blog.author.name}</span>
        </div>

        <span className="h-4 w-px bg-white/10" />

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="size-4" />
          {format(new Date(blog.createdAt), "MMM dd, yyyy")}
        </div>

        <span className="h-4 w-px bg-white/10" />

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="size-4" />
          {getReadingTime(blog.content.html)} daqiqa oqish
        </div>
      </div>
    </div>
  );
}

export default BlogHeader;
