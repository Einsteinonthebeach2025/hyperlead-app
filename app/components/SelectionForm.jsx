import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Button from "app/components/buttons/Button";
import MotionContainer from "app/components/containers/MotionContainer";
import MotionChildren from "app/components/containers/MotionChildren";
import Logo from "app/components/Logo";
import ContentHeadline from "app/components/ContentHeadline";
import { selectUser, updateUserProfile } from "app/features/userSlice";
import { setError } from "app/features/modalSlice";
import { updateProfile } from "app/lib/actions/profileActions";
import { IoIosArrowForward } from "react-icons/io";
import GradientContainer from "app/components/containers/GradientContainer";
import FlexBox from "./containers/FlexBox";

const SelectionForm = ({
  data,
  title,
  className,
  description,
  initialSelections = [],
  updateField,
  onSuccess,
  successMessage,
  minSelections = 0,
  maxSelections = null,
  additionalComponents = null,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [selections, setSelections] = useState(initialSelections);

  const handleToggle = (item) => {
    setSelections((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      }
      return [...prev, item];
    });
  };

  const handleUpdate = async () => {
    if (selections.length < minSelections) {
      dispatch(setError(`Please select at least ${minSelections} items`));
      return;
    }
    if (maxSelections && selections.length > maxSelections) {
      dispatch(setError(`Please select at most ${maxSelections} items`));
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await updateProfile(user.id, {
        [updateField]: selections,
      });
      if (error) {
        dispatch(setError(error || `Failed to update ${updateField}`));
        return;
      }
      if (!data) {
        dispatch(setError("No data returned from update"));
        return;
      }
      dispatch(
        setError({
          message: successMessage || `${updateField} updated successfully`,
          type: "success",
        })
      );
      router.push("/")
      dispatch(updateUserProfile({ [updateField]: selections }));
      if (onSuccess) {
        await onSuccess(selections);
      }
    } catch (error) {
      dispatch(setError("An unexpected error occurred"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <MotionContainer
      animation="fade-in"
      className={`w-full center flex-col space-y-6 relative ${className}`}
    >
      <GradientContainer type="sky" />
      <Logo />
      {additionalComponents}
      <div className="w-full lg:w-[65%] space-y-5 relative z-[2]">
        <ContentHeadline
          type="column-center"
          className="text-center"
          title={title}
          desc={description}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(Array.isArray(data) ? data : Object.keys(data)).map((item) => {
            return (
              <Button
                key={item}
                onClick={() => handleToggle(item)}
                type={selections.includes(item) ? "blue" : ""}
                className="capitalize center"
              >
                {item}
              </Button>
            );
          })}
        </div>
      </div>
      <MotionChildren animation="fade-in">
        <FlexBox className="gap-3 relative z-[2]">
          {updateField === "region" ? <Button href="/" type="light"><span>Skip for now </span> <IoIosArrowForward size={20} /></Button> : "  "}
          <Button
            type="light"
            text="Updating..."
            loading={loading}
            onClick={handleUpdate}
            disabled={selections.length === 0 || loading}
          >
            <span>Update {updateField}</span>
            <IoIosArrowForward size={20} />
          </Button>
        </FlexBox>
      </MotionChildren>
    </MotionContainer>
  );
};

export default SelectionForm;
