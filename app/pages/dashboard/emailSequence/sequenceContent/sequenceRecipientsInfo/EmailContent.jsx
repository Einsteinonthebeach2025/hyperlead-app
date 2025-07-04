import FlexBox from 'app/components/containers/FlexBox'
import Paragraph from 'app/components/Paragraph'
import SpanText from 'app/components/SpanText'
import SubTitle from 'app/components/SubTitle'
import React from 'react'

const EmailContent = ({ data }) => {
    const { subject, message } = data

    return (
        <div className='space-y-4 lg:space-y-2 border-bottom'>
            <FlexBox type="column" className="leading-2 gap-1">
                <SpanText>Subject name</SpanText>
                <SubTitle>{subject}</SubTitle>
            </FlexBox>
            <FlexBox type="column" className="leading-2 gap-1">
                <SpanText>Message content</SpanText>
                <Paragraph className="whitespace-pre-line">{message}</Paragraph>
            </FlexBox>
        </div>
    )
}

export default EmailContent