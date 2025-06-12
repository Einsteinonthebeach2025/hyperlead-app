"use client"
import FeebackSlider from "./feedbackSection/FeebackSlider";
import Hero from "./heroSection/Hero";
import Faq from "./faqSection/Faq";
import Pricing from "./pricingSection/Pricing";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToggle } from "app/features/modalSlice";
import supabase from "app/lib/config/supabaseClient";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLeadsMeta = async () => {
      const { data, error } = await supabase
        .from("leads_meta")
        .select("total_count, added_leads, last_update_id")
        .single();

      const lastSeenUpdateId = localStorage.getItem("lastSeenUpdateId");

      if (
        data &&
        data.added_leads &&
        data.added_leads > 0 &&
        data.last_update_id !== lastSeenUpdateId
      ) {
        dispatch(
          setToggle({
            modalType: "global",
            isOpen: true,
            data: {
              title: "hyperlead increased",
              desc: `we have fresh new ${data.added_leads} leads added.`,
            },
          })
        );

        // mark this update as seen
        localStorage.setItem("lastSeenUpdateId", data.last_update_id);
      }
    };

    checkLeadsMeta();
  }, [dispatch]);


  return (
    <main className="center flex-col space-y-20">
      <Hero />
      <FeebackSlider />
      <Pricing />
      <Faq />
    </main>
  );
};

export default HomePage;
