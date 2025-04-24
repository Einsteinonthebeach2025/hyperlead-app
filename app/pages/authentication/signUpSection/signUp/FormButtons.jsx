import Button from "app/components/buttons/Button";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { MdAccountCircle } from "react-icons/md";

const FormButtons = ({ loading }) => {
  const router = useRouter();

  return (
    <div className="center flex-col space-y-3">
      <Button
        type="submit"
        text="creating account"
        loading={loading}
        disabled={loading}
      >
        <MdAccountCircle size={20} />
        <span>create account</span>
      </Button>
      <div className="relative w-full flex justify-center items-center before:absolute before:h-[1px] before:bg-neutral-500 before:w-full before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2">
        <span className="text-sm relative bg-white px-4">
          or continue with Google
        </span>
      </div>
      <Button type="light" onClick={() => router.push("/signup/preferences")}>
        <FcGoogle size={20} />
        <span>Sign in with GOOGLE</span>
      </Button>
    </div>
  );
};

export default FormButtons;
