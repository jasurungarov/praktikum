import { IBlogDB } from "@/app.types";
import useTranslate from "@/hooks/use-translate";
import { getReadingTime } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarDays, Clock, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  blog: IBlogDB;
}

function FeaturedPost({ blog }: Props) {
  const t = useTranslate();

  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group grid grid-cols-2 gap-8 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-3 backdrop-blur-md transition-all duration-300 hover:border-green-500/25 hover:shadow-lg hover:shadow-primary/20 max-md:grid-cols-1">
      <div className="relative aspect-[16/11] overflow-hidden rounded-2xl">
        <Image
          src={blog.coverImage}
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col justify-center py-4 pr-6 max-md:px-4 max-md:pb-6">
        <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/5 px-3 py-1 text-xs font-medium text-amber-400">
          <Sparkles className="size-3.5" />
          {t("latestArticle")}
        </span>

        <h2 className="font-space-grotesk text-2xl font-bold leading-tight transition-colors group-hover:text-yellow-400 sm:text-3xl md:text-4xl">
          {blog.title}
        </h2>

        <p className="mt-3 line-clamp-2 text-muted-foreground">
          {blog.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Image
              src={blog.author.picture}
              alt={blog.author.fullName}
              width={38}
              height={38}
              className="rounded-full object-cover"
            />
            {blog.author.fullName}
          </div>
          <span className="h-3.5 w-px bg-white/15 max-sm:hidden" />
          <div className="flex items-center gap-1.5">
            <CalendarDays className="size-4" />
            {format(new Date(blog.createdAt), "MMM dd, yyyy")}
          </div>
          <span className="h-3.5 w-px bg-white/15 max-sm:hidden" />
          <div className="flex items-center gap-1.5">
            <Clock className="size-4" />
            {getReadingTime(blog.content)} {t("minutes")}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FeaturedPost;
