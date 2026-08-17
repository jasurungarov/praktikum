import { Skeleton } from "@/components/ui/skeleton";

function BlogDetailSkeleton() {
  return (
    <div className="pb-10">
      <div className="container mx-auto max-w-5xl">
        <Skeleton className="mt-8 aspect-[16/9] w-full rounded-[28px] bg-white/5" />

        <div className="container mx-auto max-w-6xl pt-28">
          <div className="flex flex-wrap items-center gap-3">
            <Skeleton className="h-7 w-24 rounded-full bg-white/5" />
            <Skeleton className="h-7 w-20 rounded-full bg-white/5" />
          </div>

          <Skeleton className="mt-5 h-11 w-full bg-white/5" />
          <Skeleton className="mt-3 h-11 w-2/3 bg-white/5" />

          <Skeleton className="mt-4 h-5 w-full max-w-2xl bg-white/5" />
          <Skeleton className="mt-2 h-5 w-1/2 bg-white/5" />

          <div className="mt-6 flex items-center gap-5 border-t border-white/10 pt-5">
            <Skeleton className="size-9 rounded-full bg-white/5" />
            <Skeleton className="h-4 w-24 bg-white/5" />
            <Skeleton className="h-4 w-24 bg-white/5" />
            <Skeleton className="h-4 w-24 bg-white/5" />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Skeleton className="h-5 w-full bg-white/5" />
          <Skeleton className="h-5 w-full bg-white/5" />
          <Skeleton className="h-5 w-4/5 bg-white/5" />
          <Skeleton className="mt-4 h-5 w-full bg-white/5" />
          <Skeleton className="h-5 w-3/4 bg-white/5" />
        </div>
      </div>
    </div>
  );
}

export default BlogDetailSkeleton;
