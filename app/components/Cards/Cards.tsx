"use client";

import type { InformacoesMeteorologicasInterface } from "../../interfaces/InformacoesMeteorologicasInterface";

interface CardsProps {
    informacoesMeteorologicas: InformacoesMeteorologicasInterface | null;
    isSearchBeingDone: boolean;
}

export default function Cards({
    informacoesMeteorologicas,
    isSearchBeingDone
}: CardsProps) {

    const cards = [
        {
            title: "Feels Like",
            value: informacoesMeteorologicas?.current.apparent_temperature,
            unit: informacoesMeteorologicas?.current_units.apparent_temperature,
        },
        {
            title: "Humidity",
            value: informacoesMeteorologicas?.current.relative_humidity_2m,
            unit: informacoesMeteorologicas?.current_units.relative_humidity_2m
        },
        {
            title: "Wind",
            value: informacoesMeteorologicas?.current.wind_speed_10m,
            unit: informacoesMeteorologicas?.current_units.wind_speed_10m
        },
        {
            title: "Precipitation",
            value: informacoesMeteorologicas?.current.precipitation,
            unit: informacoesMeteorologicas?.current_units.precipitation
        },
    ];

    if (isSearchBeingDone) {
        return (
            <div className="col-span-4 grid md:grid-cols-4 grid-cols-2 gap-4 order-2 md:order-0">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-[#25253F] border-2 border-[#3C3B5D] rounded-lg flex flex-col items-start gap-6 p-4 min-w-0"
                    >
                        <h1 className="text-[#CECFE4] text-lg w-full truncate">
                            {card.title}
                        </h1>
                        <span className="text-3xl w-full truncate">-</span>
                    </div>
                ))}
            </div>
        );
    }

    if (!informacoesMeteorologicas) {
        return null;
    }

    return (
        <div className="col-span-4 grid md:grid-cols-4 grid-cols-2 gap-4 order-2 md:order-0">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="bg-[#25253F] border-2 border-[#3C3B5D] rounded-lg flex flex-col items-start gap-6 p-4 min-w-0"
                >
                    <h1 className="text-[#CECFE4] text-lg w-full truncate">
                        {card.title}
                    </h1>

                    <span className="text-3xl w-full truncate">
                        {Number(card.value).toFixed()}
                        {card.unit === "%" ? card.unit : ` ${card.unit}`}
                    </span>
                </div>
            ))}
        </div>
    );
}
