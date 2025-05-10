"use client"

import React, { use, useEffect, useRef } from 'react';
import { HeroUIProvider } from "@heroui/react";
import getLangData from '@/components/client/getLangData';
import ContactBox from "@/components/ContactBox";

async function getContactText(){
    const lang = await getLangData();
    return lang.pages.contact;
}

const App = () => {
    const appRef = useRef();
    const contactText = use(getContactText());

    useEffect(() => {
        appRef.current.classList.remove("no-clickable", "stop-drag")
    }, []);

    return (
        <HeroUIProvider>
            <div className="App no-clickable stop-drag" ref={appRef}>
                <h2 className="text-center font-bold text-3xl mt-8">{contactText.contact_us}</h2>
                <div className="flex flex-col justify-center items-center" id="Contact">
                    <ContactBox team={contactText.editors} email="redakcja@itvt.xyz" />
                    <ContactBox team={contactText.ads} email="ads@itvt.xyz" />
                    <ContactBox team="IT News" email="itnews@itvt.xyz" />
                </div>

            </div>
        </HeroUIProvider>
    );
};
export default App;
