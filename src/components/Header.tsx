"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [show, setShow] = useState(false);
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
      />
    </div>
  );
}
