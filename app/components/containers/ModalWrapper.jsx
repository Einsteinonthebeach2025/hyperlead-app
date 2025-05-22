import { AnimatePresence } from 'framer-motion'
import React from 'react'
import MotionContainer from './MotionContainer'
import FormContainer from './FormContainer'
import FlexBox from './FlexBox'
import Title from '../Title'
import Close from '../buttons/Close'

const ModalWrapper = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <MotionContainer
          animation="fade-in"
          className="fixed top-0 z-10 inset-0 bg-black/70 backdrop-blur-sm center"
        >
          <FormContainer className="w-full max-w-[600px]">
            <FlexBox type="row-between" className="w-full text-amber-500">
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