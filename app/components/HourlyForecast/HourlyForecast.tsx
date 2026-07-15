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
        switch (valor) {
            case 0:
                return "/icon-sunny.webp";

            case 1:
            case 2:
                return "/icon-partly-cloudy.webp";

            case 3:
                return "/icon-overcast.webp";

            case 45:
            case 48:
                return "/icon-fog.webp";

            case 51:
            case 53:
            case 55:
                return "/icon-drizzle.webp";

            case 61:
            case 63:
            case 65:
            case 80:
            case 81:
            case 82:
                return "/icon-rain.webp";

            case 71:
            case 73:
            case 75:
                return "/icon-snow.webp";

            case 95:
            case 96:
            case 99:
                return "/icon-storm.webp";

            default:
                return "/icon-overcast.webp";
        }
    };

    return (
        <div className="col-span-2 row-span-3 bg-[#25253F] order-4 md:order-0 p-4 md:h-full h-100 overflow-y-auto scrollbar-thin scrollbar-thumb-[#3B3A5C] scrollbar-track-[#25253F]">
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
            <div className="flex gap-2 min-h-0 flex-col mt-2">
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

                        console.log({
                            time: timeOfTheDay,
                            weatherCode,
                            dayName
                        });

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
