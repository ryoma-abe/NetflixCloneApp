"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="space-y-3 text-sm">
        <p className="text-neutral-300">
          ログイン中: <span className="font-medium">{session.user?.email}</span>
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => signOut()}
            className="rounded bg-neutral-800 px-4 py-1 hover:bg-neutral-700"
          >
            ログアウト
          </button>

          <Link
            href="/favorites"
            className="flex items-center gap-1 rounded bg-neutral-800 px-4 py-1 hover:bg-neutral-700"
          >
            <span>♥</span>
            <span>お気に入り</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="rounded bg-red-600 px-4 py-1 text-white hover:bg-red-500"
    >
      Googleでログイン
    </button>
  );
}
