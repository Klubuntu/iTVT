import React from "react";
import ChannelPlayer from "./ChannelPlayer";

export default function(){
    return (
        <div className="channel-frame flex justify-center relative right-2.5">
            <div id="channels" className="my-4 lg:justify-center md:grid md:grid-cols-2">
                <ChannelPlayer url="/" thumbnail="/static/img/itvt_thumbnail.png" description="iTVT"/>
                <ChannelPlayer url="/channel/itvt2" thumbnail="/static/img/itvt_thumbnail.png" description="iTVT 2"/>
                <ChannelPlayer url="/channel/oliwier_stream" thumbnail="/static/img/oliwierstream_thumbnail.png" description="Oliwier Stream"/>
            </div>
        </div>
    )
}