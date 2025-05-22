"use client";

import { useEffect, useState } from "react";
import { fetchPrograms } from "@/app/actions/fetchPrograms";

const isSameDay = (date1, date2) =>
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate();

export const usePrograms = () => {
  const [programsToday, setProgramsToday] = useState([]);
  const [programsTomorrow, setProgramsTomorrow] = useState([]);
  const [programsFuture, setProgramsFuture] = useState([]);
  const [programsDemoBroadcast, setProgramsDemoBroadcast] = useState([]);

  useEffect(() => {
    async function loadPrograms() {
      const allPrograms = await fetchPrograms();
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(now.getDate() + 1);

      const programsForDate = (targetDate) =>
        allPrograms.filter((p) => {
          const startDate = new Date(p.start);
          return isSameDay(startDate, targetDate);
        });

      const futurePrograms = allPrograms.filter((p) => {
        const startDate = new Date(p.start);
        return startDate > tomorrow && !isSameDay(startDate, tomorrow);
      });

      setProgramsToday(programsForDate(now));
      setProgramsTomorrow(programsForDate(tomorrow));
      setProgramsFuture(futurePrograms);
      setProgramsDemoBroadcast(allPrograms.slice(0, 3));
    }

    loadPrograms();
  }, []);

  return {
    programsToday,
    programsTomorrow,
    programsFuture,
    programsDemoBroadcast,
  };
};
