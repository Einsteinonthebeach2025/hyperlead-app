"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const tabs = [
  { name: 'Security', href: '/dashboard/settings/security' },
  { name: 'Change Password', href: '/dashboard/settings/change-my-password' },
  { name: 'Billing and Payment', href: '/dashboard/settings/billing-and-payment' },
];

const DashboardSettingsNavBar = () => {

  const pathname = usePathname();

  return (
    <div className="flex items-center space-x-2 mt-2 mb-4">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link key={tab.name} href={tab.href}>
            <span
              className={` px-2 text-sm font-medium rounded-lg text-black py-2 space-x-1 border cursor-pointer transition-colors duration-200 ${isActive
                ? 'bg-sky-300/50 hover:bg-sky-300 dark:bg-sky-400 border-sky-500'
                : 'bg-neutral-200 hover:bg-neutral-300  dark:bg-[#344c63] dark:hover:bg-[#476581] dark:text-neutral-200 primary-border'
                }`}
            >
              {tab.name}
            </span>
          </Link>
        );
      })}
    </div>
  )
}

export default DashboardSettingsNavBar