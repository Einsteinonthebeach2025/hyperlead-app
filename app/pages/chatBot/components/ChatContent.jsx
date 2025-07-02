
const ChatContent = ({ messages, chatEndRef }) => {
  return (
    <div className='flex-1 p-3 space-y-2 overflow-y-auto max-h-80 min-h-[300px] bg-neutral-50 dark:bg-[#1d2939]'>
      {messages.map((msg, idx) => (
        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`rounded-lg px-3 py-2 max-w-[80%] text-[10px] text-black dark:text-white ${msg.role === 'user' ? 'bg-violet-200 dark:bg-violet-700 dark:text-white text-right' : 'bg-blue-100 dark:bg-[#344c63]'}`}>
            {msg.content}
          </div>
        </div>
      ))}
      <div ref={chatEndRef} />

    </div>
  )
}



export default ChatContent