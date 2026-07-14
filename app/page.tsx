"use client";

import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search/Search";
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
    </div>
  );
}
