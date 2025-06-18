import React, { useState } from 'react'
import { MdContentCopy } from "react-icons/md";
import HoverModal from 'app/components/modals/HoverModal';
import FlexBox from 'app/components/containers/FlexBox';
import { useDispatch } from 'react-redux';
import { setError } from 'app/features/modalSlice';

const CopyEmail = ({ lead }) => {
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch();

    const handleCopyEmail = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (lead?.email) {
            try {
                await navigator.clipboard.writeText(lead.email);
                dispatch(setError({ message: "Email copied to clipboard", type: "success" }))
            } catch (err) {
                console.error('Failed to copy email:', err);
            }
        }
    };

    return (
        <FlexBox
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCopyEmail}
            className='cursor-pointer text-blue-600 hover:text-blue-800 relative'
        >
            <MdContentCopy />
            <HoverModal
                isOpen={isHovered}
                text="Copy Email"
                className="-top-7 -right-2 w-18"
            />
        </FlexBox>
    )
}

export default CopyEmail