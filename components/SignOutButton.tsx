import { useClerk } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";

const SignOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <Button
      className="border border-green-800 text-green"
      onClick={() => signOut(() => router.push("/"))}
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
