"use client"
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const pokeVariants = {
    animate: (i) => ({
        x: [0, 2, 0],
        transition: {
            duration: 0.4,
            ease: 'easeInOut',
            delay: i * 0.12,
        },
    }),
};

const LoadingText = ({ text, loading }) => {
    const [waveKey, setWaveKey] = useState(0);

    useEffect(() => {
        if (!loading) return;
        // Calculate total wave duration
        const totalDuration = (text.length - 1) * 0.12 + 0.4;
        const interval = setInterval(() => {
            setWaveKey(k => k + 1);
        }, totalDuration * 1000);
        return () => clearInterval(interval);
    }, [loading, text.length]);

    return (
        <div className='flex items-center justify-center font-bold font-mono lowercase text-sm'>
            {text.split('').map((char, idx) => (
                <motion.span
                    key={idx + '-' + waveKey}
                    custom={idx}
                    variants={pokeVariants}
                    animate={loading ? 'animate' : ''}
                    style={{ display: 'inline-block' }}
                >
                    {char}
                </motion.span>
            ))}
        </div>
    )
}

export default LoadingText