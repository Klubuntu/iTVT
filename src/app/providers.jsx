'use client';
import React, { useState, useEffect } from 'react';
import { Next13ProgressBar } from 'next13-progressbar';
import { useCookies } from 'next-client-cookies';
import MobileMenuBlock from "@/components/NavBar/MobileMenuBlock";

const Providers = ({ children }) => {
  const cookies = useCookies();

  useEffect(() => {
    var cookieLang;
    if (!cookies.get("hub_lang")) {
      const userLang = navigator?.language;
      if (userLang.includes("en")) {
        cookieLang = "en";
      } else if (userLang == "pl_PL") {
        cookieLang = "pl";
      } else {
        cookieLang = userLang.slice("0", "2");
      }
      cookies.set("hub_lang", cookieLang, { expires: 365 })
    }
  }, [useCookies]);
  return (
    <>
      {children}
      <Next13ProgressBar height="4px" color="#0A2FFF" options={{ showSpinner: true }} showOnShallow />
      <MobileMenuBlock />
    </>
  );
};

export default Providers;