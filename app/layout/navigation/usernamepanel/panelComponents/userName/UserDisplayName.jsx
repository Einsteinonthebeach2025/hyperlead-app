import SubTitle from "app/components/SubTitle";

const UserDisplayName = ({ user }) => {
  const userName = user?.profile?.userName || user?.user_metadata?.name;

  return (
    <div className="hidden md:flex flex-col items-end mr-1">
      <SubTitle>{userName}</SubTitle>
      <span className="text-[10px] text-neutral-500 dark:text-stone-400">{user?.email}</span>
    </div>
  );
};

export default UserDisplayName;
