import LoeadingText from 'app/components/LoeadingText'
import Spinner from 'app/components/Spinner'

const ChatContent = ({ messages, chatEndRef, loading }) => {
    return (
        <div className='flex-1 p-3 relative space-y-2 overflow-y-auto max-h-80 min-h-[300px] bg-neutral-50 dark:bg-[#1d2939]'>
            {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`rounded-lg px-3 py-2 max-w-[80%] text-xs text-black dark:text-white ${msg.role === 'user' ? 'bg-violet-200 text-right dark:bg-violet-700 dark:text-white' : 'bg-blue-100 dark:bg-[#344c63]'}`}>
                        {msg.content}
                    </div>
                </div>
            ))}
            {loading && <div className='absolute left-3 -bottom-1 flex items-center gap-2'>
                <Spinner size='sm' />
                <LoeadingText loading={loading} text="Thinking..." />
            </div>}
            <div ref={chatEndRef} />
        </div>
    )
}



export default ChatContent