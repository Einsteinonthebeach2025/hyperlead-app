"use client";
import Close from "app/components/buttons/Close";
import FlexBox from "app/components/containers/FlexBox";
import FormContainer from "app/components/containers/FormContainer";
import MotionContainer from "app/components/containers/MotionContainer";
import Paragraph from "app/components/Paragraph";
import Title from "app/components/Title";
import { setError } from "app/features/modalSlice";
import { selectUser, updateUserProfile } from "app/features/userSlice";
import { updateWallpaper } from "app/lib/actions/profileActions";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

const WallpapersPalette = ({
  isModalOpen,
  setIsModalOpen,
  profileWallpapers,
  setSelectedWallpaper,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleWallpaperSelect = async (wallpaper) => {
    try {
      const wallpaperSrc =
        typeof wallpaper === "object" ? wallpaper.src : wallpaper;
      const { success, error } = await updateWallpaper(user.id, wallpaperSrc);

      if (!success) {
        dispatch(setError(error || "Failed to update wallpaper"));
        return;
      }

      setSelectedWallpaper(wallpaperSrc);
      dispatch(updateUserProfile({ wallpaper_url: wallpaperSrc }));
      dispatch(
        setError({
          type: "success",
          message: "Wallpaper updated successfully!",
        })
      );
      setIsModalOpen(false);
    } catch (error) {
      dispatch(setError("Failed to update wallpaper. Please try again."));
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <MotionContainer
          animation="fade-in"
          className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50"
        >
          <FormContainer className="w-full lg:w-[65%]">
            <FlexBox type="row-between" className="w-full">
              <FlexBox type="column-start">
                <Title>Choose Your Wallpaper</Title>
                <Paragraph>
                  Wallpaper palette will be updated overtime
                </Paragraph>
              </FlexBox>
              <Close onClick={() => setIsModalOpen(false)} />
            </FlexBox>
            <div className="w-full grid grid-cols-5 gap-4">
              {profileWallpapers?.map((item, index) => {
                return (
                  <div
                    onClick={() => handleWallpaperSelect(item)}
                    className="relative z-[5] brightness-90 hover:brightness-100 duration-300 aspect-video rounded-lg overflow-hidden cursor-pointer"
                    key={index}
                  >
                    <Image
                      src={item}
                      alt={`Wallpaper ${index + 1}`}
                      className="object-cover w-full h-full"
                      quality={85}
                      width={300}
                      height={300}
                    />
                  </div>
                );
              })}
            </div>
          </FormContainer>
        </MotionContainer>
      )}
    </AnimatePresence>
  );
};

export default WallpapersPalette;
