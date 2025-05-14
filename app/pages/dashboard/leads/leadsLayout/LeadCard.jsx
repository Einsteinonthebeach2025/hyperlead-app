import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import FlexBox from "app/components/containers/FlexBox";
import SubTitle from "app/components/SubTitle";
import LeadPesronsName from "./leadsCardComponents/LeadPersonsName";
import LeadLocation from "./leadsCardComponents/LeadLocation";
import LeadIndustry from "./leadsCardComponents/LeadIndustry";
import { truncateString } from "app/helpers/utils";
import { updateLeadUsedStatus } from "app/lib/actions/leadActions";
import { notifyLeadsUsage } from "app/lib/actions/notificationActions";

const LeadCard = ({ leads, onLeadStatusChange }) => {
  const router = useRouter();

  const handleLeadClick = async (leadId) => {
    try {
      const result = await updateLeadUsedStatus(leadId);
      if (!result.success) {
        return;
      }
      await notifyLeadsUsage();
      router.push(`/dashboard/leads/${leadId}`);
    } catch (error) {
      console.error("Error handling lead click:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 space-y-4 w-full ">
      <AnimatePresence>
        {leads?.map((lead) => {
          return (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, rotateX: -90 }}
              animate={{ opacity: 1, rotateX: 0 }}
              exit={{ opacity: 0, rotateX: 90 }}
              transition={{ duration: 0.5 }}
              onClick={() => handleLeadClick(lead.id)}
            >
              <div
                className={`grid grid-cols-[1.3fr_0.7fr_1.0fr_0.8fr_1.0fr] cursor-pointer gap-3 p-3 h-24 primary-border relative hover:border-neutral-400 rounded-xl duration-300 light-gradient group ${
                  lead?.used ? " opacity-50" : ""
                }`}
              >
                <LeadPesronsName
                  lead={lead}
                  onStatusChange={onLeadStatusChange}
                />
                <FlexBox>
                  <SubTitle>{lead?.seniority}</SubTitle>
                </FlexBox>
                <FlexBox>
                  <SubTitle className="text-center">
                    {truncateString(lead?.company_title, 60)}
                  </SubTitle>
                </FlexBox>
                <LeadLocation lead={lead} />
                <LeadIndustry lead={lead} />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default LeadCard;
