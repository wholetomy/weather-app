"use client";

import Image from "next/image";
import type { InformacoesMeteorologicasInterface } from "../../interfaces/InformacoesMeteorologicasInterface";

interface DailyForecastProps {
    informacoesMeteorologicas: InformacoesMeteorologicasInterface | null;
    isSearchBeingDone: boolean;
}

export default function DailyForecast({
    informacoesMeteorologicas,
    isSearchBeingDone
}: DailyForecastProps) {
    const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

    const dailyForecastCards = informacoesMeteorologicas?.daily.time.map((date, index) => ({
        dayOfTheWeekIn3Letters: new Date(date).toLocaleDateString(
            "en-US",
            { weekday: "short" }
        ),
        icon: informacoesMeteorologicas.daily.weather_code[index],
        maxTemperature: informacoesMeteorologicas.daily.temperature_2m_max[index],
        maxTemperatureUnit: informacoesMeteorologicas.daily_units.temperature_2m_max,
        minTemperature: informacoesMeteorologicas.daily.temperature_2m_min[index],
        minTemperatureUnit: informacoesMeteorologicas.daily_units.temperature_2m_min,
    })) ?? [];

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
        <>
            {!isSearchBeingDone ? (
                <div className="col-span-4 order-3 md:order-0">
                    <h1 className="mb-2 text-lg font-medium">
                        Daily forecast
                    </h1>

                    <div className="grid md:grid-cols-7 grid-cols-3 gap-2">
                        {dailyForecastCards.map((card, index) => (
                            <div
                                key={index}
                                className="flex flex-col space-between items-center gap-4 p-2 bg-[#25253F] border-2 border-[#3C3B5D] rounded-lg"
                            >
                                <div>{card.dayOfTheWeekIn3Letters}</div>
                                <div>
                                    <Image
                                        src={FuncaoParaMostrarIconeCorreto(card.icon)}
                                        alt=""
                                        width={40}
                                        height={40}
                                    />
                                </div>
                                <div className="flex justify-between items-center w-full min-w-0">
                                    <div className="truncate">
                                        {card.maxTemperature.toFixed()}
                                        {card.maxTemperatureUnit}
                                    </div>
                                    <div className="truncate">
                                        {card.minTemperature.toFixed()}
                                        {card.minTemperatureUnit}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="col-span-4 order-3 md:order-0">
                    <h1 className="mb-2 text-lg font-medium">
                        Daily forecast
                    </h1>

                    <div className="grid md:grid-cols-7 grid-cols-3 gap-2">
                        {Array.from({ length: 7 }).map((_, index) => (
                            <div key={index} className="h-35 flex flex-col space-between items-center gap-4 p-2 bg-[#25253F] border-2 border-[#3C3B5D] rounded-lg" />
                        ))}
                    </div>
                </div>
            )}

        </>
    )
}
