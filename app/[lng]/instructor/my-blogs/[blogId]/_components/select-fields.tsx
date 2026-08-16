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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { blogCategory, blogTag } from "@/constants";
import useToggleEdit from "@/hooks/use-toggle-edit";
import { blogSelectFieldsSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

function SelectFields(blog: IBlogDB) {
  const { state, onToggle } = useToggleEdit();

  return (
    <Card>
      <CardContent className="relative p-6">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">Category & tag</span>
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
                Category:
              </span>
              <span className="font-medium">{blog.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-space-grotesk font-bold text-muted-foreground">
                Tag:
              </span>
              <span className="font-medium">{blog.tag}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default SelectFields;

interface FormsProps {
  blog: IBlogDB;
  onToggle: () => void;
}

function Forms({ blog, onToggle }: FormsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(blogSelectFieldsSchema),
    defaultValues: {
      category: blog.category,
      tag: blog.tag,
    },
  });

  const onSubmit = (values: z.infer<typeof blogSelectFieldsSchema>) => {
    setIsLoading(true);
    const promise = updateBlog(blog._id, values, pathname)
      .then(() => onToggle())
      .finally(() => setIsLoading(false));

    toast.promise(promise, {
      loading: "Updating blog fields...",
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
          <Button type="submit" disabled={isLoading}>
            Save
          </Button>
        </form>
      </Form>
    </>
  );
}
