import FlexBox from 'app/components/containers/FlexBox'
import SpanText from 'app/components/SpanText'
import SubTitle from 'app/components/SubTitle'
import React from 'react'
import { FaCheck } from 'react-icons/fa6'
import { LuShieldAlert } from 'react-icons/lu'
import { MdOutlineRocketLaunch } from 'react-icons/md'

const MidInfo = () => {
    return (
        <div className='my-10'>
            <SubTitle>This helps prevent unauthorized access, even if someone has your password.</SubTitle>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                <FlexBox type="row" className="space-x-2 items-center primary-border p-2">
                    <div className="w-10 center aspect-square text-green-600 bg-green-300 rounded-lg">
                        <FaCheck />
                    </div>
                    <SpanText className="w-[70%]">Recommended for all users</SpanText>
                </FlexBox>
                <FlexBox type="row" className="space-x-2 items-center primary-border p-2">
                    <div className="w-10 center aspect-square text-red-600 bg-red-300 rounded-lg">
                        <LuShieldAlert />
                    </div>
                    <SpanText className="w-[70%]">Protects against phish-ing, breaches, and account takeover</SpanText>
                </FlexBox>
                <FlexBox type="row" className="space-x-2 items-center primary-border p-2">
                    <div className="w-10 center aspect-square text-sky-600 bg-sky-300 rounded-lg">
                        <MdOutlineRocketLaunch />
                    </div>
                    <SpanText className="w-[70%]">Takes Less Than 30 Seconds to Set Up</SpanText>
                </FlexBox>
            </div>
        </div>
    )
}

export default MidInfo
