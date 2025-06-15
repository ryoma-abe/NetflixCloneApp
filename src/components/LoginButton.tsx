"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        <p>ログイン中: {session.user?.email}</p>
        <button onClick={() => signOut()}>ログアウト</button>
      </div>
    );
  }
  return <button onClick={() => signIn("google")}>Googleでログイン</button>;
}
