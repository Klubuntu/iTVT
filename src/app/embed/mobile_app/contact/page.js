"use client"

import "@/styles/hideMenu.css";
import React, { useState, useEffect, useRef } from 'react';
import { HeroUIProvider } from "@heroui/react";
import ContactBox from "@/components/ContactBox";

import { useLangData } from '@/components/client/useLangData';
import LoadingBar from '@/components/LoadingBar';

const App = () => {
    const appRef = useRef();
    const contactData = useLangData('contact');
    const [contactText, setContactText] = useState('');

    useEffect(() => {
        if (!contactData) return;
        if (contactData) {
            setTimeout(() => {
                setContactText(contactData);
            }, 600);  
        }
    }, [contactData]);

    if (!contactText) {
        return <LoadingBar />;
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
