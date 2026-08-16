"use client";

import { updateBlog } from "@/actions/blog.action";
import { IBlogDB } from "@/app.types";
import FillLoading from "@/components/shared/fill-loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useToggleEdit from "@/hooks/use-toggle-edit";
import { blogFieldsSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

function BlogFields(blog: IBlogDB) {
  const { state, onToggle } = useToggleEdit();

  return (
    <Card>
      <CardContent className="relative p-6">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">Title & slug</span>
          <Button size="icon" variant="ghost" onClick={onToggle}>
            {state ? <X /> : <Edit2 />}
          </Button>
        </div>
        <Separator className="my-3" />

        {state ? (
          <Forms blog={blog} onToggle={onToggle} />
        ) : (
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-space-grotesk font-bold text-muted-foreground">
                Title:
              </span>
              <span className="font-medium">{blog.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-space-grotesk font-bold text-muted-foreground">
                Slug:
              </span>
              <span className="font-medium">{blog.slug}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default BlogFields;

interface FormsProps {
  blog: IBlogDB;
  onToggle: () => void;
}

function Forms({ blog, onToggle }: FormsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(blogFieldsSchema),
    defaultValues: {
      title: blog.title ?? "",
      slug: blog.slug ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof blogFieldsSchema>) => {
    setIsLoading(true);
    const promise = updateBlog(blog._id, values, pathname)
      .then(() => onToggle())
      .finally(() => setIsLoading(false));

    toast.promise(promise, {
      loading: "Updating blog...",
      success: "Blog updated successfully!",
      error: "Error updating blog.",
    });
  };

  return (
    <>
      {isLoading && <FillLoading />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control as any}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control as any}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            Save
          </Button>
        </form>
      </Form>
    </>
  );
}
