import DashboardPageWrapper from 'app/components/containers/DashboardPageWrapper'
import SectionHeadline from 'app/components/SectionHeadline';
import LeadCard from '../leads/leadsLayout/LeadCard';

const FavoriteLeads = ({ data, title, desc }) => {
    console.log(data);


    if (data.length === 0) {
        return (
            <SectionHeadline title={title} desc={desc} />
        )
    }

    return (
        <DashboardPageWrapper title="Favorite Leads">
            <LeadCard leads={data} />
        </DashboardPageWrapper>
    )
}

export default FavoriteLeads