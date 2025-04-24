"use client";
import { useSelector } from "react-redux";
import Plans from "./pricing/Plans";
import Notice from "./plansNotice/Notice";
import { selectUser } from "app/features/userSlice";

const Subscription = () => {
  const user = useSelector(selectUser);
  const plan = user?.profile?.subscription;

  return <div className="h-screen">{plan ? <Notice /> : <Plans />}</div>;
};

export default Subscription;
