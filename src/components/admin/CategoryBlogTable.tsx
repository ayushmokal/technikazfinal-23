import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Star, Trash2, Crown } from "lucide-react";
import { type BlogFormData } from "@/types/blog";

interface CategoryBlogTableProps {
  blog: BlogFormData;
  onToggleFeatured: (id: string, currentValue: boolean, category: string) => void;
  onTogglePopular: (id: string, currentValue: boolean) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function CategoryBlogTable({ 
  blog, 
  onToggleFeatured, 
  onTogglePopular, 
  onEdit, 
  onDelete 
}: CategoryBlogTableProps) {
  return (
    <TableRow>
      <TableCell>{blog.title}</TableCell>
      <TableCell>{blog.subcategory}</TableCell>
      <TableCell>{blog.author}</TableCell>
      <TableCell>
        {new Date(blog.created_at).toLocaleDateString()}
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggleFeatured(blog.id!, blog.featured || false, blog.category)}
            title={blog.featured ? "Remove from featured" : "Add to featured"}
          >
            <Crown className={`h-4 w-4 ${blog.featured ? 'fill-yellow-400 text-yellow-400' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onTogglePopular(blog.id!, blog.popular || false)}
            title={blog.popular ? "Remove from popular" : "Add to popular"}
          >
            <Star className={`h-4 w-4 ${blog.popular ? 'fill-yellow-400 text-yellow-400' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(blog.id!)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(blog.id!)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}