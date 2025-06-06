"use client"
import Button from 'app/components/buttons/Button'
import FlexBox from 'app/components/containers/FlexBox'
import SubTitle from 'app/components/SubTitle'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const AssistantResponse = ({ handleClick, data, addToEmail, clearStates }) => {
  return (
    <>
      {data && (
        <FlexBox type="column" className="absolute z-10 inset-0 bg-black items-center p-4 overflow-y-auto">
          <Response data={data} />
          <Buttons handleClick={handleClick} addToEmail={addToEmail} clearStates={clearStates} />
        </FlexBox>
      )}
    </>
  )
}

const Response = ({ data }) => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    if (data) {
      setWords(data.split(' '));
    }
  }, [data]);

  return (
    <div className="flex-1 w-full space-y-2 mb-5 border-bottom">
      <SubTitle className='text-stone-100'>Generated Email:</SubTitle>
      <pre className="whitespace-pre-wrap text-white text-[12px] leading-6 font-mono">
        {words.map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07, duration: 0.6, delayChildren: index * 0.07 }}
          >
            {word}{' '}
          </motion.span>
        ))}
      </pre>
    </div>
  )
}

const Buttons = ({ handleClick, addToEmail, clearStates }) => {
  return (
    <FlexBox type="row-between" className='w-full'>
      <Button
        type="success"
        onClick={() => {
          addToEmail()
          handleClick()
        }}
      >
        <span >Add to Email</span>
      </Button>
      <Button
        type="delete"
        onClick={() => {
          clearStates();
          handleClick();
        }}
      >
        <span>Compose myself</span>
      </Button>
    </FlexBox>
  )
}

export default AssistantResponse