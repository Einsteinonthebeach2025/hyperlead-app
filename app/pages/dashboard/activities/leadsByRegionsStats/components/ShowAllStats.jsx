import Close from "app/components/buttons/Close";
import MotionContainer from "app/components/containers/MotionContainer";
import SpanContainer from "app/components/containers/SpanContainer";
import { CountryFlags } from "app/components/CountryFlags";
import { AnimatePresence, motion } from "framer-motion";

const ShowAllStats = ({ data, isOpen, handleShowAll }) => {
  if (!data || data.length === 0) return <div>No data available</div>;
  const total = data.reduce((sum, item) => sum + item.count, 0);
  const sortedData = [...data].sort((a, b) => b.count - a.count);
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <MotionContainer
            animation="fade-in"
            className="absolute inset-0 bg-blue-500/70 backdrop-blur-[2px] p-5 space-y-5"
          >
            <Close type="light" onClick={handleShowAll} />
            <div className="grid grid-cols-4 gap-4">
              {sortedData.map((item) => {
                const percent = total
                  ? ((item.count / total) * 100).toFixed(0)
                  : 0;
                return (
                  <SpanContainer
                    color="green"
                    key={item.country}
                    className="flex items-center flex-col rounded-lg pointer-events-none"
                  >
                    <CountryFlags countryName={item.country} />
                    <span className="text-[10px]">{item.country}</span>
                    <span className=" font-semibold text-neutral-700 text-sm">
                      {percent}%
                    </span>
                  </SpanContainer>
                );
              })}
            </div>
          </MotionContainer>
        )}
      </AnimatePresence>
    </>
  );
};

export default ShowAllStats;
