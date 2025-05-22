"use client"
import { AnimatePresence, motion } from "framer-motion";
import FlexBox from "app/components/containers/FlexBox";
import SubTitle from "app/components/SubTitle";
import LeadPesronsName from "./leadsCardComponents/LeadPersonsName";
import LeadLocation from "./leadsCardComponents/LeadLocation";
import LeadIndustry from "./leadsCardComponents/LeadIndustry";
import { truncateString } from "app/helpers/utils";
import Link from "next/link";
import SectionHeadline from "app/components/SectionHeadline";

const LeadCard = ({ leads, onLeadStatusChange }) => {

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
                <div
                  className={`grid grid-cols-[1.3fr_0.7fr_1.0fr_0.8fr_1.0fr] cursor-pointer gap-3 p-3 h-24 primary-border relative hover:border-neutral-400 rounded-xl duration-300 light-gradient group ${lead?.used ? "opacity-50" : ""
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
            </Link>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default LeadCard;
