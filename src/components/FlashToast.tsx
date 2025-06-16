"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function FlashToast() {
  const search = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // ?flash=login または ?flash=logout を拾う
    const flash = search.get("flash");
    if (!flash) return;

    if (flash === "login") {
      toast.success("ログインしました");
    } else if (flash === "logout") {
      toast("ログアウトしました");
    }

    // URL から flash パラメータを除去して履歴を汚さない
    const params = new URLSearchParams(search);
    params.delete("flash");
    router.replace(`/?${params.toString()}`, { scroll: false });
  }, [search, router]);

  return null;
}
