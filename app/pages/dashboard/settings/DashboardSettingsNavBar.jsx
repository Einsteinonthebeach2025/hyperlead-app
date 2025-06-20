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
              className={` px-2 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors duration-200 ${isActive
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-neutral-200 hover:bg-neutral-300  dark:bg-[#344c63] dark:hover:bg-[#476581] dark:text-neutral-200'
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