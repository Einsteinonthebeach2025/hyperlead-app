"use client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Spinner from 'app/components/Spinner';

const allTabs = [
  { name: 'Security', href: '/dashboard/settings/security' },
  { name: 'Billing and Payment', href: '/dashboard/settings/billing-and-payment' },
  { name: 'Change Password', href: '/dashboard/settings/change-my-password' },
];

const DashboardSettingsNavBar = () => {
  const pathname = usePathname();
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkProvider = async () => {
      try {
        const supabase = createClientComponentClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.app_metadata?.provider === 'google' || user?.identities?.some((id) => id.provider === 'google')) {
          setIsGoogleUser(true);
        }
      } finally {
        setLoading(false);
      }
    };
    checkProvider();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-10"><Spinner /></div>;
  }

  // Filter out Change Password if Google user
  const tabs = isGoogleUser
    ? allTabs.filter(tab => tab.name !== 'Change Password')
    : allTabs;

  return (
    <div className="flex items-center space-x-2 mt-2 mb-4">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link key={tab.name} href={tab.href}>
            <span
              className={`px-2 text-[10px] lg:text-sm font-medium rounded-lg text-black py-2 space-x-1 border cursor-pointer transition-colors duration-200 ${isActive
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