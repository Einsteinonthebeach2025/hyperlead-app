"use client";
import { useSelector } from 'react-redux'
import { selectGlobalModal } from 'app/features/modalSlice'

const GlobalModal = () => {
    const { isOpen, data } = useSelector(selectGlobalModal);

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 top-0 bg-black/50 z-50 flex items-center justify-center'>
            <div className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4'>
                <h2 className='text-xl font-semibold mb-2'>{data?.title}</h2>
                <p className='text-gray-600'>{data?.desc}</p>
            </div>
        </div>
    )
}

export default GlobalModal