import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

const UserDisplayAvatar = ({ url, className, type, plan }) => {

  const getGradient = (plan) => {
    switch (plan) {
      case "PRO":
        return "bg-gradient-to-r from-cyan-200 to-sky-600 text-sky-500";
      case "PLUS":
        return "bg-gradient-to-r from-violet-400 to-blue-600 text-violet-500";
      case "HYPER":
        return "bg-gradient-to-r from-teal-300 to-teal-500 text-teal-500";
    }
  };

  const gradient = getGradient(plan);

  return (
    <div className={`${gradient} rounded-full p-[2px] relative`}>
      {url ? (
        <div className="rounded-full">
          <div className={`rounded-full overflow-hidden bg-white dark:bg-neutral-900 mr-[0.5px] mb-[0.5px] ${className}`}>
            <Image
              className="w-full h-full object-cover"
              src={url}
              alt="user-avatar"
              width={200}
              height={200}
              quality={85}
              priority
            />
          </div>
        </div>
      ) : (
        <div>
          <FaUserCircle className="text-gray-400 w-10 h-10" />
        </div>
      )}
      <PlanBadge plan={plan} type={type} gradient={gradient} />

    </div>
  );
};

const PlanBadge = ({ plan, type, gradient }) => {
  if (type === "PRO" && type === "HYPER") return;

  return (
    <div className={`absolute -bottom-1 -right-5 rounded-full p-[2px] ${gradient}`}>
      <div className="rounded-full px-2 bg-white dark:bg-[#1d2939] text-[9px] font-bold mt-[0.5px]">
        {plan}
      </div>
    </div>
  );
};

export default UserDisplayAvatar;
