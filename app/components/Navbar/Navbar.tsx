"use client";

import Image from "next/image"
import { VscGear } from "react-icons/vsc";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
import { IoMdCheckmark } from "react-icons/io";

interface NavbarProps {
    whichTemperatureUnitIsSelected: "celsius" | "fahrenheit";
    setWhichTemperatureUnitIsSelected: (valor: "celsius" | "fahrenheit") => void;
    whichWindSpeedUnitIsSelected: "kmh" | "mph"
    setWhichWindSpeedUnitIsSelected: (valor: "kmh" | "mph") => void;
    whichPrecipitationUnitIsSelected: "mm" | "inch"
    setWhichPrecipitationUnitIsSelected: (valor: "mm" | "inch") => void;
}

export default function Navbar({
    whichTemperatureUnitIsSelected,
    setWhichTemperatureUnitIsSelected,
    whichWindSpeedUnitIsSelected,
    setWhichWindSpeedUnitIsSelected,
    whichPrecipitationUnitIsSelected,
    setWhichPrecipitationUnitIsSelected
}: NavbarProps) {
    const [isUnitsOpened, setIsUnitsOpened] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const TrocarParaSistemaImperial = () => {
        setWhichTemperatureUnitIsSelected("fahrenheit");
        setWhichWindSpeedUnitIsSelected("mph");
        setWhichPrecipitationUnitIsSelected("inch");
    };

    useEffect(() => {
        const FecharModalAoClicarFora = (event: MouseEvent) => {
            if (!menuRef.current?.contains(event.target as Node)) {
                setIsUnitsOpened(false);
            }
        };
        document.addEventListener("mousedown", FecharModalAoClicarFora);
        return () => {document.removeEventListener("mousedown", FecharModalAoClicarFora)}
    }, [])

    return (
        <div className="flex justify-between">
            <div className="lg:w-52 sm:w-52 w-40 h-12 relative mb-10">
                <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logo.svg`}
                    alt="logo"
                    fill
                    className="object-contain"
                    loading="eager"
                />
            </div>
            <div
                className="relative"
                ref={menuRef}
            >
                <button
                    className="flex items-center gap-2 text-white cursor-pointer p-2 bg-[#25253E] hover:bg-[#2F2F49] rounded-lg transition-all duration-200 ease-in-out border-2 border-[#3B3A5C] focus:outline-2 focus:outline-white-200 focus:outline-offset-1"
                    onClick={() => setIsUnitsOpened(!isUnitsOpened)}
                >
                    <VscGear />
                    <span>Units</span>
                    <IoIosArrowDown />
                </button>
                {isUnitsOpened && (
                    <div className="absolute z-10 flex flex-col gap-2 text-white w-50 bg-[#25253F] right-0 mt-2 p-1 transition-all duration-200 ease-in-out rounded-lg border-2 border-[#3B3A5C]">
                        <div className="flex gap-1 flex-col px-1 pb-2 border-b border-[#3B3B57]">
                            <div
                                className="hover:bg-[#2F2F49] rounded-lg px-1 py-1 transition duration-200 ease-in-out cursor-pointer"
                                onClick={TrocarParaSistemaImperial}
                            >
                                <span>Switch to Imperial</span>
                            </div>
                            <h1 className="text-[#8A889D] px-1 text-xs">Temperature</h1>
                            <div
                                className="flex justify-between items-center hover:bg-[#2F2F49] rounded-lg px-1 py-1 transition duration-200 ease-in-out cursor-pointer"
                                onClick={() => setWhichTemperatureUnitIsSelected("celsius")}
                            >
                                <span>Celsius (°C)</span>
                                {whichTemperatureUnitIsSelected === "celsius" && <IoMdCheckmark />}
                            </div>
                            <div
                                className="flex justify-between items-center hover:bg-[#2F2F49] rounded-lg px-1 py-1 transition duration-200 ease-in-out cursor-pointer"
                                onClick={() => setWhichTemperatureUnitIsSelected("fahrenheit")}
                            >
                                <span>Fahrenheit (°F)</span>
                                {whichTemperatureUnitIsSelected === "fahrenheit" && <IoMdCheckmark />}
                            </div>
                        </div>
                        <div className="flex gap-1 flex-col px-1">
                            <h1 className="text-[#8A889D] px-1 text-xs">Wind Speed</h1>
                            <div
                                className="flex justify-between items-center hover:bg-[#2F2F49] rounded-lg px-1 py-1 transition duration-200 ease-in-out cursor-pointer"
                                onClick={() => setWhichWindSpeedUnitIsSelected("kmh")}
                            >
                                <span>km/h</span>
                                {whichWindSpeedUnitIsSelected === "kmh" && <IoMdCheckmark />}
                            </div>
                            <div
                                className="flex justify-between items-center hover:bg-[#2F2F49] rounded-lg px-1 py-1 transition duration-200 ease-in-out cursor-pointer"
                                onClick={() => setWhichWindSpeedUnitIsSelected("mph")}
                            >
                                <span>mph</span>
                                {whichWindSpeedUnitIsSelected === "mph" && <IoMdCheckmark />}
                            </div>
                        </div>
                        <div className="flex gap-1 flex-col px-1 pt-2 border-t border-[#3B3B57]">
                            <h1 className="text-[#8A889D] px-1 text-xs">Precipitation</h1>
                            <div
                                className="flex justify-between items-center hover:bg-[#2F2F49] rounded-lg px-1 py-1 transition duration-200 ease-in-out cursor-pointer"
                                onClick={() => setWhichPrecipitationUnitIsSelected("mm")}
                            >
                                <span>Millimeters (mm)</span>
                                {whichPrecipitationUnitIsSelected === "mm" && <IoMdCheckmark />}
                            </div>
                            <div
                                className="flex justify-between items-center hover:bg-[#2F2F49] rounded-lg px-1 py-1 transition duration-200 ease-in-out cursor-pointer"
                                onClick={() => setWhichPrecipitationUnitIsSelected("inch")}
                            >
                                <span>Inches (in)</span>
                                {whichPrecipitationUnitIsSelected === "inch" && <IoMdCheckmark />}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
