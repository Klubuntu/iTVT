"use client";

import "@/styles/hideMenu.css";
import React, { useState, useEffect, useRef } from 'react';
import { HeroUIProvider } from "@heroui/react";

import { useLangData } from '@/components/client/useLangData';

const Page = () => {
    const appRef = useRef();
    const lang = useLangData();
    const [privacyText, setPrivacyText] = useState('');

    useEffect(() => {
        if (!lang) return;
        if (lang && lang.pages?.privacy_policy) {
            setPrivacyText(lang.pages.privacy_policy);
        }
    }, [lang]);

    if (!privacyText) {
        return <div>Loading...</div>;
    }

    return (
        <HeroUIProvider>
            <div className="App no-clickable stop-drag" ref={appRef}>
                <div className="text-center max-w-[1000px] mx-5 sm:mx-4 lg:mx-auto">
                    <h2 className="font-bold text-2xl text-center my-7">{privacyText.about_us.title}</h2>
                    <p>{privacyText.about_us.content}: <span className="text-blue-500 clickable-child select">hub.itvt.xyz/watch-more</span></p>
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
