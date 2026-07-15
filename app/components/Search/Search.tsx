"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import type { InformacoesMeteorologicasInterface } from "../../interfaces/InformacoesMeteorologicasInterface";
import type { CountriesAndCitiesInterface } from "../../interfaces/CountriesAndCitiesInterface";

interface SearchProps {
  latitudeLongitude: { latitude: number, longitude: number } | null;
  setLatitudeLongitude: (valor: { latitude: number, longitude: number } | null) => void;
  whichTemperatureUnitIsSelected: "celsius" | "fahrenheit";
  whichWindSpeedUnitIsSelected: "kmh" | "mph";
  whichPrecipitationUnitIsSelected: "mm" | "inch";
  setInformacoesMeteorologicas: (valor: InformacoesMeteorologicasInterface | null) => void;
  setNomeDoPaisECidadeSelecionado: (valor: string) => void;
  setIsSearchBeingDone: (valor: boolean) => void;
}

export default function Search({
  latitudeLongitude,
  setLatitudeLongitude,
  whichTemperatureUnitIsSelected,
  whichWindSpeedUnitIsSelected,
  whichPrecipitationUnitIsSelected,
  setInformacoesMeteorologicas,
  setNomeDoPaisECidadeSelecionado,
  setIsSearchBeingDone
}: SearchProps) {
  const [countriesAndCities, setCountriesAndCities] = useState<CountriesAndCitiesInterface[]>([]);
  const [valorDigitado, setValorDigitado] = useState<string>("");
  const [localidadeSelecionada, setLocalidadeSelecionada] = useState<boolean>(false);
  const [isCountriesAndCitiesSearchLoading, setIsCountriesAndCitiesSearchLoading] = useState<boolean>(false);
  const [searchWasPerformed, setSearchWasPerformed] = useState(false);

  useEffect(() => {
    if (!latitudeLongitude) return;

    BuscarInformacoesMeteorologicasPorCidadeSelecionada();
  }, [latitudeLongitude]);

  useEffect(() => {
    if (localidadeSelecionada) return;

    if (!valorDigitado.trim()) {
      setSearchWasPerformed(false);
      setCountriesAndCities([]);
      setIsCountriesAndCitiesSearchLoading(false);
      setLatitudeLongitude(null);
      return;
    }

    setSearchWasPerformed(false);
    setIsCountriesAndCitiesSearchLoading(true);

    const timeout = setTimeout(() => {
      BuscarPaisesECidades();
    }, 300);

    return () => clearTimeout(timeout);
  }, [valorDigitado, localidadeSelecionada]);

  const BuscarPaisesECidades = async () => {
    const parametroDigitadoPeloUsuarioLimpo = valorDigitado.trim().substring(0, 100);
    if (!parametroDigitadoPeloUsuarioLimpo) {
      setInformacoesMeteorologicas(null);
      setLatitudeLongitude(null);
      return;
    };

    const params = new URLSearchParams({
      name: parametroDigitadoPeloUsuarioLimpo,
      count: "4",
      language: "en", // or "pt"
      format: "json"
    });

    const url = `https://geocoding-api.open-meteo.com/v1/search?${params}`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();

      if (result.results) {
        setCountriesAndCities(result.results);
      } else {
        setCountriesAndCities([]);
        setInformacoesMeteorologicas(null);
        setLatitudeLongitude(null);
      }

      return result;
    } catch (error) {
      console.error("There is an issue with the 'BuscarPaisesECidades' function: ", error);
    } finally {
      setIsCountriesAndCitiesSearchLoading(false);
      setSearchWasPerformed(true);
    }
  };

  const BuscarInformacoesMeteorologicasPorCidadeSelecionada = async () => {
    if (!latitudeLongitude) {
      setIsSearchBeingDone(false);
      return;
    };

    const params = new URLSearchParams({
      latitude: String(latitudeLongitude.latitude),
      longitude: String(latitudeLongitude.longitude),
      current: "temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,apparent_temperature,weather_code",
      hourly: "temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,apparent_temperature,weather_code",
      timezone: "America/Sao_Paulo",
      temperature_unit: whichTemperatureUnitIsSelected,
      windspeed_unit: whichWindSpeedUnitIsSelected,
      precipitation_unit: whichPrecipitationUnitIsSelected,
    })

    const url = `https://api.open-meteo.com/v1/forecast?${params}`;

    try {
      setIsSearchBeingDone(true);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      setInformacoesMeteorologicas(result);
    } catch (error) {
      console.error("There is an issue with the 'BuscarInformacoesMeteorologicasPorCidadeSelecionada' function: ", error);
    } finally {
      setIsSearchBeingDone(false);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center mb-4 text-white">
      <h1 className="mb-10 text-5xl font-bold text-center font-bricolage">How's the sky looking today?</h1>
      <div
        className="flex items-center flex-wrap gap-2 w-full md:w-auto"
      >
        <div className="relative w-full md:w-125 bg-[#25253F] px-4 py-2.5 rounded-lg focus-within:outline-2 focus-within:outline-white focus-within:outline-offset-1 transition duration-200 ease-in-out">
          <div className="flex items-center gap-2">
            <IoSearch className="text-[#D6D5E3]" />
            <input
              className="w-full focus:outline-none text-[#D6D5E3]"
              type="text"
              placeholder="Search for a place..."
              value={valorDigitado}
              onChange={(e) => {
                setValorDigitado(e.target.value);
                setLocalidadeSelecionada(false);
              }}
            />
          </div>

          {isCountriesAndCitiesSearchLoading ? (
            <div className="absolute z-20 bg-[#25253F] w-full top-full mt-2 left-0 rounded-lg p-2 flex items-center gap-2">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icon-loading.svg`}
                alt="loading icon"
                width={20}
                height={20}
                loading="eager"
                className="animate-spin [animation-duration:2s]"
              />
              <span className="text-[#F5F4FF]">Search in progress</span>
            </div>
          ) : (
            countriesAndCities.length > 0 && (
              <div className="absolute z-20 bg-[#25253F] w-full top-full mt-2 left-0 rounded-lg p-1">
                {countriesAndCities.map((item: CountriesAndCitiesInterface) => {
                  const localizacao = item.admin2 && item.admin2 !== item.name ? item.admin2 : item.admin1;
                  return (
                    <div
                      className="cursor-pointer p-1 flex justify-between center-items flex-wrap rounded-lg hover:bg-[#2F2F49]"
                      key={item.id}
                      onClick={() => {
                        setLatitudeLongitude({ latitude: item.latitude, longitude: item.longitude });
                        setNomeDoPaisECidadeSelecionado(`${item.name}, ${item.country}`);
                        setValorDigitado(item.name);
                        setLocalidadeSelecionada(true);
                        setCountriesAndCities([]);
                        setSearchWasPerformed(false);
                      }}
                    >
                      <span className="pl-1">{item.name}</span>
                      <span className="pr-1">({item.country}{localizacao ? ` - ${localizacao}` : null})</span>
                    </div>
                  )
                })}
              </div>
            )
          )}
        </div>

        <button
          className="w-full md:w-auto bg-[#4657D9] hover:bg-[#2C1B9C] px-4 py-2.5 rounded-lg cursor-pointer focus:outline-2 focus:outline-[#505AB1] focus:outline-offset-1 transition duration-200 ease-in-out"
          type="submit"
          onClick={BuscarInformacoesMeteorologicasPorCidadeSelecionada}
        >
          Search
        </button>

      </div>

      {searchWasPerformed &&
        !isCountriesAndCitiesSearchLoading &&
        countriesAndCities.length === 0 &&
        !localidadeSelecionada && (
          <div className="mt-5 text-xl font-semibold text-[#FEFEFF]">No search result found!</div>
        )
      }

    </div>
  )
}
