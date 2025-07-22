"use client"
import Button from 'app/components/buttons/Button'
import supabase from 'app/lib/config/supabaseClient';
import { setError, setToggle } from 'app/features/modalSlice';
import { PiMagicWand } from 'react-icons/pi';
import { useDispatch } from 'react-redux';

const HyperSearch = ({ profile }) => {
    const dispatch = useDispatch();
    const subscription = profile?.subscription;

    console.log(profile);


    const getMonthStart = () => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    };

    const handleClick = async () => {
        try {
            const monthStart = getMonthStart();
            let maxUnlocks = 0;
            if (subscription === "PLUS") maxUnlocks = 5;
            else if (subscription === "PRO") maxUnlocks = 15;
            else if (subscription === "HYPER") maxUnlocks = 30;

            const { data, error } = await supabase
                .from("unlocked_leads")
                .select("id", { count: "exact" })
                .eq("user_id", profile.id)
                .gte("unlocked_at", monthStart);

            if (error) {
                dispatch(setError({ message: "Could not check unlock limit. Please try again.", type: "error" }));
                return;
            }
            if (!subscription) {
                dispatch(setError({ message: `You have to subscribe to a plan to use this feature.`, type: "error" }));
                return;
            }
            if (data.length >= maxUnlocks) {
                dispatch(setError({ message: `You have reached your monthly unlock limit (${maxUnlocks}).`, type: "error" }));
                return;
            }


            dispatch(setToggle({ modalType: 'hyperSearch', isOpen: true }));
        } catch (err) {
            dispatch(setError({ message: "Unexpected error. Please try again.", type: "error" }));
        }
    };

    return (
        <Button type="extra" onClick={handleClick}>
            <PiMagicWand />
            <span>Search Hyperbase</span>
        </Button>
    )
}

export default HyperSearch;