// @/components/Layout/index.js
import React, { useState } from 'react'
import Head from 'next/head'
import Sidebar from './Sidebar';
import MenuBarMobile from './MenuBarMobile';

export default function Layout({ pageTitle, children }) {
    // Concatenate page title (if exists) to site title
    let titleConcat = "";
    if (pageTitle) titleConcat = pageTitle + " | " + titleConcat;

    // Mobile sidebar visibility state
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <div className='flex-1 shrink scroll-m-1 grow w-full overflow-hidden'>
            <Head>
                <title>{titleConcat}</title>
            </Head>
                <div className="flex shrink grow w-full overflow-hidden p-2">
                    <MenuBarMobile setter={setShowSidebar} />
                    <Sidebar show={showSidebar} setter={setShowSidebar} />
                    <div className="flex-1 shrink grow w-full">
                        {children}
                    </div>
            </div>
        </div>
    )
}