"use client";
import ToggleSwitch from 'app/components/ToggleSwitch';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleView, selectViewBossData, setView } from 'app/features/dashboardSlice';
import { selectUser } from 'app/features/userSlice';
import { useRouter, usePathname } from 'next/navigation';
import SpanText from 'app/components/SpanText';
import FlexBox from 'app/components/containers/FlexBox';

const ToggleDashboardData = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const viewBossData = useSelector(selectViewBossData);
  const user = useSelector(selectUser);
  const isAssistant = user?.profile?.is_assistant;

  useEffect(() => {
    const cookies = document.cookie.split(';');
    const viewBossDataCookie = cookies.find(cookie => cookie.trim().startsWith('viewBossData='));
    if (viewBossDataCookie) {
      const value = viewBossDataCookie.split('=')[1] === 'true';
      dispatch(setView(value));
    } else {
      // If cookie is not set, default to false (view own dashboard)
      dispatch(setView(false));
    }
  }, [dispatch]);

  const handleToggle = () => {
    dispatch(toggleView());

    // Set cookie for server-side access
    document.cookie = `viewBossData=${!viewBossData}; path=/`;

    // For activities pages (parallel routes), use router.refresh()
    if (pathname.includes('/activities')) {
      router.refresh();
    } else {
      // For other pages, force a full page refresh
      window.location.reload();
    }
  };

  if (isAssistant) {
    return (
      <FlexBox type="row-start" className="items-center gap-2 w-full">
        <ToggleSwitch
          checked={viewBossData}
          onChange={handleToggle}
        />
        <div className="w-[70%]">
          {viewBossData ? <SpanText>Currently you are viewing your supervisor's dashboard.</SpanText> : <SpanText>You are currently viewing your personal dashboard.</SpanText>}
        </div>
      </FlexBox>
    );
  }

  return null;
};

export default ToggleDashboardData;