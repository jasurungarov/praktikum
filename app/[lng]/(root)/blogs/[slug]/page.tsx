import { notFound } from "next/navigation";
import { getBlogBySlug, getRelatedBlogs, incrementBlogViews } from "@/actions/blog.action";
import { Metadata } from "next";
import AuthorCard from "./_components/author-card";
import BackButton from "./_components/back-button";
import BlogContent from "./_components/blog-content";
import CoverImage from "./_components/cover-image";
import RelatedPosts from "./_components/related-posts";
import BlogHeader from './_components/blog-header'

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug);
  if (!blog) return { title: "Ungarov Academy | Blog" };  
  
  return {
    title: `Ungarov Academy | ${blog.title}`,
    description: blog.description,
    openGraph: {
      images: blog.coverImage,
      title: blog.title,
      description: blog.description,
    },
  };
}

async function Page({ params }: Props) {
  const blogJSON = await getBlogBySlug(params.slug);
  if (!blogJSON) return notFound();
 
  const blog = JSON.parse(JSON.stringify(blogJSON));
 
  const relatedJSON = await getRelatedBlogs(blog._id, blog.category);
  const related = JSON.parse(JSON.stringify(relatedJSON));
 
  incrementBlogViews(blog._id);


  return (
    <div className="pt-[8vh]">
      <div className="container mx-auto max-w-6xl">
        <BackButton />
      </div>
      <CoverImage blog={blog} />
      <BlogHeader blog={blog} />
      <BlogContent content={blog.content} />
      <AuthorCard author={blog.author} />
      <RelatedPosts blogs={related} />
    </div>
  );
}

export default Page;
