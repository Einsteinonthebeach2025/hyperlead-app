'use client';

import { FaRegStar, FaStar } from "react-icons/fa";
import { addLeadToFavorites, removeLeadFromFavorites } from "app/lib/actions/leadActions";
import { useSelector } from "react-redux";
import { selectUser } from "app/features/userSlice";
import { useState, useEffect } from "react";
import Spinner from "../Spinner";

const AddToFavorite = ({ lead }) => {
  const user = useSelector(selectUser);
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);

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
    <div className="text-blue-600 cursor-pointer" onClick={handleFavorite}>
      {isFavorited ? <FaStar size={20} /> : <FaRegStar size={20} />}
    </div>
  );
};

export default AddToFavorite;
