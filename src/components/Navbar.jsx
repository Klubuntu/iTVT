"use client";

import React, { use } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Image} from "@heroui/react";
import getLangData from '@/components/client/getLangData';
import {Logo} from "./Logo.jsx";

async function getHeaderText() {
  const lang = await getLangData();
  return lang.navbar;
}

function NavbarBlock () {
  const headerText = use(getHeaderText());

  return (
    <Navbar className="m-4 bg-zinc-800 rounded-md w-vw-header">
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
            <Image src="/static/icons/calendar.svg" width={30}></Image>
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/channel">
            <Image src="/static/icons/channels.svg" width={30}></Image>
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link color="foreground" href="/watch">
            <Image src="/static/icons/download.svg" width={30}></Image>
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link color="foreground" href="/privacy">
            <Image src="/static/icons/info.svg" width={30}></Image>
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link color="foreground" href="/contact" aria-current="page">
            <Image src="/static/icons/email.svg" width={30}></Image>
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