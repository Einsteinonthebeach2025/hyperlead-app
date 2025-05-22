"use client";
import { motion } from "framer-motion";
import { useToggleLocal } from "app/hooks/useToggleLocal";
import { IoMdNotifications } from "react-icons/io";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "app/features/userSlice";
import NotificationModal from "app/layout/navigation/usernamepanel/panelComponents/notificationIcon/NotificationModal";
import supabase from "app/lib/config/supabaseClient";
import Dot from "./Dot";

const NotificationsIcon = () => {
  const user = useSelector(selectUser);
  const { isOpen, toggleState } = useToggleLocal(false);
  const [notifications, setNotifications] = useState([]);
  const [animateKey, setAnimateKey] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    toggleState(!isOpen);
    setAnimateKey((prev) => prev + 1);
  };

  const fetchNotifications = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("notifications")
      .select("importance, read, message, id, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10);
    if (error) {
      console.error("Error fetching notifications:", error);
    } else {
      setNotifications(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user?.id) return;
    fetchNotifications();
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;
    const channel = supabase
      .channel("notifications-insertion")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.new.read === false) {
            setNotifications((prev) => [payload.new, ...prev]);
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  const hasUnread = notifications.some((n) => n.read === false);

  return (
    <div
      onClick={handleClick}
      className="border relative p-2 mr-2 rounded-full border-neutral-300 text-neutral-600 hover:text-neutral-900 duration-300 "
    >
      <motion.div
        key={animateKey}
        animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="cursor-pointer"
      >
        <IoMdNotifications size={23} />
      </motion.div>
      <Dot hasUnread={hasUnread} />
      <NotificationModal
        isOpen={isOpen}
        data={notifications}
        refresh={fetchNotifications}
        handleClick={handleClick}
      />
    </div>
  );
};

export default NotificationsIcon;
