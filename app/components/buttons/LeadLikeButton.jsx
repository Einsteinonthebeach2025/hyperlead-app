"use client"
import { likeLead } from "app/lib/actions/leadActions";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectUser } from "app/features/userSlice";
import { useEffect, useState } from "react";

const LeadLikeButton = ({ lead, onLeadLikeChange }) => {
  const user = useSelector(selectUser);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const hasLiked = isClient && user?.id && (lead.likes || []).includes(user?.id);

  const handleLike = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user?.id || isLoading) return;

    setIsLoading(true);
    try {
      const result = await likeLead(id);
      if (result && result.likes) {
        onLeadLikeChange(id, result.likes);
      }
    } catch (err) {
      console.error("Error liking lead:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) {
    return <div className="text-blue-600 w-5 h-5" />;
  }

  return (
    <div
      onClick={(e) => handleLike(lead.id, e)}
      className={`text-blue-600 cursor-pointer ${isLoading ? 'opacity-50' : ''}`}
    >
      {hasLiked ? (
        <AiFillLike size={20} />
      ) : (
        <AiOutlineLike size={20} />
      )}
    </div>
  );
};

export default LeadLikeButton;
