import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { FormLabel } from "@/components/ui/form";

export function MobileProductManager() {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    display_specs: "",
    processor: "",
    camera: "",
    battery: "",
    image_url: "",
  });

  const { data: products, refetch } = useQuery({
    queryKey: ['mobile-products'],
    queryFn: async () => {
      console.log('Fetching mobile products...');
      const { data, error } = await supabase
        .from('mobile_products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching mobile products:', error);
        throw error;
      }
      console.log('Mobile products fetched:', data);
      return data;
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from('blog-images')
      .upload(filePath, file);

    if (uploadError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload image",
      });
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filePath);

    setFormData(prev => ({ ...prev, image_url: publicUrl }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from('mobile_products')
      .insert([{
        ...formData,
        price: parseFloat(formData.price),
      }]);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add mobile product",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Mobile product added successfully",
    });
    
    setFormData({
      name: "",
      price: "",
      display_specs: "",
      processor: "",
      camera: "",
      battery: "",
      image_url: "",
    });
    setIsAdding(false);
    refetch();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('mobile_products')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete mobile product",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Mobile product deleted successfully",
    });
    refetch();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mobile Products</h2>
        <Button onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? "Cancel" : "Add New Product"}
        </Button>
      </div>

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Mobile Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <FormLabel>Name</FormLabel>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  required
                />
              </div>

              <ImageUpload onChange={handleImageUpload} />

              <div>
                <FormLabel>Display Specifications</FormLabel>
                <Input
                  value={formData.display_specs}
                  onChange={(e) => setFormData(prev => ({ ...prev, display_specs: e.target.value }))}
                  required
                />
              </div>

              <div>
                <FormLabel>Processor</FormLabel>
                <Input
                  value={formData.processor}
                  onChange={(e) => setFormData(prev => ({ ...prev, processor: e.target.value }))}
                  required
                />
              </div>

              <div>
                <FormLabel>Camera</FormLabel>
                <Input
                  value={formData.camera}
                  onChange={(e) => setFormData(prev => ({ ...prev, camera: e.target.value }))}
                  required
                />
              </div>

              <div>
                <FormLabel>Battery</FormLabel>
                <Input
                  value={formData.battery}
                  onChange={(e) => setFormData(prev => ({ ...prev, battery: e.target.value }))}
                  required
                />
              </div>

              <Button type="submit">Add Product</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{product.name}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-4 rounded-md"
                />
              )}
              <div className="space-y-2">
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Display:</strong> {product.display_specs}</p>
                <p><strong>Processor:</strong> {product.processor}</p>
                <p><strong>Camera:</strong> {product.camera}</p>
                <p><strong>Battery:</strong> {product.battery}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}