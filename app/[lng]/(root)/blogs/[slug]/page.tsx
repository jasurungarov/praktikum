import { mockBlog, mockRelatedBlogs } from "@/constants/mock-blogs";
import { Metadata } from "next";
import AuthorCard from "./_components/author-card";
import BackButton from "./_components/back-button";
import BlogContent from "./_components/blog-content";
import CoverImage from "./_components/cover-image";
import RelatedPosts from "./_components/related-posts";
import BlogHeader from './_components/blog-header'

// TEMPORARY: params/generateMetadata will read from the DB once the
// backend action for blogs is ready. For now every slug renders the
// same mock post so we can focus purely on the frontend.

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Ungarov Academy | ${mockBlog.title}`,
    description: mockBlog.description,
    openGraph: {
      images: mockBlog.image.url,
      title: mockBlog.title,
      description: mockBlog.description,
    },
  };
}

async function Page() {
  const blog = mockBlog;
  const related = mockRelatedBlogs;

  return (
    <div className="pt-[8vh]">
      <div className="container mx-auto max-w-5xl">
        <BackButton />
      </div>
        <CoverImage blog={blog} />
        <BlogHeader blog={blog} />
        <BlogContent html={blog.content.html} />
        <AuthorCard author={blog.author} />
        <RelatedPosts blogs={related} />
    </div>
  );
}

export default Page;
