import FlexBox from 'app/components/containers/FlexBox'
import IconContainer from 'app/components/containers/IconContainer'
import Paragraph from 'app/components/Paragraph'
import Title from 'app/components/Title'
import React from 'react'
import { IoLockClosed } from 'react-icons/io5'

const PassHeader = () => {
  return (
    <div >
      <FlexBox type="center-col">
        <IconContainer size="sm">
          <IoLockClosed />
        </IconContainer>
        <Title>Change Password</Title>
        <Paragraph> Update your password to keep your account secure</Paragraph>
      </FlexBox>
    </div>
  )
}

export default PassHeader