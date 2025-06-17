"use client";
import Button from 'app/components/buttons/Button'
import { SiMinutemailer } from "react-icons/si";
import { useSelector, useDispatch } from "react-redux";
import { selectLeads, setToggle } from "app/features/modalSlice";
import HoverModal from 'app/components/modals/HoverModal';
import { useState } from 'react';

const NewCampaignButton = () => {
    const dispatch = useDispatch();
    const selectedLeads = useSelector(selectLeads);
    const hasSelectedLeads = selectedLeads.length > 0;
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (hasSelectedLeads) {
            dispatch(setToggle({
                modalType: 'email',
                isOpen: true,
                data: selectedLeads
            }));
        }
    };

    return (
        <div className="relative w-44"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Button
                type="success"
                onClick={handleClick}
                className={`duration-300 h-full ${!hasSelectedLeads ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
                disabled={!hasSelectedLeads}
            >
                <span>Start New Campaign</span>
                <SiMinutemailer size={12} />
            </Button>
            <HoverModal
                isOpen={isHovered && !hasSelectedLeads}
                text="Mark multiple leads to start campaign"
                className="-right-22 -top-8 w-[200px]"
            />
        </div>
    )
}

export default NewCampaignButton