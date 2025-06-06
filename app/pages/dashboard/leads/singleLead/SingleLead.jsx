"use client"
import LeadHeader from "./leadComponents/LeadHeader";
import LeadCompanyInfo from "./leadComponents/LeadCompanyInfo";
import PersonContact from "./leadComponents/PersonContact";
import CompanyStats from "./leadComponents/CompanyStats";
import { updateLeadUsedStatus } from "app/lib/actions/leadActions";
import { notifyLeadsUsage, notifyLeadsFinished } from "app/lib/actions/notificationActions";
import { useEffect, useRef } from "react";

const SingleLead = ({ data = {} }) => {
  const notifiedRef = useRef(false);

  useEffect(() => {
    const markAsUsed = async () => {
      try {
        const result = await updateLeadUsedStatus(data.id, true);
        if (result.success && !notifiedRef.current) {
          notifiedRef.current = true;
          await notifyLeadsUsage();
          await notifyLeadsFinished();
        } else {
        }
      } catch (error) {
        console.error("Error in markAsUsed:", error);
      }
    };
    if (data?.id) {
      markAsUsed();
    }
  }, [data?.id]);

  return (
    <div className="max-w-7xl mx-auto pt-5 grid gap-4">
      <LeadHeader data={data} />
      <div className="grid gap-4">
        <LeadCompanyInfo data={data} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PersonContact data={data} />
          <CompanyStats data={data} />
        </div>
      </div>
    </div>
  );
};

export default SingleLead;
