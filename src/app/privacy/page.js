"use client";

import React, { useState, useEffect, useRef } from 'react';
import { HeroUIProvider } from "@heroui/react";
import FirstLoadPopup from '@/components/FirstLoadPopup';
import NavbarWrapper from '@/components/NavBar/wrapper';

import { useLangData } from '@/components/client/useLangData';
import { fetchHeaderText } from '@/app/actions/fetchHeaderText';
import LoadingBar from '@/components/LoadingBar';


const Page = () => {
    const appRef = useRef();
    const privacyData = useLangData('privacy');
    const [privacyText, setPrivacyText] = useState('');
    const [headerText, setHeaderText] = useState(null);

    useEffect(() => {
        if (!privacyData) return;
        if (privacyData) {
            setPrivacyText(privacyData);
        }

        const loadHeaderText = async () => {
            const text = await fetchHeaderText();
            setHeaderText(text);
        };

        loadHeaderText();
    }, [privacyData]);
    
    useEffect(() => {
        if (appRef.current) {
            appRef.current.classList.remove('no-clickable', 'stop-drag');
        }
    }, [headerText]);

    if (!headerText || !privacyText) {
        return <LoadingBar />;
    }


    return (
        <HeroUIProvider>
            <FirstLoadPopup />
            <div className="App no-clickable stop-drag" ref={appRef}>
                <NavbarWrapper headerText={headerText}/>
                <div className="text-center max-w-[1000px] mx-5 sm:mx-4 max-mobile:mb-28 lg:mx-auto bg-gradient-to-b from-zinc-900/80 to-black/90 backdrop-blur-sm rounded-2xl p-8 border border-zinc-700/40 shadow-2xl shadow-blue-500/15">
                    <h2 className="font-bold text-3xl text-center my-8 text-white drop-shadow-lg">{privacyText.about_us.title}</h2>
                    <p className="text-white leading-relaxed mb-4">{privacyText.about_us.content}: <a href="https://files.itvt.xyz/download/android/" className="text-blue-300 hover:text-blue-200 transition-colors hover:drop-shadow-md">https://files.itvt.xyz/download/android/</a></p>
                    <h2 className="font-bold text-3xl text-center my-8 text-white drop-shadow-lg">{privacyText.media.title}</h2>
                    <p className="text-white leading-relaxed mb-4">{privacyText.media.content}</p>
                    <h2 className="font-bold text-3xl text-center my-8 text-white drop-shadow-lg">{privacyText.cookies.title}</h2>
                    <p className="text-white leading-relaxed mb-4">{privacyText.cookies.content}</p>
                    <h2 className="font-bold text-3xl text-center my-8 text-white drop-shadow-lg">{privacyText.embedded_data.title}</h2>
                    <p className="text-white leading-relaxed mb-4">{privacyText.embedded_data.content.part1}</p>
                    <p className="text-white leading-relaxed mb-4">{privacyText.embedded_data.content.part2}</p>
                    <h2 className="font-bold text-3xl text-center my-8 text-white drop-shadow-lg">{privacyText.keep_your_data.title}</h2>
                    <p className="text-white leading-relaxed mb-4">{privacyText.keep_your_data.content.part1}</p>
                    <p className="text-white leading-relaxed mb-4">{privacyText.keep_your_data.content.part2}</p>
                    <h2 className="font-bold text-3xl text-center my-8 text-white drop-shadow-lg">{privacyText.rights_your_data.title}</h2>
                    <p className="text-white leading-relaxed mb-4">{privacyText.rights_your_data.content}</p>
                    <h2 className="font-bold text-3xl text-center my-8 text-white drop-shadow-lg">{privacyText.send_your_data.title}</h2>
                    <p className="text-white leading-relaxed mb-4">{privacyText.send_your_data.content}</p>
                </div>
            </div>
        </HeroUIProvider>
    );
};
export default Page;