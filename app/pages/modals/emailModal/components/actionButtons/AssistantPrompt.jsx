import MotionContainer from 'app/components/containers/MotionContainer'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import AssistantResponse from './AssistantResponse';
import Prompt from './Prompt';

const AssistantPrompt = ({ isOpen, handleClick, setFormData }) => {
  const [prompt, setPrompt] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateEmail = async () => {
    setLoading(true);
    setError("");
    setEmail("");
    try {
      const res = await fetch("/api/compose-with-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (res.ok) {
        setEmail(data.email);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Server error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const addToEmail = () => {
    if (email) {
      setFormData(prev => ({
        ...prev,
        message: email
      }));
    }
  };

  const clearStates = () => {
    setPrompt("");
    setEmail("");
    setError("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionContainer
          animation="left"
          className='absolute z-[5] backdrop-blur-sm w-full h-full flex bg-black/80 justify-end'
        >
          <Prompt handleClick={handleClick} prompt={prompt} setPrompt={setPrompt} loading={loading} generateEmail={generateEmail} error={error} />
          <AssistantResponse handleClick={handleClick} data={email} addToEmail={addToEmail} clearStates={clearStates} />
        </MotionContainer>
      )}
    </AnimatePresence>
  )
}

export default AssistantPrompt