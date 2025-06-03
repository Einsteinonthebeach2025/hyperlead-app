"use client"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from 'app/features/modalSlice';
import { MdAssistantNavigation } from "react-icons/md";
import { selectUser } from 'app/features/userSlice';
import { addAssistantToUser } from 'app/lib/actions/profileActions';
import GradientContainer from 'app/components/containers/GradientContainer'
import Button from 'app/components/buttons/Button';
import FormContainer from 'app/components/containers/FormContainer';
import SubTitle from 'app/components/SubTitle';

const AddAssistant = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser);

  const handleAddAssistant = async () => {
    if (!email) {
      dispatch(setError("Please enter an email."));
      return;
    }
    setIsLoading(true);
    const result = await addAssistantToUser(user.id, email);
    if (!result.success) {
      dispatch(setError(result.error));
      setIsLoading(false);
      return;
    }
    dispatch(setError({ message: "Assistant added successfully!", type: "success" }));
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