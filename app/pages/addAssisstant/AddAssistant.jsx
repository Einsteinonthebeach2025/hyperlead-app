"use client"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from 'app/features/modalSlice';
import { MdAssistantNavigation } from "react-icons/md";
import { selectUser } from 'app/features/userSlice';
import { notifyAssistantInvitation } from 'app/lib/actions/notificationActions';
import GradientContainer from 'app/components/containers/GradientContainer'
import Button from 'app/components/buttons/Button';
import FormContainer from 'app/components/containers/FormContainer';
import SubTitle from 'app/components/SubTitle';
import { useRouter } from 'next/navigation';

const AddAssistant = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser);

  const handleAddAssistant = async () => {
    setIsLoading(true);
    if (!email) {
      dispatch(setError({ message: "Please enter an email.", type: "error" }));
      setIsLoading(false);
      return;
    }
    try {
      const { data, error } = await notifyAssistantInvitation(
        user.id,
        email,
      );
      if (error) {
        dispatch(setError({ message: error, type: "error" }));
      } else if (data) {
        dispatch(setError({ message: "Invitation sent to assistant!", type: "success" }));
        router.push("/");
      }
    } catch (e) {
      dispatch(setError({ message: e.message || "Failed to send assistant invitation.", type: "error" }));
    }
    setEmail("");
    setIsLoading(false);
  };

  return (
    <div className='h-screen center relative'>
      <GradientContainer />
      <FormContainer className='w-full max-w-[400px]'>
        <div className='space-y-4 center flex-col w-full'>
          <div className='w-full'>
            <SubTitle>Add Assistant</SubTitle>
            <input
              placeholder="Assistant Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button onClick={handleAddAssistant} loading={isLoading}>
            <MdAssistantNavigation />
            <span>Add Assistant</span>
          </Button>
        </div>
      </FormContainer>

    </div>
  )
}

export default AddAssistant