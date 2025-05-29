import { truncateString } from "app/helpers/utils";
import EmployeesCount from "./EmployeesCount";
import FlexBox from "app/components/containers/FlexBox";
import Link from "next/link";
import MotionContainer from "app/components/containers/MotionContainer";

const EmployeesList = ({ data }) => {
  return (
    <div className="mt-2 space-y-2">
      {data?.map((item) => {
        return (
          <MotionContainer key={item.id} animation="fade-in">
            <FlexBox
              type="column"
              className="bg-blue-100/50 dark:bg-blue-900/50 hover:bg-blue-100 hover:dark:bg-blue-900 duration-300 rounded-lg px-2 py-1"
            >
              <Link href={`/dashboard/leads/${item.id}`}>
                <h1 className="font-bold text-[13px] capitalize dark:text-stone-200">
                  {truncateString(item.company_title, 30)}
                </h1>
                <EmployeesCount item={item} />
              </Link>
            </FlexBox>
          </MotionContainer>
        );
      })}
    </div>
  );
};

export default EmployeesList;
