"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoginButton from "./LoginButton";

export default function Header() {
  const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const pathname = usePathname();

  // スクロールイベントでヘッダー色変更
  useEffect(() => {
    const handleShow = () => {
      setShow(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleShow);
    return () => {
      window.removeEventListener("scroll", handleShow);
    };
  }, []);

  // パスが変わったらドロップダウンを閉じる
  useEffect(() => {
    setShowDropdown(false);
  }, [pathname]);

  return (
    <div
      className={`fixed inset-x-0 top-0 z-10 h-16 px-5 flex items-center justify-between transition-colors duration-500 ${
        show ? "bg-black" : ""
      }`}
    >
      <Link href="/">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-red-600">STREAMFLIX</div>
        </div>
      </Link>

      <div className="relative">
        <div 
          className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-500 transition-colors"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
        {showDropdown && (
          <div className="absolute right-0 mt-3 w-60 rounded-md bg-black text-white shadow-lg p-4 text-sm space-y-3">
            <LoginButton />
          </div>
        )}
      </div>
    </div>
  );
}
