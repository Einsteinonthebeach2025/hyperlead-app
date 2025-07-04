import { FaHome } from "react-icons/fa";
import Button from "./components/buttons/Button";
import Paragraph from "./components/Paragraph";
import SubTitle from "./components/SubTitle";

export default function NotFound() {
  return (
    <div className="center h-screen flex-col space-y-2">
      <h1
        className="text-9xl font-extrabold bg-cover bg-center bg-no-repeat text-transparent bg-clip-text"
        style={{
          backgroundImage: "url('/assets/space.jpg')",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        OOPS!
      </h1>
      <SubTitle>Page Not Found - 404</SubTitle>
      <Paragraph>Sorry, the page you are looking for does not exist.</Paragraph>
      <Button href="/">
        <FaHome />
        <span>Go Home</span>
      </Button>
    </div>
  );
}
