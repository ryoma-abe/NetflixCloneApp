import { useEffect, useState } from "react";

export default function Header() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handleShow = () => {
      setShow(window.screenY > 100);
    };

    window.addEventListener("scroll", handleShow);
    return () => {
      window.removeEventListener("scroll", handleShow);
    };
  }, []);

  return <div className="z-50">HeaderHeaderHeader</div>;
}
