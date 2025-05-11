"use client";

import "@/styles/hideMenu.css";
import React, { useEffect, useRef } from 'react';
import {HeroUIProvider} from "@heroui/react";
import Channels from '@/components/Channels';

import { useLangData } from '@/components/client/useLangData';
const Page = () => {
  const appRef = useRef();
  const lang = useLangData();
  const channelsText = lang.pages?.channel;

  useEffect(() => {
    if (!lang) return;
  }, [lang]);

  if (!lang) {
    return <div>Loading...</div>;
  }

  return (
    <HeroUIProvider>
      <div className="App no-clickable stop-drag" ref={appRef}>
        <h1 className='font-bold text-2xl text-center my-7'>{channelsText}</h1>
        <Channels/>
      </div>
    </HeroUIProvider>
  );
};

export default Page;
