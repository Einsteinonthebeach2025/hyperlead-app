'use client'
import { useState, useRef, useEffect } from 'react';
import FixedButton from './components/FixedButton';
import Close from 'app/components/buttons/Close';
import FlexBox from 'app/components/containers/FlexBox';
import SubTitle from 'app/components/SubTitle';
import ChatContent from './components/ChatContent';
import TextArea from './components/TextArea';

const ChatBot = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        if (open && chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, open]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);
        try {
            const res = await fetch('/api/chatbot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });
            const data = await res.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
        } catch {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong.' }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            <FixedButton setOpen={setOpen} />
            {open && (
                <div className='fixed bottom-[15%] right-6 z-50 w-80 max-w-[95vw] bg-white dark:bg-[#232e3b] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200 dark:border-[#344c63]'>
                    <FlexBox type="row-between" className='items-center px-4 py-2 bg-blue-500 *:text-white'>
                        <SubTitle>HyperLead Assistant</SubTitle>
                        <Close type="light" onClick={() => setOpen(false)} />
                    </FlexBox>
                    <ChatContent messages={messages} chatEndRef={chatEndRef} loading={loading} />

                    <TextArea input={input} setInput={setInput} handleKeyDown={handleKeyDown} handleSend={handleSend} loading={loading} />
                </div>
            )}
        </>
    );
};

export default ChatBot;