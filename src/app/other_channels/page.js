'use client';

import React, { useState, useEffect, useRef } from 'react';
import { HeroUIProvider } from '@heroui/react';

import { useLangData } from '@/components/client/useLangData';
import LoadingBar from '@/components/LoadingBar';
import { fetchHeaderText } from '@/app/actions/fetchHeaderText';
import FirstLoadPopup from '@/components/FirstLoadPopup';
import NavbarWrapper from '@/components/NavBar/wrapper';
import Channel from '@/components/Channel';

const Page = () => {
  const appRef = useRef();
  const lang = useLangData('pages');
  const otherChannelsText = lang.pages?.other_channels;
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
    return <LoadingBar />;
  }

  return (
    <HeroUIProvider>
      <FirstLoadPopup />
      <div className="App no-clickable stop-drag" ref={appRef}>
        <NavbarWrapper headerText={headerText} />
        <h1 className="font-bold text-2xl text-center my-7">{otherChannelsText}</h1>
        <div className="channel-frame flex justify-center relative right-2.5">
            <div id="channels" className="my-4 flex-wrap max-md:flex max-md:items-center max-md:justify-center lg:flex lg:justify-center md:grid md:grid-cols-2">
                <Channel url="/channel/other/itvt2" thumbnail="/static/img/itvt_thumbnail.png" description="iTVT 2"/>
                <Channel url="/channel/other/oliwier_stream" thumbnail="/static/img/oliwierstream_thumbnail.png" description="Oliwier Stream"/>
            </div>
        </div>
      </div>
    </HeroUIProvider>
  );
};

export default Page;
