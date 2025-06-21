import FlexBox from 'app/components/containers/FlexBox'
import SpanText from 'app/components/SpanText'
import SubTitle from 'app/components/SubTitle'
import React from 'react'

const MidInfo = () => {
    return (
        <div className='my-10'>
            <SubTitle>This helps prevent unauthorized access, even if someone has your password.</SubTitle>
            <div className="grid grid-cols-3 gap-2">
                <FlexBox type="row" className="space-x-2 items-center primary-border p-2">
                    <div className="w-10 aspect-square bg-green-400 rounded-lg"></div>
                    <SpanText className="w-[70%]">Recommended for all users</SpanText>
                </FlexBox>
                <FlexBox type="row" className="space-x-2 items-center primary-border p-2">
                    <div className="w-10 aspect-square bg-red-400 rounded-lg"></div>
                    <SpanText className="w-[70%]">Protects against phish-ing, breaches, and account takeover</SpanText>
                </FlexBox>
                <FlexBox type="row" className="space-x-2 items-center primary-border p-2">
                    <div className="w-10 aspect-square bg-sky-400 rounded-lg"></div>
                    <SpanText className="w-[70%]">Recommended for all users</SpanText>
                </FlexBox>
            </div>
        </div>
    )
}

export default MidInfo
