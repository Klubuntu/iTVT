"use client";

import React, { useRef, useState, useEffect } from "react";
import { HeroUIProvider } from "@heroui/react";
import NavbarWrapper from "@/components/NavBar/wrapper";
import AccordionBox from "@/components/AccordionBox";
import { useLangData } from "@/components/client/useLangData";
import { fetchHeaderText } from "@/app/actions/fetchHeaderText";
import { usePrograms } from "@/components/client/Programs";
import LoadingBar from "@/components/LoadingBar";

const Page = () => {
  const appRef = useRef(null);
  const lang = useLangData('pages');
  const { programsToday, programsTomorrow, programsFuture } = usePrograms();

  const [calendarText, setCalendarText] = useState(null);
  const [todayDate, setTodayDate] = useState("unavailable");
  const [headerText, setHeaderText] = useState(null);

  useEffect(() => {
    if (!lang) return;
    if (lang.pages?.tv_calendar) {
      setCalendarText(lang.pages.tv_calendar);
    }

    async function loadHeader() {
      const text = await fetchHeaderText();
      setHeaderText(text);
    }
    loadHeader();
  }, [lang]);

  useEffect(() => {
    if (appRef.current) {
      appRef.current.classList.remove("no-clickable", "stop-drag");
    }
  }, [headerText]);

  useEffect(() => {
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, "0")}.${String(now.getMonth() + 1).padStart(2, "0")}.${now.getFullYear()}`;
    setTodayDate(formattedDate);
  }, []);

  if (!headerText || !calendarText) {
    return <LoadingBar />;
  }

  return (
    <HeroUIProvider>
      <div className="App no-clickable stop-drag" ref={appRef}>
        <NavbarWrapper headerText={headerText} />
        <h1 className="font-bold text-2xl text-center my-7 text-white">Program TV - EPG</h1>
        <h2 className="text-center font-bold text-4xl mt-8 mb-4 text-white drop-shadow-lg">{calendarText.today} ({todayDate})</h2>
        <AccordionBox programs={programsToday} />
        <h2 className="text-center font-bold text-4xl mt-10 mb-4 text-white drop-shadow-lg">{calendarText.tomorrow}</h2>
        <AccordionBox programs={programsTomorrow} />
        <h2 className="text-center font-bold text-4xl mt-10 mb-4 text-white drop-shadow-lg">{calendarText.future}</h2>
        <AccordionBox programs={programsFuture} />
      </div>
    </HeroUIProvider>
  );
};

export default Page;
