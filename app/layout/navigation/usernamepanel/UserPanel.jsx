"use client";
import { useSelector } from "react-redux";
import DisplayUserName from "./DisplayUserName";
import { selectUser } from "app/features/userSlice";
import RegistrationButtons from "app/components/RegistrationButtons";

const UserPanel = () => {
  const user = useSelector(selectUser);
  const { data } = useSelector((store) => store.user);

  console.log(user);

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
