"use client"

import React, { useState, useEffect, useRef } from 'react';
import { HeroUIProvider, Button } from "@heroui/react";
import Link from 'next/link';
import FirstLoadPopup from '@/components/FirstLoadPopup';
import NavbarWrapper from '@/components/NavBar/wrapper';

import { useLangData } from '@/components/client/useLangData';
import { fetchHeaderText } from '@/app/actions/fetchHeaderText';


const Page = () => {
    const appRef = useRef();
    const lang = useLangData();
    const [headerText, setHeaderText] = useState(null);
    const [infoText, setInfoText] = useState(null);

    useEffect(() => {
        if (!lang) return;
        if (lang && lang.pages?.watch) {
            setInfoText(lang.pages.watch);
        }
    
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

    if (!headerText || !infoText) {
        return <div>Loading...</div>;
    }

    return (
        <HeroUIProvider>
            <FirstLoadPopup />
            <div className="App no-clickable stop-drag" ref={appRef}>
                <NavbarWrapper headerText={headerText} />
                <h2 className="text-center font-bold text-3xl mt-8">{infoText.how_to_watch}</h2>
                <div className="flex flex-col justify-center items-center" id="Watch">
                        <p className='mt-3'>{infoText.playlist.apps_recommended}</p>
                        <p className='mt-5'><b>PC / {infoText.playlist.other_devices}</b></p>
                        <ul className='text-center'>
                            <li>- VLC <Link href="https://www.videolan.org/vlc/" className='text-gray-500'>(Download here)</Link></li>
                            <li>- MPV <Link href="https://mpv.io/installation/" className='text-gray-500'>(Download here)</Link></li>
                            <li>- Kodi <Link href="https://kodi.tv/download/" className='text-gray-500'>(Download here)</Link></li>
                        </ul>
                        <p className='mt-4'><b>Android</b></p>
                        <ul className='text-center max-mobile:mb-16'>
                            <li>- Televizo  <Link href="https://play.google.com/store/apps/details?id=com.ottplay.ottplay" className='text-gray-500'>(Download here)</Link></li>
                            <li>- IPTV Pro - Alexander Sofronov</li>
                            <li>- IPTV - Alexander Sofronov <Link href="https://play.google.com/store/apps/details?id=ru.iptvremote.android.iptv" className='text-gray-500'>(Download here)</Link></li>
                        </ul>
                    </div>
                </div>

            </div>
        </HeroUIProvider>
    );
};
export default Page;
