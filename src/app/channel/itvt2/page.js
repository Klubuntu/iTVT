"use client";

import React, { use, useEffect, useRef } from 'react';
import { NextUIProvider } from "@nextui-org/react";
import getLangData from '@/components/client/getLangData';
import FirstLoadPopup from '@/components/FirstLoadPopup';
import Navbar from '@/components/Navbar';
import VideoBox from '@/components/VideoBox';
import Channels from '@/components/Channels';

async function getPlayerText() {
  const lang = await getLangData();
  return lang.pages.player.unavailable;
}

const Page = () => {
  const appRef = useRef();
  const playerText = use(getPlayerText());

  useEffect(() => {
    appRef.current.classList.remove("no-clickable", "stop-drag");
  });

  return (
    <NextUIProvider>
      <FirstLoadPopup />
      <div className="App no-clickable stop-drag" ref={appRef}>
        <Navbar />
        <VideoBox name={`iTVT Now (${playerText || ''})`} src="https://video-itv.itvt.xyz/live/itvt2.m3u8"/>
        <Channels/>
      </div>
    </NextUIProvider>
  );
};

export default Page;