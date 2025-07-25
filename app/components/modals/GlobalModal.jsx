"use client";
import { useDispatch, useSelector } from 'react-redux'
import { selectGlobalModal, setToggle } from 'app/features/modalSlice'
import { AnimatePresence } from 'framer-motion';
import { termsData, privacyPolicyData } from 'app/localDB/companyInformationData';
import MotionContainer from '../containers/MotionContainer';
import Title from '../Title';
import MotionChildren from '../containers/MotionChildren';
import Paragraph from '../Paragraph';
import Close from '../buttons/Close';
import InfoDisplay from './terms/InfoDisplay';
import FullBillingDetails from 'app/pages/dashboard/settings/BillingAndPayment/paymentHistory/FullBillingDetails';

const GlobalModal = ({ children }) => {
  const dispatch = useDispatch();
  const { isOpen, data } = useSelector(selectGlobalModal);

  const sizeClasses = {
    md: 'max-w-md',
    '3xl': 'max-w-3xl',
  };

  const handleClose = () => {
    dispatch(setToggle({ modalType: "global", isOpen: false }));
  }

  if (!isOpen) return null;

  const renderModalContent = () => {
    if (!data) return null;
    switch (data.contentType) {
      case 'termsOfUse':
        return <InfoDisplay data={termsData} />;
      case 'privacyPolicy':
        return <InfoDisplay data={privacyPolicyData} />;
      case 'transactionDetails':
        return <FullBillingDetails transaction={data.transaction} setShowFullDetails={handleClose} />;
      default:
        return data.desc ? <Paragraph className='text-gray-600'>{data.desc}</Paragraph> : null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionContainer onClick={handleClose} animation='fade-in' className='fixed inset-0 top-0 bg-neutral-400/80 backdrop-blur-xs dark:bg-[#1d2939]/90 z-50 flex items-center justify-center px-3'>
          <div className={`${sizeClasses[data?.size] || sizeClasses.md} bg-neutral-100 dark:bg-[#151e27] p-6 rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.5)] w-full center flex-col space-y-2`}>
            <Close onClick={handleClose} className='absolute top-4 right-4' />
            <MotionChildren animation='fade-in' className="w-full center">
              <Title className='capitalize'>{data?.title}</Title>
            </MotionChildren>
            {renderModalContent()}
          </div>
          {children}
        </MotionContainer>
      )}
    </AnimatePresence>
  )
}

export default GlobalModal

