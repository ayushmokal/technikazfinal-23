import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Star, StarHalf } from "lucide-react";

interface Comment {
  id: string;
  blog_id: string;
  content: string;
  user_name: string;
  parent_id: string | null;
  upvotes: number;
  created_at: string;
  updated_at: string;
}

interface RatingStats {
  rating: number;
  count: number;
}

export function ProductComments({ productId }: { productId: string }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const { toast } = useToast();

  const { data: comments, refetch } = useQuery({
    queryKey: ["comments", productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("blog_id", productId)
        .order("created_at", { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load comments",
        });
        throw error;
      }

      return data as Comment[];
    },
  });

  const { data: ratingStats } = useQuery({
    queryKey: ["ratings", productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_reviews")
        .select("rating")
        .eq("product_id", productId);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load ratings",
        });
        throw error;
      }

      const stats: RatingStats[] = Array.from({ length: 5 }, (_, i) => ({
        rating: i + 1,
        count: data.filter(r => r.rating === i + 1).length
      }));

      const totalRatings = data.length;
      const averageRating = totalRatings > 0 
        ? data.reduce((acc, curr) => acc + curr.rating, 0) / totalRatings 
        : 0;

      return {
        stats,
        totalRatings,
        averageRating: Number(averageRating.toFixed(1))
      };
    },
  });

  const handleSubmitReview = async () => {
    if (!rating) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a rating",
      });
      return;
    }

    if (!comment.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a review",
      });
      return;
    }

    const { error } = await supabase.from("product_reviews").insert({
      product_id: productId,
      rating,
      review_text: comment,
      user_name: "Anonymous", // Replace with actual user name when auth is implemented
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to post review",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Review posted successfully",
    });
    setComment("");
    setRating(0);
    refetch();
  };

  const maxRatingCount = Math.max(...(ratingStats?.stats.map(s => s.count) || []));

  return (
    <div className="space-y-8">
      {/* Rating Summary Section */}
      <div className="grid grid-cols-3 gap-4 p-6 border rounded-lg bg-white">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-2xl font-bold mb-1">{ratingStats?.averageRating || 0}</h3>
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= (ratingStats?.averageRating || 0)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">
            Based on {ratingStats?.totalRatings || 0} rating(s)
          </p>
        </div>

        <div className="col-span-2">
          {ratingStats?.stats.slice().reverse().map((stat) => (
            <div key={stat.rating} className="flex items-center gap-2 mb-2">
              <span className="text-sm w-12">{stat.rating} stars</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400"
                  style={{
                    width: `${maxRatingCount ? (stat.count / maxRatingCount) * 100 : 0}%`,
                  }}
                />
              </div>
              <span className="text-sm w-12 text-right">{stat.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Form */}
      <div className="space-y-4 border rounded-lg p-6 bg-white">
        <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-6 h-6 cursor-pointer transition-colors ${
                star <= (hoveredRating || rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        <Textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[100px]"
        />
        <Button onClick={handleSubmitReview}>Post Review</Button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {comments?.map((comment: Comment) => (
          <div key={comment.id} className="border rounded-lg p-4 bg-white">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{comment.user_name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(comment.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="mt-2">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}