"use client"
import DashboardPageWrapper from 'app/components/containers/DashboardPageWrapper'
import Paragraph from 'app/components/Paragraph'
import SectionHeadline from 'app/components/SectionHeadline'
import LeadCard from '../leads/leadsLayout/LeadCard'
import { selectUser } from 'app/features/userSlice'
import { useSelector } from 'react-redux'

const UnlockedLeads = ({ data, title, desc }) => {
  const user = useSelector(selectUser)
  const subs = user?.profile?.subscription === "PRO" || user?.profile?.subscription === "Hyper"

  if ((data?.length === 0 || !data) && !subs) {
    return (
      <div className="h-screen center flex-col">
        <SectionHeadline
          title={title}
          desc={desc}
        />
        <div className='center flex-col'>
          <div className='bg-blue-200/40 p-4 rounded-lg border border-blue-300 *:text-blue-500 w-full max-w-md'>
            <Paragraph>On-Demand Search is available exclusively to Pro & Hyper users.
            </Paragraph>
            <Paragraph>Gain access to 100,000+ verified decision-makers by role, company, or industry - and unlock only the ones you need.
            </Paragraph>
          </div>
        </div>
      </div>
    )
  }

  if (data?.length === 0 || !data) {
    return (
      <div className="h-screen center flex-col">
        <SectionHeadline
          title={title}
          desc={desc}
        />
      </div>
    )
  }

  return (
    <DashboardPageWrapper title="Unlocked Leads">
      <LeadCard leads={data} />
    </DashboardPageWrapper>
  )
}

export default UnlockedLeads