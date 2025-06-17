"use client"
import { useSelector, useDispatch } from "react-redux";
import { selectTransactionsModal, setTransactionsModal } from "app/features/modalSlice";
import Close from "app/components/buttons/Close";
import { formatTime } from "app/helpers/utils";
import SubTitle from "app/components/SubTitle";
import { AnimatePresence } from "framer-motion";
import MotionContainer from "app/components/containers/MotionContainer";

const TransactionsData = () => {
  const dispatch = useDispatch();
  const { isOpen, data } = useSelector(selectTransactionsModal);

  const transactions = data?.transactions || [];

  const handleClose = () => {
    dispatch(setTransactionsModal({ isOpen: false, data: null }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionContainer animation="fade-in" className="fixed inset-0 top-0 bg-neutral-900/30 backdrop-blur-[2px] dark:bg-[#1d2939]/90 py-10 z-50 flex items-center justify-center">
          <Close type="light" onClick={handleClose} className="absolute top-4 right-4">X</Close>
          <div className="bg-white dark:bg-[#151e27] p-4 rounded-lg shadow-2xl max-w-md w-full space-y-2">
            <SubTitle>
              {data.firstName && data.lastName
                ? `${data.firstName} ${data.lastName}`
                : data.userName}'s Transactions
            </SubTitle>
            <TransactionInfo data={transactions} />
          </div>
        </MotionContainer>
      )}
    </AnimatePresence>
  )
}



const TransactionInfo = ({ data }) => {

  if (!data || !data.length) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-gray-600 dark:text-stone-100 font-thin">No transactions made yet</span>
      </div>
    )
  }

  const TransactionRow = ({ label, value, customColor }) => (
    <div className="flex justify-between text-sm">
      <span className="text-gray-600 dark:text-stone-100 font-thin">{label}</span>
      <span className={`font-medium capitalize ${customColor ? customColor : 'dark:text-neutral-200'}`}>
        {value}
      </span>
    </div>
  );

  return (
    <div className="space-y-4 max-h-[540px] overflow-y-auto">
      {data.map((item) => {
        const statusColor = item.status === 'completed'
          ? 'text-green-600'
          : 'text-red-500';
        return (
          <div key={item.id} className="space-y-1 p-3 primary-border rounded-md shadow-sm bg-neutral-100/50 dark:bg-[#1d2939]">
            <TransactionRow label="Purchased:" value={formatTime(item.created_at)} />
            <TransactionRow label="Order ID:" value={item.order_id} />
            <TransactionRow label="Plan Type:" value={item.plan_name} />
            <TransactionRow label="Status:" value={item.status} customColor={statusColor} />
            <TransactionRow label="Price:" value={`$${item.amount}`} />
          </div>
        );
      })}
    </div>
  )
}

export default TransactionsData