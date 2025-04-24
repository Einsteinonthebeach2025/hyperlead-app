"use client";
import Image from "next/image";
import { useState } from "react";
import WallpapersPalette from "./WallpapersPalette";
import { useSelector, useDispatch } from "react-redux";
import EditWallpaperBtn from "./EditWallpaperBtn";
import { updateWallpaper } from "app/lib/actions/profileActions";
import { setError } from "app/features/modalSlice";
import { selectUser, updateUserProfile } from "app/features/userSlice";
import { useToggleLocal } from "app/hooks/useToggleLocal";
import profileWallpapers from "app/localDB/profileWallpapers";

const BackgroundWallpaper = ({ profile }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { isOpen: isModalOpen, toggleState: setIsModalOpen } =
    useToggleLocal(false);
  const [selectedWallpaper, setSelectedWallpaper] = useState(
    user?.profile?.wallpaper_url ||
      profile?.wallpaper_url ||
      profileWallpapers[0]
  );

  const handleWallpaperChange = async (wallpaperUrl) => {
    try {
      const { success, error } = await updateWallpaper(user.id, wallpaperUrl);
      if (!success) {
        dispatch(setError(error || "Failed to update wallpaper"));
        return;
      }
      setSelectedWallpaper(wallpaperUrl);
      dispatch(updateUserProfile({ wallpaper_url: wallpaperUrl }));
      dispatch(
        setError({
          type: "success",
          message: "Wallpaper updated successfully!",
        })
      );
    } catch (error) {
      dispatch(setError("Something went wrong updating your wallpaper."));
    }
  };

  return (
    <div className="relative w-full h-80 rounded-xl overflow-hidden">
      <div className="relative w-full h-full">
        <Image
          fill
          priority
          quality={85}
          src={selectedWallpaper}
          alt="Profile wallpaper"
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />
      </div>
      <EditWallpaperBtn setIsModalOpen={setIsModalOpen} />
      <WallpapersPalette
        isModalOpen={isModalOpen}
        profileWallpapers={profileWallpapers}
        setIsModalOpen={setIsModalOpen}
        selectedWallpaper={selectedWallpaper}
        setSelectedWallpaper={handleWallpaperChange}
      />
    </div>
  );
};

export default BackgroundWallpaper;
