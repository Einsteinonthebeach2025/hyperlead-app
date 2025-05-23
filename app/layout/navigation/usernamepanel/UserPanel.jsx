"use client";
import { useSelector } from "react-redux";
import { selectUser } from "app/features/userSlice";
import DisplayUserName from "./panelComponents/DisplayUserName";
import RegistrationButtons from "app/components/buttons/RegistrationButtons";

const UserPanel = () => {
  const user = useSelector(selectUser);

  return (
    <div>
      {user ? (
        <DisplayUserName />
      ) : (
        <div className="hidden md:block">
          <RegistrationButtons />
        </div>
      )}
    </div>
  );
};

export default UserPanel;
