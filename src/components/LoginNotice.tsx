"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";

export function LoginNotice() {
  const { status } = useSession(); // authenticated | unauthenticated | loading
  const shown = useRef(false); // 同じセッションで1回だけ出す

  useEffect(() => {
    if (status === "authenticated" && !shown.current) {
      toast.success("ログインしました");
      shown.current = true;
    }
  }, [status]);

  return null; // 画面には何も描画しない
}
