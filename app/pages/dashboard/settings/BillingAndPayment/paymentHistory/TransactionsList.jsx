"use client";
import { IoReceiptOutline, IoTimeOutline } from 'react-icons/io5'
import { formatTime } from 'app/helpers/utils'
import SubTitle from 'app/components/SubTitle'
import Paragraph from 'app/components/Paragraph'
import FlexBox from 'app/components/containers/FlexBox'
import SpanText from 'app/components/SpanText';
import { useDispatch } from 'react-redux';
import { setToggle } from 'app/features/modalSlice';

const TransactionsList = ({ transactions }) => {
  const dispatch = useDispatch();

  if (!transactions || transactions.length === 0) {
    return (
      <div className="center flex-col space-y-4">
        <IoReceiptOutline size={40} className="text-gray-400" />
        <div className="center flex-col">
          <SubTitle>No Transactions Yet</SubTitle>
          <Paragraph>Your transaction history will appear here once you make your first purchase.</Paragraph>
        </div>
      </div>
    );
  }

  const TransactionRow = ({ label, value, customColor }) => (
    <FlexBox type="row-between" className="text-sm items-center">
      <Paragraph>{label}</Paragraph>
      <span className={`font-semibold capitalize ${customColor ? customColor : 'text-gray-900 dark:text-gray-100'}`}>
        {value}
      </span>
    </FlexBox>
  );

  const handleShowFullDetails = (transaction) => {
    dispatch(setToggle({
      modalType: 'global',
      isOpen: true,
      data: {
        title: 'Transaction Details',
        contentType: 'transactionDetails',
        transaction,
        size: 'md',
      },
    }));
  };

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto relative">
      {transactions.map((transaction) => {
        const statusColor = transaction.current_status === 'CANCELLED'
          ? 'text-red-500 bg-red-200 dark:bg-red-500/30'
          : 'text-green-500 bg-green-200 dark:bg-green-500/30';
        return (
          <div
            key={transaction.id}
            className="space-y-1 lg:space-y-3 p-4 primary-border rounded-lg shadow-sm bg-neutral-50/50 dark:bg-[#344c63]/50 "
          >
            <FlexBox type="row-between">
              <FlexBox className="gap-1">
                <IoTimeOutline className='text-gray-500' />
                <span className="text-xs text-gray-500">
                  {formatTime(transaction.created_at)}
                </span>
              </FlexBox>
              <span className="px-2 py-1 bg-green-200 text-green-500 dark:bg-green-500/30 font-bold rounded-full text-xs">
                {transaction.status}
              </span>
            </FlexBox>
            {
              transaction?.current_status === "CANCELLED" && (
                <FlexBox type="row-between" >
                  <FlexBox className="gap-1">
                    <IoTimeOutline className='text-gray-500' />
                    <span className="text-xs text-gray-500">
                      {formatTime(transaction.cancelled_at)}
                    </span>
                  </FlexBox>
                  <span className={`px-2 py-1 uppercase font-bold rounded-full text-xs ${statusColor}`}>
                    {transaction.current_status}
                  </span>
                </FlexBox>
              )
            }
            {
              transaction.recurring && (
                <FlexBox type="row-between" >
                  <FlexBox className="gap-1">
                    <IoTimeOutline className='text-gray-500' />
                    <span className="text-xs text-gray-500">
                      {formatTime(transaction.cancelled_at)}
                    </span>
                  </FlexBox>
                  <span className={`px-2 py-1 uppercase font-bold rounded-full text-xs ${statusColor}`}>
                    {transaction.current_status}
                  </span>
                </FlexBox>
              )
            }
            <div className="space-y-2 ">
              <TransactionRow label="PayPal Order ID:" value={transaction.paypal_order_id} />
              {transaction.resource_id && (
                <TransactionRow label="Capture ID:" value={transaction.resource_id} />
              )}
              <TransactionRow label="Plan Type:" value={transaction.plan_name} />
              <TransactionRow
                label="Amount:"
                value={`$${transaction.amount}`}
                customColor="text-blue-600 dark:text-blue-400 font-bold"
              />
            </div>
            <FlexBox onClick={() => handleShowFullDetails(transaction)} type="row-end" className="w-full justify-end cursor-pointer">
              <SpanText>View full details</SpanText>
            </FlexBox>
          </div>
        );
      })}
    </div>
  );
}

export default TransactionsList