"use client"
import { useState } from 'react'
import { deleteNotification } from 'app/lib/actions/notificationActions'
import { AnimatePresence, motion } from 'framer-motion'
import { formatTime } from 'app/helpers/utils'
import Delete from 'app/components/buttons/Delete'
import CardContainer from 'app/components/containers/CardContainer'
import Importance from 'app/components/Importance'
import Paragraph from 'app/components/Paragraph'
import SpanText from 'app/components/SpanText'
import SubTitle from 'app/components/SubTitle'

const List = ({ data: initialData }) => {
  const [data, setData] = useState(initialData);

  const handleDelete = async (notificationId) => {
    const { error } = await deleteNotification(notificationId);
    if (error) {
      console.error("Error deleting notification:", error);
      return;
    }
    setData(prevData => prevData.filter(item => item.id !== notificationId));
  };

  return (
    <div className='space-y-3'>
      <AnimatePresence mode="popLayout" >
        {data.map((item) => {
          return <motion.div key={item.id}
            initial={{ opacity: 1 }}
            exit={{ rotateX: 90 }}
            transition={{ duration: 0.5 }}>
            <CardContainer>
              <SubTitle color="gold" className='w-fit'>{item.type}</SubTitle>
              <Importance item={item?.importance} />
              <Paragraph>{item.message}</Paragraph>
              <SpanText>{formatTime(item.created_at)}</SpanText>
              <Delete
                id={item.id}
                onDelete={handleDelete}
                type="notification"
              />
            </CardContainer>
          </motion.div>
        })}
      </AnimatePresence>
    </div>
  )
}

export default List