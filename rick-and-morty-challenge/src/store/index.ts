import { defineStore } from "pinia";

// Interfaces
import { Character, IQueryParams } from "@interfaces/character";
import { IGeneralInfos } from "@interfaces/index";
import { Episode } from "@interfaces/episode";
import { Location } from "@interfaces/location";

import * as service from "../api/APIRestful";
import * as GraphQLService from "../api/APIGraphQL";

//RNM = Rick and Morty
export const useRNMStore = defineStore("RNM", {
  state: () => ({
    selectedCharacter: new Object() as Character,
    characters: new Array() as Character[],
    locations: new Object() as Location[],
    episodes: new Object() as Episode[],
    infos: new Object() as IGeneralInfos,
    fullQuery: new Object() as IQueryParams,
  }),
  getters: {
    _characters(): Character[] {
      return this.characters;
    },
    _locations(): Location[] {
      return this.locations;
    },
    _episodes(): Episode[] {
      return this.episodes;
    },
    _infos(): IGeneralInfos {
      return this.infos;
    },
    _fullQuery(): IQueryParams {
      return this.fullQuery;
    },
    _selectedCharacter(): Character {
      return this.selectedCharacter;
    },
  },
  actions: {
    getSelectedCharacter(payload: Character) {
      this.selectedCharacter = payload;
    },

    async updateQueryParams(payload: IQueryParams) {
      this.fullQuery = payload;

      await this.getCharacters();
    },

    async getCharacters() {
      try {
        const data = await GraphQLService.getCharacters(this._fullQuery);
        this.characters = data.results;
        this.infos = data.info;
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    },

    async getLocations() {
      try {
        const data = await service.getLocations();
        this.locations = data.results;
        this.infos = data.info;
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    },

    async getEpisodes(eps: string) {
      try {
        this.episodes = await service.getEpisodes(eps);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    },
  },
  persist: true,
});
