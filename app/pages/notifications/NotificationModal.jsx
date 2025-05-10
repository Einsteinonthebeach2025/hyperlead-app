import CardContainer from "app/components/containers/CardContainer";
import MotionContainer from "app/components/containers/MotionContainer";
import { AnimatePresence } from "framer-motion";

const NotificationModal = ({ isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <MotionContainer animation="bottom">
          <CardContainer className="absolute shadow-md top-14 right-0 w-64 h-64 bg-sky-400">
            NotificationModal
          </CardContainer>
        </MotionContainer>
      )}
    </AnimatePresence>
  );
};

export default NotificationModal;
