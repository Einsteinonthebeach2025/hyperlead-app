const PlanTypes = ({ pricingMode, setPricingMode }) => {
  return (
    <div className="relative flex gap-2 md:mb-4 bg-neutral-200 dark:bg-blue-300/30 p-1 rounded-full *:cursor-pointer">
      <button
        className={`
          relative z-[3] px-4 py-2 rounded-full transition-all duration-200
          ${pricingMode === "monthly"
            ? "bg-white shadow-lg text-neutral-900 "
            : "bg-transparent text-neutral-500 dark:text-neutral-300"}
        `}
        style={pricingMode === "monthly" ? { boxShadow: "0 2px 8px rgba(0,0,0,0.08)" } : {}}
        onClick={() => setPricingMode("monthly")}
      >
        Monthly
      </button>
      <button
        className={`
          relative z-[3] px-4 py-2 rounded-full transition-all duration-200
          ${pricingMode === "annual"
            ? "bg-white shadow-lg text-neutral-900 "
            : "bg-transparent text-neutral-500 dark:text-neutral-300"}
        `}
        style={pricingMode === "annual" ? { boxShadow: "0 2px 8px rgba(0,0,0,0.08)" } : {}}
        onClick={() => setPricingMode("annual")}
      >
        Annual <span className="ml-1 text-xs text-blue-500 font-semibold">SAVE 20%</span>
      </button>
    </div>
  );
};

export default PlanTypes