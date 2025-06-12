import { AnimatePresence } from "framer-motion";
import CardContainer from "app/components/containers/CardContainer";
import MotionContainer from "app/components/containers/MotionContainer";
import SubTitle from "app/components/SubTitle";
import NotificationList from "./NotificationList";
import ModalButtons from "./ModalButtons";

const NotificationModal = ({ isOpen, data, refresh, handleClick }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <MotionContainer animation="bottom">
          <CardContainer onMouseleave={handleClick} className="absolute shadow-md dark:shadow-stone-700 flex flex-col justify-between top-14 -right-20 lg:right-0 w-90 lg:w-[400px] space-y-2">
            <SubTitle>Notifications</SubTitle>
            <NotificationList data={data} />
            <ModalButtons refresh={refresh} />
          </CardContainer>
        </MotionContainer>
      )}
    </AnimatePresence>
  );
};

export default NotificationModal;
