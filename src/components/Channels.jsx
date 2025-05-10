import React from "react";
import Channel from "./Channel";

export default function(){
    return (
        <div className="channel-frame flex justify-center relative right-2.5">
            <div id="channels" className="my-4 flex-wrap max-md:flex max-md:items-center max-md:justify-center lg:flex lg:justify-center md:grid md:grid-cols-2">
                <Channel url="/" thumbnail="/static/img/itvt_thumbnail.png" description="iTVT Watch Broadcast"/>
                <Channel url="/channel/itvt2" thumbnail="/static/img/itvt_thumbnail.png" description="iTVT 2"/>
                <Channel url="/channel/oliwier_stream" thumbnail="/static/img/oliwierstream_thumbnail.png" description="Oliwier Stream"/>
            </div>
        </div>
    )
}