"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search/Search";
import BigCard from "./components/BigCard/BigCard";
import Cards from "./components/Cards/Cards";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";
import type { InformacoesMeteorologicasInterface } from "./interfaces/InformacoesMeteorologicasInterface";
import { TfiReload } from "react-icons/tfi";

export default function Home() {
  const [whichTemperatureUnitIsSelected, setWhichTemperatureUnitIsSelected] = useState<"celsius" | "fahrenheit">("celsius");
  const [whichWindSpeedUnitIsSelected, setWhichWindSpeedUnitIsSelected] = useState<"kmh" | "mph">("kmh");
  const [whichPrecipitationUnitIsSelected, setWhichPrecipitationUnitIsSelected] = useState<"mm" | "inch">("mm");
  const [latitudeLongitude, setLatitudeLongitude] = useState<{ latitude: number, longitude: number } | null>(null);
  const [informacoesMeteorologicas, setInformacoesMeteorologicas] = useState<InformacoesMeteorologicasInterface | null>(null);
  const [nomeDoPaisECidadeSelecionado, setNomeDoPaisECidadeSelecionado] = useState<string>("");
  const [isSearchBeingDone, setIsSearchBeingDone] = useState<boolean>(false);
  const [deuErroNaApi, setDeuErroNaApi] = useState<boolean>(false);
  const [showWeatherGrid, setShowWeatherGrid] = useState<boolean>(true);

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

      {deuErroNaApi ? (
        <div className="flex justify-center flex-col items-center gap-4">
          <h1 className="text-white text-3xl font-bricolage font-semibold">
            Something went wrong
          </h1>

          <span className="text-[#D1D0DE]">
            We couldn't connect to the server (API error). Please try again in a few moments.
          </span>

          <button
            className="flex gap-2 items-center text-white bg-[#25253F] hover:bg-[#2F2F49] px-4 py-2 cursor-pointer rounded-lg border-2 border-[#242446]"
            onClick={() => window.location.reload()}
          >
            <TfiReload />
            <span>Retry</span>
          </button>
        </div>
      ) : (
        <>
          <Search
            latitudeLongitude={latitudeLongitude}
            setLatitudeLongitude={setLatitudeLongitude}
            whichTemperatureUnitIsSelected={whichTemperatureUnitIsSelected}
            whichWindSpeedUnitIsSelected={whichWindSpeedUnitIsSelected}
            whichPrecipitationUnitIsSelected={whichPrecipitationUnitIsSelected}
            setInformacoesMeteorologicas={setInformacoesMeteorologicas}
            setNomeDoPaisECidadeSelecionado={setNomeDoPaisECidadeSelecionado}
            setIsSearchBeingDone={setIsSearchBeingDone}
            setDeuErroNaApi={setDeuErroNaApi}
            setShowWeatherGrid={setShowWeatherGrid}
          />

          {showWeatherGrid && (
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
          )}
        </>
      )}
    </div >
  );
}
