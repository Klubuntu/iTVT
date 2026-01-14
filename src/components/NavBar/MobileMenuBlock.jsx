"use client";
import React, { useState } from 'react';
import { Navbar, NavbarContent, NavbarItem, Link, Image } from '@heroui/react';
import styles from './mobilemenublock.module.css';

function MobileMenuBlock() {
  // Ripple state to track for each NavbarItem individually
  const [ripples, setRipples] = useState({});

  // Function to handle the click event and calculate the ripple position
  const handleRipple = (event, itemId) => {
    const { clientX, clientY } = event;
    const element = event.target.getBoundingClientRect(); // Get position of the clicked element
    const x = clientX - element.left; // Horizontal position of click relative to element
    const y = clientY - element.top; // Vertical position of click relative to element

    // Set ripple position and trigger the effect for the specific item
    setRipples({
      ...ripples,
      [itemId]: {
        x: x,
        y: y,
        show: true,
      },
    });

    // Hide the ripple after animation ends (600ms duration)
    setTimeout(() => {
      setRipples((prev) => ({
        ...prev,
        [itemId]: { ...prev[itemId], show: false },
      }));
    }, 600);
  };

  return (
    <Navbar id="mobileMenu" className="select-none mobile:hidden rounded-xl transition-all duration-300 shadow-2xl shadow-blue-500/20 bg-zinc-900/95 backdrop-blur-md fixed bottom-6 left-1/2 -translate-x-1/2 border-t border-b border-zinc-700/50 hover:shadow-blue-500/30 hover:border-zinc-600/70" style={{width: 'calc(100% - 32px)', maxWidth: 'calc(100vw - 32px)'}}>
      {/* Mobile Layout */}
      <NavbarContent className="flex gap-4 justify-between items-center w-full">
        {/* Navbar Items with Ripple Effect */}
        {['calendar', 'channel', 'privacy', 'contact'].map((item) => (
        <NavbarItem
            key={item}
            className={styles.button}
            onClick={(e) => handleRipple(e, item)}
        >
            {ripples[item]?.show && (
            <span
                className={styles.ripple}
                style={{
                left: `${ripples[item].x - 15}px`,
                top: `${ripples[item].y - 15}px`,
                width: '30px',
                height: '30px',
                }}
            />
            )}
            <Link color="foreground" href={`/${item}`}>
            <Image src={`/static/icons/${item}.svg`} width={30} />
            </Link>
        </NavbarItem>
        ))}

      </NavbarContent>
    </Navbar>
  );
}

export default MobileMenuBlock;
