"use client";

import { deleteBlog, updateBlog } from "@/actions/blog.action";
import { IBlogDB } from "@/app.types";
import ConfirDeleteModal from "@/components/modals/confir-delete.modal";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

function Actions(blog: IBlogDB) {
  const pathname = usePathname();
  const router = useRouter();

  const onUpdateStatus = async () => {
    let promise;

    if (blog.published) {
      promise = updateBlog(blog._id, { published: false }, pathname);
    } else {
      promise = updateBlog(blog._id, { published: true }, pathname);
    }

    toast.promise(promise, {
      loading: "Updating status...",
      success: "Status updated successfully!",
      error: "Error updating status.",
    });
  };

  const onDelete = async () => {
    const promise = deleteBlog(blog._id, "/en/instructor/my-blogs").then(() => {
      router.push("/en/instructor/my-blogs");
    });

    toast.promise(promise, {
      loading: "Deleting blog...",
      success: "Blog deleted successfully!",
      error: "Error deleting blog.",
    });
  };

  return (
    <div className="flex gap-2 self-end">
      <Button onClick={onUpdateStatus}>
        {blog.published ? "Draft" : "Published"}
      </Button>
      <ConfirDeleteModal onConfirm={onDelete}>
        <Button variant="destructive">Delete</Button>
      </ConfirDeleteModal>
    </div>
  );
}

export default Actions;
