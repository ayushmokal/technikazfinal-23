import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { expertReviewSchema } from "@/schemas/productSchemas";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ExpertReviewFormProps {
  productId: string;
  className?: string;
}

export function ExpertReviewForm({ productId, className }: ExpertReviewFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [pros, setPros] = useState<string[]>(['']);
  const [cons, setCons] = useState<string[]>(['']);

  const form = useForm({
    resolver: zodResolver(expertReviewSchema),
    defaultValues: {
      product_id: productId,
      rating: 0,
      author: "",
      summary: "",
      pros: [],
      cons: [],
      verdict: "",
    },
  });

  const addPro = () => setPros([...pros, '']);
  const addCon = () => setCons([...cons, '']);

  const removePro = (index: number) => {
    const newPros = pros.filter((_, i) => i !== index);
    setPros(newPros);
  };

  const removeCon = (index: number) => {
    const newCons = cons.filter((_, i) => i !== index);
    setCons(newCons);
  };

  const handleProChange = (index: number, value: string) => {
    const newPros = [...pros];
    newPros[index] = value;
    setPros(newPros);
    form.setValue('pros', newPros.filter(pro => pro.trim() !== ''));
  };

  const handleConChange = (index: number, value: string) => {
    const newCons = [...cons];
    newCons[index] = value;
    setCons(newCons);
    form.setValue('cons', newCons.filter(con => con.trim() !== ''));
  };

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('expert_reviews')
        .insert([{
          ...data,
          pros: pros.filter(pro => pro.trim() !== ''),
          cons: cons.filter(con => con.trim() !== '')
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Expert review added successfully",
      });

      form.reset();
      setPros(['']);
      setCons(['']);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to add expert review",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-6", className)}>
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter author name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating (0-10)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="0" 
                  max="10" 
                  step="0.1"
                  placeholder="Enter rating" 
                  {...field}
                  onChange={e => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter review summary"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel>Pros</FormLabel>
          {pros.map((pro, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={pro}
                onChange={(e) => handleProChange(index, e.target.value)}
                placeholder="Enter a pro"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => removePro(index)}
                disabled={pros.length === 1}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addPro}>
            Add Pro
          </Button>
        </div>

        <div className="space-y-4">
          <FormLabel>Cons</FormLabel>
          {cons.map((con, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={con}
                onChange={(e) => handleConChange(index, e.target.value)}
                placeholder="Enter a con"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => removeCon(index)}
                disabled={cons.length === 1}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addCon}>
            Add Con
          </Button>
        </div>

        <FormField
          control={form.control}
          name="verdict"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verdict</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter final verdict"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Expert Review"}
        </Button>
      </form>
    </Form>
  );
}