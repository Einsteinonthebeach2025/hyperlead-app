"use client";
import { IoReceiptOutline, IoTimeOutline } from 'react-icons/io5'
import { formatTime } from 'app/helpers/utils'
import SubTitle from 'app/components/SubTitle'
import Paragraph from 'app/components/Paragraph'
import FlexBox from 'app/components/containers/FlexBox'

const TransactionsList = ({ transactions }) => {

  console.log(transactions, "from transactions list");


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
    <FlexBox type="row-between" className="text-sm">
      <Paragraph>{label}</Paragraph>
      <span className={`font-semibold capitalize ${customColor ? customColor : 'text-gray-900 dark:text-gray-100'}`}>
        {value}
      </span>
    </FlexBox>
  );

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto">
      {transactions.map((transaction) => {
        const statusColor = transaction.status === 'COMPLETED'
          ? 'text-green-400 bg-green-400/20'
          : 'text-red-500 dark:text-red-400';

        return (
          <div
            key={transaction.id}
            className="space-y-3 p-4 primary-border rounded-lg shadow-sm bg-neutral-50/50 dark:bg-[#344c63]/50"
          >
            <FlexBox type="row-between">
              <FlexBox className="gap-1">
                <IoTimeOutline className='text-gray-500' />
                <span className="text-xs text-gray-500">
                  {formatTime(transaction.created_at)}
                </span>
              </FlexBox>
              <span className={`px-2 py-1 capitalize font-bold rounded-full text-xs ${statusColor}`}>
                {transaction.status}
              </span>
            </FlexBox>
            <div className="space-y-2">
              <TransactionRow label="Order ID:" value={transaction.order_id} />
              <TransactionRow label="Capture ID:" value={transaction.capture_id} />
              <TransactionRow label="Plan Type:" value={transaction.plan_name} />
              <TransactionRow
                label="Amount:"
                value={`$${transaction.amount}`}
                customColor="text-blue-600 dark:text-blue-400 font-bold"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TransactionsList