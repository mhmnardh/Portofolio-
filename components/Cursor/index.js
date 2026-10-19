import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTheme } from "next-themes";

const Cursor = () => {
  const { theme } = useTheme();
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !window.matchMedia("(any-pointer: fine)").matches) return;

    const handlePointerMove = (event) => {
      gsap.to(cursor, {
        x: event.clientX - 7.5,
        y: event.clientY - 7.5,
        duration: 0.3,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const handlePointerOver = (event) => {
      if (event.target instanceof Element && event.target.closest(".link")) {
        gsap.to(cursor, { scale: 2, duration: 0.2, overwrite: "auto" });
      }
    };

    const handlePointerOut = (event) => {
      if (event.target instanceof Element && event.target.closest(".link") && !(event.relatedTarget instanceof Element && event.relatedTarget.closest(".link"))) {
        gsap.to(cursor, { scale: 1, duration: 0.2, overwrite: "auto" });
      }
    };

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      gsap.killTweensOf(cursor);
    };
  }, []);

  return <div ref={cursorRef} aria-hidden="true" className="custom-cursor pointer-events-none fixed left-0 top-0 z-[100000] h-[15px] w-[15px] rounded-full opacity-50" style={{ backgroundColor: theme === "dark" ? "#fff" : "#000" }} />;
};

export default Cursor;
