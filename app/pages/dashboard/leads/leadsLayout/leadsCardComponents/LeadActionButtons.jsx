import AddToFavorite from 'app/components/buttons/AddToFavorite'
import FlexBox from 'app/components/containers/FlexBox'
import HoverModal from 'app/components/modals/HoverModal'
import { HiDotsHorizontal } from "react-icons/hi";
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import MotionContainer from 'app/components/containers/MotionContainer';

// MORe section for future use

const LeadActionButtons = ({ lead }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleDotsClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
    setIsHovered(false)
  };

  return (
    <FlexBox className='gap-1 relative'>
      <div className="relative">
        <FlexBox
          onClick={handleDotsClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="cursor-pointer text-blue-600 hover:text-blue-800"
        >
          <HiDotsHorizontal size={20} />
          <HoverModal
            isOpen={isHovered}
            text="More"
            className="-top-7 right-0"
          />
        </FlexBox>
        <AnimatePresence>
          {isDropdownOpen && (
            <MotionContainer
              animation="fade-in"
              className="absolute right-0 top-8 bg-white dark:bg-[#151e27] rounded-md shadow-lg p-2 z-20 min-w-[120px]"
              onClick={(e) => e.stopPropagation()}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
            </MotionContainer>
          )}
        </AnimatePresence>
      </div>
    </FlexBox>
  )
}

export default LeadActionButtons