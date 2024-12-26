import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ArticleMetricsProps {
  blogId: string;
  viewCount: number;
  shareCount: number;
}

export function ArticleMetrics({ blogId, viewCount, shareCount }: ArticleMetricsProps) {
  const { toast } = useToast();

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
        
        // Increment share count in database
        await supabase.rpc('increment_share_count', { blog_id: blogId });
        
        toast({
          title: "Shared successfully!",
          description: "Thank you for sharing this article.",
        });
      } else {
        // Fallback for browsers that don't support native sharing
        await navigator.clipboard.writeText(window.location.href);
        
        // Increment share count in database
        await supabase.rpc('increment_share_count', { blog_id: blogId });
        
        toast({
          title: "Link copied!",
          description: "Article link has been copied to your clipboard.",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        variant: "destructive",
        title: "Error sharing article",
        description: "Please try again later.",
      });
    }
  };

  return (
    <div className="flex items-center gap-6 text-sm text-gray-600">
      <div className="flex items-center gap-2">
        <span>{viewCount}</span>
        <span>views</span>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-2 hover:text-primary"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4" />
          <span>{shareCount}</span>
        </Button>
      </div>
    </div>
  );
}