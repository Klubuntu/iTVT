'use client';

import React, { useEffect, useRef, useState } from 'react';
import { HeroUIProvider } from "@heroui/react";
import FirstLoadPopup from '@/components/FirstLoadPopup';
import NavbarWrapper from '@/components/Navbar/NavbarWrapper';
import VideoBox from '@/components/VideoBox';
import Channels from '@/components/Channels';

import { useLangData } from '@/components/client/useLangData';
import { fetchHeaderText } from '@/app/actions/fetchHeaderText';

const Page = () => {
  const appRef = useRef();
  const lang = useLangData();
  const [playerText, setPlayerText] = useState(null);
  const [headerText, setHeaderText] = useState(null);

  useEffect(() => {
    const loadLangData = async () => {
      const text = lang?.pages?.player?.unavailable || '';
      setPlayerText(text);
    };

    loadLangData();
    if (!lang) return;

    const loadHeaderText = async () => {
      const text = await fetchHeaderText();
      setHeaderText(text);
    };

    loadHeaderText();
  }, [lang]);

  useEffect(() => {
    if (appRef.current) {
      appRef.current.classList.remove('no-clickable', 'stop-drag');
    }
  }, [headerText]);

  if (!headerText || !playerText) {
    return <div>Loading...</div>;
  }
  
  return (
    <HeroUIProvider>
      <FirstLoadPopup />
      <div className="App no-clickable stop-drag" ref={appRef}>
        <NavbarWrapper headerText={headerText} />
        <VideoBox name="Oliwier Stream (test) 24/7" src="http://o.local.itvt.xyz:8282/hls/teststrona/index.m3u8"/>
        <Channels/>
      </div>
    </HeroUIProvider>
  );
};

export default Page;
