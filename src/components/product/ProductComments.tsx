import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";

interface Comment {
  id: string;
  user_name: string;
  content: string;
  parent_id: string | null;
  upvotes: number;
  created_at: string;
}

interface ProductCommentsProps {
  productId: string;
}

export function ProductComments({ productId }: ProductCommentsProps) {
  const [comment, setComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: comments = [] } = useQuery({
    queryKey: ["comments", productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("blog_id", productId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Comment[];
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: async (newComment: { content: string; parent_id: string | null }) => {
      const { data, error } = await supabase.from("comments").insert([
        {
          blog_id: productId,
          user_name: "Anonymous User", // You can replace this with actual user name when auth is implemented
          content: newComment.content,
          parent_id: newComment.parent_id,
        },
      ]);

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", productId] });
      setComment("");
      setReplyTo(null);
      toast({
        title: "Success",
        description: "Your comment has been posted",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to post your comment",
      });
    },
  });

  const upvoteCommentMutation = useMutation({
    mutationFn: async (commentId: string) => {
      const { data, error } = await supabase
        .from("comments")
        .update({ upvotes: comments.find(c => c.id === commentId)!.upvotes + 1 })
        .eq("id", commentId);

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", productId] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addCommentMutation.mutate({
      content: comment,
      parent_id: replyTo,
    });
  };

  const renderComments = (parentId: string | null = null) => {
    const filteredComments = comments.filter(c => c.parent_id === parentId);

    return filteredComments.map((comment) => (
      <div key={comment.id} className="space-y-4">
        <div className="flex gap-4 items-start bg-secondary/20 rounded-lg p-4">
          <Avatar>
            <AvatarFallback>{comment.user_name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{comment.user_name}</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(comment.created_at), "MMM d, yyyy 'at' h:mm a")}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
                onClick={() => upvoteCommentMutation.mutate(comment.id)}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                {comment.upvotes}
              </Button>
            </div>
            <p className="text-sm">{comment.content}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
              className="text-muted-foreground hover:text-primary"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              Reply
            </Button>
          </div>
        </div>
        {replyTo === comment.id && (
          <div className="ml-12">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="Write a reply..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setReplyTo(null)}
                >
                  Cancel
                </Button>
                <Button type="submit">Reply</Button>
              </div>
            </form>
          </div>
        )}
        <div className="ml-12">
          {renderComments(comment.id)}
        </div>
      </div>
    ));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-end">
            <Button type="submit">Post Comment</Button>
          </div>
        </form>
      </div>

      <div className="space-y-6">
        {renderComments()}
      </div>
    </div>
  );
}