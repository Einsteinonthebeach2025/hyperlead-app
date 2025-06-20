import PassHeader from './PassHeader';
import ChangePwdForm from './ChangePwdForm';
import PwdTips from './PwdTips';

const ChangeMyPassword = () => {

  return (
    <div className="w-full flex justify-start pb-5">
      <div className="w-[450px] primary-border p-4 dark:bg-[#172533]">
        <PassHeader />
        <ChangePwdForm />
        <PwdTips />
      </div>
    </div>
  );
};

export default ChangeMyPassword;