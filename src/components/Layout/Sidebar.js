// @/components/Layout/Sidebar.js
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { SlHome } from 'react-icons/sl'
import { BsInfoSquare, BsEnvelopeAt } from 'react-icons/bs'
import { FaTshirt, FaRedhat, FaGift, FaInfoCircle, FaFistRaised, FaFish } from 'react-icons/fa'

import logo from '@/img/jama.png'

export default function Sidebar({ show, setter }) {
    const router = useRouter();

    // Define our base class
    const className = "bg-white w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40";
    // Append class based on state of sidebar visiblity
    const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

    // Clickable menu items
    const MenuItem = ({ icon, name, route }) => {
        // Highlight menu item based on currently displayed route
        const colorClass = router.pathname === route ? "text-black" : "text-black/50 hover:text-black";

        return (
            <Link
                href={route}
                onClick={() => {
                    setter(oldVal => !oldVal);
                }}
                className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 ${colorClass}`}
            >
                <div className="text-xl flex [&>*]:mx-auto w-[30px]">
                    {icon}
                </div>
                <div>{name}</div>
            </Link>
        )
    }

    // Overlay to prevent clicks in background, also serves as our close button
    const ModalOverlay = () => (
        <div
            className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-white/50 z-30`}
            onClick={() => {
                setter(oldVal => !oldVal);
            }}
        />
    )

    return (
        <>
            <div className={`${className}${appendClass}`}>
                <div className="p-2 flex">
                    <Link href="/">
                        <img src={logo.src} alt="Company Logo" width={300} height={300} />
                    </Link>
                </div>
                <div className="flex flex-col">
                    <MenuItem
                        name="Información"
                        route="/"
                        icon={<FaInfoCircle />}
                    />
                    <MenuItem
                        name="Jama Gifts"
                        route="/gift-card"
                        icon={<FaGift />}
                    />
                    <MenuItem
                        name="Jama Cman"
                        route="https://jamac-man.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        icon={<FaFish />}
                    />
                    <MenuItem
                        name="Contactanos"
                        route="/contact"
                        icon={<BsEnvelopeAt />}
                    />
                </div>
            </div>
            {show ? <ModalOverlay /> : <></>}
        </>
    )
}