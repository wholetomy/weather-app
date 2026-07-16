"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search/Search";
import BigCard from "./components/BigCard/BigCard";
import Cards from "./components/Cards/Cards";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";
import type { InformacoesMeteorologicasInterface } from "./interfaces/InformacoesMeteorologicasInterface";

export default function Home() {
  const [whichTemperatureUnitIsSelected, setWhichTemperatureUnitIsSelected] = useState<"celsius" | "fahrenheit">("celsius");
  const [whichWindSpeedUnitIsSelected, setWhichWindSpeedUnitIsSelected] = useState<"kmh" | "mph">("kmh");
  const [whichPrecipitationUnitIsSelected, setWhichPrecipitationUnitIsSelected] = useState<"mm" | "inch">("mm");
  const [latitudeLongitude, setLatitudeLongitude] = useState<{ latitude: number, longitude: number } | null>(null);
  const [informacoesMeteorologicas, setInformacoesMeteorologicas] = useState<InformacoesMeteorologicasInterface | null>(null);
  const [nomeDoPaisECidadeSelecionado, setNomeDoPaisECidadeSelecionado] = useState<string>("");
  const [isSearchBeingDone, setIsSearchBeingDone] = useState<boolean>(false);

  const berlin = {
    latitude: 52.52,
    longitude: 13.405,
  };

  useEffect(() => {
    setLatitudeLongitude(berlin);
    setNomeDoPaisECidadeSelecionado("Berlin, Germany");
  }, []);

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
        setNomeDoPaisECidadeSelecionado={setNomeDoPaisECidadeSelecionado}
        setIsSearchBeingDone={setIsSearchBeingDone}
      />
      <div className="grid md:grid-cols-6 md:grid-rows-[220px_120px_175px] md:gap-4 grid-cols-1 gap-y-4 text-white">
        <BigCard
          informacoesMeteorologicas={informacoesMeteorologicas}
          nomeDoPaisECidadeSelecionado={nomeDoPaisECidadeSelecionado}
          isSearchBeingDone={isSearchBeingDone}
        />
        <HourlyForecast
          informacoesMeteorologicas={informacoesMeteorologicas}
          isSearchBeingDone={isSearchBeingDone}
        />
        <Cards
          informacoesMeteorologicas={informacoesMeteorologicas}
          isSearchBeingDone={isSearchBeingDone}
        />
        <DailyForecast
          informacoesMeteorologicas={informacoesMeteorologicas}
          isSearchBeingDone={isSearchBeingDone}
        />
      </div>
    </div >
  );
}
