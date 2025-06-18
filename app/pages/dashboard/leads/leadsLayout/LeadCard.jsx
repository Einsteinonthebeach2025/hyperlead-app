"use client"
import { AnimatePresence, motion } from "framer-motion";
import { truncateString } from "app/helpers/utils";
import FlexBox from "app/components/containers/FlexBox";
import SubTitle from "app/components/SubTitle";
import LeadLocation from "./leadsCardComponents/LeadLocation";
import LeadIndustry from "./leadsCardComponents/LeadIndustry";
import Link from "next/link";
import SectionHeadline from "app/components/SectionHeadline";
import CardContainer from "app/components/containers/CardContainer";
import LeadPersonsName from "./leadsCardComponents/LeadPersonsName";
import SendEmailButton from "app/components/buttons/SendEmailButton";
import LeadActionButtons from "./leadsCardComponents/LeadActionButtons";

const LeadCard = ({ leads, onLeadStatusChange, onLeadLikeChange, type, onLeadClick }) => {

  if (leads.length === 0) {
    return (
      <div className="h-screen center">
        <SectionHeadline title="No leads found" desc="No such leads are available" />
      </div>
    );
  }


  return (
    <div className="grid grid-cols-1 space-y-4 w-full">
      <AnimatePresence>
        {leads?.map((lead) => {
          const handleClick = (e) => {
            if (onLeadClick) {
              e.preventDefault(); // Prevent default Link navigation
              onLeadClick(lead.id);
            }
          };
          return (
            <Link
              href={`/dashboard/leads/${lead.id}`}
              key={lead.id}
              className="block"
              onClick={handleClick}
            >
              <motion.div
                initial={{ opacity: 0, rotateX: -90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                exit={{ opacity: 0, rotateX: 90 }}
                transition={{ duration: 0.5 }}
              >
                <CardContainer className={`grid grid-cols-[1.3fr_0.5fr_1.0fr_0.7fr_1.0fr_0.1fr] gap-3 place-content-center group relative h-20 group ${lead?.used ? "opacity-60" : ""
                  }`}>
                  <LeadPersonsName lead={lead} />
                  <FlexBox type="row-start" className="items-center">
                    <SubTitle>{lead?.seniority}</SubTitle>
                  </FlexBox>
                  <FlexBox type="row-start" className="items-center">
                    <SubTitle>
                      {truncateString(lead?.company_title, 60)}
                    </SubTitle>
                  </FlexBox>
                  <LeadLocation lead={lead} />
                  <LeadIndustry lead={lead} />
                  <FlexBox type="row" className="items-center gap-2" >
                    <SendEmailButton lead={lead} />
                    <LeadActionButtons lead={lead} type={type} onLeadStatusChange={onLeadStatusChange} onLeadLikeChange={onLeadLikeChange} />
                  </FlexBox>
                </CardContainer>
              </motion.div>
            </Link>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default LeadCard;
