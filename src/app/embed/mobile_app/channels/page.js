"use client";

import React, { use, useEffect, useRef } from 'react';
import {HeroUIProvider} from "@heroui/react";
import getLangData from '@/components/client/getLangData';
import Channels from '@/components/Channels';

async function getChannelsText(){
  const lang = await getLangData();
  return lang.pages.channel;
}

const Page = () => {
  const appRef = useRef();
  const channelsText = use(getChannelsText());

  useEffect(() => {
    appRef.current.classList.remove("no-clickable", "stop-drag");
  }, []);

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
