
const TextArea = ({ input, setInput, handleKeyDown, handleSend, loading }) => {
    return (
        <div className='p-2 border-t border-neutral-200 dark:border-[#344c63] bg-white dark:bg-[#232e3b]'>
            <textarea
                className='w-full rounded-md border border-neutral-300 dark:border-[#344c63] p-2 resize-none focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm bg-neutral-100 dark:bg-[#1d2939]'
                rows={2}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Type your message...'
                disabled={loading}
            />
            <button
                className='mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md duration-300 disabled:opacity-50'
                onClick={handleSend}
                disabled={loading || !input.trim()}
            >
                {loading ? 'Sending...' : 'Send'}
            </button>
        </div>
    )
}

export default TextArea