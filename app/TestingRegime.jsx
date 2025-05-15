"use client"
import SectionHeadline from './components/SectionHeadline'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'

const TestingRegime = () => {
  const user = useSelector(selectUser)
  const visitor = user?.profile?.is_admin === false

  if (!visitor) return null

  return (
    <div className='fixed inset-0 bg-black/70 z-[50] backdrop-blur-md center'>
      <SectionHeadline title={`Welcome ${user?.profile?.userName}`} desc="Application is in testing mode. we will notify you when it's ready" />
    </div>
  )
}


export default TestingRegime