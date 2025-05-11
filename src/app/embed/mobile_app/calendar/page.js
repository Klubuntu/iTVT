"use client";

import "@/styles/hideMenu.css";
import React, {useRef, useState, useEffect} from "react";
import { HeroUIProvider } from "@heroui/react";
import AccordionBox from '@/components/AccordionBox';
import Programs from '@/components/client/Programs';

import { useLangData } from '@/components/client/useLangData';

const App = () => {
    const appRef = useRef();
    const lang = useLangData();
    const [calendarText, setCalendarText] = useState('');
    const [todayDate, setTodayDate] = useState('');

    useEffect(() => {
        if (!lang) return;
        if (lang && lang.pages?.tv_calendar) {
            setCalendarText(lang.pages.tv_calendar);
        }
    }, [lang]);

    useEffect(() => {
        const now = new Date();
        const formattedDate = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()}`;
        setTodayDate(formattedDate);
    }, []);

    if (!calendarText) {
        return <div>Loading...</div>;
    }

    return (
        <HeroUIProvider>
            <div className="App stop-drag" ref={appRef}>
                <h2 className="text-center font-bold text-3xl mt-2">{calendarText.demo_broadcast}</h2>
                <AccordionBox programs={Programs.programsDemoBroadcast}/>
                <h2 className="text-center font-bold text-3xl mt-5">{calendarText.today + ` (${todayDate})`}</h2>
                <AccordionBox programs={Programs.programsToday}/>
                <h2 className="text-center font-bold text-3xl mt-5">{calendarText.tomorrow}</h2>
                <AccordionBox programs={Programs.programsTomorrow}/>
            </div>
        </HeroUIProvider>
    );
};
export default App;
