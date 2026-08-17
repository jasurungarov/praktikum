/* eslint-disable tailwindcss/no-custom-classname */
import ShareBtns from "./share-btns";

interface Props {
  content: string;
}

function BlogContent({ content }: Props) {
  const paragraphs = content.split(/\n\s*\n/).filter(Boolean);

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="relative mt-10 flex gap-12 max-md:flex-col-reverse">
        <aside className="flex md:w-14 md:flex-col">
          <div className="md:sticky md:top-28">
            <ShareBtns />
          </div>
        </aside>

        <article className="prose-a:text-gold prose max-w-none flex-1 break-words dark:prose-invert prose-headings:font-space-grotesk prose-headings:font-bold prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
          {paragraphs.map((paragraph, i) => (
            <p key={i} className="whitespace-pre-line">
              {paragraph.trim()}
            </p>
          ))}
        </article>
      </div>
    </div>
  );
}

export default BlogContent;
