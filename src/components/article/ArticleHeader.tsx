import { BlogFormData } from "@/types/blog";

interface ArticleHeaderProps {
  blog: BlogFormData;
}

export function ArticleHeader({ blog }: ArticleHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex gap-2 mb-4">
        <span className="inline-block bg-primary text-white px-3 py-1 text-sm font-semibold rounded-full">
          {blog.category}
        </span>
        {blog.subcategory && (
          <span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 text-sm font-semibold rounded-full">
            {blog.subcategory}
          </span>
        )}
      </div>
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <div className="flex items-center text-gray-600 mb-4 text-sm">
        <span className="mr-4">By {blog.author}</span>
        <span>
          {new Date(blog.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}