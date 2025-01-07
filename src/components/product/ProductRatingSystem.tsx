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
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`text-2xl ${
              interactive ? "cursor-pointer" : "cursor-default"
            } ${
              star <= (interactive ? hoveredRating || selectedRating : rating)
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
            onMouseEnter={() => interactive && setHoveredRating(star)}
            onMouseLeave={() => interactive && setHoveredRating(0)}
            onClick={() => interactive && setSelectedRating(star)}
            disabled={!interactive}
          >
            <Star className="w-6 h-6" />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Rating Statistics */}
      {ratingStats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 bg-white rounded-lg shadow-sm">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">
              {ratingStats.average_rating}
            </div>
            <div className="mt-2">{renderStars(ratingStats.average_rating)}</div>
            <div className="text-sm text-gray-500 mt-2">
              Based on {ratingStats.total_ratings} ratings
            </div>
          </div>

          <div className="col-span-2 space-y-2">
            {[5, 4, 3, 2, 1].map((stars, index) => (
              <div key={stars} className="flex items-center gap-4">
                <span className="w-12 text-sm text-gray-600">
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
                  className="h-2"
                />
                <span className="w-12 text-sm text-gray-600">
                  {ratingStats.rating_distribution[index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rating Input */}
      <div className="p-6 bg-white rounded-lg shadow-sm space-y-4">
        <h3 className="text-lg font-semibold">Rate this product</h3>
        <div className="flex flex-col items-center gap-4">
          {renderStars(selectedRating, true)}
          <Textarea
            placeholder="Write your review (optional)"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full mt-4"
          />
          <Button onClick={handleRatingSubmit} className="w-full md:w-auto">
            Submit Rating & Review
          </Button>
        </div>
      </div>
    </div>
  );
}