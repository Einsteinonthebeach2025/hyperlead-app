"use client";
import { useState } from 'react';
import { PiShootingStarLight } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import { selectLeads, setToggle } from "app/features/modalSlice";
import Button from 'app/components/buttons/Button'
import HoverModal from 'app/components/modals/HoverModal';

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
                type="extra"
                onClick={handleClick}
                className={`duration-300 h-full ${!hasSelectedLeads ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
                disabled={!hasSelectedLeads}
            >
                <PiShootingStarLight size={12} />
                <span>Start New Campaign</span>
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