"use client";

import React, { use, useEffect, useRef } from 'react';
import { HeroUIProvider } from "@heroui/react";
import getLangData from '@/components/client/useLangData';

async function getPrivacyText(){
    const lang = await getLangData();
    return lang.pages.privacy_policy;
}

const Page = () => {
    const appRef = useRef();
    const privacyText = use(getPrivacyText());

    useEffect(() => {
        appRef.current.classList.remove("no-clickable", "stop-drag")
    }, []);

    return (
        <HeroUIProvider>
            <div className="App no-clickable stop-drag" ref={appRef}>
                <div className="text-center max-w-[1000px] mx-5 sm:mx-4 lg:mx-auto">
                    <h2 className="font-bold text-2xl text-center my-7">{privacyText.about_us.title}</h2>
                    <p>{privacyText.about_us.content}: https://hub.itvt.xyz</p>
                    <h2 className="font-bold text-2xl text-center my-7">{privacyText.media.title}</h2>
                    <p>{privacyText.media.content}</p>
                    <h2 className="font-bold text-2xl text-center my-7">{privacyText.cookies.title}</h2>
                    <p>{privacyText.cookies.content}</p>
                    <h2 className="font-bold text-2xl text-center my-7">{privacyText.embedded_data.title}</h2>
                    <p>{privacyText.embedded_data.content.part1}</p>
                    <p>{privacyText.embedded_data.content.part2}</p>
                    <h2 className="font-bold text-2xl text-center my-7">{privacyText.keep_your_data.title}</h2>
                    <p>{privacyText.keep_your_data.content.part1}</p>
                    <p>{privacyText.keep_your_data.content.part2}</p>
                    <h2 className="font-bold text-2xl text-center my-7">{privacyText.rights_your_data.title}</h2>
                    <p>{privacyText.rights_your_data.content}</p>
                    <h2 className="font-bold text-2xl text-center my-7">{privacyText.send_your_data.title}</h2>
                    <p>{privacyText.send_your_data.content}</p>
                </div>
            </div>
        </HeroUIProvider>
    );
};
export default Page;
