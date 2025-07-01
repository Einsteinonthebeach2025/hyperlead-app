import React from 'react'
import { IoChatbubblesSharp } from 'react-icons/io5'

const FixedButton = ({ setOpen }) => {
    return (
        <div className='w-14 h-14 center fixed right-[1%] bottom-[3%] z-50'>
            <button
                className='w-full h-full center rounded-full bg-blue-400 shadow-lg hover:bg-blue-500 duration-300 cursor-pointer'
                onClick={() => setOpen(o => !o)}
                aria-label='Open chat'
            >
                <IoChatbubblesSharp size={30} color='white' />
            </button>
        </div>
    )
}

export default FixedButton