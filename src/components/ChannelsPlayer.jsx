'use client';

import React, { useState, useEffect } from "react";
import ChannelHorizontal from "./ChannelHorizontal";
import { useLangData } from '@/components/client/useLangData';
import { fetchChannelsWithConfigs } from '@/app/actions/fetchChannels';

export default function(){
    const lang = useLangData('pages');
    const otherChannelsText = lang?.pages?.other_channels || 'Other Channels';
    const [channels, setChannels] = useState([]);
    const [channelConfigs, setChannelConfigs] = useState({});
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return null;
    }

    // Filter channels that have configs
    const channelsWithConfigs = channels.filter(ch => {
        const slug = ch.name.toLowerCase().replace(/\s+/g, '-');
        return channelConfigs[slug];
    });
    
    return (
        <div className="w-full max-w-6xl mx-auto px-4 mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {channelsWithConfigs.map((channel) => {
                    const slug = channel.name.toLowerCase().replace(/\s+/g, '-');
                    return (
                        <ChannelHorizontal
                            key={channel.id}
                            url={`/channel/${slug}`}
                            thumbnail={channelConfigs[slug]?.thumbnail || '/static/img/itvt_thumbnail.png'}
                            description={channel.name}
                            category={channel.category}
                        />
                    );
                })}
                <ChannelHorizontal 
                    url="/other_channels" 
                    thumbnail="/static/img/itvt_thumbnail.png" 
                    description={otherChannelsText}
                />
            </div>
        </div>
    )
}