"use client"

import React, { use, useEffect, useRef } from 'react';
import { HeroUIProvider, Button } from "@heroui/react";
import Link from 'next/link';
import getLangData from '@/components/client/getLangData';
import FirstLoadPopup from '@/components/FirstLoadPopup';
import Navbar from '@/components/Navbar';

async function getInfoText(){
    const lang = await getLangData();
    return lang.pages.watch;
}

const App = () => {
    const appRef = useRef();
    const infoText = use(getInfoText());

    useEffect(() => {
        appRef.current.classList.remove("no-clickable", "stop-drag")
    }, []);

    return (
        <HeroUIProvider>
            <FirstLoadPopup />
            <div className="App no-clickable stop-drag" ref={appRef}>
                <Navbar />
                <h2 className="text-center font-bold text-3xl mt-8">{infoText.how_to_watch}</h2>
                <div className="flex flex-col justify-center items-center" id="Watch">
                    <div id="mobile-app" className='flex flex-col justify-center items-center'>
                        <h4 className='text-xl mt-5'>{infoText.mobile_app}</h4>
                        <p className='mt-3'>{infoText.mobile.try_app}</p>
                        <Link href="/static/android/itvt_1.1.apk" download="itvt_1.1.apk">
                            <Button color="success" variant="bordered" className='mt-4'>
                            <svg width={64} height={64} fill="#ffffff" viewBox="-6.4 -6.4 44.80 44.80" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>android</title> <path d="M23.35 12.653l2.496-4.323c0.044-0.074 0.070-0.164 0.070-0.26 0-0.287-0.232-0.519-0.519-0.519-0.191 0-0.358 0.103-0.448 0.257l-0.001 0.002-2.527 4.377c-1.887-0.867-4.094-1.373-6.419-1.373s-4.532 0.506-6.517 1.413l0.098-0.040-2.527-4.378c-0.091-0.156-0.259-0.26-0.45-0.26-0.287 0-0.519 0.232-0.519 0.519 0 0.096 0.026 0.185 0.071 0.262l-0.001-0.002 2.496 4.323c-4.286 2.367-7.236 6.697-7.643 11.744l-0.003 0.052h29.991c-0.41-5.099-3.36-9.429-7.57-11.758l-0.076-0.038zM9.098 20.176c-0 0-0 0-0 0-0.69 0-1.249-0.559-1.249-1.249s0.559-1.249 1.249-1.249c0.69 0 1.249 0.559 1.249 1.249v0c-0.001 0.689-0.559 1.248-1.249 1.249h-0zM22.902 20.176c-0 0-0 0-0 0-0.69 0-1.249-0.559-1.249-1.249s0.559-1.249 1.249-1.249c0.69 0 1.249 0.559 1.249 1.249v0c-0.001 0.689-0.559 1.248-1.249 1.249h-0z"></path> </g></svg>
                                <span className='text-white ml-[-6px] transition-colors'>{infoText.mobile.download}</span>
                            </Button>
                        </Link>
                        <Link href="https://play.google.com/store/apps/details?id=my.itvt">
                            <Button color="warning" variant="bordered" className='mt-4' disabled={true}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="m4.886 2l8.813 8.812l2.275-2.275c-3.108-1.885-7.27-4.414-9.142-5.552l-1.254-.76A1.56 1.56 0 0 0 4.886 2M3.541 3.055a1.6 1.6 0 0 0-.033.299v17.413c0 .073.014.142.025.211l8.965-8.966zm13.927 6.39L14.9 12.012l2.523 2.524L19.79 13.1c.454-.278.71-.697.703-1.155c-.007-.45-.263-.85-.7-1.098c-.098-.056-1.01-.608-2.324-1.403M13.7 13.213L4.913 22c.17-.03.341-.08.504-.18l10.512-6.377z"/></svg>
                                <span className='text-white ml-[-6px] transition-colors'>{infoText.mobile.soon}</span>
                            </Button>
                        </Link>
                    </div>
                    <div id="playlist-m3u" className='flex flex-col justify-center items-center mt-4'>
                    <h4 className='text-xl mt-5'>{infoText.playlist_m3u}</h4>
                        <p className='mt-2'>{infoText.playlist.use_link}: <b class="select">https://hub.itvt.xyz/watch/iTVT.m3u</b></p>
                        <p className='mt-3'>{infoText.playlist.also_download}</p>
                        <Link href="/watch/iTVT.m3u" download="iTVT.m3u">
                            <Button color="primary" variant="bordered" className='mt-4'>
                                <svg width="64px" height="64px" viewBox="-4.32 -4.32 32.64 32.64" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.288"></g><g id="SVGRepo_iconCarrier"> <path d="M5.625 15C5.625 14.5858 5.28921 14.25 4.875 14.25C4.46079 14.25 4.125 14.5858 4.125 15H5.625ZM4.875 16H4.125H4.875ZM19.275 15C19.275 14.5858 18.9392 14.25 18.525 14.25C18.1108 14.25 17.775 14.5858 17.775 15H19.275ZM11.1086 15.5387C10.8539 15.8653 10.9121 16.3366 11.2387 16.5914C11.5653 16.8461 12.0366 16.7879 12.2914 16.4613L11.1086 15.5387ZM16.1914 11.4613C16.4461 11.1347 16.3879 10.6634 16.0613 10.4086C15.7347 10.1539 15.2634 10.2121 15.0086 10.5387L16.1914 11.4613ZM11.1086 16.4613C11.3634 16.7879 11.8347 16.8461 12.1613 16.5914C12.4879 16.3366 12.5461 15.8653 12.2914 15.5387L11.1086 16.4613ZM8.39138 10.5387C8.13662 10.2121 7.66533 10.1539 7.33873 10.4086C7.01212 10.6634 6.95387 11.1347 7.20862 11.4613L8.39138 10.5387ZM10.95 16C10.95 16.4142 11.2858 16.75 11.7 16.75C12.1142 16.75 12.45 16.4142 12.45 16H10.95ZM12.45 5C12.45 4.58579 12.1142 4.25 11.7 4.25C11.2858 4.25 10.95 4.58579 10.95 5H12.45ZM4.125 15V16H5.625V15H4.125ZM4.125 16C4.125 18.0531 5.75257 19.75 7.8 19.75V18.25C6.61657 18.25 5.625 17.2607 5.625 16H4.125ZM7.8 19.75H15.6V18.25H7.8V19.75ZM15.6 19.75C17.6474 19.75 19.275 18.0531 19.275 16H17.775C17.775 17.2607 16.7834 18.25 15.6 18.25V19.75ZM19.275 16V15H17.775V16H19.275ZM12.2914 16.4613L16.1914 11.4613L15.0086 10.5387L11.1086 15.5387L12.2914 16.4613ZM12.2914 15.5387L8.39138 10.5387L7.20862 11.4613L11.1086 16.4613L12.2914 15.5387ZM12.45 16V5H10.95V16H12.45Z" fill="#ffffff"></path> </g></svg> 
                                <span className='text-white ml-[-6px] transition-colors'>{infoText.playlist.download}</span>
                            </Button>
                        </Link>
                        <p className='mt-3'>{infoText.playlist.apps_recommended}</p>
                        <p className='mt-5'><b>PC / {infoText.playlist.other_devices}</b></p>
                        <ul className='text-center'>
                            <li>- VLC <Link href="https://www.videolan.org/vlc/" className='text-orange-400'>(Download here)</Link></li>
                            <li>- MPV <Link href="https://mpv.io/installation/" className='text-purple-400'>(Download here)</Link></li>
                            <li>- Kodi <Link href="https://kodi.tv/download/" className='text-blue-400'>(Download here)</Link></li>
                        </ul>
                        <p className='mt-4'><b>Android</b></p>
                        <ul className='text-center'>https://www.videolan.org/vlc/
                            <li>- Televizo  <Link href="https://play.google.com/store/apps/details?id=com.ottplay.ottplay" className='text-blue-600'>(Download here)</Link></li>
                            <li>- IPTV Pro - Alexander Sofronov</li>
                            <li>- IPTV - Alexander Sofronov <Link href="https://play.google.com/store/apps/details?id=ru.iptvremote.android.iptv" className='text-blue-600'>(Download here)</Link></li>
                        </ul>
                    </div>
                </div>

            </div>
        </HeroUIProvider>
    );
};
export default App;
