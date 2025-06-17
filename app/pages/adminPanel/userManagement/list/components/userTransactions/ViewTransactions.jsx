import Button from 'app/components/buttons/Button'
import { GrTransaction } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { setTransactionsModal } from "app/features/modalSlice";

const ViewTransactions = ({ item }) => {
    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(setTransactionsModal({
            isOpen: true,
            data: item,
        }));
    };

    return (
        <Button onClick={handleOpen}>
            <span>View Transactions</span>
            <GrTransaction />
        </Button>
    )
}

export default ViewTransactions