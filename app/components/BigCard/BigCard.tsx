"use client";

import Image from "next/image";
import type { InformacoesMeteorologicasInterface } from "../../interfaces/InformacoesMeteorologicasInterface";

interface BigCardProps {
    informacoesMeteorologicas: InformacoesMeteorologicasInterface | null;
    nomeDoPaisECidadeSelecionado: string;
    isSearchBeingDone: boolean;
}

export default function BigCard({
    informacoesMeteorologicas,
    nomeDoPaisECidadeSelecionado,
    isSearchBeingDone
}: BigCardProps) {
    const diaAtual = new Date();
    const diaAtualFormatado = diaAtual.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    if (isSearchBeingDone) {
        return (
            <div className="bg-[#262640] h-[224px] w-full rounded-lg col-span-4 order-1 md:order-0 relative z-10 gap-2 flex flex-col justify-center items-center text-white">
                <div className="flex items-center justify-center gap-2">
                    <div className="w-3 h-3 bg-[#D0CFE1] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-3 h-3 bg-[#D0CFE1] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-3 h-3 bg-[#D0CFE1] rounded-full animate-bounce"></div>
                </div>
                <span className="text-[#D0CFE1]">Loading...</span>
            </div>
        );
    }

    return (
        <>
            {informacoesMeteorologicas && (
                <div className="relative w-full overflow-hidden rounded-lg shadow-[inset_0_0_0_1px_#000049] col-span-4 order-1 md:order-0">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/bg-today-small.svg`}
                        alt="background mobile"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover sm:hidden"
                    />
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/bg-today-large.svg`}
                        alt="background desktop"
                        fill
                        priority
                        sizes="100vw"
                        className="hidden object-cover sm:block"
                    />
                    <div className="relative z-10 flex flex-col rounded-lg justify-between items-center lg:flex-row w-full sm:py-16 sm:px-5 py-8 px-5 text-white">
                        <div className="flex flex-col items-center gap-2 sm:items-start mb-4">
                            <h2 className="font-semibold text-2xl text-center">{nomeDoPaisECidadeSelecionado}</h2>
                            <span className="text-[#C5CCFF] text-center">{diaAtualFormatado}</span>
                        </div>
                        <div className="w-auto flex items-center justify-evenly max-[300px]:flex-col-reverse">
                            <img
                                className="w-22.5"
                                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icon-sunny.webp`}
                                alt="logo"
                            />
                            <h1 className="text-[80px] font-dmsans-italic sm:text-8xl font-medium">{informacoesMeteorologicas?.current.temperature_2m.toFixed()}°</h1>
                        </div>
                    </div>
                </div>
            )}


        </>
    )
}
