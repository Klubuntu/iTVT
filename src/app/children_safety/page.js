"use client";

import React, { useState, useEffect, useRef } from 'react';
import { HeroUIProvider } from "@heroui/react";
import FirstLoadPopup from '@/components/FirstLoadPopup';
import NavbarWrapper from '@/components/NavBar/wrapper';

import { useLangData } from '@/components/client/useLangData';
import { fetchHeaderText } from '@/app/actions/fetchHeaderText';

const Page = () => {
    const appRef = useRef();
    const childProtectionData = useLangData('child_protection');
    const [childPolicyText, setChildPolicyText] = useState('');
    const [headerText, setHeaderText] = useState(null);

    useEffect(() => {
        
        if (!childProtectionData) return;
        if (childProtectionData && childProtectionData.child_protection_policy) {
            setChildPolicyText(childProtectionData.child_protection_policy);
        }

        const loadHeaderText = async () => {
            const text = await fetchHeaderText();
            setHeaderText(text);
        };

        loadHeaderText();
    }, [childProtectionData]);
    
    useEffect(() => {
        if (appRef.current) {
            appRef.current.classList.remove('no-clickable', 'stop-drag');
        }
    }, [headerText]);

    if (!headerText || !childPolicyText) {
        return <div>Loading...</div>;
    }

    return (
        <HeroUIProvider>
            <FirstLoadPopup />
            <div className="App no-clickable stop-drag" ref={appRef}>
                <NavbarWrapper headerText={headerText} />
                <div className="text-center max-w-[1000px] mx-5 sm:mx-4 lg:mx-auto">
                    <h2 className="font-bold text-2xl text-center my-7">{childPolicyText.title}</h2>

                    {Object.values(childPolicyText.sections).map((section, i) => (
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
