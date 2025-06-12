"use client"
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CardContainer from "app/components/containers/CardContainer";
import LeadDetails from "./cardComponents/LeadDetails";
import EmailDetails from "./cardComponents/EmailDetails";
import EmailDate from "./cardComponents/EmailDate";

const EmailCard = ({ data }) => {
  const [emails, setEmails] = useState(data);

  const handleDelete = (emailId) => {
    setEmails((prevEmails) =>
      prevEmails.filter((email) => email.id !== emailId)
    );
  };

  console.log(emails, " emails");


  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {emails.map((item) => {
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 1 }}
              exit={{ rotateX: 90 }}
              transition={{ duration: 0.5 }}
            >
              <CardContainer className="space-y-3">
                <LeadDetails item={item} onDelete={handleDelete} />
                <EmailDetails item={item} />
                <EmailDate item={item} />
              </CardContainer>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default EmailCard;
