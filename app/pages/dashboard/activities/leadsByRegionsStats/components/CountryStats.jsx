import { motion } from "framer-motion";
import { CountryFlags } from "app/components/CountryFlags";

const CountryStats = ({ sortedData, total }) => {
  return (
    <div>
      {sortedData.slice(0, 5).map((item, idx) => {
        const percent = total ? ((item.count / total) * 100).toFixed(0) : 0;
        return (
          <div key={item.country} className="flex items-center gap-4 space-y-2">
            <CountryFlags countryName={item.country} />
            <div className="flex-1">
              <div className="font-semibold">{item.country}</div>
              <div className="text-[10px] text-neutral-500">
                {item.count} Leads
              </div>
              <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className="absolute left-0 top-0 h-full bg-blue-500 rounded-full"
                />
              </div>
            </div>
            <div className="w-12 text-right font-semibold text-neutral-700">
              {percent}%
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CountryStats;
