"use client"

import React from "react";
import Link from 'next/link'


const Navbar = () => {
    return (
        <div>
            <nav className='flex p-4 bg-black text-white justify-between'>
                <div className="logo">Myntra Tracker </div>
                <ul className="flex gap-5 justify-between">
                    
                    <Link href={"/"}><li>Home</li></Link>
                    <Link href={"/"}><li>About</li></Link>
                    <Link href={"/"}><li>Contact</li></Link>
                </ul>

            </nav>
        </div>
    )
}

export default Navbar