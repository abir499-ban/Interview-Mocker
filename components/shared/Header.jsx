"use client"
import React, { useEffect } from 'react'
import { useUser, UserButton } from "@clerk/nextjs";
import Image from 'next/image';
import { usePathname } from 'next/navigation';


const Header = () => {
    const pathname = usePathname();
    const isSignedIn = useUser();
    useEffect(()=>{
        console.log("Path: ",pathname);
    },[])
    return (
        <header class="bg-white">
            <div class="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                <a class="block text-teal-600" href="/">
                <Image src={'/logo.svg'} width='40' height='40' alt='logo' />

                </a>

                <div class="flex flex-1 items-center justify-end md:justify-between
          ">
                    <nav aria-label="Global" class="hidden md:block">
                        <ul class="flex items-center gap-6 text-sm">
                            <li>
                                <a class="text-orange-700 transition font-medium text-xl hover:text-blue-800 hover:font-bold"  href="/about"> About </a>
                            </li>

                            <li>
                                <a class="text-orange-700 transition font-medium text-xl hover:text-blue-800 hover:font-bold" href="#"> Careers </a>
                            </li>

                            <li>
                                <a class="text-orange-700 transition font-medium text-xl hover:text-blue-800 hover:font-bold" href="#"> History </a>
                            </li>


                        </ul>
                    </nav>

                    <div class="flex items-center gap-4">
                        <div class="sm:flex sm:gap-4">
                            {!isSignedIn.isSignedIn ? (<a
                                class="block rounded-md bg-orange-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-800"
                                href="/sign-in"
                            >
                                Login
                            </a>) :
                                (<UserButton />)}


                        </div>

                        <button
                            className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                        >
                            <span className="sr-only">Toggle menu</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header