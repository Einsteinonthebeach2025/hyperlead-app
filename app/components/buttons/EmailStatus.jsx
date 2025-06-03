import FlexBox from '../containers/FlexBox'

const EmailStatus = ({ item }) => {

  return (
    <FlexBox type="column" className="text-[12px] font-medium gap-2 *:border-2 *:px-2 *:rounded-sm w-20 *:text-center pointer-events-none">
      {item?.delivered ? (
        <span className="border-green-500 text-green-500 dark:text-green-400 bg-green-100 dark:bg-green-900">
          Delivered
        </span>
      ) : (
        <span className="border-red-500 text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900">Pending</span>
      )}
      {item?.opened_at ? (
        <span className="border-sky-500 text-sky-500 dark:text-sky-400 bg-sky-100 dark:bg-sky-900">
          Opened
        </span>
      ) : (
        <span className="border-amber-500 text-amber-500 dark:text-amber-400 bg-amber-100 dark:bg-amber-900">Unopened</span>
      )}
    </FlexBox>
  )
}

export default EmailStatus