import Paragraph from 'app/components/Paragraph'
import SubTitle from 'app/components/SubTitle'
import Title from 'app/components/Title'

const PlanDetails = ({ plan }) => {
  return (
    <>
      <div className="bg-gray-100 dark:bg-[#1d2939] rounded-lg p-4">
        <Title className="text-xl mb-2">{plan.name} Plan</Title>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <SubTitle>Price:</SubTitle>
            <span className="text-2xl font-bold text-green-600">${plan.price}</span>
          </div>
          <div className="flex justify-between items-center">
            <SubTitle>Leads per month:</SubTitle>
            <span className="font-semibold dark:text-white">{plan.leads} leads</span>
          </div>
          <div className="flex justify-between items-center">
            <SubTitle>Description:</SubTitle>
            <span className="text-sm text-gray-600 dark:text-gray-400">{plan.description}</span>
          </div>
        </div>
      </div>
      <div>
        <SubTitle>Complete Payment</SubTitle>
        <Paragraph>
          You'll receive {plan.leads} leads after completing payment.
        </Paragraph>
      </div>
    </>
  )
}

export default PlanDetails