import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="font-bold text-2xl dark:text-stone-300 relative z-[2] space-x-1 center items-center">
      <div className="w-10 h-10">
        <Image src="/assets/icon.png" alt="HyperLead" width={100} height={100} />
      </div>
      <h1>
        HyperLead
      </h1>
    </Link>
  );
};

export default Logo;
