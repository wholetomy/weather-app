"use client";

import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search/Search";
import BigCard from "./components/BigCard/BigCard";
import type { InformacoesMeteorologicasInterface } from "./interfaces/InformacoesMeteorologicasInterface";

export default function Home() {
  const [whichTemperatureUnitIsSelected, setWhichTemperatureUnitIsSelected] = useState<"celsius" | "fahrenheit">("celsius");
  const [whichWindSpeedUnitIsSelected, setWhichWindSpeedUnitIsSelected] = useState<"kmh" | "mph">("kmh");
  const [whichPrecipitationUnitIsSelected, setWhichPrecipitationUnitIsSelected] = useState<"mm" | "inch">("mm");
  const [latitudeLongitude, setLatitudeLongitude] = useState<{ latitude: number, longitude: number } | null>(null);
  const [informacoesMeteorologicas, setInformacoesMeteorologicas] = useState<InformacoesMeteorologicasInterface | null>(null);

  const Seila = () => {
    console.log("informacoesMeteorologicas: ", informacoesMeteorologicas)
  };

  Seila();

  return (
    <div className="min-h-screen bg-[#02012B] sm:px-20 sm:py-10 px-5 py-5 transition duration-200 ease-in-out">
      <Navbar
        whichTemperatureUnitIsSelected={whichTemperatureUnitIsSelected}
        setWhichTemperatureUnitIsSelected={setWhichTemperatureUnitIsSelected}
        whichWindSpeedUnitIsSelected={whichWindSpeedUnitIsSelected}
        setWhichWindSpeedUnitIsSelected={setWhichWindSpeedUnitIsSelected}
        whichPrecipitationUnitIsSelected={whichPrecipitationUnitIsSelected}
        setWhichPrecipitationUnitIsSelected={setWhichPrecipitationUnitIsSelected}
      />
      <Search
        latitudeLongitude={latitudeLongitude}
        setLatitudeLongitude={setLatitudeLongitude}
        whichTemperatureUnitIsSelected={whichTemperatureUnitIsSelected}
        whichWindSpeedUnitIsSelected={whichWindSpeedUnitIsSelected}
        whichPrecipitationUnitIsSelected={whichPrecipitationUnitIsSelected}
        setInformacoesMeteorologicas={setInformacoesMeteorologicas}
      />

      <div className="md:grid md:grid-cols-6 md:grid-rows-3 md:gap-4 flex flex-col gap-4 text-white">
        <BigCard />
        <div className="col-span-2 row-span-3 bg-gray-500 order-4 md:order-0">
          <div className="bg-gray-600">yay</div>
        </div>
        <div className="col-span-4 bg-gray-700 grid grid-cols-4 gap-2 order-2 md:order-0">
          <div className="bg-gray-800">01</div>
          <div className="bg-gray-800">02</div>
          <div className="bg-gray-800">03</div>
          <div className="bg-gray-800">04</div>
        </div>
        <div className="col-span-4 bg-gray-900 grid grid-cols-7 gap-2 order-3 md:order-0">
          <div className="bg-gray-950">01</div>
          <div className="bg-gray-950">02</div>
          <div className="bg-gray-950">03</div>
          <div className="bg-gray-950">04</div>
          <div className="bg-gray-950">05</div>
          <div className="bg-gray-950">06</div>
          <div className="bg-gray-950">07</div>
        </div>
      </div>

    </div>
  );
}
