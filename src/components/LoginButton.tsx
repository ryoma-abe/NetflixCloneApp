import { useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return 
  }
  return <div>LoginButton</div>;
}
