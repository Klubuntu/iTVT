'use client';
import React, { useState, useEffect } from 'react';
import { Next13ProgressBar } from 'next13-progressbar';
import { useCookies } from 'next-client-cookies';
import MobileMenuBlock from "@/components/NavBar/mobilemenublock";
import { usePathname } from 'next/navigation';  // New hook for app directory

const Providers = ({ children }) => {
  const cookies = useCookies();
  const [shouldHideMenu, setShouldHideMenu] = useState(false);
  const pathname = usePathname(); // Use usePathname() for path in app directory
  
  useEffect(() => {
    // Check URL on mount
    setShouldHideMenu(pathname.includes('/embed/'));

    // Set language cookie if not set
    if (!cookies.get("hub_lang")) {
      const userLang = navigator?.language;
      let cookieLang = 'en';
      if (userLang.includes("en")) {
        cookieLang = "en";
      } else if (userLang === "pl_PL") {
        cookieLang = "pl";
      } else {
        cookieLang = userLang.slice(0, 2);
      }
      cookies.set("hub_lang", cookieLang, { expires: 365 });
    }
  }, [pathname, cookies]); // Dependency on pathname to rerun on URL change

  return (
    <>
      {children}
      <Next13ProgressBar height="4px" color="#0A2FFF" options={{ showSpinner: true }} showOnShallow />
      {!shouldHideMenu && <MobileMenuBlock />} {/* Render only if the URL doesn't contain '/embed/' */}
    </>
  );
};

export default Providers;
