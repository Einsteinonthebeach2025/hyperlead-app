import Button from "app/components/buttons/Button";
import { IoMdHome } from "react-icons/io";

const PricingButton = ({ item }) => {
  if (!item) {
    return null;
  }

  return (
    <Button type={item.color ? "primary" : "secondary"}>
      <IoMdHome size={20} />
      <h1>Activate HyperLead</h1>
    </Button>
  );
};

export default PricingButton;
