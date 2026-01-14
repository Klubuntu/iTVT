"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@heroui/react';
import { Logo } from '../Logo';

function NavbarBlock({ headerText }) {
  const [scrolled, setScrolled] = useState(false);

  // onScroll function to update scroll state
  const onScroll = useCallback(() => {
    const { pageYOffset } = window;
    console.log('Scrolling...', pageYOffset); // Log pageYOffset for debugging
    setScrolled(pageYOffset > 10); // Update scroll state if scrolled beyond threshold
  }, []);

  useEffect(() => {
    // Check if window is available (client-side rendering)
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', onScroll, { passive: true });

      // Cleanup event listener when the component is unmounted
      return () => {
        window.removeEventListener('scroll', onScroll, { passive: true });
      };
    }
  }, [onScroll]);

  return (
    <Navbar
      className={`min-w-96 m-4 rounded-2xl w-vw-header transition-all duration-500 ${scrolled ? 'bg-zinc-900/95 backdrop-blur-md' : 'bg-zinc-800/95 backdrop-blur-md'} shadow-2xl shadow-blue-500/20 border border-zinc-700/50 hover:border-zinc-600/70`}
    >
      <NavbarBrand>
        <Link color="foreground" href="/" className="hover:opacity-90 transition-all duration-300 group">
          <Logo />
          <p className="font-bold text-inherit text-white group-hover:drop-shadow-lg">Hub</p>
        </Link>
      </NavbarBrand>

      {/* Mobile Layout */}
      <NavbarContent className="flex mobile:hidden gap-4 relative top-[2.5px]" justify="center">
        <NavbarItem>
          <Link href="https://odysee.itvt.xyz">
              <Button className="bg-zinc-800 hover:bg-zinc-700 shadow-lg shadow-blue-500/20 border border-zinc-700 hover:border-blue-500/40 hover:shadow-blue-500/30 transition-all duration-300" color="default">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="white" d="m4 4l1.625 3.25q.175.35.5.55t.7.2q.75 0 1.15-.638t.05-1.312L7 4h2l1.625 3.25q.175.35.5.55t.7.2q.75 0 1.15-.638t.05-1.312L12 4h2l1.625 3.25q.175.35.5.55t.7.2q.75 0 1.15-.638t.05-1.312L17 4h3q.825 0 1.413.587T22 6v12q0 .825-.587 1.413T20 20H4q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4m0 6v8h16v-8zm0 0v8z"/></svg>
                  <span className='text-white ml-[-6px] transition-colors'>VOD now available</span>
              </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Desktop Layout */}
      <NavbarContent className="hidden mobile:flex gap-6" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/calendar" className="text-white hover:text-blue-300 transition-all duration-300 font-medium relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full">
            {headerText.tv_calendar}
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link color="foreground" href="/channel" className="text-blue-300 transition-all duration-300 font-medium relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-400 after:drop-shadow-lg">
            {headerText.channels}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/privacy" className="text-white hover:text-blue-300 transition-all duration-300 font-medium relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full">
            {headerText.privacy_policy}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/contact" className="text-white hover:text-blue-300 transition-all duration-300 font-medium relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full" aria-current="page">
            {headerText.contact}
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default NavbarBlock;
