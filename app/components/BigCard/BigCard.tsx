"use client";

import Image from "next/image";

export default function BigCard() {
    return (
        <div className="relative w-full overflow-hidden rounded-lg border border-[#000049] col-span-4 order-1 md:order-0">
            <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/bg-today-small.svg`}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover sm:hidden rounded-lg"
            />
            <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/bg-today-large.svg`}
                alt=""
                fill
                priority
                sizes="100vw"
                className="hidden object-cover sm:block rounded-lg"
            />
            <div className="relative z-10 flex flex-col rounded-lg justify-between items-center lg:flex-row w-full sm:py-16 sm:px-5 py-8 px-5 text-white">
                <div className="flex flex-col items-center gap-2 sm:items-start mb-4">
                    <h2 className="font-semibold text-2xl">Berlin, Germany</h2>
                    <span className="text-[#C5CCFF]">Tuesday, Aug 5, 2025</span>
                </div>
                <div className="w-auto flex items-center justify-evenly max-[300px]:flex-col-reverse">
                    <img
                        className="w-22.5"
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icon-sunny.webp`}
                        alt="logo"
                    />
                    <h1 className="text-[80px] font-dmsans-italic sm:text-8xl font-medium">20°</h1>
                </div>
            </div>
        </div>
    )
}
