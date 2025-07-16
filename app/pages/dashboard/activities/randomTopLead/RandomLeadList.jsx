"use client";
import FlexBox from 'app/components/containers/FlexBox';
import SpanText from 'app/components/SpanText';
import SubTitle from 'app/components/SubTitle';
import { truncateString } from 'app/helpers/utils';
import Link from 'next/link';
import React from 'react'

const RandomLeadList = ({ data }) => {

  return (
    <div className='mt-3 grid grid-cols-2 gap-3'>
      {data.map((lead) => (
        <Link href={`/dashboard/leads/${lead.id}`} key={lead.id}>
          <div className='rounded-xl p-2 bg-blue-100/50 dark:bg-blue-900/50' key={lead.id}>
            <SubTitle className="h-10 lg:h-auto">{truncateString(lead.company_title, 28)}</SubTitle>
            <div className="flex flex-col md:flex-row md:justify-between">
              <FlexBox type='row' className='gap-1'>
                <SpanText>{lead.first_name}</SpanText>
                <SpanText>{lead.last_name}</SpanText>
              </FlexBox>
              <SpanText>{lead.seniority}</SpanText>
            </div>
          </div></Link>
      ))}
    </div>
  )
}

export default RandomLeadList