import { getInstructorBlogs } from "@/actions/blog.action";
import { SearchParamsProps } from "@/app.types";
import InstructorBlogCard from "@/components/cards/instructor-blog.card";
import Pagination from "@/components/shared/pagination";
import { auth } from "@clerk/nextjs";
import Header from "../../../../components/shared/header";

async function Page({ searchParams }: SearchParamsProps) {
  const { userId } = auth();
  const page = searchParams.page ? +searchParams.page : 1;
  const result = await getInstructorBlogs({ clerkId: userId!, page });

  return (
    <>
      <Header title="My blogs" description="Here are your latest blog posts" />
      <div className="mt-4 grid grid-cols-3 gap-4">
        {result.blogs.map((item) => (
          <InstructorBlogCard
            key={item._id}
            blog={JSON.parse(JSON.stringify(item))}
          />
        ))}
      </div>
      <div className="mt-6">
        <Pagination pageNumber={page} isNext={result.isNext} />
      </div>
    </>
  );
}

export default Page;
