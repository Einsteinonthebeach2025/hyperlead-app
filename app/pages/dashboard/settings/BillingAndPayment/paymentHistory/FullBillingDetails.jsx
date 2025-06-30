const FullBillingDetails = ({ transaction }) => {
    const address = transaction.payer_address || {};
    return (
        <div >
            <div className='space-y-1 text-sm'>
                <div><span className='font-light'>Created At:</span> {transaction.created_at}</div>
                <div><span className='font-light'>Address</span> {address.address_line_1 || ''}</div>
                <div><span className='font-light'>Country</span> {address.admin_area_1 || ''}</div>
                <div><span className='font-light'>City</span> {address.admin_area_2 || ''}</div>
                <div><span className='font-light'>Country Code:</span> {address.country_code || ''}</div>
                <div><span className='font-light'>Postal Code:</span> {address.postal_code || ''}</div>
                <div><span className='font-light'>Payer Email:</span> {transaction.payer_email}</div>
                <div><span className='font-light'>Payer Name:</span> {transaction.payer_name}</div>
                <div><span className='font-light'>PayPal Order ID:</span> {transaction.paypal_order_id}</div>
                <div><span className='font-light'>Plan Name:</span> {transaction.plan_name}</div>
                {transaction.seller_transaction_id && <div><span className='font-light'>Capture ID:</span> {transaction.seller_transaction_id || ''}</div>}
                <div><span className='font-light'>Status:</span> {transaction.status}</div>
            </div>
        </div>
    )
}

export default FullBillingDetails