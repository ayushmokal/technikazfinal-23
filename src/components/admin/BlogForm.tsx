import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageUpload } from "./ImageUpload";
import { CategorySelect } from "./CategorySelect";
import { SubcategorySelect } from "./SubcategorySelect";
import { RichTextEditor } from "./RichTextEditor";
import { type BlogFormData } from "@/types/blog";
import { useNavigate } from "react-router-dom";

interface BlogFormProps {
  initialData?: BlogFormData;
  mode?: 'create' | 'edit';
}

export function BlogForm({ initialData, mode = 'create' }: BlogFormProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialData?.category || "");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<BlogFormData>({
    defaultValues: initialData || {
      title: "",
      content: "",
      category: "",
      subcategory: "",
      author: "",
      image_url: "",
      slug: "",
      featured: false,
      popular: false,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const generateSlug = async (title: string) => {
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const timestamp = new Date().getTime();
    const uniqueSlug = `${baseSlug}-${timestamp}`;
    
    const { data: existingPost } = await supabase
      .from('blogs')
      .select('slug')
      .eq('slug', uniqueSlug)
      .maybeSingle();

    if (existingPost) {
      return `${uniqueSlug}-${Math.floor(Math.random() * 1000)}`;
    }

    return uniqueSlug;
  };

  const onSubmit = async (data: BlogFormData) => {
    try {
      setIsLoading(true);

      if (mode === 'create') {
        data.slug = await generateSlug(data.title);
      }

      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("blog-images")
          .upload(filePath, imageFile);

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } = supabase.storage
          .from("blog-images")
          .getPublicUrl(filePath);

        data.image_url = publicUrlData.publicUrl;
      }

      if (mode === 'edit' && initialData?.id) {
        const { error } = await supabase
          .from("blogs")
          .update(data)
          .eq('id', initialData.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Blog post updated successfully",
        });

        navigate('/admin');
      } else {
        const { error } = await supabase
          .from("blogs")
          .insert([data]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Blog post created successfully",
        });

        form.reset();
        setImageFile(null);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          onCategoryChange={setSelectedCategory} 
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

        <ImageUpload onChange={handleImageChange} />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (mode === 'edit' ? "Updating..." : "Creating...") : (mode === 'edit' ? "Update Blog Post" : "Create Blog Post")}
        </Button>
      </form>
    </Form>
  );
}