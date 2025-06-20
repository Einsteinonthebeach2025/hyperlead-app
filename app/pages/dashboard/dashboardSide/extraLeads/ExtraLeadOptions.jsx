"use client"
import Button from 'app/components/buttons/Button';
import Close from 'app/components/buttons/Close';
import MotionContainer from 'app/components/containers/MotionContainer';
import Title from 'app/components/Title';
import { selectIsModalOpen, setError, setToggle } from 'app/features/modalSlice';
import { useToggle } from 'app/hooks/useToggle';
import { AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'app/features/userSlice';

const ExtraLeadOptions = () => {
  const dispatch = useDispatch();
  const { toggle } = useToggle();
  const isModalOpen = useSelector(selectIsModalOpen);
  const user = useSelector(selectUser);

  const handleExtraLeadsPurchase = () => {
    if (!user) {
      dispatch(setError({ message: "Please login to purchase leads", type: "error" }));
      return;
    }
    dispatch(
      setToggle({
        modalType: "paypalPayment",
        isOpen: true,
        data: "EXTRA_100",
      })
    );
    toggle();
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <MotionContainer animation="fade-in" className='fixed inset-0 z-20 bg-black/60 backdrop-blur-xs flex items-center justify-center'>
          <Close type="light" className="absolute top-2 right-2" onClick={toggle} />
          <div className='bg-stone-100 dark:bg-[#1d2939] primary-outline p-6 rounded-lg shadow-lg w-96 center flex-col'>
            <Title>Need more?</Title>
            <p className="text-center text-sm text-muted-foreground mb-4">
              Purchase 100 additional leads tailored to your preferences for just <span className="font-semibold text-primary">$29</span>. No subscription required.
            </p>

            <Button
              type="blue"
              onClick={handleExtraLeadsPurchase}
            >
              Add 100 Leads
            </Button>
          </div>
        </MotionContainer>
      )}
    </AnimatePresence>
  )
}

export default ExtraLeadOptions