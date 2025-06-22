import Paragraph from 'app/components/Paragraph'
import Spinner from 'app/components/Spinner'

const ProcessingSection = ({ loading }) => {
    return (
        <>
            {loading ? (
                <div className="center flex-col py-4">
                    <Spinner />
                    <Paragraph className="mt-2">Processing your payment...</Paragraph>
                </div>
            ) : null}
        </>
    )
}

export default ProcessingSection