"use client";

import React, { useState, useEffect } from "react";

export default function ScrollTest() {
  const [isFixed, setIsFixed] = useState(false);
  const scrollThreshold = 65; // Change this value to control when the header becomes fixed

  useEffect(() => {
    const handleScroll = () => {
      // Check if the scroll position exceeds the threshold
      setIsFixed(document.body.scrollTop >= scrollThreshold);
    };

    // Add scroll event listener
    document.body.addEventListener('scroll', handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.body.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <header
        className={`text-lg ${isFixed ? 'fixed top-0 left-0 w-full bg-blue-500' : ''} p-4`}
        style={{
          transition: "background-color 0.3s ease", // Add a smooth transition effect
        }}
      >
        {isFixed ? "I am fixed now!" : "Scroll down to fix me!"}
      </header>

      {/* Large content to allow scrolling */}
      <div style={{ height: "3000px", marginTop: "60px" }}>
        Scroll to see effect
      </div>
    </div>
  );
}
