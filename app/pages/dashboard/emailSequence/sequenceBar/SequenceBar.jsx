import CardContainer from 'app/components/containers/CardContainer'
import FlexBox from 'app/components/containers/FlexBox';
import SpanText from 'app/components/SpanText';
import Title from 'app/components/Title'
import { truncateString } from 'app/helpers/utils';

const SequenceBar = ({ data, active, setActive }) => {

  const handleClick = (item) => {
    setActive(item)
  }

  return (
    <CardContainer className="w-full lg:w-[30%] space-y-3">
      <FlexBox type="row-between" className="items-center border-bottom">
        <Title>Sequences</Title>
        <span className='dark:text-stone-100 font-bold'>{data?.length}</span>
      </FlexBox>
      <div className=" space-y-1 h-[430px] overflow-y-auto pr-2">
        {data.map((item) => {
          const count = item.recipients.length
          return <div key={item.id} onClick={() => handleClick(item)} className={`${active?.id === item.id ? "duration-300  bg-blue-200 hover:bg-blue-300 dark:bg-[#557794] dark:hover:bg-[#45617d]" : "bg-stone-200 hover:bg-stone-300 dark:bg-[#344c63] dark:hover:bg-[#45617d]"} text-stone-800 cursor-pointer dark:text-white capitalize duration-300 px-2 py-1 rounded-md`}>
            <h1 className="text-sm font-medium">{truncateString(item.sequence_name, 25)}</h1>
            <SpanText>{count} Recipients</SpanText>
          </div>
        })}
      </div>
    </CardContainer>
  )
}

export default SequenceBar