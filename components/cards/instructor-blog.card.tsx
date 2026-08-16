import { IBlogDB } from "@/app.types";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";

interface Props {
  blog: IBlogDB;
}

function InstructorBlogCard({ blog }: Props) {
  return (
    <Link href={`/en/instructor/my-blogs/${blog._id}`}>
      <div className="flex flex-col space-y-2 rounded-md bg-background p-2">
        <div className="relative h-52 w-full">
          <Image
            src={blog.coverImage as string}
            alt={blog.title as string}
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="flex items-center justify-between px-2">
          <h1 className="font-space-grotesk text-2xl font-bold">
            {blog.title}
          </h1>
          <Badge variant={blog.published ? "default" : "destructive"}>
            {blog.published ? "Published" : "Draft"}
          </Badge>
        </div>
      </div>
    </Link>
  );
}

export default InstructorBlogCard;
