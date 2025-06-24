import CardContainer from 'app/components/containers/CardContainer'
import FlexBox from 'app/components/containers/FlexBox'
import SpanText from 'app/components/SpanText'
import SubTitle from 'app/components/SubTitle'
import UnlockLead from './UnlockLead'

const ResultCard = ({ lead, loading, hasSearched, unlockedLeadIds, handleClose }) => {

  return (
    <>
      {!loading && hasSearched && lead.length > 0 ? (
        lead.map(leadItem => {
          const isUnlocked = unlockedLeadIds.includes(leadItem.id);
          return (
            <CardContainer key={leadItem.id} className="relative overflow-visible my-3">
              <FlexBox type="row-between" className="items-center">
                <SubTitle className='text-blue-700'>{leadItem.company_title}</SubTitle>
                <SpanText>{leadItem.country}</SpanText>
              </FlexBox>
              <FlexBox type="column">
                <p className="text-md font-semibold dark:text-neutral-200">
                  {leadItem.first_name} {leadItem.last_name} - <span className='font-light'>{leadItem.person_title}</span>
                </p>
                <SpanText>Seniority / {leadItem.seniority}</SpanText>
              </FlexBox>
              <FlexBox type="row-between" className='mt-1 items-center'>
                <div className='flex gap-2 text-xs '>
                  {leadItem.industry.map((industry) => (
                    <span key={industry} className="bg-sky-200/40 text-sky-500 dark:bg-gray-700 px-3 capitalize rounded-full">{industry}</span>
                  ))}
                </div>
                <UnlockLead leadId={leadItem.id} isUnlocked={isUnlocked} handleClose={handleClose} />
              </FlexBox>
            </CardContainer>
          )
        })
      ) : (
        <div className='flex justify-center items-center h-full'>
          <p className='text-gray-500'>Here should be some text</p>
        </div>
      )}
    </>
  )
}

export default ResultCard;
