import BlogFieldsForm from "@/components/forms/blog-fields.form";
import { Separator } from "@/components/ui/separator";
import Header from "../../../../components/shared/header";

function Page() {
  return (
    <>
      <Header
        title="Create a blog"
        description="Fill in the details below to create a new blog post"
      />

      <div className="mt-4 rounded-md bg-background p-4">
        <h3 className="font-space-grotesk text-lg font-medium">
          Basic information
        </h3>
        <Separator className="my-3" />
        <BlogFieldsForm />
      </div>
    </>
  );
}

export default Page;
