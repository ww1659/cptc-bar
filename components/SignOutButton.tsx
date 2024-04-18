import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";

const SignOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <Button
      className="bg-green-800 rounded-lg text-white hover:bg-green-900"
      onClick={() => signOut(() => router.push("/"))}
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
