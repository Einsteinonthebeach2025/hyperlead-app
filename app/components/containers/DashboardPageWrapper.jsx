"use client"
import MotionContainer from './MotionContainer'
import Title from '../Title'

const DashboardPageWrapper = ({ title, children }) => {
    return (
        <div className="py-3 px-3 lg:pr-6 min-h-screen">
            <MotionContainer animation="fade-in">
                <Title className="w-fit">{title}</Title>
            </MotionContainer>
            {children}
        </div>
    )
}

export default DashboardPageWrapper

