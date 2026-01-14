import React from "react";
import Channel from "./Channel";
import { useLangData } from '@/components/client/useLangData';

export default function(){
    const lang = useLangData('pages');
    const otherChannelsText = lang?.pages?.other_channels || 'Other Channels';
    
    return (
        <div className="min-w-96 channel-frame flex justify-center relative right-2.5 mt-16">
            <div id="channels" className="my-4 lg:justify-center md:grid md:grid-cols-2">
                <Channel url="/other_channels" thumbnail="/static/img/itvt_thumbnail.png" description={otherChannelsText}/>
            </div>
        </div>
    )
}