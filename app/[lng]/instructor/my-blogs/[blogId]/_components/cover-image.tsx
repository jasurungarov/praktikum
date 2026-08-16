"use client";

import { updateBlog } from "@/actions/blog.action";
import { IBlogDB } from "@/app.types";
import FillLoading from "@/components/shared/fill-loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormItem, FormLabel } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import useToggleEdit from "@/hooks/use-toggle-edit";
import { UploadButton } from "@/lib/uploadthing";
import { blogCoverImageSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

function CoverImage(blog: IBlogDB) {
  const { state, onToggle } = useToggleEdit();

  return (
    <>
      <Card>
        <CardContent className="relative p-6">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Replace Image</span>
            <Button size="icon" variant="ghost" onClick={onToggle}>
              {state ? <X /> : <Edit2 />}
            </Button>
          </div>
          <Separator className="my-3" />
          {state ? (
            <Forms blog={blog} onToggle={onToggle} />
          ) : (
            <div className="relative h-72 w-full">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className="rounded-sm object-cover"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default CoverImage;

interface FormsProps {
  blog: IBlogDB;
  onToggle: () => void;
}

function Forms({ blog, onToggle }: FormsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const form = useForm<z.infer<typeof blogCoverImageSchema>>({
    resolver: zodResolver(blogCoverImageSchema),
    defaultValues: {
      coverImage: blog.coverImage,
    },
  });

  function onSubmit(values: z.infer<typeof blogCoverImageSchema>) {
    if (!values.coverImage) {
      return toast.error("Please upload a cover image");
    }
    setIsLoading(true);
    const promise = updateBlog(
      blog._id,
      {
        coverImage: values.coverImage,
      },
      pathname,
    )
      .then(() => {
        onToggle();
      })
      .finally(() => setIsLoading(false));

    toast.promise(promise, {
      loading: "Loading...",
      success: "Successfully updated!",
      error: "Something went wrong!",
    });
  }

  return (
    <>
      {isLoading && <FillLoading />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormItem>
            <FormLabel>
              Cover Image<span className="text-red-500">*</span>
              <UploadButton
                endpoint={"imageUploader"}
                config={{ appendOnPaste: true, mode: "auto" }}
                onClientUploadComplete={(res) => {
                  form.setValue("coverImage", res[0].ufsUrl);
                }}
              />
            </FormLabel>
          </FormItem>
          <Button type="submit" disabled={isLoading}>
            Save
          </Button>
        </form>
      </Form>
    </>
  );
}
