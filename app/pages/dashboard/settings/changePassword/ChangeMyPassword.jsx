import PassHeader from './PassHeader';
import ChangePwdForm from './ChangePwdForm';
import PwdTips from './PwdTips';
import CardContainer from 'app/components/containers/CardContainer';

const ChangeMyPassword = () => {

  return (
    <div className="w-full flex justify-start pb-5 ">
      <CardContainer className="w-[450px]">
        <PassHeader />
        <ChangePwdForm />
        <PwdTips />
      </CardContainer>
    </div>
  );
};

export default ChangeMyPassword;