"use client";
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FaShieldAlt } from 'react-icons/fa';
import { MdDevices } from "react-icons/md";
import MotionContainer from '../containers/MotionContainer';
import Title from '../Title';
import Close from '../buttons/Close';
import Button from '../buttons/Button';
import Paragraph from '../Paragraph';
import IconContainer from '../containers/IconContainer';
import SubTitle from '../SubTitle';
import FlexBox from '../containers/FlexBox';

const TwoFactorAuthModal = ({ isOpen, onClose, onSubmit, loading, type }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(code);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionContainer animation='fade-in' className='fixed inset-0 top-0 bg-neutral-400/80 backdrop-blur-sm dark:bg-[#1d2939]/90 z-50 flex items-center justify-center'>
          <div className='bg-neutral-100 dark:bg-[#151e27] p-6 rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.5)] max-w-md w-full center flex-col space-y-4 relative'>
            <Close onClick={onClose} className='absolute top-4 right-4' />
            <div className="center flex-col w-full space-y-2">
              <IconContainer size='md'>
                <FaShieldAlt size={28} />
              </IconContainer>
              <Title className='capitalize'>Two-Factor Authentication</Title>
              <Paragraph className="text-center">
                Please enter the 6-digit code from your authenticator app to continue.
              </Paragraph>
            </div>
            <form onSubmit={handleSubmit} className='w-full center flex-col space-y-4'>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
                placeholder="_ _ _ _ _ _"
                className="w-48 text-center text-2xl tracking-[0.5em] font-mono bg-neutral-200 dark:bg-slate-800/50 rounded-md border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <Button
                type="submit"
                text="Verifying"
                loading={loading}
                disable={loading || code.length < 6}
              >
                <span>Verify Code</span>
              </Button>
            </form>
            <TrustedDeviceModal type={type} />
          </div>
        </MotionContainer>
      )}
    </AnimatePresence>
  )
}


const TrustedDeviceModal = ({ type }) => {
  return (
    <>
      {type === "login" && (
        <div className="bg-blue-50 dark:bg-[#1d2939] border border-blue-300 flex flex-col text-sm p-4 rounded-md items-start shadow-sm gap-2">
          <FlexBox tyype='row' className="gap-1">
            <IconContainer size="sm">
              <MdDevices size={20} className='text-blue-500' />
            </IconContainer>
            <SubTitle className="text-blue-600">New Device Detected</SubTitle>
          </FlexBox>
          <p className='text-blue-500'>
            For your security, we’ve detected that you are signing in from an unrecognized device.
            Please complete the Two-Factor Authentication process to continue. You can choose to trust this device for faster logins in the future.
          </p>
        </div>
      )}
    </>
  )
}

export default TwoFactorAuthModal;
