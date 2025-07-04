"use client";
import Image from "next/image";
import { FaImages } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import { useState, useCallback, memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, updateUserProfile } from "app/features/userSlice";
import { uploadAvatar } from "app/lib/actions/profileActions";
import { setError } from "app/features/modalSlice";
import Spinner from "app/components/Spinner";

const UPLOAD_TIMEOUT = 30000;

const ProfileAvatar = memo(({ profile: initialProfile = {}, userId }) => {
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const [localProfile, setLocalProfile] = useState(initialProfile);
  const user = useSelector(selectUser);
  const uploadTimeoutRef = useRef(null);

  useEffect(() => {
    if (user?.profile?.avatar_url) {
      setLocalProfile((prev) => ({
        ...prev,
        avatar_url: user.profile.avatar_url,
      }));
    }
  }, [user?.profile?.avatar_url]);

  useEffect(() => {
    return () => {
      if (uploadTimeoutRef.current) {
        clearTimeout(uploadTimeoutRef.current);
      }
    };
  }, []);

  const handleAvatarChange = useCallback(
    async (e) => {
      try {
        const file = e.target.files?.[0];
        if (!file) return;
        const MAX_FILE_SIZE = 500 * 1024;
        if (file.size > MAX_FILE_SIZE) {
          dispatch(setError("Image size should not exceed 500KB"));
          e.target.value = "";
          return;
        }
        setUploading(true);
        uploadTimeoutRef.current = setTimeout(() => {
          setUploading(false);
          dispatch(setError("Upload timed out. Please try again."));
        }, UPLOAD_TIMEOUT);
        const { success, avatar_url, error } = await uploadAvatar(userId, file);
        if (uploadTimeoutRef.current) {
          clearTimeout(uploadTimeoutRef.current);
        }
        if (!success || error) {
          dispatch(setError(error || "Failed to upload avatar"));
          return;
        }
        dispatch(updateUserProfile({ avatar_url }));
        dispatch(
          setError({
            type: "success",
            message: "Profile picture uploaded successfully!",
          })
        );
      } catch (error) {
        dispatch(setError("Something went wrong uploading your avatar."));
      } finally {
        setUploading(false);
        e.target.value = "";
      }
    },
    [dispatch, userId]
  );


  return (
    <div className="w-44 h-44 rounded-xl p-3 bg-stone-300/80 backdrop-blur-3xl mb-3">
      <div className="relative w-full h-full center rounded-xl overflow-hidden text-neutral-500">
        {localProfile?.avatar_url ? (
          <Image
            className="object-cover"
            src={localProfile.avatar_url}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            alt="user-avatar"
          />
        ) : (
          <FaImages size={100} />
        )}
        {uploading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>
      <label className="bg-blue-700 hover:bg-blue-800 transition-all cursor-pointer text-white w-fit rounded-xl -right-2 -bottom-2 absolute center p-2">
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleAvatarChange}
          disabled={uploading}
        />
        {uploading ? <Spinner /> : <IoCameraOutline size={23} />}
      </label>
    </div>
  );
});

export default ProfileAvatar;
