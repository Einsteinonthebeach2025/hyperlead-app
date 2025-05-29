import Link from "next/link";

const Logo = () => {
  return (
    <div>
      <Link href="/" className="font-bold text-2xl dark:text-stone-300 relative z-[2]">
        HyperLead
      </Link>
    </div>
  );
};

export default Logo;
