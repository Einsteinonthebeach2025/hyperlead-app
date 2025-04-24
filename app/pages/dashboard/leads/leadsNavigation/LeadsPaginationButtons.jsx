import FlexBox from "app/components/containers/FlexBox";
import SpanContainer from "app/components/containers/SpanContainer";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";

const LeadsPaginationButtons = ({
  currentPage,
  totalPages,
  onPageChange,
  allLeads,
  leadsPerPage,
}) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <FlexBox type="column" className="space-y-2 pl-1">
      <span className="text-sm text-sky-600 font-light italic ">
        Showing {leadsPerPage} of {allLeads?.length} leads
      </span>
      <FlexBox type="row-start" className="gap-2 justify-start">
        <SpanContainer
          type="light"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="disabled:cursor-not-allowed rounded-lg cursor-pointer"
        >
          <FaCaretLeft size={20} />
        </SpanContainer>
        <span className="text-sm font-semibold">
          {currentPage} of {totalPages}
        </span>
        <SpanContainer
          type="light"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="disabled:cursor-not-allowed rounded-lg cursor-pointer"
        >
          <FaCaretRight size={20} />
        </SpanContainer>
      </FlexBox>
    </FlexBox>
  );
};

export default LeadsPaginationButtons;
