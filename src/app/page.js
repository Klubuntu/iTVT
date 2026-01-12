'use client';

import React, { useRef, useState, useEffect } from 'react';
import { HeroUIProvider } from "@heroui/react";
import FirstLoadPopup from '@/components/FirstLoadPopup';
import NavbarWrapper from '@/components/NavBar/wrapper';
import VideoBox from '@/components/VideoBox';
import ChannelsPlayer from '@/components/ChannelsPlayer';

import { useLangData } from '@/components/client/useLangData';
import { fetchHeaderText } from '@/app/actions/fetchHeaderText';
import LoadingBar from '@/components/LoadingBar';

const Page = () => {
  const appRef = useRef();
  const lang = useLangData('pages');
  const [playerText, setPlayerText] = useState('');
  const [headerText, setHeaderText] = useState(null);

  useEffect(() => {
    
    if (!lang) return;
    if (lang && lang.pages?.player?.watch_broadcast) {
      setPlayerText(lang.pages.player.watch_broadcast);
    }

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
    return <LoadingBar />;
  }

  return (
    <HeroUIProvider>
      <FirstLoadPopup />
      <div className="App no-clickable stop-drag" ref={appRef}>
        <NavbarWrapper headerText={headerText} />
        <VideoBox name={`iTVT (${playerText})`} src="https://video-itv.itvt.xyz/live/itvt/index.m3u8" />
        <ChannelsPlayer />
      </div>
    </HeroUIProvider>
  );
};

export default Page;
