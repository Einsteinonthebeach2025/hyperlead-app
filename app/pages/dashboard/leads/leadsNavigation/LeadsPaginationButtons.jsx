"use client"
import FlexBox from "app/components/containers/FlexBox";
import IconContainer from "app/components/containers/IconContainer";
import SpanText from "app/components/SpanText";
import {
  FaCaretRight,
  FaCaretLeft,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaEllipsisH
} from "react-icons/fa";

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

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }
    rangeWithDots.push(...range);
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }
    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();
  const startIndex = (currentPage - 1) * leadsPerPage + 1;
  const endIndex = Math.min(currentPage * leadsPerPage, allLeads?.length || 0);

  return (
    <FlexBox type="column" className="space-y-2 pl-1">
      <div className="flex items-center justify-between">
        <span className="text-sm text-sky-600 font-light italic">
          Showing {startIndex}-{endIndex} of {allLeads?.length || 0} leads
        </span>
        {totalPages > 1 && (
          <SpanText>Page {currentPage} of {totalPages}</SpanText>
        )}
      </div>

      {totalPages > 1 && (
        <FlexBox type="row-start" className="gap-1">
          <IconContainer
            size="sm"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="rounded-md">
            <FaAngleDoubleLeft size={16} />
          </IconContainer>

          <IconContainer
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-md"
          >
            <FaCaretLeft size={18} />
          </IconContainer>

          {visiblePages.map((page, index) => (
            <div key={index} className="center ">
              {page === '...' ? (
                <FaEllipsisH size={12} />
              ) : (
                <IconContainer
                  size="sm"
                  className="rounded-md"
                  color={currentPage === page ? 'violet' : 'dark'}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </IconContainer>
              )}
            </div>
          ))}

          <IconContainer
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-md"
          >
            <FaCaretRight size={18} />
          </IconContainer>
          <IconContainer
            size="sm"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="rounded-md"
          >
            <FaAngleDoubleRight size={16} />
          </IconContainer>
        </FlexBox>
      )}
    </FlexBox>
  );
};

export default LeadsPaginationButtons;
