"use client"

import React, { useState, useEffect, useRef } from 'react';
import { HeroUIProvider } from "@heroui/react";
import FirstLoadPopup from '@/components/FirstLoadPopup';
import ContactBox from "@/components/ContactBox";
import NavbarWrapper from '@/components/NavBar/wrapper';

import { useLangData } from '@/components/client/useLangData';
import { fetchHeaderText } from '@/app/actions/fetchHeaderText';
import LoadingBar from '@/components/LoadingBar';

async function getContactText(){
    const lang = await getLangData();
    return lang.pages.contact;
}

const Page = () => {
    const appRef = useRef();
    const contactData = useLangData('contact');
    const [contactText, setContactText] = useState('');
    const [headerText, setHeaderText] = useState(null);

    useEffect(() => {
        if (!contactData) return;
        if (contactData) {
            setContactText(contactData);
        }

        const loadHeaderText = async () => {
            const text = await fetchHeaderText();
            setHeaderText(text);
        };

        loadHeaderText();
    }, [contactData]);
    
    useEffect(() => {
        if (appRef.current) {
        appRef.current.classList.remove('no-clickable', 'stop-drag');
        }
    }, [headerText]);

    if (!headerText || !contactText) {
        return <LoadingBar />;
    }

    return (
        <HeroUIProvider>
            <FirstLoadPopup />
            <div className="App no-clickable stop-drag" ref={appRef}>
                <NavbarWrapper headerText={headerText}/>
                <h2 className="text-center font-bold text-3xl mt-10">{contactText.contact_us}</h2>
                <div className="flex flex-col justify-center items-center" id="Contact">
                    <ContactBox team={contactText.editors} email="redakcja@itvt.xyz" />
                    <ContactBox team={contactText.ads} email="ads@itvt.xyz" />
                    <ContactBox team="IT News" email="itnews@itvt.xyz" />
                    <ContactBox team={contactText.children_safety} email="safety@itvt.xyz" />
                </div>

            </div>
        </HeroUIProvider>
    );
};
export default Page;
