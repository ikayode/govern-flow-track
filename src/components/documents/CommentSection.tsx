
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Send } from "lucide-react";

// Mock comment data
const initialComments = [
  {
    id: "comment-1",
    userId: "3",
    userName: "Michael Brown",
    userPosition: "Legal Advisor",
    text: "Please review section 3 of the document. There are some legal implications we need to address before moving forward.",
    timestamp: new Date(Date.now() - 3600000 * 3) // 3 hours ago
  },
  {
    id: "comment-2",
    userId: "2",
    userName: "Sarah Johnson",
    userPosition: "Financial Analyst",
    text: "I've reviewed the budget allocations and they align with our fiscal year planning. Good to proceed.",
    timestamp: new Date(Date.now() - 3600000 * 24) // 1 day ago
  }
];

interface CommentSectionProps {
  documentId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ documentId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };
  
  const handleSubmitComment = async () => {
    if (!newComment.trim() || !user) return;
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newCommentObj = {
      id: `comment-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userPosition: user.position,
      text: newComment.trim(),
      timestamp: new Date()
    };
    
    setComments([newCommentObj, ...comments]);
    setNewComment("");
    setIsSubmitting(false);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="py-3 px-4 border-b">
        <h2 className="font-semibold text-gov-primary">Comments</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {comments.length === 0 ? (
          <div className="text-center text-gray-500 py-6">
            <p>No comments yet</p>
            <p className="text-sm">Be the first to add a comment</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage alt={comment.userName} />
                  <AvatarFallback className="bg-gov-accent text-white">
                    {getInitials(comment.userName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="font-medium">{comment.userName}</span>
                      <span className="text-xs text-gray-500 ml-2">
                        {comment.userPosition}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
                    </span>
                  </div>
                  <p className="mt-1 text-sm whitespace-pre-line">{comment.text}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="p-4 border-t mt-auto">
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar} alt={user?.name || ""} />
            <AvatarFallback className="bg-gov-accent text-white">
              {user ? getInitials(user.name) : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={handleKeyPress}
              className="resize-none"
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <Button
                className="bg-gov-primary hover:bg-gov-light"
                size="sm"
                onClick={handleSubmitComment}
                disabled={!newComment.trim() || isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
