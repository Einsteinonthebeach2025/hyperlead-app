import FlexBox from "app/components/containers/FlexBox";
import { IoCameraOutline } from "react-icons/io5";

const EditWallpaperBtn = ({ setIsModalOpen }) => {
  return (
    <FlexBox
      onClick={() => setIsModalOpen(true)}
      type="row-1"
      className="bg-blue-700 text-sm absolute right-3 top-3 md:top-auto md:bottom-3 rounded-sm px-2 py-1 text-white cursor-pointer hover:bg-blue-800 transition-all"
    >
      <IoCameraOutline size={20} />
      <span>Edit</span>
    </FlexBox>
  );
};

export default EditWallpaperBtn;
