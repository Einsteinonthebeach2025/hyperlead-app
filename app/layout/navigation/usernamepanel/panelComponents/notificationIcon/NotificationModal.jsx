import Button from "app/components/buttons/Button";
import CardContainer from "app/components/containers/CardContainer";
import MotionContainer from "app/components/containers/MotionContainer";
import SubTitle from "app/components/SubTitle";
import { AnimatePresence } from "framer-motion";
import NotificationList from "./NotificationList";
import ModalButtons from "./ModalButtons";

const NotificationModal = ({ isOpen, data, refresh }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <MotionContainer animation="bottom">
          <CardContainer className="absolute shadow-md flex flex-col justify-between top-14 right-0 w-96  space-y-2">
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
