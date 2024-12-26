import { BlogFormData } from "@/types/blog";

interface ArticleContentProps {
  blog: BlogFormData;
}

export function ArticleContent({ blog }: ArticleContentProps) {
  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden">
      {blog.image_url && (
        <img
          src={blog.image_url}
          alt={blog.title}
          className="w-full h-[400px] object-cover"
        />
      )}
      <div className="p-8">
        <ArticleHeader blog={blog} />
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </article>
  );
}