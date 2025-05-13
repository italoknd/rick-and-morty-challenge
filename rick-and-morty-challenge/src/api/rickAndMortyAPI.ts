import axios from "axios";
import { http } from "./index";

import { EpisodeResponse } from "../interfaces/episode";
import { CharacterResponse } from "../interfaces/character";
import { LocationResponse } from "../interfaces/location";

export const getCharacters = async (): Promise<CharacterResponse> => {
  try {
    const { data } = await http.get("/character");
    return data;
  } catch (error: unknown) {
    const genericError: string = "Falha ao buscar personagens.";
    if (axios.isAxiosError(error)) {
      throw new Error(`${genericError}: ${error.message}`);
    }
    throw new Error(genericError);
  }
};

export const getLocations = async (): Promise<LocationResponse> => {
  try {
    const { data } = await http.get("/location");
    return data;
  } catch (error: unknown) {
    const genericError: string = "Falha ao buscar locais.";
    if (axios.isAxiosError(error)) {
      throw new Error(`${genericError}: ${error.message}`);
    }
    throw new Error(genericError);
  }
};

export const getEpisodes = async (): Promise<EpisodeResponse> => {
  try {
    const { data } = await http.get("/episode");
    return data;
  } catch (error: unknown) {
    const genericError: string = "Falha ao buscar episódios.";
    if (axios.isAxiosError(error)) {
      throw new Error(`${genericError}: ${error.message}`);
    }
    throw new Error(genericError);
  }
};
