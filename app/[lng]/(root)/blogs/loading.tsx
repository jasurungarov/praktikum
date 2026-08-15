import { Skeleton } from "@/components/ui/skeleton";
import FeaturedPostSkeleton from "./_components/skeletons/featured-post-skeleton";
import BlogCardSkeleton from "./_components/skeletons/blog-card-skeleton";

function Loading() {
  return (
    <div className="pt-[8vh]">
      <div className="container mx-auto max-w-6xl">
        {/* TopBar placeholder */}
        <div className="flex flex-col gap-2 py-8">
          <Skeleton className="h-4 w-40 bg-white/5" />
          <Skeleton className="h-8 w-56 bg-white/5" />
        </div>

        {/* search placeholder */}
        <div className="flex justify-center py-2">
          <Skeleton className="h-12 w-full max-w-xl rounded-full bg-white/5" />
        </div>

        <div className="mt-12">
          <FeaturedPostSkeleton />
        </div>

        {/* category pills placeholder */}
        <div className="mt-12 flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-24 rounded-full bg-white/5" />
          ))}
        </div>

        <div className="mt-8 grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Loading;
