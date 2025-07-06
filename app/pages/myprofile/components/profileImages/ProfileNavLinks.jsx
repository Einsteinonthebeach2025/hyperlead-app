import CardContainer from 'app/components/containers/CardContainer'
import Link from 'next/link'

const ProfileNavLinks = () => {
    return (
        <CardContainer className='w-full mb-2'>
            <div className='space-x-3 *:text-[10px] lg:*:text-sm *:text-neutral-600 dark:*:text-neutral-300 dark:*:hover:text-neutral-100 *:hover:text-black *:duration-300'>
                <Link href="/preferences">Industry Preferences</Link>
                <Link href="/regions">Lead Regions</Link>
                <Link href="/dashboard/activities">Dashboard</Link>
            </div>
        </CardContainer>
    )
}

export default ProfileNavLinks