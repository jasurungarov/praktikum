import { Skeleton } from "@/components/ui/skeleton";

function BlogCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
      <Skeleton className="aspect-[16/10] w-full rounded-none bg-white/5" />

      <div className="flex flex-col gap-3 p-5">
        <Skeleton className="h-4 w-2/3 bg-white/5" />
        <Skeleton className="h-4 w-full bg-white/5" />
        <Skeleton className="h-4 w-5/6 bg-white/5" />

        <div className="mt-1 flex items-center gap-2 border-t border-white/10 pt-3">
          <Skeleton className="size-6 rounded-full bg-white/5" />
          <Skeleton className="h-3 w-24 bg-white/5" />
        </div>
      </div>
    </div>
  );
}

export default BlogCardSkeleton;
