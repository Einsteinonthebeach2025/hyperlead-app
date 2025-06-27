'use client';

import { FaRegStar, FaStar } from "react-icons/fa";
import { addLeadToFavorites, removeLeadFromFavorites } from "app/lib/actions/leadActions";
import { useSelector } from "react-redux";
import { selectUser } from "app/features/userSlice";
import { useState, useEffect } from "react";
import Spinner from "../Spinner";
import HoverModal from "../modals/HoverModal";
import { useToggleLocal } from "app/hooks/useToggleLocal";
import FlexBox from "../containers/FlexBox";

const AddToFavorite = ({ lead }) => {
  const user = useSelector(selectUser);
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isOpen, toggleState } = useToggleLocal();

  useEffect(() => {
    if (user?.profile?.favorite_leads?.includes(lead.id)) {
      setIsFavorited(true);
    }
    setLoading(false);
  }, [user, lead.id]);

  const handleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (isFavorited) {
        await removeLeadFromFavorites(lead.id);
        setIsFavorited(false);
      } else {
        await addLeadToFavorites(lead.id);
        setIsFavorited(true);
      }
    } catch (err) {
      console.log("Favorite toggle error:", err);
    }
  };

  if (loading) return <Spinner />;

  return (
    <>
      <FlexBox
        onMouseEnter={() => toggleState(true)}
        onMouseLeave={() => toggleState(false)}
        onClick={handleFavorite}
        className="text-violet-600 dark:text-violet-400 relative p-2 bg-violet-200/50 dark:bg-violet-500/50 duration-300 hover:bg-violet-200 rounded-lg cursor-pointer"
      >
        {isFavorited ? <FaStar size={20} /> : <FaRegStar size={20} />}
      </FlexBox>
      <HoverModal
        isOpen={isOpen}
        className="right-10 -top-2 w-28"
        text={isFavorited ? "Remove from favorites" : "Add to favorites"}
      />
    </>
  );
};

export default AddToFavorite;
