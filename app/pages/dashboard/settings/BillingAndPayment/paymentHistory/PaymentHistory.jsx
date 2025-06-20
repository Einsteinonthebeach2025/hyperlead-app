import CardContainer from 'app/components/containers/CardContainer'
import IconContainer from 'app/components/containers/IconContainer'
import SubTitle from 'app/components/SubTitle'
import { IoReceiptOutline } from 'react-icons/io5'
import TransactionsList from './TransactionsList'

const PaymentHistory = ({ transactions }) => {
    return (
        <CardContainer className="space-y-4">
            <div className="flex items-center gap-3">
                <IconContainer size="sm">
                    <IoReceiptOutline size={20} />
                </IconContainer>
                <SubTitle>Transaction History</SubTitle>
            </div>
            <TransactionsList transactions={transactions} />
        </CardContainer>
    )
}

export default PaymentHistory