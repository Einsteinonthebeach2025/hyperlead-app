"use client"
import { motion } from "framer-motion";
import { CountryFlags } from "app/components/CountryFlags";
import SubTitle from "app/components/SubTitle";
import SpanText from "app/components/SpanText";

const CountryStats = ({ data, total }) => {
  return (
    <div>
      {data.slice(0, 6).map((item, idx) => {
        const percent = total ? ((item.count / total) * 100).toFixed(0) : 0;
        return (
          <div key={item.country} className="flex items-center gap-4 space-y-2">
            <CountryFlags countryName={item.country} />
            <div className="flex-1">
              <SubTitle>{item.country}</SubTitle>
              <SpanText>
                {item.count} Leads
              </SpanText>
              <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className="absolute left-0 top-0 h-full bg-blue-500 dark:bg-blue-800 rounded-full"
                />
              </div>
            </div>
            <SubTitle className="w-12 text-right font-semibold">
              {percent}%
            </SubTitle>
          </div>
        );
      })}
    </div>
  );
};

export default CountryStats;
