"use client"
import Button from 'app/components/buttons/Button'
import { setError, setToggle } from 'app/features/modalSlice';
import { PiMagicWand } from 'react-icons/pi';
import { useDispatch } from 'react-redux';

const HyperSearch = ({ profile }) => {
    const dispatch = useDispatch();
    const subscription = profile?.subscription;


    const handleClick = () => {
        if (subscription !== "PRO" && subscription !== "HYPER") {
            dispatch(setError({ message: "You need to be a Pro or Hyper user to unlock leads", type: "error" }))
            return
        }
        dispatch(setToggle({ modalType: 'hyperSearch', isOpen: true }));
    }

    return (
        <Button type="extra" onClick={handleClick}>
            <PiMagicWand />
            <span>Search Hyperbase</span>
        </Button>
    )
}

export default HyperSearch