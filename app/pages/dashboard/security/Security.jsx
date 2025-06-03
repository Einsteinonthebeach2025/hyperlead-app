import DashboardPageWrapper from "app/components/containers/DashboardPageWrapper"
import GoogleAuthenticator from "./googleAuthenticator/GoogleAuthenticator"

const Security = () => {
    return (
        <DashboardPageWrapper title="Account security">
            <GoogleAuthenticator />
        </DashboardPageWrapper>
    )
}

export default Security

