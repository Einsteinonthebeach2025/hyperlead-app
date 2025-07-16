"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { infinityScroll } from "app/animationValues/motionVariants";
import logoData from "app/localDB/companyLogos";
import Title from "app/components/Title";

const LogoSlider = () => {
  return (
    <section className="w-full overflow-hidden relative center flex-col space-y-8">
      <Title className="text-center px-10" >Our Lead Database Includes Decision-Makers from These Companies</Title>
      <div className="absolute top-0 left-0 w-[15%] h-full bg-gradient-to-r dark:from-[#151e27] from-white from-30% to-transparent pointer-events-none z-[5]" />
      <div className="absolute top-0 right-0 w-[15%] h-full bg-gradient-to-l dark:from-[#151e27] from-white from-10% to-transparent pointer-events-none z-[5]" />
      <div className="flex items-center w-max relative">
        <motion.div
          variants={infinityScroll}
          initial="hidden"
          animate="visible"
          className="flex items-center"
        >
          {logoData?.map((item, index) => {
            return (
              <div key={index}>
                <Image src={item} alt="pic" className="w-28 mx-6" />
              </div>
            );
          })}
        </motion.div>
        <motion.div
          variants={infinityScroll}
          initial="hidden"
          animate="visible"
          className="flex items-center"
        >
          {logoData?.map((item, index) => {
            return (
              <div key={index}>
                <Image src={item} alt="pic" className="w-28 mx-6" />
              </div>
            );
          })}
        </motion.div>
        <motion.div
          variants={infinityScroll}
          initial="hidden"
          animate="visible"
          className="flex items-center"
        >
          {logoData?.map((item, index) => {
            return (
              <div key={index}>
                <Image src={item} alt="pic" className="w-28 mx-6" />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default LogoSlider;
