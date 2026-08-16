import { getBlogById } from "@/actions/blog.action";
import { Separator } from "@/components/ui/separator";
import { Images, Settings } from "lucide-react";
import Header from "../../../../../components/shared/header";
import Actions from "./_components/actions";
import BlogFields from "./_components/blog-fields";
import Content from "./_components/content";
import CoverImage from "./_components/cover-image";
import Description from "./_components/description";
import SelectFields from "./_components/select-fields";

async function Page({ params }: { params: { blogId: string } }) {
  const blogJSON = await getBlogById(params.blogId);
  const blog = JSON.parse(JSON.stringify(blogJSON));

  return (
    <>
      <div className="flex items-center justify-between">
        <Header
          title={blog.title}
          description="Manage your blog post and see how it is performing."
        />
        <Actions {...blog} />
      </div>
      <Separator className="my-3 bg-muted-foreground" />

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-space-grotesk text-3xl font-medium">
              Blog Fields
            </span>{" "}
            <Settings />
          </div>
          <BlogFields {...blog} />
          <Description {...blog} />
          <Content {...blog} />
          <SelectFields {...blog} />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-space-grotesk text-3xl font-medium">
              Cover Image
            </span>{" "}
            <Images />
          </div>
          <CoverImage {...blog} />
        </div>
      </div>
    </>
  );
}

export default Page;
