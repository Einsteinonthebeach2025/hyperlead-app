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
import MarkButton from "app/components/buttons/MarkButtons";
import LeadPersonsName from "./leadsCardComponents/LeadPersonsName";
import LeadLikeButton from "app/components/buttons/LeadLikeButton";
import AddToFavorite from "app/components/buttons/AddToFavorite";

const LeadCard = ({ leads, onLeadStatusChange, onLeadLikeChange, type }) => {

  if (leads.length === 0) {
    return (
      <SectionHeadline title="No leads found" desc="You have used all leads or no such leads are available" />
    );
  }


  return (
    <div className="grid grid-cols-1 space-y-4 w-full">
      <AnimatePresence>
        {leads?.map((lead) => {
          return (
            <Link
              href={`/dashboard/leads/${lead.id}`}
              key={lead.id}
              className="block"
            >
              <motion.div
                initial={{ opacity: 0, rotateX: -90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                exit={{ opacity: 0, rotateX: 90 }}
                transition={{ duration: 0.5 }}
              >
                <CardContainer className={`grid grid-cols-[1.3fr_0.7fr_1.0fr_0.8fr_1.0fr_0.1fr] gap-3 group relative h-28 group ${lead?.used ? "opacity-60" : ""
                  }`}>
                  <LeadPersonsName lead={lead} />
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
                  <FlexBox type="center-col" className="gap-1" >
                    {type === "favorite" ? " " : <MarkButton lead={lead} onStatusChange={onLeadStatusChange} />}
                    <LeadLikeButton lead={lead} onLeadLikeChange={onLeadLikeChange} />
                    <AddToFavorite lead={lead} />
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
