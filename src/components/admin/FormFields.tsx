import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { BlogFormData } from "@/types/blog";
import { RichTextEditor } from "./RichTextEditor";
import { CategorySelect } from "./CategorySelect";
import { SubcategorySelect } from "./SubcategorySelect";
import { ImageUpload } from "./ImageUpload";

interface FormFieldsProps {
  form: UseFormReturn<BlogFormData>;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onImageChange: (url: string) => void;
}

export function FormFields({ form, selectedCategory, onCategoryChange, onImageChange }: FormFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Enter blog title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <CategorySelect 
        form={form} 
        onCategoryChange={onCategoryChange} 
      />

      <SubcategorySelect 
        form={form}
        selectedCategory={selectedCategory}
      />

      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Content</FormLabel>
            <FormControl>
              <RichTextEditor 
                content={field.value} 
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="author"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Author</FormLabel>
            <FormControl>
              <Input placeholder="Enter author name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <ImageUpload onChange={onImageChange} />
    </>
  );
}