import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { type BlogFormData } from "@/types/blog";
import { useNavigate } from "react-router-dom";
import { FormFields } from "./FormFields";

interface BlogFormProps {
  initialData?: BlogFormData;
  mode?: 'create' | 'edit';
}

export function BlogForm({ initialData, mode = 'create' }: BlogFormProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialData?.category || "");

  const form = useForm<BlogFormData>({
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      category: initialData?.category || "",
      subcategory: initialData?.subcategory || "",
      author: initialData?.author || "",
      image_url: initialData?.image_url || "",
      slug: initialData?.slug || "",
      featured: initialData?.featured || false,
      popular: initialData?.popular || false,
      featured_in_category: initialData?.featured_in_category || false,
    },
  });

  const generateSlug = async (title: string) => {
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const timestamp = new Date().getTime();
    return `${baseSlug}-${timestamp}`;
  };

  const onSubmit = async (data: BlogFormData) => {
    try {
      setIsLoading(true);
      console.log('Submitting form with data:', data);

      if (mode === 'create') {
        data.slug = await generateSlug(data.title);
      }

      if (!data.category && selectedCategory) {
        data.category = selectedCategory;
      }

      const { error } = mode === 'edit' && initialData?.id
        ? await supabase
            .from("blogs")
            .update(data)
            .eq('id', initialData.id)
        : await supabase
            .from("blogs")
            .insert([data]);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      toast({
        title: "Success",
        description: `Blog post ${mode === 'edit' ? 'updated' : 'created'} successfully`,
      });

      if (mode === 'edit') {
        navigate('/admin');
      } else {
        form.reset();
      }
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUrl = (url: string) => {
    console.log('Setting image URL:', url);
    form.setValue('image_url', url);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormFields
          form={form}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onImageChange={handleImageUrl}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (mode === 'edit' ? "Updating..." : "Creating...") : (mode === 'edit' ? "Update Blog Post" : "Create Blog Post")}
        </Button>
      </form>
    </Form>
  );
}