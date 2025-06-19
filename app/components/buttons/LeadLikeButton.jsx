"use client"
import { likeLead } from "app/lib/actions/leadActions";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUser } from "app/features/userSlice";
import { useEffect, useState } from "react";
import { useToggleLocal } from "app/hooks/useToggleLocal";
import HoverModal from "../modals/HoverModal";
import FlexBox from "../containers/FlexBox";

const LeadLikeButton = ({ lead, onLeadLikeChange }) => {
  const user = useSelector(selectUser);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, toggleState } = useToggleLocal();

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
    <>
      <FlexBox
        onMouseEnter={() => toggleState(true)}
        onMouseLeave={() => toggleState(false)}
        onClick={(e) => handleLike(lead.id, e)}
        className={`text-blue-600 cursor-pointer ${isLoading ? 'opacity-50' : ''}`}
      >
        {hasLiked ? (
          <FaHeart size={18} />
        ) : (
          <FaRegHeart size={18} />
        )}
      </FlexBox>
      <HoverModal
        isOpen={isOpen}
        className="right-10 -top-4"
        text={hasLiked ? "Unlike" : "Like"}
      />
    </>
  );
};

export default LeadLikeButton;
