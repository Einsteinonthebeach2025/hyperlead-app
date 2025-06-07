"use client";
import Button from 'app/components/buttons/Button'
import { SiMinutemailer } from "react-icons/si";
import { useSelector, useDispatch } from "react-redux";
import { selectLeads, setToggle } from "app/features/modalSlice";

const NewCampaignButton = () => {
    const dispatch = useDispatch();
    const selectedLeads = useSelector(selectLeads);
    const hasSelectedLeads = selectedLeads.length > 0;

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
        <Button
            type="success"
            onClick={handleClick}
            className={`duration-300 ${!hasSelectedLeads ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
            disabled={!hasSelectedLeads}
        >
            <span>Start New Campaign</span>
            <SiMinutemailer size={12} />
        </Button>
    )
}

export default NewCampaignButton