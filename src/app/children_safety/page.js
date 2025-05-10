"use client";

import React, { use, useEffect, useRef } from 'react';
import { HeroUIProvider } from "@heroui/react";
import getLangData from '@/components/client/getLangData';
import FirstLoadPopup from '@/components/FirstLoadPopup';
import Navbar from '@/components/Navbar';

async function getChildProtectionText() {
    const lang = await getLangData();
    return lang.pages.child_protection_policy;
}

const Page = () => {
    const appRef = useRef();
    const policyText = use(getChildProtectionText());

    useEffect(() => {
        appRef.current.classList.remove("no-clickable", "stop-drag");
    }, []);

    return (
        <HeroUIProvider>
            <FirstLoadPopup />
            <div className="App no-clickable stop-drag" ref={appRef}>
                <Navbar />
                <div className="text-center max-w-[1000px] mx-5 sm:mx-4 lg:mx-auto">
                    <h2 className="font-bold text-2xl text-center my-7">{policyText.title}</h2>

                    {Object.values(policyText.sections).map((section, i) => (
                        <div key={i}>
                            <h3 className="font-bold text-xl mt-8 mb-4">{section.title}</h3>
                            {Array.isArray(section.content)
                                ? section.content.map((line, j) => <p key={j}>{line}</p>)
                                : <p>{section.content}</p>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </HeroUIProvider>
    );
};

export default Page;
