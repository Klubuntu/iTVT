"use server";

import { getCookies } from 'next-client-cookies/server';
import { notFound } from 'next/navigation';

const getLangData = (fileName = 'main') => {
    try {
        const cookies = getCookies();
        const langCookie = cookies?.get ? cookies.get("hub_lang") : null;

        let lang = "en";
        switch (langCookie) {
            case "pl":
                lang = "pl";
                break;
        }

        const lang_block = require(`@/json/lang/${lang}/${fileName}.json`);
        return lang_block;
    } catch (err) {
        console.error("Error loading language file:", err);
        notFound(); // Triggers built-in 404
    }
};

export default getLangData;
