import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

interface ProductRatingSystemProps {
  productId: string;
}

interface RatingStats {
  average_rating: number;
  total_ratings: number;
  rating_distribution: number[];
}

export function ProductRatingSystem({ productId }: ProductRatingSystemProps) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [review, setReview] = useState("");
  const [ratingStats, setRatingStats] = useState<RatingStats | null>(null);
  const { toast } = useToast();

  const fetchRatingStats = async () => {
    const { data, error } = await supabase
      .rpc('calculate_product_rating', { p_id: productId });

    if (error) {
      console.error('Error fetching rating stats:', error);
      return;
    }

    if (data && data.length > 0) {
      setRatingStats(data[0]);
    }
  };

  useEffect(() => {
    fetchRatingStats();
  }, [productId]);

  const handleRatingSubmit = async () => {
    if (!selectedRating) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting",
        variant: "destructive",
      });
      return;
    }

    const { error: ratingError } = await supabase
      .from('product_ratings')
      .insert({
        product_id: productId,
        rating: selectedRating,
      });

    if (ratingError) {
      toast({
        title: "Error",
        description: "Failed to submit rating. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (review.trim()) {
      const { error: reviewError } = await supabase
        .from('product_reviews')
        .insert({
          product_id: productId,
          rating: selectedRating,
          review_text: review,
          user_name: "Anonymous" // Replace with actual user name when auth is implemented
        });

      if (reviewError) {
        toast({
          title: "Error",
          description: "Failed to submit review. Please try again.",
          variant: "destructive",
        });
        return;
      }
    }

    toast({
      title: "Success",
      description: "Thank you for your rating and review!",
    });

    setSelectedRating(0);
    setReview("");
    fetchRatingStats();
  };

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`transition-all duration-200 ${
              interactive ? "cursor-pointer hover:scale-110" : "cursor-default"
            } ${
              star <= (interactive ? hoveredRating || selectedRating : rating)
                ? "text-yellow-400"
                : "text-gray-200"
            }`}
            onMouseEnter={() => interactive && setHoveredRating(star)}
            onMouseLeave={() => interactive && setHoveredRating(0)}
            onClick={() => interactive && setSelectedRating(star)}
            disabled={!interactive}
          >
            <Star className="w-7 h-7" />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Rating Statistics */}
      {ratingStats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-white rounded-xl shadow-md border border-gray-100">
          <div className="flex flex-col items-center justify-center space-y-3 p-4 bg-primary/5 rounded-lg">
            <div className="text-5xl font-bold text-primary">
              {ratingStats.average_rating}
            </div>
            <div className="mt-2">{renderStars(ratingStats.average_rating)}</div>
            <div className="text-sm text-gray-600 font-medium">
              Based on {ratingStats.total_ratings} ratings
            </div>
          </div>

          <div className="col-span-2 space-y-4 p-4">
            {[5, 4, 3, 2, 1].map((stars, index) => (
              <div key={stars} className="flex items-center gap-4">
                <span className="w-16 text-sm font-medium text-gray-600">
                  {stars} stars
                </span>
                <Progress
                  value={
                    ratingStats.total_ratings > 0
                      ? (ratingStats.rating_distribution[index] /
                          ratingStats.total_ratings) *
                        100
                      : 0
                  }
                  className="h-2.5 flex-1"
                />
                <span className="w-12 text-sm text-gray-600 font-medium">
                  {ratingStats.rating_distribution[index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rating Input */}
      <div className="p-8 bg-white rounded-xl shadow-md border border-gray-100 space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 text-center">
          Rate this product
        </h3>
        <div className="flex flex-col items-center gap-6">
          {renderStars(selectedRating, true)}
          <Textarea
            placeholder="Write your review (optional)"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full min-h-[120px] resize-none border-gray-200 focus:border-primary"
          />
          <Button 
            onClick={handleRatingSubmit}
            className="w-full md:w-auto min-w-[200px] bg-primary hover:bg-primary/90 text-white"
          >
            Submit Rating & Review
          </Button>
        </div>
      </div>
    </div>
  );
}