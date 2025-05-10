"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Image } from '@heroui/react';
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
      className={`m-4 rounded-md w-vw-header transition-colors duration-300 shadow-header ${
        scrolled ? 'bg-red-400' : 'bg-zinc-800'
      }`}
    >
      <NavbarBrand>
        <Link color="foreground" href="/">
          <Logo />
          <p className="font-bold text-inherit">Hub</p>
        </Link>
      </NavbarBrand>

      {/* Mobile Layout */}
      <NavbarContent className="flex mobile:hidden gap-4 relative top-[2.5px]" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/calendar">
            <Image src="/static/icons/calendar.svg" width={30} />
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/channel">
            <Image src="/static/icons/channels.svg" width={30} />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/watch">
            <Image src="/static/icons/download.svg" width={30} />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/privacy">
            <Image src="/static/icons/info.svg" width={30} />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/contact" aria-current="page">
            <Image src="/static/icons/email.svg" width={30} />
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Desktop Layout */}
      <NavbarContent className="hidden mobile:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/calendar">
            {headerText.tv_calendar}
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link color="foreground" href="/channel">
            {headerText.channels}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/watch">
            {headerText.watch}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/privacy">
            {headerText.privacy_policy}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/contact" aria-current="page">
            {headerText.contact}
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default NavbarBlock;
