'use client';

import React from 'react';
import { HeroUIProvider } from '@heroui/react';
import Link from 'next/link';
import Head from 'next/head';

export default function NotFound() {
  const text404 = "Sorry, the page you're looking for doesn't exist.";
  const returnText = "Go back home";

  return (
    <>
      <Head key="not-found-title">
        <title>iTVT Hub - 404 Page not found</title>
      </Head>
      <HeroUIProvider>
        <main className="flex flex-col items-center justify-center min-h-screen px-4">
          <section className="text-center">
            <h1 className="text-6xl font-bold text-accent">404</h1>
            <p className="mt-4 text-xl text-red-700">{text404}</p>
            <Link
              href="/"
              className="inline-block mt-6 px-6 py-3 bg-zinc-600 text-white rounded hover:bg-zinc-700 transition"
            >
              {returnText}
            </Link>
          </section>
        </main>
      </HeroUIProvider>
    </>
  );
}
