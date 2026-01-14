'use client';

import React, { useEffect, useRef, useState } from 'react';
import { HeroUIProvider } from "@heroui/react";
import FirstLoadPopup from '@/components/FirstLoadPopup';
import NavbarWrapper from '@/components/NavBar/wrapper';
import VideoBox from '@/components/VideoBox';
import ChannelsPlayer from '@/components/ChannelsPlayer';

import { useLangData } from '@/components/client/useLangData';
import LoadingBar from '@/components/LoadingBar';
import { fetchHeaderText } from '@/app/actions/fetchHeaderText';
import { fetchChannelBySlug } from '@/app/actions/fetchChannelBySlug';

const Page = ({ params }) => {
  const appRef = useRef();
  const lang = useLangData('pages');
  const [playerText, setPlayerText] = useState(null);
  const [headerText, setHeaderText] = useState(null);
  const [channel, setChannel] = useState(null);
  const [channelConfig, setChannelConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch channel data
  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const { channel: channelData, config } = await fetchChannelBySlug(params.slug);
        setChannel(channelData);
        setChannelConfig(config);
      } catch (err) {
        console.error('Failed to fetch channel:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChannelData();
  }, [params.slug]);

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

  if (loading || !headerText || !playerText || !channel || !channelConfig) {
    return <LoadingBar />;
  }

  return (
    <HeroUIProvider>
      <FirstLoadPopup />
      <div className="App" ref={appRef}>
        <NavbarWrapper headerText={headerText} />
        <VideoBox name={channel.name} src={channelConfig.playerUrl} />
        <ChannelsPlayer />
      </div>
    </HeroUIProvider>
  );
};

export default Page;
