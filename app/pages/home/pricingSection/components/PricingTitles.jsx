import Button from "app/components/buttons/Button";
import Title from "app/components/Title";

const PricingTitle = ({ item }) => {
  if (!item) {
    return null;
  }
  return (
    <div>
      <div className="relative mb-4">
        <div className="absolute right-0 top-0">
          {item.color && <Button type="blue">Most Popular</Button>}
        </div>
        <Title>{item.title}</Title>
      </div>
      <span className="text-neutral-700">{item.desc}</span>
      <h1 className="text-3xl md:text-6xl font-semibold">{item.price}$</h1>
    </div>
  );
};

export default PricingTitle;
