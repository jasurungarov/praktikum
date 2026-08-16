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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import useToggleEdit from "@/hooks/use-toggle-edit";
import { blogDescriptionSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

function Description(blog: IBlogDB) {
  const { state, onToggle } = useToggleEdit();

  return (
    <Card>
      <CardContent className="relative p-6">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">Short description</span>
          <Button size="icon" variant="ghost" onClick={onToggle}>
            {state ? <X /> : <Edit2 />}
          </Button>
        </div>
        <Separator className="my-3" />

        {state ? (
          <Forms blog={blog} onToggle={onToggle} />
        ) : (
          <div className="flex items-center gap-2">
            <span className="self-start font-space-grotesk font-bold text-muted-foreground">
              Description:
            </span>
            <span className="line-clamp-3 font-medium">{blog.description}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default Description;

interface FormsProps {
  blog: IBlogDB;
  onToggle: () => void;
}

function Forms({ blog, onToggle }: FormsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(blogDescriptionSchema),
    defaultValues: {
      description: blog.description,
    },
  });

  const onSubmit = (values: z.infer<typeof blogDescriptionSchema>) => {
    setIsLoading(true);
    const promise = updateBlog(blog._id, values, pathname)
      .then(() => onToggle())
      .finally(() => setIsLoading(false));

    toast.promise(promise, {
      loading: "Updating description...",
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea {...field} disabled={isLoading} />
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
