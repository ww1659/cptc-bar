import { useClerk } from "@clerk/clerk-react";
import { Button } from "./ui/Button";

const SignInButton = () => {
  const { openSignIn } = useClerk();

  return (
    <Button
      className="bg-green-800 rounded-lg text-white hover:bg-green-900"
      onClick={() => openSignIn()}
    >
      Sign In
    </Button>
  );
};

export default SignInButton;
