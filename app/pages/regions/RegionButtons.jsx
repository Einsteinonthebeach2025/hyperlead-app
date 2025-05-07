import Button from "app/components/buttons/Button";
import FlexBox from "app/components/containers/FlexBox";
import { setError } from "app/features/modalSlice";
import { selectUser, updateUserProfile } from "app/features/userSlice";
import { updateProfile } from "app/lib/actions/profileActions";
import regionsData from "app/localDB/regionsData";
import { useRouter } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const RegionButtons = ({ loading, selectedRegions, setLoading }) => {
  const user = useSelector(selectUser);
  const router = useRouter();
  const dispatch = useDispatch();

  const goHome = () => {
    router.push("/");
  };

  const updateRegions = async () => {
    setLoading(true);
    try {
      const allSelectedCountries = selectedRegions.reduce(
        (countries, region) => {
          return [...countries, ...regionsData[region]];
        },
        []
      );
      const { data, error } = await updateProfile(user.id, {
        region: allSelectedCountries,
      });
      if (error) {
        console.error("Update regions error:", error);
        dispatch(setError(error || "Failed to update regions"));
        return;
      }
      if (!data) {
        dispatch(setError("No data returned from update"));
        return;
      }
      dispatch(
        setError({
          message: "Regions updated successfully",
          type: "success",
        })
      );
      dispatch(updateUserProfile({ region: allSelectedCountries }));
      router.push("/");
    } catch (error) {
      console.error("Unexpected error in updateRegions:", error);
      dispatch(setError("An unexpected error occurred"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlexBox type="row-center" className="gap-4">
      <Button onClick={goHome} type="light">
        Skip Selection
      </Button>
      <Button
        type="light"
        text="Updating..."
        loading={loading}
        onClick={updateRegions}
        disabled={selectedRegions.length === 0 || loading}
      >
        <span>Update Regions</span>
        <IoIosArrowForward size={20} />
      </Button>
    </FlexBox>
  );
};

export default RegionButtons;
