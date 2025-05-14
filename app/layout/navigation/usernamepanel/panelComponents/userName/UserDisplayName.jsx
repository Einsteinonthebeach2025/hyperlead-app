import SubTitle from "app/components/SubTitle";

const UserDisplayName = ({ user }) => {
  return (
    <div className="hidden md:flex flex-col items-end mr-1">
      <SubTitle>{user?.profile?.userName}</SubTitle>
      <span className="text-[10px] text-neutral-500">{user?.email}</span>
    </div>
  );
};

export default UserDisplayName;
