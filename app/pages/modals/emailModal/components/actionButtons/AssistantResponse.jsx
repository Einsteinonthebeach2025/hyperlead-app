"use client"
import Button from 'app/components/buttons/Button'
import FlexBox from 'app/components/containers/FlexBox'
import SubTitle from 'app/components/SubTitle'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { IoMdClose } from 'react-icons/io'
import Close from 'app/components/buttons/Close'

const AssistantResponse = ({ handleClick, data, addToEmail, clearStates, refineEmail, shortenEmail, refineLoading, shortenLoading, error }) => {
  return (
    <>
      {data && (
        <FlexBox type="column" className="absolute z-10 inset-0 bg-neutral-200 dark:bg-black items-center p-4 overflow-y-auto">
          <Close
            className="absolute top-2 right-2 z-20 p-2 rounded-full hover:bg-neutral-300 dark:hover:bg-neutral-800"
            onClick={() => {
              clearStates();
              handleClick();
            }}
            aria-label="Close"
          >
            <IoMdClose size={24} />
          </Close>
          <Response data={data} />
          <Buttons
            handleClick={handleClick}
            addToEmail={addToEmail}
            clearStates={clearStates}
            refineEmail={refineEmail}
            shortenEmail={shortenEmail}
            refineLoading={refineLoading}
            shortenLoading={shortenLoading}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
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
      <SubTitle className='text-black dark:text-white'>Generated Email:</SubTitle>
      <pre className="whitespace-pre-wrap text-black dark:text-white text-[12px] leading-6">
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

const Buttons = ({ handleClick, addToEmail, clearStates, refineEmail, shortenEmail, refineLoading, shortenLoading }) => {
  return (
    <FlexBox type="row-start" className='w-full gap-2'>
      <Button
        type="extra"
        onClick={() => {
          addToEmail()
          handleClick()
        }}
      >
        <span >Add to Email</span>
      </Button>
      <Button
        type="extra"
        onClick={refineEmail}
        loading={refineLoading}
        disabled={refineLoading}
      >
        <span>Refine</span>
      </Button>
      <Button
        type="extra"
        onClick={shortenEmail}
        loading={shortenLoading}
        disabled={shortenLoading}
      >
        <span>Shorten</span>
      </Button>
      <Button
        type="extra"
        onClick={() => {
          clearStates();
          handleClick();
        }}
      >
        <span>Write My Own</span>
      </Button>
    </FlexBox>
  )
}

export default AssistantResponse