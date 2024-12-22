import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Star, Trash2, Crown } from "lucide-react";
import { type BlogFormData } from "@/types/blog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onToggleFeatured(blog.id!, blog.featured_in_category || false, blog.category)}
                >
                  <Crown className={`h-4 w-4 ${blog.featured_in_category ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{blog.featured_in_category ? "Remove from featured" : "Add to featured"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onTogglePopular(blog.id!, blog.popular || false)}
                >
                  <Star className={`h-4 w-4 ${blog.popular ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{blog.popular ? "Remove from popular" : "Add to popular"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(blog.id!)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit article</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(blog.id!)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete article</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </TableCell>
    </TableRow>
  );
}