import axios from "axios";
import { http } from "./index";

import { Episode } from "../interfaces/episode";
import { CharacterResponse, IQueryParams } from "../interfaces/character";
import { LocationResponse } from "../interfaces/location";

export const getCharacters = async (
  query: IQueryParams
): Promise<CharacterResponse> => {
  try {
    const fullQuery = `?name=${query.name ?? ""}&status=${
      query.status ?? ""
    }&page=${query.page ?? ""}`;

    const { data } = await http.get(`/character/${fullQuery}`);
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

export const getEpisodes = async (eps: string): Promise<Episode[]> => {
  try {
    const { data } = await http.get(`/episode/${eps}`);

    return Array.isArray(data) ? data : [data];
  } catch (error: unknown) {
    const genericError: string = "Falha ao buscar episódios.";
    if (axios.isAxiosError(error)) {
      throw new Error(`${genericError}: ${error.message}`);
    }
    throw new Error(genericError);
  }
};
