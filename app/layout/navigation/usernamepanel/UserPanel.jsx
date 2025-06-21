"use client";
import { useSelector } from "react-redux";
import { selectUser } from "app/features/userSlice";
import DisplayUserName from "./panelComponents/DisplayUserName";
import RegistrationButtons from "app/components/buttons/RegistrationButtons";

const UserPanel = () => {
  const user = useSelector(selectUser);

  console.log(user);

  return (
    <div>
      {user ? (
        <DisplayUserName />
      ) : (
        <RegistrationButtons />
      )}
    </div>
  );
};

export default UserPanel;
