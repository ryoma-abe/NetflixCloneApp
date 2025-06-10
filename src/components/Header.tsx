"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    const handleShow = () => {
      setShow(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleShow);
    return () => {
      window.removeEventListener("scroll", handleShow);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 w-full h-16 p-5 z-10 flex justify-between transition-all ease-in duration-500 ${
        show ? "bg-black" : ""
      }`}
    >
      <Image
        className="fixed left-5 w-20 object-contain"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
        width={80}
        height={30}
      />

      <Image
        className="fixed right-5 w-8 object-contain"
        src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
        alt="Avatar"
        width={32}
        height={32}
        onClick={() => setShowDropdown((prev) => !prev)}
      />
      {showDropdown && (
        <div className="absolute right-5 top-16 w-60 bg-black text-white rounded-md shadow-lg p-4 text-sm space-y-3">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
            <span>✏️</span>
            <span>プロフィールの管理</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
            <span>🔄</span>
            <span>プロフィールの移行</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
            <span>👤</span>
            <span>アカウント</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
            <span>❓</span>
            <span>ヘルプセンター</span>
          </div>
          <div className="border-t border-neutral-700 pt-3">
            <div className="cursor-pointer hover:opacity-80">ログアウト</div>
          </div>
        </div>
      )}
    </div>
  );
}
