'use client';

import React, { useEffect, useRef } from 'react';
import { useLangData } from '@/components/client/useLangData';
import NavbarWrapper from '@/components/NavBar/wrapper';
import Channel from '@/components/Channel';

export default function ChannelPageClient({ channels, channelConfigs, headerText }) {
  const appRef = useRef();
  const lang = useLangData('pages');
  const channelsText = lang.pages?.channel;
  const otherChannelsText = lang.pages?.other_channels;

  useEffect(() => {
    if (appRef.current) {
      appRef.current.classList.remove('no-clickable', 'stop-drag');
    }
  }, []);

  return (
    <div className="App no-clickable stop-drag" ref={appRef}>
      <NavbarWrapper headerText={headerText} />
      <h1 className="font-bold text-2xl text-center my-7">{channelsText}</h1>
      <div className="channel-frame flex justify-center relative right-2.5">
        <div id="channels" className="my-4 flex-wrap max-md:flex max-md:items-center max-md:justify-center lg:flex lg:justify-center md:grid md:grid-cols-2">
          {channels.map((channel) => (
            <Channel
              key={channel.id}
              url={`/channel/${channel.id}`}
              thumbnail={channelConfigs[channel.id]?.thumbnail || '/static/img/itvt_thumbnail.png'}
              description={channel.name}
            />
          ))}
          <Channel
            url="/other_channels"
            thumbnail="/static/img/itvt_thumbnail.png"
            description={otherChannelsText || 'Other Channels'}
          />
        </div>
      </div>
    </div>
  );
}
