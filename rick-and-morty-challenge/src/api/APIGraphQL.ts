import axios from "axios";
import { EpisodeResponse } from "../interfaces/episode";
import { CharacterResponse, IQueryParams } from "../interfaces/character";

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
            origin {
              name
            }
            episode {
              id
            }
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

export const getEpisodes = async (ids: number[]): Promise<EpisodeResponse> => {
  try {
    const gqlQuery = `
    query ($ids: [ID!]!) {
      episodesByIds(ids: $ids) {
        name
        air_date
        episode
      }
    }
  `;

    const variables = {
      ids,
    };

    const { data } = await axios.post(endpoint, {
      query: gqlQuery,
      variables,
    });

    return data;
  } catch (error: unknown) {
    const genericError: string = "Falha ao buscar episódios.";
    if (axios.isAxiosError(error)) {
      throw new Error(`${genericError}: ${error.message}`);
    }
    throw new Error(genericError);
  }
};
