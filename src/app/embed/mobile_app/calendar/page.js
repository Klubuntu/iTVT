"use client";

import React, {use} from "react";
import { NextUIProvider } from "@nextui-org/react";
import getLangData from '@/components/client/getLangData';
import AccordionBox from '@/components/AccordionBox';
import Programs from './@components/client/Programs';

async function getCalendarText() {
    const lang = await getLangData();
    return lang.pages.tv_calendar;
}

const App = () => {
    const calendarText = use(getCalendarText());

    return (
        <NextUIProvider>
            <div className="App">
                <h2 className="text-center font-bold text-3xl mt-2">{calendarText.demo_broadcast}</h2>
                <AccordionBox programs={Programs.programsDemoBroadcast}/>
                <h2 className="text-center font-bold text-3xl mt-5">{calendarText.today}</h2>
                <AccordionBox programs={Programs.programsToday}/>
                <h2 className="text-center font-bold text-3xl mt-5">{calendarText.tomorrow}</h2>
                <AccordionBox programs={Programs.programsTomorrow}/>
            </div>
        </NextUIProvider>
    );
};
export default App;
