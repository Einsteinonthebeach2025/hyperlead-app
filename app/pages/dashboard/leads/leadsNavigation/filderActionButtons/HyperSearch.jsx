"use client"
import Button from 'app/components/buttons/Button'
import { setError, setToggle } from 'app/features/modalSlice';
import { selectUser } from 'app/features/userSlice';
import { PiMagicWand } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';

const HyperSearch = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const subscription = user?.profile?.subscription;

    const handleClick = () => {
        if (subscription !== "PRO" && subscription !== "Hyper") {
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