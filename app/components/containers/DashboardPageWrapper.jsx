import MotionContainer from './MotionContainer'
import Headline from '../Headline'

const DashboardPageWrapper = ({ title, children }) => {
    return (
        <div className="py-3 lg:pr-6 space-y-3">
            <MotionContainer animation="fade-in">
                <Headline className="w-fit">{title}</Headline>
            </MotionContainer>
            {children}
        </div>
    )
}

export default DashboardPageWrapper

