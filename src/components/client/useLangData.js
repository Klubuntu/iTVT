'use client';

import { useCookies } from 'next-client-cookies';

export const useLangData = () => {
  const cookies = useCookies();
  let lang;

  switch (cookies.get("hub_lang")) {
    case "pl":
      lang = "pl";
      break;
    default:
      lang = "en";
      break;
  }

  try {
    const lang_block = require(`@/json/lang/${lang}.json`);
    return lang_block;
  } catch (err) {
    console.error(err);
    return { error: 'Failed to fetch language data.' };
  }
};
