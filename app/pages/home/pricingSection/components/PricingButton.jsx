"use client";
import Button from "app/components/buttons/Button";
import { setError, setToggle } from "app/features/modalSlice";
import { selectUser } from "app/features/userSlice";
import { IoMdHome } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const PricingButton = ({ item }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handlePlanSelection = () => {
    if (!user) {
      dispatch(
        setError({
          message: "Please login to subscribe to a plan",
          type: "error",
        })
      );
      return;
    }
    if (!user?.profile?.preferences?.length) {
      dispatch(
        setError({
          message: "Please set your industry preferences before subscribing",
          type: "error",
          link: "/preferences",
          title: "Go to preferences",
        })
      );
      return;
    }
    dispatch(
      setToggle({
        modalType: "paypalPayment",
        isOpen: true,
        data: { selectedPlan: item.title.toUpperCase() },
      })
    );
  };

  return (
    <Button onClick={handlePlanSelection}>
      <IoMdHome size={20} />
      <h1>Subscribe to {item.title}</h1>
    </Button>
  );
};

export default PricingButton;