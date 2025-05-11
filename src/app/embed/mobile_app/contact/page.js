"use client"

import "@/styles/hideMenu.css";
import React, { useState, useEffect, useRef } from 'react';
import { HeroUIProvider } from "@heroui/react";
import ContactBox from "@/components/ContactBox";

import { useLangData } from '@/components/client/useLangData';

const App = () => {
    const appRef = useRef();
    const lang = useLangData();
    const [contactText, setContactText] = useState('');

    useEffect(() => {
        if (!lang) return;
        if (lang && lang.pages?.contact) {
            setTimeout(() => {
                setContactText(lang.pages.contact);
            }, 600);  
        }
    }, [lang]);

    if (!contactText) {
        return <div>Loading...</div>;
    }

    return (
        <HeroUIProvider>
            <div className="App" ref={appRef}>
                <h2 className="text-center font-bold text-3xl mt-8">{contactText.contact_us}</h2>
                <div className="flex flex-col justify-center items-center" id="Contact">
                    <ContactBox team={contactText.editors} text_email="redakcja@itvt.xyz" />
                    <ContactBox team={contactText.ads} text_email="ads@itvt.xyz" />
                    <ContactBox team="IT News" text_email="itnews@itvt.xyz" />
                    <ContactBox team={contactText.children_safety} text_email="safety@itvt.xyz" />
                </div>

            </div>
        </HeroUIProvider>
    );
};
export default App;
