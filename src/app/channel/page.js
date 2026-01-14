'use client';

import React, { useState, useEffect, useRef } from 'react';
import { HeroUIProvider } from '@heroui/react';

import { useLangData } from '@/components/client/useLangData';
import LoadingBar from '@/components/LoadingBar';
import { fetchHeaderText } from '@/app/actions/fetchHeaderText';
import { fetchChannelsWithConfigs } from '@/app/actions/fetchChannels';
import FirstLoadPopup from '@/components/FirstLoadPopup';
import NavbarWrapper from '@/components/NavBar/wrapper';
import Channel from '@/components/Channel';

const Page = () => {
  const appRef = useRef();
  const lang = useLangData('pages');
  const channelsText = lang.pages?.channel;
  const otherChannelsText = lang.pages?.other_channels;
  const [headerText, setHeaderText] = useState(null);
  const [channels, setChannels] = useState([]);
  const [channelConfigs, setChannelConfigs] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch channels from API and their configs
  useEffect(() => {
    const fetchChannelsData = async () => {
      try {
        const { channels: channelsData, configs } = await fetchChannelsWithConfigs();
        setChannels(channelsData);
        setChannelConfigs(configs);
      } catch (err) {
        console.error('Failed to fetch channels:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChannelsData();
  }, []);

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

  if (!headerText || !lang || loading) {
    return <LoadingBar />;
  }

  // Filter channels that have configs
  const channelsWithConfigs = channels.filter(ch => {
    const slug = ch.name.toLowerCase().replace(/\s+/g, '-');
    return channelConfigs[slug];
  });

  return (
    <HeroUIProvider>
      <FirstLoadPopup />
      <div className="App" ref={appRef}>
        <NavbarWrapper headerText={headerText} />
        <h1 className="font-bold text-2xl text-center my-7">{channelsText}</h1>
        <div className="channel-frame flex justify-center relative right-2.5">
          <div id="channels" className="my-4 flex-wrap max-md:flex max-md:items-center max-md:justify-center lg:flex lg:justify-center md:grid md:grid-cols-2">
            {channelsWithConfigs.map((channel) => {
              const slug = channel.name.toLowerCase().replace(/\s+/g, '-');
              return (
                <Channel
                  key={channel.id}
                  url={`/channel/${slug}`}
                  thumbnail={channelConfigs[slug]?.thumbnail || '/static/img/itvt_thumbnail.png'}
                  description={channel.name}
                />
              );
            })}
            <Channel
              url="/other_channels"
              thumbnail="/static/img/itvt_thumbnail.png"
              description={otherChannelsText || 'Other Channels'}
            />
          </div>
        </div>
      </div>
    </HeroUIProvider>
  );
};

export default Page;
