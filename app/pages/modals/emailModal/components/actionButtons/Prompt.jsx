import AiButton from 'app/components/buttons/AiButton'
import Close from 'app/components/buttons/Close'
import FlexBox from 'app/components/containers/FlexBox'
import SubTitle from 'app/components/SubTitle'
import React from 'react'
import { VscSparkle } from "react-icons/vsc";

const Prompt = ({ handleClick, prompt, setPrompt, loading, generateEmail, error }) => {
    return (
        <div className="w-full flex flex-col items-center gap-3 p-3 ">
            <FlexBox type="row-between" className="w-full">
                <SubTitle className="text-stone-200">AI Email Assistant</SubTitle>
                <Close type="light" onClick={handleClick} />
            </FlexBox>
            <textarea
                type="text"
                value={prompt}
                className='h-64 rounded-md text-[12px] font-light bg-neutral-300 placeholder:text-black dark:bg-[#1d2939] mb-5'
                placeholder="Describe what you want to write..."
                onChange={(e) => setPrompt(e.target.value)}
            />
            <AiButton
                text="generate email"
                loading={loading}
                onClick={generateEmail}
                disabled={loading || !prompt.trim()}
            >
                <VscSparkle />
            </AiButton>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}

export default Prompt