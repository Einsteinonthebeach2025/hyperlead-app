import CardContainer from 'app/components/containers/CardContainer'
import SpanText from 'app/components/SpanText';
import Title from 'app/components/Title'

const SequenceBar = ({ data, active, setActive }) => {

  const handleClick = (item) => {
    setActive(item)
  }

  return (
    <CardContainer className="w-[25%] space-y-3">
      <Title>Sequences</Title>
      <div className="border-t border-stone-300 dark:border-[#344c63] cursor-pointer space-y-1 py-3">
        {data.map((item) => {
          const count = item.recipients.length
          return <div key={item.id} onClick={() => handleClick(item)} className={`${active?.id === item.id ? "duration-300 bg-blue-200 hover:bg-blue-300 dark:bg-[#557794] dark:hover:bg-[#45617d]" : "bg-stone-200 hover:bg-stone-300 dark:bg-[#344c63] dark:hover:bg-[#45617d]"} text-stone-800 dark:text-white capitalize duration-300 px-2 py-1 rounded-md`}>
            <h1 className="text-sm font-medium">{item.sequence_name}</h1>
            <SpanText>{count} Recipients</SpanText>
          </div>
        })}
      </div>
    </CardContainer>
  )
}

export default SequenceBar