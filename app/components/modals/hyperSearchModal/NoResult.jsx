import FlexBox from "app/components/containers/FlexBox";
import IconContainer from "app/components/containers/IconContainer";
import Paragraph from "app/components/Paragraph";
import { FaExclamationTriangle } from "react-icons/fa";

const NoResult = ({ loading, hasSearched, results, query }) => {
    return (
        <>
            {!loading && hasSearched && results.length === 0 && (
                <div className="p-4 border border-blue-300 rounded-lg bg-blue-500/10 *:text-blue-500">
                    <FlexBox type="row-start" className="items-center gap-2">
                        <IconContainer size="sm">
                            <FaExclamationTriangle />
                        </IconContainer>
                        <h3 className="text-lg font-semibold">No Results Found</h3>
                    </FlexBox>
                    <Paragraph>We couldn't find any leads for "{query}". Try a different company name.</Paragraph>
                </div>
            )}
        </>
    )
}

export default NoResult