const PlanTypes = ({ pricingMode, setPricingMode }) => {
  return (
    <div className="flex gap-2 md:mb-4 rounded-full p-1 *:cursor-pointer bg-neutral-200 dark:bg-blue-300/30">
      <button
        className={`px-4 py-2 rounded-full ${pricingMode === "monthly" ? "bg-neutral-900 text-white" : "bg-neutral-100 dark:text-white dark:bg-[#1d2939]"}`}
        onClick={() => setPricingMode("monthly")}
      >
        Monthly
      </button>
      <button
        className={`px-4 py-2 rounded-full  ${pricingMode === "annual" ? "bg-neutral-900 text-white" : "bg-neutral-100 dark:text-white dark:bg-[#1d2939]"}`}
        onClick={() => setPricingMode("annual")}
      >
        Annual <span className="ml-1 text-xs text-purple-600 font-semibold">SAVE 20%</span>
      </button>
    </div>
  )
}

export default PlanTypes