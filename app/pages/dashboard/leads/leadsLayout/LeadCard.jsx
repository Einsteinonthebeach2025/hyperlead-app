"use client"
import { AnimatePresence, motion } from "framer-motion";
import FlexBox from "app/components/containers/FlexBox";
import LeadLocation from "./leadsCardComponents/LeadLocation";
import LeadIndustry from "./leadsCardComponents/LeadIndustry";
import Link from "next/link";
import SectionHeadline from "app/components/SectionHeadline";
import CardContainer from "app/components/containers/CardContainer";
import LeadPersonsName from "./leadsCardComponents/LeadPersonsName";
import SendEmailButton from "app/components/buttons/SendEmailButton";
import LeadActionButtons from "./leadsCardComponents/LeadActionButtons";
import LeadLikeButton from "app/components/buttons/LeadLikeButton";
import MarkButton from "app/components/buttons/MarkButtons";

const LeadCard = ({ leads, onLeadStatusChange, onLeadLikeChange, type, onLeadClick }) => {

  if (leads.length === 0) {
    return (
      <div className="h-screen center">
        <SectionHeadline title="No leads found" desc="No such leads are available" />
      </div>
    );
  }

  const colorThemes = ["violet", "green", "blue"];

  return (
    <div className="grid grid-cols-1 space-y-4 w-full py-5">
      <AnimatePresence>
        {leads?.map((lead, index) => {
          const colorTheme = colorThemes[index % colorThemes.length];
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
                <CardContainer className={`grid grid-cols-[1.7fr_0.3fr_1.2fr_1.5fr_0.8fr] gap-3 place-content-center group relative h-20 group ${lead?.used ? "opacity-60" : ""
                  }`}>
                  <LeadPersonsName lead={lead} colorTheme={colorTheme} />
                  <FlexBox type="row-start" className="items-center">
                    <h1 className="text-xs font-medium dark:text-white">{lead?.seniority}</h1>
                  </FlexBox>
                  <LeadLocation lead={lead} colorTheme={colorTheme} />
                  <LeadIndustry lead={lead} />
                  <FlexBox type="row" className="items-center gap-2" >
                    <SendEmailButton lead={lead} />
                    {type === "favorite" ? null : (
                      <MarkButton lead={lead} onStatusChange={onLeadStatusChange} />
                    )}
                    <LeadLikeButton lead={lead} onLeadLikeChange={onLeadLikeChange} />
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
