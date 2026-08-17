import { IBlogDB } from "@/app.types";
import { blogCategory } from '@/constants'
import useTranslate from '@/hooks/use-translate'
import { getReadingTime } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarDays, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  blog: IBlogDB;
}

function BlogCard({ blog }: BlogCardProps) {
  const t = useTranslate();
  const categoryLabel = blogCategory.find((c) => c.name === blog.category)?.label;

  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_0_20px_1px_hsl(var(--secondary)/0.35)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-[0_0_45px_12px_hsl(var(--secondary)/0.35)]">
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
        <Image
          src={blog.coverImage}
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-primary/80 px-3 py-1 text-xs font-medium shadow-[0_0_50px_1px_hsl(var(--primary)/0.35)] dark:bg-secondary">
          {categoryLabel ? t(categoryLabel) : blog.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 rounded-b-2xl p-5">
        <h2 className="font-space-grotesk text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-green-500">
          {blog.title}
        </h2>

        <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">
          {blog.description}{" "}
        </p>

        <div className="mt-1 flex items-center gap-2 border-t border-white/10 pt-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {getReadingTime(blog.content)} daqiqa
          </div>
          <span className="h-3 w-px bg-white/15" />
          <div className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5" />
            <span>{format(new Date(blog.createdAt), "MMM dd, yyyy")}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
