"use client";

import React, { useEffect, useRef } from 'react';
import {HeroUIProvider} from "@heroui/react";
import FirstLoadPopup from '@/components/FirstLoadPopup';
import Navbar from '@/components/Navbar';
import VideoBox from '@/components/VideoBox';
import Channels from '@/components/Channels';

const App = () => {
  let appRef = useRef();
  useEffect(() => {
      appRef.current.classList.remove("no-clickable", "stop-drag")
  }, []);

  return (
    <HeroUIProvider>
      <FirstLoadPopup />
      <div className="App no-clickable stop-drag" ref={appRef}>
        <Navbar />
        <VideoBox name="Oliwier Stream 24/7" src="https://video-itv.itvt.xyz/live/oliwier_stream/index.m3u8"/>
        <Channels/>
      </div>
    </HeroUIProvider>
  );
};

export default App;
