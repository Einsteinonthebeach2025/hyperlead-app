import { motion } from "framer-motion";

const Dot = ({ hasUnread }) => {
  return (
    <>
      {hasUnread && (
        <div className="absolute top-1 right-0 w-2 h-2 rounded-full bg-amber-500 cursor-pointer">
          <motion.div
            className="absolute w-full h-full rounded-full bg-amber-500"
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: [1, 1.7, 1], opacity: [0.6] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeIn",
            }}
          />
        </div>
      )}
    </>
  );
};

export default Dot;
