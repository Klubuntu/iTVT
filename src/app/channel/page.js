'use client';

import React, { useState, useEffect, useRef } from 'react';
import { HeroUIProvider } from '@heroui/react';

import { useLangData } from '@/components/client/useLangData';
import { fetchHeaderText } from '@/app/actions/fetchHeaderText';
import FirstLoadPopup from '@/components/FirstLoadPopup';
import NavbarWrapper from '@/components/NavBar/NavbarWrapper';
import Channels from '@/components/Channels';

const Page = () => {
  const appRef = useRef();
  const lang = useLangData();
  const channelsText = lang.pages.channel;
  const [headerText, setHeaderText] = useState(null);

  useEffect(() => {
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

  if (!headerText || !lang) {
    return <div>Loading...</div>;
  }

  return (
    <HeroUIProvider>
      <FirstLoadPopup />
      <div className="App no-clickable stop-drag" ref={appRef}>
        <NavbarWrapper headerText={headerText} />
        <h1 className="font-bold text-2xl text-center my-7">{channelsText}</h1>
        <Channels />
      </div>
    </HeroUIProvider>
  );
};

export default Page;
