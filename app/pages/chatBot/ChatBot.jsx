'use client'
import { AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import FixedButton from './components/FixedButton';
import Close from 'app/components/buttons/Close';
import FlexBox from 'app/components/containers/FlexBox';
import SubTitle from 'app/components/SubTitle';
import ChatContent from './components/ChatContent';
import TextArea from './components/TextArea';
import LogoIcon from 'app/components/LogoIcon';
import MotionContainer from 'app/components/containers/MotionContainer';
import { selectUser } from 'app/features/userSlice';
import { useSelector } from 'react-redux';
import Spinner from 'app/components/Spinner';
import LoadingText from 'app/components/LoadingText';
import SpanText from 'app/components/SpanText';

const ChatBot = () => {
  const user = useSelector(selectUser)
  const userName = user?.profile?.userName || user?.user_metadata?.name;
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I help you today?' }
  ]);

  useEffect(() => {
    if (userName && messages.length === 1 && messages[0].role === 'assistant') {
      setMessages([
        { role: 'assistant', content: `Hello ${userName || " "}! How can I help you today?` }
      ]);
    }
  }, [userName]);

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
        body: JSON.stringify({
          message: input,
          userId: user?.id,
          userEmail: user?.email
        })
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

  const handleBackdropClick = (e) => {
    if (chatBoxRef.current && !chatBoxRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <>
      <FixedButton setOpen={setOpen} />
      <AnimatePresence>
        {open && (
          <MotionContainer
            animation="fade-in"
            className="fixed inset-0 z-50 flex items-end justify-end"
            onClick={handleBackdropClick}
            style={{ pointerEvents: 'auto' }}
          >
            <div
              ref={chatBoxRef}
              className="fixed bottom-[15%] right-6 w-80 max-w-[95vw] bg-white dark:bg-[#232e3b] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200 dark:border-[#344c63] z-60"
              onClick={e => e.stopPropagation()}
            >
              <FlexBox type="row-between" className='items-center px-4 py-2 bg-blue-500 *:text-white'>
                <LogoIcon size="sm" />
                <SubTitle>HyperLead Assistant</SubTitle>
                <Close type="light" onClick={() => setOpen(false)} />
              </FlexBox>
              <ChatContent messages={messages} chatEndRef={chatEndRef} loading={loading} />
              <div className='h-6 relative bg-neutral-50 dark:bg-[#1d2939] px-3 flex items-center justify-end'>
                {loading && <div className='flex absolute left-1 bottom-0 items-center gap-2'>
                  <Spinner size='sm' />
                  <LoadingText loading={loading} text="Thinking..." />
                </div>}
                <SpanText>Powered by OpenAI</SpanText>
              </div>
              <TextArea input={input} setInput={setInput} handleKeyDown={handleKeyDown} handleSend={handleSend} loading={loading} />
            </div>
          </MotionContainer>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;