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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "./ImageUpload";
import { CategorySelect } from "./CategorySelect";
import { RichTextEditor } from "./RichTextEditor";
import { categories, type BlogFormData } from "@/types/blog";

export function BlogForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<BlogFormData>({
    defaultValues: {
      title: "",
      content: "",
      category: "",
      subcategory: "",
      author: "",
      image_url: "",
      slug: "",
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
    
    // Add timestamp to ensure uniqueness
    const timestamp = new Date().getTime();
    const uniqueSlug = `${baseSlug}-${timestamp}`;
    
    // Check if slug exists
    const { data: existingPost } = await supabase
      .from('blogs')
      .select('slug')
      .eq('slug', uniqueSlug)
      .single();

    if (existingPost) {
      // In the unlikely case of a collision, add a random number
      return `${uniqueSlug}-${Math.floor(Math.random() * 1000)}`;
    }

    return uniqueSlug;
  };

  const onSubmit = async (data: BlogFormData) => {
    try {
      setIsLoading(true);
      data.slug = await generateSlug(data.title);

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

        <FormField
          control={form.control}
          name="subcategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subcategory</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!selectedCategory}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subcategory" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {selectedCategory &&
                    categories[selectedCategory as keyof typeof categories].map(
                      (subcategory) => (
                        <SelectItem key={subcategory} value={subcategory}>
                          {subcategory}
                        </SelectItem>
                      )
                    )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
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
          {isLoading ? "Creating..." : "Create Blog Post"}
        </Button>
      </form>
    </Form>
  );
}