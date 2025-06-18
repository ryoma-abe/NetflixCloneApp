"use client";

import Image from "next/image";
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
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
          alt="Netflix Logo"
          width={80}
          height={30}
          className="object-contain"
        />
      </Link>

      <div className="relative">
        <Image
          src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
          alt="Avatar"
          width={32}
          height={32}
          className="w-8 h-8 cursor-pointer object-cover"
          onClick={() => setShowDropdown((prev) => !prev)}
        />
        {showDropdown && (
          <div className="absolute right-0 mt-3 w-60 rounded-md bg-black text-white shadow-lg p-4 text-sm space-y-3">
            <LoginButton />
          </div>
        )}
      </div>
    </div>
  );
}
