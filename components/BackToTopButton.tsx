// components/BackToTopButton.tsx
"use client"; // Mark this as a client component

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showButton) {
    return null; // Don't render anything if not scrolled far enough
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 bg-primary text-primary-foreground p-2 rounded-full shadow-md hover:bg-primary/80 transition-colors duration-200 z-50"
      aria-label="Scroll to Top">
      <ArrowUp className="h-8 w-8" />
    </button>
  );
};

export default BackToTopButton;
