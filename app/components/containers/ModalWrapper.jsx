import { AnimatePresence } from 'framer-motion'
import React from 'react'
import MotionContainer from './MotionContainer'
import FormContainer from './FormContainer'
import FlexBox from './FlexBox'
import Title from '../Title'
import Close from '../buttons/Close'

const ModalWrapper = ({ isOpen, onClose, title, children, className }) => {

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionContainer
          animation="fade-in"
          className={`fixed top-0 z-50 inset-0 bg-black/70 backdrop-blur-sm center ${className}`}
        >
          <FormContainer className="w-full max-w-[600px] relative border-none overflow-y-auto overflow-x-hidden">
            <FlexBox type="row-between" className="w-full text-blue-500">
              <Title>{title}</Title>
              <Close onClick={onClose} />
            </FlexBox>
            {children}
          </FormContainer>
        </MotionContainer>
      )}
    </AnimatePresence>
  )
}

export default ModalWrapper