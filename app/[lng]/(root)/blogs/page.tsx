import TopBar from "@/components/shared/top-bar";
import { Metadata } from "next";
import BlogsExplorer from "./_components/blogs-explorer";
import { SearchParamsProps } from '@/app.types'
import { getBlogs } from '@/actions/blog.action'

export const metadata: Metadata = {
  title: "Ungarov Academy | Bloglar",
  description:
    "Bloglarimizda dasturlash, iqro arabia, konsalting xizmati, dizayn, marketing, til kurslari, hamda startup loyihalari va boshqa mavzular haqida maqolalar va yangiliklar.",
};

async function Page({ searchParams }: SearchParamsProps) {
  const page = searchParams.page ? +searchParams.page : 1;
  const category = searchParams.category;
  const searchQuery = searchParams.q;
 
  const resultJSON = await getBlogs({
    page,
    category,
    searchQuery,
    pageSize: 6,
  });
  const result = JSON.parse(JSON.stringify(resultJSON));

  const showFeatured = page === 1 && !category && !searchQuery;

  return (
    
    <>
      <TopBar label="blogs" description="blogsDescription" />
      
      <div className="mt-8">
        <BlogsExplorer result={result} showFeatured={showFeatured} page={page}/>
      </div>
    </>
  );
}

export default Page;