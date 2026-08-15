import { Skeleton } from "@/components/ui/skeleton";

function FeaturedPostSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-8 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-3 max-md:grid-cols-1">
      <Skeleton className="aspect-[16/11] w-full rounded-2xl bg-white/5" />

      <div className="flex flex-col justify-center gap-3 py-4 pr-6 max-md:px-4 max-md:pb-6">
        <Skeleton className="h-6 w-32 rounded-full bg-white/5" />
        <Skeleton className="h-9 w-full bg-white/5" />
        <Skeleton className="h-9 w-3/4 bg-white/5" />
        <Skeleton className="mt-2 h-4 w-full bg-white/5" />
        <Skeleton className="h-4 w-5/6 bg-white/5" />

        <div className="mt-4 flex items-center gap-4">
          <Skeleton className="h-7 w-24 rounded-full bg-white/5" />
          <Skeleton className="h-7 w-28 rounded-full bg-white/5" />
        </div>
      </div>
    </div>
  );
}

export default FeaturedPostSkeleton;
