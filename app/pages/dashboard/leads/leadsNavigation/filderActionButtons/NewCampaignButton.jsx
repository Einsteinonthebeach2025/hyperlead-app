"use client";
import { useState } from 'react';
import { PiShootingStarLight } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux";
import { selectLeads, setToggle, setError } from "app/features/modalSlice";
import Button from 'app/components/buttons/Button'
import HoverModal from 'app/components/modals/HoverModal';
import { selectUser } from 'app/features/userSlice';

const NewCampaignButton = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const selectedLeads = useSelector(selectLeads);
    const hasSelectedLeads = selectedLeads.length > 0;
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (hasSelectedLeads) {
            const plan = (user?.profile?.subscription || "").toUpperCase();
            let maxCampaigns = 0;
            if (plan === "PLUS") maxCampaigns = 5;
            else if (plan === "PRO") maxCampaigns = 10;
            else if (plan === "HYPER") maxCampaigns = 25;
            if (!user?.profile?.subscription) {
                dispatch(setError({ message: "You have to subscribe to a plan to use this feature.", type: "error" }));
                return;
            }
            const campaignCount = user?.profile?.email_campaign_count || 0;
            if (campaignCount >= maxCampaigns) {
                dispatch(setError({ message: `You have reached your monthly campaign limit`, type: "error" }));
                return;
            }
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