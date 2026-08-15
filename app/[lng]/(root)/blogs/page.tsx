import TopBar from "@/components/shared/top-bar";
import UnderDevelopmentBanner from "@/components/shared/under-development-banner";
import { Metadata } from "next";
import { mockBlogsList } from "@/constants/mock-blogs";
import BlogsExplorer from "./_components/blogs-explorer";

export const metadata: Metadata = {
  title: "Ungarov Academy | Bloglar",
  description:
    "Bloglarimizda dasturlash, iqro arabia, konsalting xizmati, dizayn, marketing, til kurslari, hamda startup loyihalari va boshqa mavzular haqida maqolalar va yangiliklar.",
};

// TEMPORARY: reading from mock data until the DB-backed blog
// action is ready. Swap `mockBlogsList` for the real fetch then.
async function Page() {
  const blogs = mockBlogsList;

  return (
    
    <>
      <TopBar label="blogs" description="blogsDescription" />
      <div className="container mx-auto max-w-6xl">
        <UnderDevelopmentBanner />
      </div>
      <div className="mt-8">
        <BlogsExplorer blogs={blogs} />
      </div>
    </>
  );
}

export default Page;