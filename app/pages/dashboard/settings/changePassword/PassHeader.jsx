import FlexBox from 'app/components/containers/FlexBox'
import IconContainer from 'app/components/containers/IconContainer'
import MotionContainer from 'app/components/containers/MotionContainer'
import Paragraph from 'app/components/Paragraph'
import Title from 'app/components/Title'
import React from 'react'
import { IoLockClosed } from 'react-icons/io5'

const PassHeader = () => {
  return (
    <MotionContainer animation="zoom-out">
      <FlexBox type="center-col">
        <IconContainer size="sm">
          <IoLockClosed size="20" />
        </IconContainer>
        <Title>Change Password</Title>
        <Paragraph> Update your password to keep your account secure</Paragraph>
      </FlexBox>
    </MotionContainer>
  )
}

export default PassHeader