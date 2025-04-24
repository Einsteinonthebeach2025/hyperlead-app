import Button from "app/components/buttons/Button";
import MotionChildren from "app/components/containers/MotionChildren";

const PrefList = ({ data, pref, setPref }) => {
  const togglePreference = (preference) => {
    if (pref.includes(preference)) {
      setPref(pref.filter((p) => p !== preference));
    } else {
      setPref([...pref, preference]);
    }
  };

  return (
    <MotionChildren
      animation="fade-in"
      className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl px-4"
    >
      {data?.map((preference) => (
        <Button
          key={preference}
          type={pref.includes(preference) ? "blue" : ""}
          className="capitalize center"
          onClick={() => togglePreference(preference)}
        >
          {preference}
        </Button>
      ))}
    </MotionChildren>
  );
};

export default PrefList;
