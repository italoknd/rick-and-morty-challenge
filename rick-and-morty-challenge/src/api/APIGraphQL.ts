import axios from "axios";
import { http } from "./index";

import { Episode } from "../interfaces/episode";
import { CharacterResponse, IQueryParams } from "../interfaces/character";
import { LocationResponse } from "../interfaces/location";
const endpoint = import.meta.env.VITE_API_RICK_MORTY_GRAPHQL;

export const getCharacters = async (
  query: IQueryParams
): Promise<CharacterResponse> => {
  try {
    const gqlQuery = `
      query ($page: Int, $name: String, $status: String) {
        characters(page: $page, filter: {
          name: $name,
          status: $status,
        }) {
          info {
            count
            pages
          }
          results {
            id
            name
            status
            species
            gender
            image
          }
        }
      }
    `;

    const variables = {
      page: query.page ? Number(query.page) : 1,
      name: query.name ?? "",
      status: query.status ?? "",
    };

    const { data } = await axios.post(endpoint, {
      query: gqlQuery,
      variables,
    });

    if (data.errors) {
      throw new Error(
        data.errors[0]?.message || "Erro desconhecido do GraphQL"
      );
    }

    return data.data.characters;
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
