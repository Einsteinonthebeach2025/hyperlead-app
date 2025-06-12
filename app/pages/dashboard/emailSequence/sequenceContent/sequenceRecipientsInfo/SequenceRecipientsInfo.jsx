import EmailStatus from 'app/components/buttons/EmailStatus'
import FlexBox from 'app/components/containers/FlexBox'
import Dot from 'app/components/Dot'
import SpanText from 'app/components/SpanText'
import SubTitle from 'app/components/SubTitle'

const SequenceRecipientsInfo = ({ data }) => {

  return (
    <div className='space-y-2 h-96 lg:h-auto overflow-y-auto'>
      <SpanText>Current email sequence recipients</SpanText>
      {data.map((item) => {
        return <div key={item.id} className='leading-4 lg:items-center bg-stone-200 hover:bg-stone-300 dark:bg-[#344c63] dark:hover:bg-[#45617d] duration-300 p-1 px-2 rounded-md flex flex-col lg:flex-row lg:justify-between items-start'>
          <article>
            <FlexBox type="row-start" className="gap-1 items-center">
              <SubTitle className='text-blue-700 font-bold'>{item.company_title}</SubTitle>
              <Dot />
              <SpanText>{item.seniority}</SpanText>
            </FlexBox>
            <FlexBox type="row" className="gap-1 items-center dark:text-blue-400">
              <h1>{item.first_name}</h1>
              <h1>{item.last_name}</h1>
            </FlexBox>
            <SpanText className="lowercase">{item.leads_email}</SpanText>
          </article>
          <div>
            <EmailStatus item={item} />
          </div>
        </div>
      })}
    </div>
  )
}

export default SequenceRecipientsInfo