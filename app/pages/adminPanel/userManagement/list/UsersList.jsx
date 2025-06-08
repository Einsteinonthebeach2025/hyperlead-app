import CardContainer from 'app/components/containers/CardContainer'
import UserInfoDetails from './components/UserInfoDetaiils'
import ActionButtons from './components/ActionButtons'
import SectionHeadline from 'app/components/SectionHeadline';
import { AnimatePresence, motion } from 'framer-motion';

const UsersList = ({ data }) => {

  if (!data || data.length === 0) {
    return (
      <div className="h-screen center">
        <SectionHeadline
          title="No user found"
          desc="No user with this subscription"
        />
      </div>
    );
  }

  return (
    <div className='space-y-3'>
      <AnimatePresence>
        {data.map((item) => {
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, rotateX: -90 }}
              animate={{ opacity: 1, rotateX: 0 }}
              exit={{ opacity: 0, rotateX: 90 }}
              transition={{ duration: 0.5 }}
            >
              <CardContainer className="space-y-2">
                <UserInfoDetails item={item} />
                <ActionButtons item={item} />
              </CardContainer>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default UsersList