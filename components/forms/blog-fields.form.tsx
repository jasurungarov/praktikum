"use client";

import { createBlog } from "@/actions/blog.action";
import { blogCategory, blogTag } from "@/constants";
import { UploadButton } from "@/lib/uploadthing";
import { blogSchema } from "@/lib/validation";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

function BlogFieldsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const { user } = useUser();

  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: defaultVal,
  });

  function onSubmit(values: z.infer<typeof blogSchema>) {
    if (!coverImage) {
      return toast.error("Please upload a cover image");
    }

    const slug = values.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    setIsLoading(true);
    const promise = createBlog(
      {
        ...values,
        slug,
        coverImage,
      },
      user?.id as string,
    )
      .then(() => {
        form.reset();
        router.push("/en/instructor/my-blogs");
      })
      .finally(() => setIsLoading(false));

    toast.promise(promise, {
      loading: "Loading...",
      success: "Successfully created!",
      error: "Something went wrong!",
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Blog title<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-secondary"
                    placeholder="Zamonaviy dasturlashni qanday boshlash kerak"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Short description<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="h-24 bg-secondary"
                    placeholder="Description"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Content<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="h-64 bg-secondary"
                    placeholder="Maqolangizni shu yerga yozing. Alohida paragraflar uchun bo'sh qator qoldiring."
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Category<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      disabled={isLoading}>
                      <SelectTrigger className="w-full bg-secondary">
                        <SelectValue placeholder={"Select"} />
                      </SelectTrigger>
                      <SelectContent>
                        {blogCategory.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tag<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      disabled={isLoading}>
                      <SelectTrigger className="w-full bg-secondary">
                        <SelectValue placeholder={"Select"} />
                      </SelectTrigger>
                      <SelectContent>
                        {blogTag.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>
                Cover Image<span className="text-red-500">*</span>
                <UploadButton
                  endpoint={"imageUploader"}
                  config={{ appendOnPaste: true, mode: "auto" }}
                  onClientUploadComplete={(res) => {
                    setCoverImage(res[0].ufsUrl);
                  }}
                />
              </FormLabel>
            </FormItem>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant={"destructive"}
              onClick={() => form.reset()}
              disabled={isLoading}>
              Clear
            </Button>
            <Button type="submit" disabled={isLoading}>
              Submit
            </Button>
            {coverImage && (
              <Button
                type="button"
                variant={"outline"}
                onClick={() => setOpen(true)}>
                <span>Image</span>
                <ImageDown className="ml-2 size-4" />
              </Button>
            )}
          </div>
        </form>
      </Form>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <div className="relative h-72">
            <Image
              src={coverImage}
              alt="cover-image"
              fill
              className="object-cover"
            />
          </div>
          <Button
            className="w-fit"
            variant={"destructive"}
            onClick={() => {
              setCoverImage("");
              setOpen(false);
            }}>
            Remove
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default BlogFieldsForm;

const defaultVal = {
  title: "",
  description: "",
  content: "",
  category: "",
  tag: "",
};
