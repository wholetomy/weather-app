"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import type { InformacoesMeteorologicasInterface } from "../../interfaces/InformacoesMeteorologicasInterface";

interface HourlyForecastProps {
    informacoesMeteorologicas: InformacoesMeteorologicasInterface | null;
    isSearchBeingDone: boolean;
}

export default function HourlyForecast({
    informacoesMeteorologicas,
    isSearchBeingDone
}: HourlyForecastProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    const [isHourlyForecastDropDownOpened, setIsHourlyForecastDropDownOpened] = useState<boolean>(false);
    const [whichDayIsClicked, setWhichDayIsClicked] = useState<string>("");
    const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

    useEffect(() => {
        const diaDaSemanaEmNumero = new Date().getDay();
        setWhichDayIsClicked(daysOfTheWeek[diaDaSemanaEmNumero]);
    }, []);

    useEffect(() => {
        const FecharModalDeDiasSemanaisAoClicarFora = (event: MouseEvent) => {
            if (!menuRef.current?.contains(event.target as Node)) {
                setIsHourlyForecastDropDownOpened(false);
            }
        };
        document.addEventListener("mousedown", FecharModalDeDiasSemanaisAoClicarFora);
        return () => { document.removeEventListener("mousedown", FecharModalDeDiasSemanaisAoClicarFora) }
    }, [])

    const FuncaoParaConverterAData = (valor: string) => {
        const date = new Date(valor);
        let hours = date.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Converte para formato 12 horas
        hours = hours % 12;
        hours = hours ? hours : 12; // 0 vira 12

        return `${hours} ${ampm}`;
    };

    const FuncaoParaMostrarIconeCorreto = (valor: number) => {
        let icon = "icon-overcast.webp";

        switch (valor) {
            case 0:
                icon = "icon-sunny.webp";
                break;

            case 1:
            case 2:
                icon = "icon-partly-cloudy.webp";
                break;

            case 3:
                icon = "icon-overcast.webp";
                break;

            case 45:
            case 48:
                icon = "icon-fog.webp";
                break;

            case 51:
            case 53:
            case 55:
                icon = "icon-drizzle.webp";
                break;

            case 61:
            case 63:
            case 65:
            case 80:
            case 81:
            case 82:
                icon = "icon-rain.webp";
                break;

            case 71:
            case 73:
            case 75:
                icon = "icon-snow.webp";
                break;

            case 95:
            case 96:
            case 99:
                icon = "icon-storm.webp";
                break;
        }

        return `${BASE_PATH}/${icon}`;
    };

    return (
        <div className="md:col-span-2 md:row-span-3 bg-[#25253F] order-4 md:order-0 p-4 h-125 md:h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#3B3A5C] scrollbar-track-[#25253F]">
            <div className="flex justify-between items-center flex-wrap">
                <h1 className="font-medium text-md">Hourly forecast</h1>
                <div
                    className="relative"
                    ref={menuRef}
                >
                    <button
                        className="bg-[#3C3B5B] rounded-sm flex gap-2 items-center py-1 px-2 cursor-pointer"
                        onClick={() => setIsHourlyForecastDropDownOpened(!isHourlyForecastDropDownOpened)}
                    >
                        {whichDayIsClicked !== "" && !isSearchBeingDone ? (
                            <span>{whichDayIsClicked}</span>
                        ) : (
                            <span>-</span>
                        )}
                        <IoIosArrowDown />
                    </button>
                    {isHourlyForecastDropDownOpened && (
                        <div className="absolute z-20 w-50 mt-2 bg-[#25253F] border-2 border-[#3B3A5C] rounded-sm p-1 right-0">
                            {daysOfTheWeek.map((day, index) => (
                                <div
                                    className="hover:bg-[#2F2F49] transition-colors duration-200 ease-in-out cursor-pointer px-2 py-1 rounded-sm"
                                    key={index}
                                    onClick={() => {
                                        setWhichDayIsClicked(day)
                                        setIsHourlyForecastDropDownOpened(false);
                                    }}
                                >
                                    {day}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="flex gap-2 flex-col mt-2">
                {isSearchBeingDone ? (
                    Array.from({ length: 24 }).map((_, index) => (
                        <div key={index} className="bg-[#2F2F49] w-full h-10 rounded-sm animate-pulse [animation-duration:2s]" />
                    ))
                ) : (
                    informacoesMeteorologicas?.hourly.time.map((time, index) => {
                        const temperatura = informacoesMeteorologicas.hourly.temperature_2m[index];
                        const timeOfTheDay = informacoesMeteorologicas.hourly.time[index];
                        const weatherCode = informacoesMeteorologicas.hourly.weather_code[index];
                        const date = new Date(timeOfTheDay);
                        const diaDaSemanaEmNumero = date.getDay();
                        const dayName = daysOfTheWeek[diaDaSemanaEmNumero];

                        if (dayName !== whichDayIsClicked) {
                            return null;
                        }

                        return (
                            <div key={index} className="bg-[#2F2F49] w-full h-10 rounded-sm flex items-center justify-between gap-4">
                                <div className="pl-2 flex gap-1 items-center">
                                    <Image
                                        src={FuncaoParaMostrarIconeCorreto(weatherCode)}
                                        alt=""
                                        width={24}
                                        height={24}
                                    />
                                    <span className="pl-2">{FuncaoParaConverterAData(timeOfTheDay)}</span>
                                </div>
                                <span className="pr-2">{temperatura.toFixed()}°</span>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}
