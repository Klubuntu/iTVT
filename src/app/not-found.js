'use client';

import React from 'react';
import { HeroUIProvider } from "@heroui/react";
import Link from 'next/link';
import getLangData from '@/components/server/getLangData';
// import Navbar from '@/components/Navbar';


export default async function NotFound() {
  const data = await getLangData();
  const text404 = data.pages["404"]
  const return_text = data.pages.return_page;
  return (
    <HeroUIProvider>
        <div className="App">
            {/* <Navbar /> */}
            <div className="text-center text-l mt-10">
              <Link href="/">{return_text}</Link>
              <h2 className='text-center text-xl mt-10 mx-5 sm:mx-4 lg:mx-0'>{text404}</h2>
            </div>
        </div>
    </HeroUIProvider>
  )
}